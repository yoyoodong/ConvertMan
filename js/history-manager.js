/**
 * ConvertMan - 历史记录管理器
 * 管理应用的转换历史记录，包括存储、检索和展示
 */

// 历史记录管理器对象
const HistoryManager = {
    // 历史记录状态
    state: {
        items: [],
        page: 1,
        perPage: 5,
        searchTerm: '',
        totalPages: 1
    },
    
    // 初始化历史记录管理器
    init() {
        // 加载历史记录
        this.loadFromStorage();
        
        // 绑定事件
        this.bindEvents();
        
        // 渲染历史记录列表
        this.renderList();
        
        console.log('历史记录管理器初始化完成');
    },
    
    // 绑定历史记录相关事件
    bindEvents() {
        // 历史记录搜索
        const searchBtn = document.getElementById('history-search-btn');
        const searchInput = document.getElementById('history-search-input');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.search());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.search();
                }
            });
        }
        
        // 清空历史记录
        const clearAllBtn = document.getElementById('clear-all-history');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearAll());
        }
    },
    
    // 搜索历史记录
    search() {
        const searchInput = document.getElementById('history-search-input');
        if (!searchInput) return;
        
        this.state.searchTerm = searchInput.value.trim().toLowerCase();
        this.state.page = 1;
        this.renderList();
    },
    
    // 添加新的历史记录
    add(item) {
        // 创建历史记录项
        const historyItem = {
            id: Date.now(),
            originalName: item.originalName,
            originalFormat: item.originalFormat,
            originalSize: item.originalSize,
            targetFormat: item.targetFormat,
            convertedSize: item.convertedSize,
            thumbnail: item.thumbnail,
            date: new Date().toISOString(),
            type: item.type || 'image', // 转换类型: image, pdf, document, compress
            blob: item.blob
        };
        
        // 添加到历史记录列表
        this.state.items.unshift(historyItem);
        
        // 限制历史记录数量，最多保存50条
        if (this.state.items.length > 50) {
            this.state.items.pop();
        }
        
        // 保存到本地存储
        this.saveToStorage();
        
        // 重新渲染历史记录列表
        this.renderList();
        
        return historyItem;
    },
    
    // 从历史记录中删除项目
    delete(id) {
        const index = this.state.items.findIndex(item => item.id === id);
        if (index === -1) return false;
        
        this.state.items.splice(index, 1);
        this.saveToStorage();
        this.renderList();
        
        return true;
    },
    
    // 清空全部历史记录
    clearAll() {
        if (!confirm('确定要清空全部历史记录吗？此操作无法撤销。')) {
            return;
        }
        
        this.state.items = [];
        this.saveToStorage();
        this.renderList();
        
        showMessage('已清空全部历史记录', 'info');
    },
    
    // 下载历史记录中的文件
    download(id) {
        const item = this.state.items.find(item => item.id === id);
        if (!item || !item.blob) {
            showError('无法找到或下载此历史记录');
            return;
        }
        
        // 创建URL并触发下载
        const blob = typeof item.blob === 'string' ? dataURItoBlob(item.blob) : item.blob;
        const url = URL.createObjectURL(blob);
        const originalName = item.originalName.split('.')[0] || 'file';
        const filename = `${originalName}.${item.targetFormat.toLowerCase()}`;
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        
        // 清理
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    },
    
    // 渲染历史记录列表
    renderList() {
        const historyList = document.getElementById('history-list');
        const emptyHistory = document.getElementById('empty-history');
        
        if (!historyList || !emptyHistory) return;
        
        // 显示空历史记录状态
        if (this.state.items.length === 0) {
            emptyHistory.style.display = 'flex';
            historyList.innerHTML = '';
            document.querySelector('.history-pagination')?.style.display = 'none';
            return;
        }
        
        // 筛选搜索结果
        let filteredItems = this.state.items;
        if (this.state.searchTerm) {
            filteredItems = this.state.items.filter(item => 
                item.originalName.toLowerCase().includes(this.state.searchTerm) || 
                item.targetFormat.toLowerCase().includes(this.state.searchTerm) ||
                item.type.toLowerCase().includes(this.state.searchTerm)
            );
        }
        
        // 如果筛选后没有结果
        if (filteredItems.length === 0) {
            emptyHistory.style.display = 'none';
            historyList.innerHTML = `
                <div class="no-results">
                    <div class="empty-icon">
                        <span class="material-icons">search_off</span>
                    </div>
                    <p>没有找到匹配的历史记录</p>
                    <p class="empty-subtext">请尝试其他搜索关键词</p>
                </div>
            `;
            document.querySelector('.history-pagination')?.style.display = 'none';
            return;
        }
        
        // 隐藏空历史提示
        emptyHistory.style.display = 'none';
        
        // 计算分页
        this.state.totalPages = Math.ceil(filteredItems.length / this.state.perPage);
        if (this.state.page > this.state.totalPages) {
            this.state.page = this.state.totalPages;
        }
        
        const startIndex = (this.state.page - 1) * this.state.perPage;
        const endIndex = Math.min(startIndex + this.state.perPage, filteredItems.length);
        const paginatedItems = filteredItems.slice(startIndex, endIndex);
        
        // 获取类型图标
        const getTypeIcon = (type) => {
            const icons = {
                'image': 'image',
                'pdf': 'picture_as_pdf',
                'document': 'description',
                'compress': 'compress'
            };
            return icons[type] || 'insert_drive_file';
        };
        
        // 渲染历史记录项
        historyList.innerHTML = paginatedItems.map((item) => {
            const date = new Date(item.date);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            
            // 计算节省的空间百分比
            const savedPercentage = item.originalSize > 0 
                ? Math.round((1 - item.convertedSize / item.originalSize) * 100) 
                : 0;
            
            // 是否节省了空间
            const saved = savedPercentage > 0;
            
            return `
                <div class="history-item" data-id="${item.id}">
                    <div class="history-item-preview">
                        ${item.thumbnail 
                            ? `<img src="${item.thumbnail}" alt="${item.originalName} 预览">`
                            : `<span class="material-icons preview-icon">${getTypeIcon(item.type)}</span>`
                        }
                    </div>
                    <div class="history-item-details">
                        <div class="history-item-title">
                            <span class="file-name">${item.originalName}</span>
                            <span class="conversion-arrow">→</span>
                            <span class="target-format">${item.targetFormat}</span>
                        </div>
                        <div class="history-item-info">
                            <span class="info-label">原始大小: </span>
                            <span class="info-value">${formatFileSize(item.originalSize)}</span>
                            <span class="info-separator">|</span>
                            <span class="info-label">转换大小: </span>
                            <span class="info-value">${formatFileSize(item.convertedSize)}</span>
                            ${saved 
                                ? `<span class="info-separator">|</span>
                                   <span class="info-label saved-space">节省: </span>
                                   <span class="info-value saved-value">${savedPercentage}%</span>`
                                : ''
                            }
                        </div>
                        <div class="history-item-date">
                            <span class="material-icons">event</span>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                    <div class="history-item-actions">
                        <button class="icon-btn download-btn" title="下载文件">
                            <span class="material-icons">file_download</span>
                        </button>
                        <button class="icon-btn delete-btn" title="删除记录">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        // 更新分页信息
        this.updatePagination(startIndex, endIndex, filteredItems.length);
        
        // 绑定历史记录项的事件
        this.bindItemEvents();
    },
    
    // 绑定历史记录项的事件
    bindItemEvents() {
        const historyList = document.getElementById('history-list');
        if (!historyList) return;
        
        // 下载按钮事件
        const downloadBtns = historyList.querySelectorAll('.download-btn');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const historyItem = e.target.closest('.history-item');
                if (historyItem) {
                    const id = parseInt(historyItem.dataset.id);
                    this.download(id);
                }
            });
        });
        
        // 删除按钮事件
        const deleteBtns = historyList.querySelectorAll('.delete-btn');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const historyItem = e.target.closest('.history-item');
                if (historyItem) {
                    const id = parseInt(historyItem.dataset.id);
                    if (confirm('确定删除这条记录吗？此操作无法撤销。')) {
                        this.delete(id);
                    }
                }
            });
        });
    },
    
    // 更新分页控件
    updatePagination(startIndex, endIndex, totalItems) {
        const paginationElem = document.querySelector('.history-pagination');
        if (!paginationElem) return;
        
        if (this.state.totalPages <= 1) {
            paginationElem.style.display = 'none';
            return;
        }
        
        paginationElem.style.display = 'flex';
        paginationElem.innerHTML = `
            <button class="pagination-btn prev-btn" ${this.state.page === 1 ? 'disabled' : ''}>
                <span class="material-icons">navigate_before</span>
            </button>
            <div class="pagination-info">
                <span>第 ${startIndex + 1}-${endIndex} 项，共 ${totalItems} 项</span>
            </div>
            <button class="pagination-btn next-btn" ${this.state.page === this.state.totalPages ? 'disabled' : ''}>
                <span class="material-icons">navigate_next</span>
            </button>
        `;
        
        // 绑定分页按钮事件
        const prevBtn = paginationElem.querySelector('.prev-btn');
        const nextBtn = paginationElem.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.state.page > 1) {
                    this.state.page--;
                    this.renderList();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.state.page < this.state.totalPages) {
                    this.state.page++;
                    this.renderList();
                }
            });
        }
    },
    
    // 从本地存储加载历史记录
    loadFromStorage() {
        try {
            const historyData = localStorage.getItem('convertManHistory');
            if (historyData) {
                this.state.items = JSON.parse(historyData);
                console.log(`已加载 ${this.state.items.length} 条历史记录`);
            }
        } catch (error) {
            console.error('加载历史记录失败:', error);
            this.state.items = [];
        }
    },
    
    // 保存历史记录到本地存储
    saveToStorage() {
        try {
            localStorage.setItem('convertManHistory', JSON.stringify(this.state.items));
        } catch (error) {
            console.error('保存历史记录失败:', error);
            showError('保存历史记录失败：存储空间可能已满');
        }
    }
};

// 当DOM加载完成后初始化历史记录管理器
document.addEventListener('DOMContentLoaded', () => {
    // 确保在主脚本初始化完成后再初始化历史记录管理器
    setTimeout(() => {
        HistoryManager.init();
    }, 100);
}); 