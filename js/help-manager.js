/**
 * ConvertMan - 帮助中心管理器
 * 提供帮助中心的内容和交互功能
 */

// 帮助中心管理器对象
const HelpManager = {
    // 初始化帮助中心
    init() {
        // 绑定事件
        this.bindEvents();
        
        // 加载帮助内容
        this.loadHelpContent();
        
        console.log('帮助中心初始化完成');
    },
    
    // 绑定帮助中心相关事件
    bindEvents() {
        // FAQ 问题点击事件
        const faqItems = document.querySelectorAll('.faq-item summary');
        faqItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // 阻止默认行为以便自定义切换逻辑
                e.preventDefault();
                
                // 获取父元素（<details>）
                const details = item.parentElement;
                
                // 如果当前项已经是打开状态，则关闭它
                if (details.hasAttribute('open')) {
                    details.removeAttribute('open');
                } else {
                    // 打开当前项
                    details.setAttribute('open', '');
                }
            });
        });
        
        // 帮助卡片悬停效果
        const helpCards = document.querySelectorAll('.help-card');
        helpCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover');
            });
        });
        
        // 功能视频演示点击事件
        const demoVideoBtns = document.querySelectorAll('.demo-video-btn');
        demoVideoBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const videoId = e.currentTarget.dataset.video;
                if (videoId) {
                    this.openVideoModal(videoId);
                }
            });
        });
        
        // 反馈表单提交
        const feedbackForm = document.getElementById('feedback-form');
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitFeedback(feedbackForm);
            });
        }
        
        // 帮助内容搜索
        const helpSearchInput = document.getElementById('help-search-input');
        const helpSearchBtn = document.getElementById('help-search-btn');
        
        if (helpSearchBtn) {
            helpSearchBtn.addEventListener('click', () => {
                this.searchHelp(helpSearchInput.value);
            });
        }
        
        if (helpSearchInput) {
            helpSearchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.searchHelp(helpSearchInput.value);
                }
            });
        }
    },
    
    // 加载帮助内容
    loadHelpContent() {
        // 添加功能演示视频按钮
        this.addDemoVideoButtons();
        
        // 添加更多帮助内容
        this.addMoreHelpContent();
    },
    
    // 添加功能演示视频按钮
    addDemoVideoButtons() {
        // 为每个帮助卡片添加视频演示按钮
        const helpCards = document.querySelectorAll('.help-card-content');
        helpCards.forEach(card => {
            const cardType = card.closest('.help-card').querySelector('h3').textContent.trim().toLowerCase();
            
            // 获取视频ID（实际使用中应替换为真实视频ID）
            const videoIds = {
                '图像转换': 'image-demo',
                'pdf转换': 'pdf-demo',
                '文档转换': 'document-demo',
                '文件压缩': 'compress-demo'
            };
            
            const videoId = videoIds[cardType] || 'default-demo';
            
            // 添加视频演示按钮
            const demoBtn = document.createElement('button');
            demoBtn.className = 'demo-video-btn';
            demoBtn.dataset.video = videoId;
            demoBtn.innerHTML = '<span class="material-icons">play_circle</span>观看演示视频';
            
            card.appendChild(demoBtn);
        });
    },
    
    // 添加更多帮助内容
    addMoreHelpContent() {
        // 快捷键部分
        const helpSection = document.querySelector('.help-section');
        if (!helpSection) return;
        
        // 创建快捷键部分
        const shortcutsSection = document.createElement('div');
        shortcutsSection.className = 'shortcuts-section';
        shortcutsSection.innerHTML = `
            <h3>快捷键指南</h3>
            <div class="shortcuts-container">
                <div class="shortcut-group">
                    <h4>通用快捷键</h4>
                    <table class="shortcuts-table">
                        <tr>
                            <td><kbd>Ctrl</kbd> + <kbd>O</kbd></td>
                            <td>打开文件</td>
                        </tr>
                        <tr>
                            <td><kbd>Ctrl</kbd> + <kbd>S</kbd></td>
                            <td>保存/下载文件</td>
                        </tr>
                        <tr>
                            <td><kbd>Ctrl</kbd> + <kbd>Z</kbd></td>
                            <td>撤销上一步操作</td>
                        </tr>
                        <tr>
                            <td><kbd>Ctrl</kbd> + <kbd>1-5</kbd></td>
                            <td>切换主要功能标签页</td>
                        </tr>
                        <tr>
                            <td><kbd>F1</kbd></td>
                            <td>打开帮助中心</td>
                        </tr>
                    </table>
                </div>
                
                <div class="shortcut-group">
                    <h4>图像编辑快捷键</h4>
                    <table class="shortcuts-table">
                        <tr>
                            <td><kbd>+</kbd> / <kbd>-</kbd></td>
                            <td>放大/缩小预览</td>
                        </tr>
                        <tr>
                            <td><kbd>R</kbd></td>
                            <td>旋转图像</td>
                        </tr>
                        <tr>
                            <td><kbd>C</kbd></td>
                            <td>裁剪图像</td>
                        </tr>
                        <tr>
                            <td><kbd>F</kbd></td>
                            <td>适应窗口大小</td>
                        </tr>
                        <tr>
                            <td><kbd>Tab</kbd></td>
                            <td>切换原图/转换后预览</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
        
        // 添加反馈表单
        const feedbackSection = document.createElement('div');
        feedbackSection.className = 'feedback-section';
        feedbackSection.innerHTML = `
            <h3>问题反馈与建议</h3>
            <p>我们非常重视您的反馈，如有任何问题或建议，请通过以下表单告诉我们：</p>
            
            <form id="feedback-form" class="feedback-form">
                <div class="form-group">
                    <label for="feedback-type">反馈类型</label>
                    <select id="feedback-type" required>
                        <option value="">请选择反馈类型</option>
                        <option value="bug">问题反馈</option>
                        <option value="feature">功能建议</option>
                        <option value="question">使用咨询</option>
                        <option value="other">其他</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="feedback-content">反馈内容</label>
                    <textarea id="feedback-content" rows="5" placeholder="请详细描述您的问题或建议..." required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="contact-email">联系邮箱（可选）</label>
                    <input type="email" id="contact-email" placeholder="您的邮箱地址，便于我们回复您">
                </div>
                
                <button type="submit" class="primary-btn">
                    <span class="material-icons">send</span>提交反馈
                </button>
            </form>
        `;
        
        // 搜索帮助内容
        const searchSection = document.createElement('div');
        searchSection.className = 'help-search-section';
        searchSection.innerHTML = `
            <div class="help-search">
                <input type="text" id="help-search-input" placeholder="搜索帮助内容...">
                <button id="help-search-btn" class="primary-btn">
                    <span class="material-icons">search</span>
                </button>
            </div>
            <div id="help-search-results" class="help-search-results" style="display:none;">
                <h3>搜索结果</h3>
                <div id="results-container"></div>
            </div>
        `;
        
        // 插入到FAQ部分前面
        const faqSection = document.querySelector('.faq-section');
        helpSection.insertBefore(searchSection, faqSection);
        helpSection.appendChild(shortcutsSection);
        helpSection.appendChild(feedbackSection);
    },
    
    // 搜索帮助内容
    searchHelp(query) {
        if (!query) return;
        
        const searchTerm = query.trim().toLowerCase();
        if (searchTerm.length < 2) {
            showMessage('请输入至少2个字符进行搜索', 'info');
            return;
        }
        
        // 获取所有帮助卡片和FAQ项
        const helpCards = document.querySelectorAll('.help-card');
        const faqItems = document.querySelectorAll('.faq-item');
        
        const results = [];
        
        // 搜索帮助卡片
        helpCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('.help-card-content').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                results.push({
                    type: 'card',
                    title: card.querySelector('h3').textContent,
                    preview: this.getSearchPreview(content, searchTerm),
                    element: card
                });
            }
        });
        
        // 搜索FAQ项
        faqItems.forEach(item => {
            const question = item.querySelector('summary').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                results.push({
                    type: 'faq',
                    title: item.querySelector('summary').textContent,
                    preview: this.getSearchPreview(answer, searchTerm),
                    element: item
                });
            }
        });
        
        // 显示搜索结果
        this.showSearchResults(results, searchTerm);
    },
    
    // 获取搜索结果预览
    getSearchPreview(text, searchTerm) {
        const maxLength = 150;
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(searchTerm);
        
        if (index === -1) return text.substring(0, maxLength) + '...';
        
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + searchTerm.length + 50);
        let preview = text.substring(start, end);
        
        if (start > 0) preview = '...' + preview;
        if (end < text.length) preview = preview + '...';
        
        return preview;
    },
    
    // 显示搜索结果
    showSearchResults(results, searchTerm) {
        const resultsContainer = document.getElementById('results-container');
        const resultsSection = document.getElementById('help-search-results');
        
        if (!resultsContainer || !resultsSection) return;
        
        // 清空结果容器
        resultsContainer.innerHTML = '';
        
        // 显示结果数量
        const resultsHeader = resultsSection.querySelector('h3');
        resultsHeader.textContent = `搜索结果 (${results.length})`;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>没有找到与"${searchTerm}"相关的内容</p>
                    <p>建议：</p>
                    <ul>
                        <li>检查您的拼写</li>
                        <li>尝试使用更通用的关键词</li>
                        <li>尝试使用相关的同义词</li>
                    </ul>
                </div>
            `;
        } else {
            // 添加结果项
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                // 高亮显示搜索词
                const highlightedPreview = result.preview.replace(
                    new RegExp(searchTerm, 'gi'),
                    match => `<span class="highlight">${match}</span>`
                );
                
                resultItem.innerHTML = `
                    <div class="result-title">
                        <span class="material-icons">${result.type === 'card' ? 'help_outline' : 'question_answer'}</span>
                        <h4>${result.title}</h4>
                    </div>
                    <div class="result-preview">${highlightedPreview}</div>
                `;
                
                // 点击结果项时滚动到对应内容
                resultItem.addEventListener('click', () => {
                    // 先展开FAQ项（如果是FAQ）
                    if (result.type === 'faq' && result.element.tagName === 'DETAILS') {
                        result.element.setAttribute('open', '');
                    }
                    
                    // 滚动到对应元素
                    result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // 突出显示元素
                    result.element.classList.add('highlight-result');
                    setTimeout(() => {
                        result.element.classList.remove('highlight-result');
                    }, 2000);
                });
                
                resultsContainer.appendChild(resultItem);
            });
        }
        
        // 显示结果部分
        resultsSection.style.display = 'block';
    },
    
    // 打开视频演示模态框
    openVideoModal(videoId) {
        // 创建模态框（实际使用中应替换为真实视频）
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <div class="video-modal-header">
                    <h3>功能演示视频</h3>
                    <button class="close-video-btn"><span class="material-icons">close</span></button>
                </div>
                <div class="video-container">
                    <!-- 这里实际应该是嵌入视频播放器 -->
                    <div class="placeholder-video">
                        <span class="material-icons video-placeholder-icon">smart_display</span>
                        <p>这里将显示 "${videoId}" 的演示视频</p>
                        <p class="placeholder-note">（实际应用中，这里将嵌入真实视频播放器）</p>
                    </div>
                </div>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(modal);
        
        // 阻止滚动
        document.body.style.overflow = 'hidden';
        
        // 添加关闭按钮事件
        const closeBtn = modal.querySelector('.close-video-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        });
        
        // 点击模态框背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }
        });
    },
    
    // 提交反馈表单
    submitFeedback(form) {
        const feedbackType = form.querySelector('#feedback-type').value;
        const feedbackContent = form.querySelector('#feedback-content').value;
        const contactEmail = form.querySelector('#contact-email').value;
        
        if (!feedbackType || !feedbackContent) {
            showError('请填写必填字段');
            return;
        }
        
        // 在实际应用中，这里应该发送到后端API
        console.log('提交反馈：', {
            type: feedbackType,
            content: feedbackContent,
            email: contactEmail
        });
        
        // 显示成功消息
        showMessage('感谢您的反馈！我们将认真考虑您的建议', 'success');
        
        // 重置表单
        form.reset();
    }
};

// 当DOM加载完成后初始化帮助中心
document.addEventListener('DOMContentLoaded', () => {
    // 确保在主脚本初始化完成后再初始化帮助中心
    setTimeout(() => {
        HelpManager.init();
    }, 100);
}); 