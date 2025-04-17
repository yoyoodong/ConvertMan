/**
 * ConvertMan - PDF转换功能模块
 * 实现PDF格式转换工具的增强功能
 */

// PDF转换功能初始化
function initPdfConverter() {
    console.log('初始化PDF转换功能');
    
    // 加载PDF.js库（如果尚未加载）
    loadPdfJsLibrary();
    
    // 绑定PDF相关事件
    bindPdfEvents();
    
    // 初始化额外的PDF功能
    initExtraPdfFeatures();
}

// 加载PDF.js库
function loadPdfJsLibrary() {
    // 检查是否已加载
    if (document.getElementById('pdf-js-script')) return;
    
    console.log('加载PDF.js库');
    
    // 创建脚本标签并加载PDF.js
    const script = document.createElement('script');
    script.id = 'pdf-js-script';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
    script.async = true;
    
    script.onload = function() {
        // 设置worker路径
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
        console.log('PDF.js库加载成功');
        
        // PDF.js加载成功后，更新转换UI状态
        updatePdfUIForPdfJs();
    };
    
    script.onerror = function() {
        console.error('PDF.js库加载失败');
        showMessage('PDF预览功能加载失败，但不影响转换功能', 'warning');
    };
    
    document.head.appendChild(script);
}

// 更新UI状态，反映PDF.js加载完成
function updatePdfUIForPdfJs() {
    // 添加提示信息，表明PDF预览功能已加载
    const pdfPreviewInfo = document.createElement('div');
    pdfPreviewInfo.className = 'pdf-preview-info';
    pdfPreviewInfo.innerHTML = '<span class="material-icons">check_circle</span> PDF预览功能已加载';
    
    const pdfContainer = document.querySelector('.pdf-converter-container');
    if (pdfContainer) {
        pdfContainer.appendChild(pdfPreviewInfo);
        
        // 3秒后淡出
        setTimeout(() => {
            pdfPreviewInfo.style.opacity = '0';
            setTimeout(() => {
                if (pdfContainer.contains(pdfPreviewInfo)) {
                    pdfContainer.removeChild(pdfPreviewInfo);
                }
            }, 500);
        }, 3000);
    }
    
    // 如果有PDF文件已上传，生成预览
    if (window.appState && window.appState.pdfFile) {
        previewPdfFile(window.appState.pdfFile);
    }
}

// 绑定PDF相关事件
function bindPdfEvents() {
    // 获取DOM元素
    const elements = {
        pdfUploadBtn: document.getElementById('pdf-upload-btn'),
        pdfFileInput: document.getElementById('pdf-file-input'),
        pdfDropArea: document.getElementById('pdf-drop-area'),
        pdfUrlInput: document.getElementById('pdf-url-input'),
        pdfFetchUrl: document.getElementById('pdf-fetch-url'),
        pdfConvertBtn: document.getElementById('pdf-convert-btn'),
        pdfCancelBtn: document.getElementById('pdf-cancel-btn'),
        pdfDownloadBtn: document.getElementById('pdf-download-btn'),
        pdfShareBtn: document.getElementById('pdf-share-btn'),
        pdfCloudBtn: document.getElementById('pdf-cloud-btn'),
        tabBtns: document.querySelectorAll('.tab-btn'),
        conversionTypes: document.querySelectorAll('.conversion-type'),
        formatItems: document.querySelectorAll('.format-item')
    };
    
    // 文件选择相关事件
    if (elements.pdfUploadBtn && elements.pdfFileInput) {
        elements.pdfUploadBtn.addEventListener('click', function() {
            elements.pdfFileInput.click();
        });
        
        elements.pdfFileInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                if (window.processPdfFile) {
                    window.processPdfFile(file);
                } else {
                    console.error('processPdfFile函数不存在');
                }
            }
        });
    }
    
    // 拖放区域事件
    if (elements.pdfDropArea) {
        elements.pdfDropArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.add('drag-over');
        });
        
        elements.pdfDropArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.remove('drag-over');
        });
        
        elements.pdfDropArea.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.remove('drag-over');
            
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];
                if (window.processPdfFile) {
                    window.processPdfFile(file);
                } else {
                    console.error('processPdfFile函数不存在');
                }
            }
        });
    }
    
    // URL获取事件
    if (elements.pdfFetchUrl) {
        elements.pdfFetchUrl.addEventListener('click', function() {
            const url = elements.pdfUrlInput.value.trim();
            if (!url) {
                window.showError ? window.showError('请输入有效的URL') : alert('请输入有效的URL');
                return;
            }
            
            // 禁用按钮并显示加载状态
            this.disabled = true;
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="material-icons rotating">autorenew</span> 获取中...';
            
            // 添加旋转动画样式
            const style = document.createElement('style');
            style.textContent = `
                .rotating {
                    animation: rotating 2s linear infinite;
                }
                @keyframes rotating {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // 获取文件
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('网络请求失败');
                    }
                    return response.blob();
                })
                .then(blob => {
                    // 创建文件对象
                    const filename = url.split('/').pop() || 'file';
                    const file = new File([blob], filename, {
                        type: blob.type || 'application/octet-stream'
                    });
                    
                    // 处理文件
                    if (window.processPdfFile) {
                        window.processPdfFile(file);
                    } else {
                        console.error('processPdfFile函数不存在');
                    }
                })
                .catch(error => {
                    window.showError ? window.showError('获取文件失败: ' + error.message) : alert('获取文件失败: ' + error.message);
                })
                .finally(() => {
                    // 恢复按钮状态
                    this.disabled = false;
                    this.innerHTML = originalText;
                    
                    // 移除动画样式
                    document.head.removeChild(style);
                });
        });
    }
    
    // 转换按钮事件
    if (elements.pdfConvertBtn) {
        elements.pdfConvertBtn.addEventListener('click', function() {
            if (window.startPdfConversion) {
                window.startPdfConversion();
            } else {
                console.error('startPdfConversion函数不存在');
            }
        });
    }
    
    // 取消按钮事件
    if (elements.pdfCancelBtn) {
        elements.pdfCancelBtn.addEventListener('click', function() {
            if (window.cancelPdfConversion) {
                window.cancelPdfConversion();
            } else {
                console.error('cancelPdfConversion函数不存在');
            }
        });
    }
    
    // 下载按钮事件
    if (elements.pdfDownloadBtn) {
        elements.pdfDownloadBtn.addEventListener('click', function() {
            if (window.downloadPdfConvertedFile) {
                window.downloadPdfConvertedFile();
            } else {
                console.error('downloadPdfConvertedFile函数不存在');
            }
        });
    }
    
    // 分享按钮事件
    if (elements.pdfShareBtn) {
        elements.pdfShareBtn.addEventListener('click', function() {
            if (window.showQRCode) {
                window.showQRCode();
            } else {
                console.error('showQRCode函数不存在');
                showShareFallback();
            }
        });
    }
    
    // 云存储按钮事件
    if (elements.pdfCloudBtn) {
        elements.pdfCloudBtn.addEventListener('click', function() {
            if (window.showCloudOptions) {
                window.showCloudOptions();
            } else {
                console.error('showCloudOptions函数不存在');
                showCloudFallback();
            }
        });
    }
    
    // 标签切换事件
    if (elements.tabBtns) {
        elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                if (!tabId) return;
                
                // 更新按钮状态
                elements.tabBtns.forEach(b => b.classList.toggle('active', b === this));
                
                // 更新内容区域
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => {
                    content.classList.toggle('active', content.id === tabId + '-tab');
                });
            });
        });
    }
    
    // 转换类型切换事件
    if (elements.conversionTypes) {
        elements.conversionTypes.forEach(type => {
            type.addEventListener('click', function() {
                const conversionType = this.dataset.conversion;
                if (!conversionType) return;
                
                if (window.switchConversionType) {
                    window.switchConversionType(conversionType);
                } else {
                    console.error('switchConversionType函数不存在');
                    
                    // 基本切换功能
                    elements.conversionTypes.forEach(t => t.classList.toggle('active', t === this));
                    
                    // 切换格式和选项显示
                    const toPdfFormats = document.getElementById('to-pdf-formats');
                    const fromPdfFormats = document.getElementById('from-pdf-formats');
                    const toPdfOptions = document.getElementById('to-pdf-options');
                    const fromPdfOptions = document.getElementById('from-pdf-options');
                    
                    if (toPdfFormats && fromPdfFormats) {
                        toPdfFormats.style.display = conversionType === 'to-pdf' ? 'block' : 'none';
                        fromPdfFormats.style.display = conversionType === 'from-pdf' ? 'block' : 'none';
                    }
                    
                    if (toPdfOptions && fromPdfOptions) {
                        toPdfOptions.style.display = conversionType === 'to-pdf' ? 'block' : 'none';
                        fromPdfOptions.style.display = conversionType === 'from-pdf' ? 'block' : 'none';
                    }
                }
            });
        });
    }
    
    // 格式选择事件
    if (elements.formatItems) {
        elements.formatItems.forEach(item => {
            item.addEventListener('click', function() {
                const format = this.dataset.format;
                if (!format) return;
                
                if (window.selectPdfFormat) {
                    window.selectPdfFormat(format);
                } else {
                    console.error('selectPdfFormat函数不存在');
                    
                    // 基本选择功能
                    elements.formatItems.forEach(i => i.classList.toggle('active', i === this));
                }
            });
        });
    }
}

// 初始化额外的PDF功能
function initExtraPdfFeatures() {
    // 添加CSS样式
    addExtraPdfStyles();
    
    // 添加格式支持信息区域
    addFormatSupportInfo();
}

// 添加额外的PDF样式
function addExtraPdfStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .pdf-preview-info {
            background-color: rgba(0, 150, 0, 0.1);
            color: #006600;
            padding: 8px 12px;
            border-radius: 4px;
            margin-top: 10px;
            display: flex;
            align-items: center;
            transition: opacity 0.5s ease;
        }
        
        .pdf-preview-info .material-icons {
            margin-right: 8px;
        }
        
        .format-item-new {
            position: relative;
        }
        
        .format-item-new::after {
            content: 'NEW';
            position: absolute;
            top: 0;
            right: 0;
            background-color: var(--accent-color);
            color: white;
            font-size: 0.6rem;
            padding: 2px 4px;
            border-radius: 4px;
            transform: translate(30%, -30%);
        }
        
        .pdf-format-support {
            margin-top: 20px;
            padding: 15px;
            background-color: var(--background-color-light);
            border-radius: 8px;
        }
        
        .pdf-format-support h4 {
            margin-top: 0;
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        
        .format-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .format-tag {
            background-color: var(--background-color);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 0.8rem;
        }
        
        .enhanced-drop-area {
            position: relative;
            overflow: hidden;
        }
        
        .enhanced-drop-area::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent,
                rgba(var(--primary-color-rgb), 0.1),
                transparent
            );
            transform: rotate(45deg);
            animation: shine 3s infinite linear;
            pointer-events: none;
            display: none;
        }
        
        .enhanced-drop-area.drag-over::before {
            display: block;
        }
        
        @keyframes shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
        }
        
        .cloud-options {
            display: flex;
            justify-content: space-around;
            margin-top: 1rem;
        }
        
        .cloud-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .cloud-option:hover {
            background-color: var(--background-color-light);
            transform: translateY(-2px);
        }
        
        .cloud-option span {
            margin-top: 0.5rem;
        }
    `;
    
    document.head.appendChild(style);
}

// 添加格式支持信息
function addFormatSupportInfo() {
    const pdfOptionsSection = document.querySelector('.pdf-options-section');
    
    if (pdfOptionsSection) {
        const formatSupport = document.createElement('div');
        formatSupport.className = 'pdf-format-support';
        formatSupport.innerHTML = `
            <h4>支持的格式</h4>
            <div class="format-tags">
                <span class="format-tag">DOC</span>
                <span class="format-tag">DOCX</span>
                <span class="format-tag">XLS</span>
                <span class="format-tag">XLSX</span>
                <span class="format-tag">PPT</span>
                <span class="format-tag">PPTX</span>
                <span class="format-tag">XML</span>
                <span class="format-tag">CSV</span>
                <span class="format-tag">ODT</span>
                <span class="format-tag">ODS</span>
                <span class="format-tag">ODP</span>
                <span class="format-tag">HTML</span>
                <span class="format-tag">TXT</span>
                <span class="format-tag">RTF</span>
                <span class="format-tag">SWF</span>
                <span class="format-tag">PNG</span>
                <span class="format-tag">JPG</span>
                <span class="format-tag">TIFF</span>
                <span class="format-tag">BMP</span>
                <span class="format-tag">PNM</span>
                <span class="format-tag">PSD</span>
            </div>
        `;
        
        pdfOptionsSection.appendChild(formatSupport);
    }
}

// 分享功能降级处理
function showShareFallback() {
    alert('分享功能即将上线，敬请期待！');
}

// 云存储功能降级处理
function showCloudFallback() {
    alert('云存储功能即将上线，敬请期待！');
}

// 在页面加载完成后初始化PDF转换功能
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，确保主脚本已加载
    setTimeout(initPdfConverter, 100);
}); 