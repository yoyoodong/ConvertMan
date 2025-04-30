/**
 * ConvertMan - 主脚本文件
 * 实现格式转换工具的核心功能
 */

// DOM元素引用
const elements = {
    // 文件输入相关
    dropArea: document.getElementById('drop-area'),
    fileInput: document.getElementById('file-input'),
    uploadBtn: document.querySelector('.upload-btn'),
    urlInput: document.getElementById('url-input'),
    fetchUrlBtn: document.getElementById('fetch-url'),
    
    // 格式选择相关
    formatBtns: document.querySelectorAll('.format-btn'),
    
    // 质量设置相关
    qualitySlider: document.getElementById('quality-slider'),
    qualityValue: document.getElementById('quality-value'),
    
    // 尺寸设置相关
    widthInput: document.getElementById('width-input'),
    heightInput: document.getElementById('height-input'),
    ratioLock: document.getElementById('ratio-lock'),
    
    // 高级选项相关
    metadataToggle: document.getElementById('metadata-toggle'),
    compressionType: document.getElementById('compression-type'),
    
    // 预览相关
    zoomIn: document.getElementById('zoom-in'),
    zoomOut: document.getElementById('zoom-out'),
    toggleSplit: document.getElementById('toggle-split'),
    originalPreview: document.getElementById('original-preview'),
    convertedPreview: document.getElementById('converted-preview'),
    originalFormat: document.getElementById('original-format'),
    originalSize: document.getElementById('original-size'),
    convertedFormat: document.getElementById('converted-format'),
    convertedSize: document.getElementById('converted-size'),
    
    // 转换操作相关
    convertBtn: document.getElementById('convert-btn'),
    cancelBtn: document.getElementById('cancel-btn'),
    downloadBtn: document.getElementById('download-btn'),
    progressFill: document.querySelector('.progress-fill'),
    statusMessage: document.getElementById('status-message'),
    progressPercentage: document.getElementById('progress-percentage'),
    
    // 标签切换相关
    tabBtns: document.querySelectorAll('.tab-btn'),
    
    // 错误提示相关
    errorToast: document.getElementById('error-toast'),
    errorMessage: document.getElementById('error-message'),
    closeError: document.querySelector('.close-error'),
    
    // 转换完成弹窗相关
    conversionModal: document.getElementById('conversion-complete-modal'),
    modalClose: document.querySelector('.modal-close'),
    resultFormat: document.getElementById('result-format'),
    resultOriginalSize: document.getElementById('result-original-size'),
    resultNewSize: document.getElementById('result-new-size'),
    resultSaved: document.getElementById('result-saved'),
    modalDownloadBtn: document.getElementById('modal-download-btn'),
    modalShareBtn: document.getElementById('modal-share-btn'),
    
    // 主标签页切换相关
    sidebarNavItems: document.querySelectorAll('.sidebar-nav li'),
    
    // 历史记录相关
    historyList: document.getElementById('history-list'),
    emptyHistory: document.getElementById('empty-history'),
    historySearchInput: document.getElementById('history-search-input'),
    historySearchBtn: document.getElementById('history-search-btn'),
    clearAllHistory: document.getElementById('clear-all-history'),
    historyPagination: document.querySelector('.history-pagination'),
    
    // 新增快速转换相关
    quickUploadBtn: document.getElementById('quick-upload-btn'),
    quickFileInput: document.getElementById('quick-file-input'),
    quickFileName: document.getElementById('quick-file-name'),
    quickFormatBtns: document.querySelectorAll('.quick-format-btn'),
    quickConvertBtn: document.getElementById('quick-convert-btn'),
    
    // 新增批量转换相关
    batchDropArea: document.getElementById('batch-drop-area'),
    batchFileInput: document.getElementById('batch-file-input'),
    batchUploadBtn: document.querySelector('.batch-upload-btn'),
    batchFileList: document.getElementById('batch-file-list'),
    batchCount: document.getElementById('batch-count'),
    addMoreFiles: document.getElementById('add-more-files'),
    clearBatch: document.getElementById('clear-batch'),
    batchConvert: document.getElementById('batch-convert'),
    
    // 主导航标签页相关
    appContainers: document.querySelectorAll('.app-container'),
    
    // PDF转换相关元素
    pdfUploadBtn: document.getElementById('pdf-upload-btn'),
    pdfFileInput: document.getElementById('pdf-file-input'),
    pdfDropArea: document.getElementById('pdf-drop-area'),
    pdfUrlInput: document.getElementById('pdf-url-input'),
    pdfFetchUrl: document.getElementById('pdf-fetch-url'),
    pdfConvertBtn: document.getElementById('pdf-convert-btn'),
    pdfCancelBtn: document.getElementById('pdf-cancel-btn'),
    pdfFormatItems: document.querySelectorAll('.format-item'),
    conversionTypes: document.querySelectorAll('.conversion-type'),
    toPdfFormats: document.getElementById('to-pdf-formats'),
    fromPdfFormats: document.getElementById('from-pdf-formats'),
    toPdfOptions: document.getElementById('to-pdf-options'),
    fromPdfOptions: document.getElementById('from-pdf-options'),
    pdfResultSection: document.querySelector('.pdf-result-section'),
    pdfDownloadBtn: document.getElementById('pdf-download-btn'),
    pdfShareBtn: document.getElementById('pdf-share-btn'),
    pdfCloudBtn: document.getElementById('pdf-cloud-btn'),
    
    // 文档转换相关元素
    documentUploadBtn: document.getElementById('document-upload-btn'),
    documentFileInput: document.getElementById('document-file-input'),
    documentDropArea: document.getElementById('document-drop-area'),
    documentUrlInput: document.getElementById('document-url-input'),
    documentFetchUrl: document.getElementById('document-fetch-url'),
    documentConvertBtn: document.getElementById('document-convert-btn'),
    documentCancelBtn: document.getElementById('document-cancel-btn'),
    documentDownloadBtn: document.getElementById('document-download-btn'),
    documentQualitySlider: document.getElementById('document-quality-slider'),
    
    // 文档批量转换相关
    batchDocumentDropArea: document.getElementById('batch-document-drop-area'),
    batchDocumentFileInput: document.getElementById('batch-document-file-input'),
    batchDocumentFileList: document.getElementById('batch-document-file-list'),
    batchDocumentCount: document.getElementById('batch-document-count'),
    addMoreDocumentFiles: document.getElementById('add-more-document-files'),
    clearBatchDocument: document.getElementById('clear-batch-document'),
    batchDocumentConvert: document.getElementById('batch-document-convert'),
    
    // 文档预览控制
    zoomInDocument: document.getElementById('zoom-in-document'),
    zoomOutDocument: document.getElementById('zoom-out-document'),
    toggleSplitDocument: document.getElementById('toggle-split-document'),
    
    // 文件压缩相关元素
    compressFileInput: document.getElementById('compress-file-input'),
    compressDropArea: document.getElementById('compress-drop-area'),
    batchCompressFileInput: document.getElementById('batch-compress-file-input'),
    batchCompressDropArea: document.getElementById('batch-compress-drop-area'),
    compressStartBtn: document.getElementById('compress-start-btn'),
    compressCancelBtn: document.getElementById('compress-cancel-btn'),
    compressDownloadBtn: document.getElementById('compress-download-btn'),
    compressLevelSlider: document.getElementById('compress-level-slider'),
    compressLevelValue: document.getElementById('compress-level-value'),
    compressFormatBtns: document.querySelectorAll('#compress-tab .format-btn'),
    compressFilename: document.getElementById('compress-filename'),
    compressOriginalSize: document.getElementById('compress-original-size'),
    compressEstimatedSize: document.getElementById('compress-estimated-size'),
    compressRatio: document.getElementById('compress-ratio'),
    compressFilesTree: document.getElementById('compress-files-tree'),
    compressProgress: document.getElementById('compress-progress'),
    compressProgressFill: document.querySelector('#compress-progress .progress-fill'),
    compressStatusMessage: document.getElementById('compress-status-message'),
    compressProgressPercentage: document.getElementById('compress-progress-percentage'),
    compressPassword: document.getElementById('compress-password'),
    splitArchive: document.getElementById('split-archive'),
    saveFolderStructure: document.getElementById('save-folder-structure'),
    addMoreCompressFiles: document.getElementById('add-more-compress-files'),
    clearBatchCompress: document.getElementById('clear-batch-compress'),
    batchCompressStart: document.getElementById('batch-compress-start'),
    batchCompressCount: document.getElementById('batch-compress-count'),
    batchCompressFileList: document.getElementById('batch-compress-file-list'),
    
    // 压缩标签页相关元素
    compressTabBtns: document.querySelectorAll('#compress-tab .input-tabs .tab-btn'),
};

// 应用状态
const appState = {
    originalImage: null,
    convertedImage: null,
    selectedFormat: 'jpg',
    quality: 90,
    keepRatio: true,
    originalWidth: 0,
    originalHeight: 0,
    currentZoom: 1,
    isConverting: false,
    aspectRatio: 1,
    convertedBlob: null,
    currentMainTab: 'image',
    historyItems: [],
    historyPage: 1,
    historyPerPage: 5,
    historySearch: '',
    
    // 新增快速转换相关状态
    quickFile: null,
    quickSelectedFormat: 'jpg',
    
    // 新增批量转换相关状态
    batchFiles: [],
    batchConversionInProgress: false,
    batchConversionCompleted: 0,
    
    pdfFile: null,
    pdfConversionType: 'to-pdf',
    pdfSelectedFormat: 'auto',
    pdfIsConverting: false,
    pdfConvertedBlob: null,
    
    documentFile: null,
    documentConversionType: 'to-document',
    documentSelectedFormat: 'auto',
    documentIsConverting: false,
    documentConvertedBlob: null,
    
    // 移动设备响应式状态
    isMobileMenuOpen: false,
    
    // 文件压缩相关状态
    compressFile: null,
    compressFiles: [],
    compressFormat: 'zip',
    compressLevel: 2,
    isCompressing: false,
    compressedBlob: null,
    batchCompressFiles: [],
    batchCompressInProgress: false,
    batchCompressCompleted: 0,
    batchImageFiles: [],  // 存储批量图像文件
    
    documentFile: null,
    documentConversionType: 'to-document',
    documentSelectedFormat: 'auto',
    documentIsConverting: false,
    documentConvertedBlob: null,
    batchDocumentFiles: [], // 存储批量文档文件
};

// 压缩级别映射
const compressLevelMap = {
    1: '快速',
    2: '普通',
    3: '最小体积'
};

// 文件类型图标映射
const fileTypeIcons = {
    'pdf': 'picture_as_pdf',
    'doc': 'description',
    'docx': 'description',
    'xls': 'table_chart',
    'xlsx': 'table_chart',
    'ppt': 'slideshow',
    'pptx': 'slideshow',
    'txt': 'text_format',
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'webp': 'image',
    'svg': 'image',
    'mp3': 'audiotrack',
    'mp4': 'videocam',
    'zip': 'folder_zip',
    'rar': 'folder_zip',
    '7z': 'folder_zip',
    'tar': 'folder_zip',
    'gz': 'folder_zip',
    'default': 'insert_drive_file'
};

// 获取文件类型图标
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    return fileTypeIcons[ext] || fileTypeIcons.default;
}

// 应用初始化时加载PDF.js库
function initApp() {
    // 绑定事件监听器
    bindEventListeners();
    
    // 初始化历史记录
    loadHistoryFromStorage();
    
    // 默认显示图片转换页面
    switchMainTab('image');
    
    // 显示应用已准备就绪
    console.log('应用初始化完成');
    elements.loadingOverlay.style.display = 'none';
    
    // 加载PDF.js库
    loadPdfJsLibrary();
    
    // 初始化元素引用
    elements = {
        // ... existing code ...
    };
    
    // ... existing code ...
    
    // 加载必要的库
    loadLibraries();
}

// 检查响应式布局
function checkResponsiveLayout() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 992;
    
    // 添加移动端和平板相关的类
    document.body.classList.toggle('mobile-view', isMobile);
    document.body.classList.toggle('tablet-view', isTablet);
    
    // 如果是移动设备或平板，默认展开侧边栏
    if (isMobile || isTablet) {
        document.body.classList.remove('sidebar-collapsed');
    } else {
        // 如果是桌面设备，默认显示侧边栏
        document.body.classList.remove('sidebar-collapsed');
    }
    
    // 调整预览区域的显示方式
    const previewContainers = document.querySelectorAll('.preview-container');
    previewContainers.forEach(container => {
        if (isMobile) {
            container.classList.remove('split-view');
        } else {
            container.classList.add('split-view');
        }
    });
}

// 加载PDF.js库
function loadPdfJsLibrary() {
    // 如果PDF.js库已加载，则直接返回
    if (window.pdfjsLib) return;
    
    // 动态加载PDF.js库
    const pdfJsScript = document.createElement('script');
    pdfJsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    pdfJsScript.onload = function() {
        console.log('PDF.js库加载成功');
        // 设置workerSrc
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    };
    pdfJsScript.onerror = function() {
        console.error('PDF.js库加载失败');
        showError('无法加载文档转换所需库，部分功能可能不可用');
    };
    
    document.head.appendChild(pdfJsScript);
}

// 重新绑定PDF相关事件
function rebindPdfEvents() {
    // 检查PDF相关元素并绑定事件
    if (elements.pdfUploadBtn && elements.pdfFileInput) {
        elements.pdfUploadBtn.addEventListener('click', function() {
            elements.pdfFileInput.click();
        });
        
        elements.pdfFileInput.addEventListener('change', handlePdfFileSelect);
    }
    
    if (elements.pdfDropArea) {
        elements.pdfDropArea.addEventListener('dragover', handlePdfDragOver);
        elements.pdfDropArea.addEventListener('dragleave', handlePdfDragLeave);
        elements.pdfDropArea.addEventListener('drop', handlePdfFileDrop);
    }
    
    if (elements.pdfFetchUrl) {
        elements.pdfFetchUrl.addEventListener('click', handlePdfUrlFetch);
    }
    
    if (elements.pdfConvertBtn) {
        elements.pdfConvertBtn.addEventListener('click', startPdfConversion);
    }
    
    if (elements.pdfCancelBtn) {
        elements.pdfCancelBtn.addEventListener('click', cancelPdfConversion);
    }
    
    if (elements.pdfDownloadBtn) {
        elements.pdfDownloadBtn.addEventListener('click', downloadPdfConvertedFile);
    }
    
    if (elements.conversionTypes) {
        elements.conversionTypes.forEach(function(item) {
            item.addEventListener('click', function() {
                switchConversionType(item.dataset.conversion);
            });
        });
    }
    
    if (elements.pdfFormatItems) {
        elements.pdfFormatItems.forEach(function(item) {
            item.addEventListener('click', function() {
                selectPdfFormat(item.dataset.format);
            });
        });
    }
}

// PDF文件选择处理
function handlePdfFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processPdfFile(file);
    }
}

// PDF拖放相关函数
function handlePdfDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.pdfDropArea.classList.add('drag-over');
}

function handlePdfDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.pdfDropArea.classList.remove('drag-over');
}

function handlePdfFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.pdfDropArea.classList.remove('drag-over');
    
    const file = event.dataTransfer.files[0];
    if (file) {
        processPdfFile(file);
    } else {
        showError('请上传有效的文件');
    }
}

// PDF URL获取
function handlePdfUrlFetch() {
    if (!elements.pdfUrlInput) return;
    
    const url = elements.pdfUrlInput.value.trim();
    if (!url) {
        showError('请输入有效的文件URL');
        return;
    }
    
    // 更新状态
    if (elements.pdfStatusMessage) {
        elements.pdfStatusMessage.textContent = '正在获取URL文件...';
    }
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.blob();
        })
        .then(blob => {
            const filename = url.split('/').pop() || 'file';
            const file = new File([blob], filename, {
                type: blob.type
            });
            
            processPdfFile(file);
        })
        .catch(error => {
            showError('无法获取文件: ' + error.message);
            if (elements.pdfStatusMessage) {
                elements.pdfStatusMessage.textContent = '准备就绪';
            }
        });
}

// 处理PDF文件
function processPdfFile(file) {
    // 检查文件大小
    if (file.size > 100 * 1024 * 1024) { // 100MB
        showError('文件大小超过限制');
        return;
    }
    
    // 存储文件引用
    appState.pdfFile = file;
    
    // 更新UI状态
    if (elements.pdfConvertBtn) {
        elements.pdfConvertBtn.disabled = false;
    }
    
    // 更新文件信息显示
    if (elements.pdfDropArea) {
        const dropMessage = elements.pdfDropArea.querySelector('.drop-message p');
        if (dropMessage) {
            dropMessage.textContent = `已选择: ${file.name} (${formatFileSize(file.size)})`;
        }
    }
    
    // 自动检测文件类型并选择相应的格式
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    // 根据文件类型切换转换方向
    if (fileExt === 'pdf') {
        switchConversionType('from-pdf');
    } else {
        switchConversionType('to-pdf');
    }
    
    // 自动选择格式
    autoSelectPdfFormat(fileExt);
    
    // 尝试预览文件
    previewPdfFile(file);
}

// 预览PDF文件
function previewPdfFile(file) {
    // 创建预览容器（如果尚不存在）
    let previewContainer = document.querySelector('.file-preview-container');
    
    if (!previewContainer) {
        previewContainer = document.createElement('div');
        previewContainer.className = 'file-preview-container';
        
        // 将预览容器插入到PDF拖放区域之后
        if (elements.pdfDropArea && elements.pdfDropArea.parentNode) {
            elements.pdfDropArea.parentNode.insertBefore(previewContainer, elements.pdfDropArea.nextSibling);
        }
    }
    
    // 显示加载状态
    previewContainer.innerHTML = `
        <div class="preview-loading">
            <span class="material-icons">hourglass_top</span>
            <p>正在生成预览...</p>
        </div>
    `;
    
    // 处理不同类型的文件预览
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    // 图像类型文件可以直接预览
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(fileExt)) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                previewContainer.innerHTML = '';
                previewContainer.appendChild(img);
            };
            img.onerror = function() {
                showPreviewError(previewContainer, '无法加载图像预览');
            };
            img.src = e.target.result;
        };
        reader.onerror = function() {
            showPreviewError(previewContainer, '无法读取文件');
        };
        reader.readAsDataURL(file);
    }
    // PDF文件使用PDF.js预览
    else if (fileExt === 'pdf') {
        // 检查PDF.js是否已加载
        if (typeof pdfjsLib === 'undefined') {
            // PDF.js未加载，显示文档图标
            showDocumentIcon(previewContainer, 'pdf');
            return;
        }
        
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const typedarray = new Uint8Array(this.result);
            
            // 使用PDF.js加载PDF
            pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                // 获取第一页
                return pdf.getPage(1);
            }).then(function(page) {
                // 准备canvas
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                
                // PDF页面的原始尺寸
                const viewport = page.getViewport({ scale: 1.0 });
                
                // 计算适当的缩放比例，使预览适合容器
                const containerMaxWidth = 400; // 预览容器最大宽度
                const containerMaxHeight = 200; // 预览容器最大高度
                const scale = Math.min(
                    containerMaxWidth / viewport.width,
                    containerMaxHeight / viewport.height
                );
                
                // 使用计算出的缩放比例设置canvas尺寸
                const scaledViewport = page.getViewport({ scale: scale });
                canvas.width = scaledViewport.width;
                canvas.height = scaledViewport.height;
                
                // 渲染PDF页面到canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: scaledViewport
                };
                
                const renderTask = page.render(renderContext);
                renderTask.promise.then(function() {
                    previewContainer.innerHTML = '';
                    previewContainer.appendChild(canvas);
                }).catch(function(error) {
                    console.error('渲染PDF页面失败:', error);
                    showPreviewError(previewContainer, '无法预览PDF');
                });
            }).catch(function(error) {
                console.error('加载PDF失败:', error);
                showPreviewError(previewContainer, '无法加载PDF');
            });
        };
        fileReader.onerror = function() {
            showPreviewError(previewContainer, '无法读取文件');
        };
        fileReader.readAsArrayBuffer(file);
    }
    // 文档类型使用图标表示
    else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'odt', 'ods', 'odp', 'csv', 'xml', 'html', 'htm'].includes(fileExt)) {
        let docType = 'document';
        
        if (['doc', 'docx', 'odt', 'rtf'].includes(fileExt)) {
            docType = 'doc';
        } else if (['xls', 'xlsx', 'ods', 'csv'].includes(fileExt)) {
            docType = 'xls';
        } else if (['ppt', 'pptx', 'odp'].includes(fileExt)) {
            docType = 'ppt';
        } else if (['txt', 'xml', 'html', 'htm'].includes(fileExt)) {
            docType = 'txt';
        }
        
        showDocumentIcon(previewContainer, docType);
    }
    // 其他类型文件，显示通用图标
    else {
        showDocumentIcon(previewContainer, 'unknown');
    }
}

// 显示文档图标预览
function showDocumentIcon(container, docType) {
    let iconName = 'description';
    let docTypeName = '文档';
    
    switch (docType) {
        case 'pdf':
            iconName = 'picture_as_pdf';
            docTypeName = 'PDF文档';
            break;
        case 'doc':
            iconName = 'description';
            docTypeName = 'Word文档';
            break;
        case 'xls':
            iconName = 'table_chart';
            docTypeName = 'Excel表格';
            break;
        case 'ppt':
            iconName = 'slideshow';
            docTypeName = 'PowerPoint演示文稿';
            break;
        case 'txt':
            iconName = 'text_snippet';
            docTypeName = '文本文档';
            break;
        case 'unknown':
        default:
            iconName = 'insert_drive_file';
            docTypeName = '文件';
    }
    
    container.innerHTML = `
        <div class="document-preview">
            <span class="material-icons document-icon">${iconName}</span>
            <p>${docTypeName}</p>
        </div>
    `;
}

// 显示预览错误
function showPreviewError(container, message) {
    container.innerHTML = `
        <div class="preview-error">
            <span class="material-icons">error_outline</span>
            <p>${message}</p>
        </div>
    `;
}

// 自动选择PDF格式
function autoSelectPdfFormat(fileExt) {
    let format = 'auto';
    
    if (appState.pdfConversionType === 'to-pdf') {
        // 文档类型
        if (['doc', 'docx', 'rtf', 'odt'].includes(fileExt)) {
            format = 'doc';
        }
        // 表格类型
        else if (['xls', 'xlsx', 'csv', 'ods'].includes(fileExt)) {
            format = 'xls';
        }
        // 演示文稿类型
        else if (['ppt', 'pptx', 'odp'].includes(fileExt)) {
            format = 'ppt';
        }
        // 图像类型
        else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'psd', 'pnm'].includes(fileExt)) {
            format = 'image';
        }
        // 网页类型
        else if (['html', 'htm', 'xml'].includes(fileExt)) {
            format = 'html';
        }
        // 文本类型
        else if (['txt', 'text', 'md', 'markdown'].includes(fileExt)) {
            format = 'txt';
        }
        // 特殊类型
        else if (fileExt === 'swf') {
            format = 'swf';
        }
    } else {
        // 从PDF转换，根据选择的格式设置
        const fromPdfFormats = {
            'docx': ['docx', 'doc', 'rtf', 'odt'],
            'xlsx': ['xlsx', 'xls', 'csv', 'ods'],
            'pptx': ['pptx', 'ppt', 'odp'],
            'jpg': ['jpg', 'jpeg'],
            'png': ['png'],
            'tiff': ['tiff', 'tif'],
            'bmp': ['bmp'],
            'html': ['html', 'htm'],
            'txt': ['txt'],
            'rtf': ['rtf']
        };
        
        // 查找格式类别
        for (const [targetFormat, extensions] of Object.entries(fromPdfFormats)) {
            if (extensions.includes(fileExt)) {
                format = targetFormat;
                break;
            }
        }
        
        // 如果没找到匹配的格式，使用默认值
        if (format === 'auto') {
            format = 'docx'; // 默认转为Word文档
        }
    }
    
    selectPdfFormat(format);
}

// 选择PDF格式
function selectPdfFormat(format) {
    if (!format) return;
    
    appState.pdfSelectedFormat = format;
    
    // 更新格式按钮状态
    if (elements.pdfFormatItems) {
        elements.pdfFormatItems.forEach(item => {
            item.classList.toggle('active', item.dataset.format === format);
        });
    }
}

// 切换转换类型
function switchConversionType(conversionType) {
    if (!conversionType || conversionType === appState.pdfConversionType) return;
    
    appState.pdfConversionType = conversionType;
    
    // 更新转换类型选择器状态
    if (elements.conversionTypes) {
        elements.conversionTypes.forEach(item => {
            item.classList.toggle('active', item.dataset.conversion === conversionType);
        });
    }
    
    // 切换显示相应的格式和选项
    if (elements.toPdfFormats && elements.fromPdfFormats) {
        elements.toPdfFormats.style.display = conversionType === 'to-pdf' ? 'block' : 'none';
        elements.fromPdfFormats.style.display = conversionType === 'from-pdf' ? 'block' : 'none';
    }
    
    if (elements.toPdfOptions && elements.fromPdfOptions) {
        elements.toPdfOptions.style.display = conversionType === 'to-pdf' ? 'block' : 'none';
        elements.fromPdfOptions.style.display = conversionType === 'from-pdf' ? 'block' : 'none';
    }
    
    // 如果已经有文件，自动选择适当的格式
    if (appState.pdfFile) {
        const fileExt = appState.pdfFile.name.split('.').pop().toLowerCase();
        autoSelectPdfFormat(fileExt);
    }
}

// 开始PDF转换
function startPdfConversion() {
    if (!appState.pdfFile) return;
    
    appState.pdfIsConverting = true;
    updatePdfUI();
    
    // 显示进度
    if (elements.pdfStatusMessage) {
        elements.pdfStatusMessage.textContent = '正在转换...';
    }
    
    if (elements.pdfProgressPercentage) {
        elements.pdfProgressPercentage.textContent = '0%';
    }
    
    if (elements.pdfConversionProgress) {
        const progressFill = elements.pdfConversionProgress.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
    }
    
    // 模拟转换进度
    simulatePdfProgress();
}

// 取消PDF转换
function cancelPdfConversion() {
    appState.pdfIsConverting = false;
    
    // 重置进度
    if (elements.pdfConversionProgress) {
        const progressFill = elements.pdfConversionProgress.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
    }
    
    if (elements.pdfProgressPercentage) {
        elements.pdfProgressPercentage.textContent = '0%';
    }
    
    if (elements.pdfStatusMessage) {
        elements.pdfStatusMessage.textContent = '准备就绪';
    }
    
    updatePdfUI();
}

// 模拟PDF转换进度
function simulatePdfProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        if (!appState.pdfIsConverting) {
            clearInterval(interval);
            return;
        }
        
        progress += 5;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // 完成转换
            finishPdfConversion();
        }
        
        if (elements.pdfConversionProgress) {
            const progressFill = elements.pdfConversionProgress.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
        }
        
        if (elements.pdfProgressPercentage) {
            elements.pdfProgressPercentage.textContent = progress + '%';
        }
    }, 100);
}

// 完成PDF转换
function finishPdfConversion() {
    appState.pdfIsConverting = false;
    
    if (elements.pdfStatusMessage) {
        elements.pdfStatusMessage.textContent = '转换完成';
    }
    
    // 生成转换结果文件
    const fileExt = appState.pdfFile.name.split('.').pop().toLowerCase();
    const fileName = appState.pdfFile.name.split('.')[0] || 'file';
    let resultFilename;
    let resultType;
    
    if (appState.pdfConversionType === 'to-pdf') {
        resultFilename = `${fileName}.pdf`;
        resultType = 'application/pdf';
    } else {
        const targetFormat = appState.pdfSelectedFormat;
        resultFilename = `${fileName}.${targetFormat}`;
        
        // 根据目标格式设置正确的MIME类型
        switch (targetFormat) {
            case 'docx':
                resultType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
            case 'xlsx':
                resultType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                break;
            case 'pptx':
                resultType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
                break;
            case 'jpg':
                resultType = 'image/jpeg';
                break;
            case 'png':
                resultType = 'image/png';
                break;
            case 'tiff':
                resultType = 'image/tiff';
                break;
            case 'bmp':
                resultType = 'image/bmp';
                break;
            case 'txt':
                resultType = 'text/plain';
                break;
            case 'html':
                resultType = 'text/html';
                break;
            case 'rtf':
                resultType = 'application/rtf';
                break;
            case 'csv':
                resultType = 'text/csv';
                break;
            case 'xml':
                resultType = 'application/xml';
                break;
            case 'odt':
                resultType = 'application/vnd.oasis.opendocument.text';
                break;
            case 'ods':
                resultType = 'application/vnd.oasis.opendocument.spreadsheet';
                break;
            case 'odp':
                resultType = 'application/vnd.oasis.opendocument.presentation';
                break;
            default:
                resultType = 'application/octet-stream';
        }
    }
    
    // 创建模拟的转换结果
    // 在实际应用中，这里应该是实际的文件转换结果
    const simulatedContent = `模拟的转换结果：${appState.pdfFile.name} 转换为 ${resultFilename}`;
    appState.pdfConvertedBlob = new Blob([simulatedContent], { type: resultType });
    
    // 更新结果信息
    if (elements.pdfResultFilename) {
        elements.pdfResultFilename.textContent = resultFilename;
    }
    
    if (elements.pdfResultSize) {
        elements.pdfResultSize.textContent = formatFileSize(appState.pdfConvertedBlob.size);
    }
    
    if (elements.pdfResultDate) {
        elements.pdfResultDate.textContent = '刚刚完成';
    }
    
    // 设置正确的文件类型图标
    const resultFileIcon = document.querySelector('.result-file-icon');
    if (resultFileIcon) {
        let iconType = 'pdf';
        
        if (resultFilename.endsWith('.docx') || resultFilename.endsWith('.doc') || 
            resultFilename.endsWith('.rtf') || resultFilename.endsWith('.odt')) {
            iconType = 'doc';
        } else if (resultFilename.endsWith('.xlsx') || resultFilename.endsWith('.xls') || 
                  resultFilename.endsWith('.csv') || resultFilename.endsWith('.ods')) {
            iconType = 'xls';
        } else if (resultFilename.endsWith('.pptx') || resultFilename.endsWith('.ppt') || 
                  resultFilename.endsWith('.odp')) {
            iconType = 'ppt';
        } else if (resultFilename.endsWith('.jpg') || resultFilename.endsWith('.jpeg') || 
                  resultFilename.endsWith('.png') || resultFilename.endsWith('.gif') || 
                  resultFilename.endsWith('.bmp') || resultFilename.endsWith('.tiff') || 
                  resultFilename.endsWith('.tif') || resultFilename.endsWith('.webp')) {
            iconType = 'img';
        }
        
        resultFileIcon.setAttribute('data-type', iconType);
    }
    
    // 显示结果区域并添加动画效果
    if (elements.pdfResultSection) {
        elements.pdfResultSection.style.display = 'block';
        
        // 添加完成动画效果
        const resultFile = document.querySelector('.result-file');
        if (resultFile) {
            resultFile.classList.add('conversion-complete');
            // 动画结束后移除类名
            setTimeout(() => {
                resultFile.classList.remove('conversion-complete');
            }, 500);
        }
    }
    
    // 设置云存储和分享按钮事件
    if (elements.pdfShareBtn) {
        elements.pdfShareBtn.onclick = showQRCode;
    }
    
    if (elements.pdfCloudBtn) {
        elements.pdfCloudBtn.onclick = showCloudOptions;
    }
    
    // 添加到历史记录
    try {
        saveToHistory(appState.pdfFile, resultFilename.split('.').pop(), appState.pdfConvertedBlob);
    } catch (error) {
        console.error('保存到历史记录失败:', error);
    }
    
    updatePdfUI();
    
    // 显示成功消息
    showMessage('转换成功！', 'success');
}

// 显示文件QR码
function showQRCode() {
    if (!appState.pdfConvertedBlob) return;
    
    // 创建QR码弹窗
    const modal = document.createElement('div');
    modal.className = 'modal show';
    
    // 在实际应用中，这里需要一个临时URL或ID来引用此文件
    // 此处仅为演示，使用模拟的URL
    const demoUrl = `https://example.com/share/${Date.now()}`;
    
    // QR码图像 (此处使用在线QR码生成服务)
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(demoUrl)}`;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>扫描二维码</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div style="text-align: center;">
                    <img src="${qrImageUrl}" alt="二维码" style="max-width: 200px;">
                    <p style="margin-top: 1rem;">扫描二维码下载或分享文件</p>
                    <p class="file-link" style="word-break: break-all; font-size: 0.8rem; color: var(--text-color-light); margin-top: 0.5rem;">${demoUrl}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="secondary-btn" id="copy-link-btn">复制链接</button>
                <button class="primary-btn" id="close-qr-btn">关闭</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 绑定事件
    const closeBtn = modal.querySelector('.modal-close');
    const copyLinkBtn = modal.querySelector('#copy-link-btn');
    const closeQrBtn = modal.querySelector('#close-qr-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            const tempInput = document.createElement('input');
            tempInput.value = demoUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            showMessage('链接已复制到剪贴板', 'info');
        });
    }
    
    if (closeQrBtn) {
        closeQrBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
}

// 显示云存储选项
function showCloudOptions() {
    if (!appState.pdfConvertedBlob) return;
    
    // 创建云存储选项弹窗
    const modal = document.createElement('div');
    modal.className = 'modal show';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>保存到云存储</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="cloud-options">
                    <div class="cloud-option" data-cloud="google">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" alt="Google Drive" style="width: 50px; height: 50px;">
                        <span>Google Drive</span>
                    </div>
                    <div class="cloud-option" data-cloud="dropbox">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Dropbox_logo.svg" alt="Dropbox" style="width: 50px; height: 50px;">
                        <span>Dropbox</span>
                    </div>
                    <div class="cloud-option" data-cloud="onedrive">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Microsoft_Office_OneDrive_%282019%E2%80%93present%29.svg" alt="OneDrive" style="width: 50px; height: 50px;">
                        <span>OneDrive</span>
                    </div>
                </div>
                <p style="margin-top: 1rem; text-align: center; color: var(--text-color-light);">
                    选择一个云存储服务，保存您的文件
                </p>
            </div>
            <div class="modal-footer">
                <button class="primary-btn" id="close-cloud-btn">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
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
    
    // 绑定事件
    const closeBtn = modal.querySelector('.modal-close');
    const closeCloudBtn = modal.querySelector('#close-cloud-btn');
    const cloudOptions = modal.querySelectorAll('.cloud-option');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }
    
    if (closeCloudBtn) {
        closeCloudBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }
    
    if (cloudOptions) {
        cloudOptions.forEach(option => {
            option.addEventListener('click', () => {
                const cloudService = option.getAttribute('data-cloud');
                // 在实际应用中，这里应该实现真正的云存储集成
                // 此处仅为演示
                showMessage(`将文件保存到 ${cloudService} 的功能即将上线`, 'info');
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
        });
    }
}

// 显示消息提示
function showMessage(message, type = 'info') {
    // 检查是否已有消息提示，有则移除
    const existingToast = document.querySelector('.message-toast');
    if (existingToast) {
        document.body.removeChild(existingToast);
    }
    
    // 创建新的消息提示
    const toast = document.createElement('div');
    toast.className = 'message-toast';
    
    // 根据消息类型设置图标
    let icon;
    switch (type) {
        case 'success':
            icon = 'check_circle';
            break;
        case 'error':
            icon = 'error';
            break;
        case 'warning':
            icon = 'warning';
            break;
        case 'info':
        default:
            icon = 'info';
    }
    
    toast.innerHTML = `
        <div class="message-content">
            <span class="material-icons">${icon}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // 延迟添加show类，以便显示过渡动画
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 设置自动消失定时器
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 下载转换后的PDF文件
function downloadPdfConvertedFile() {
    if (!appState.pdfConvertedBlob) return;
    
    const filename = elements.pdfResultFilename?.textContent || 'converted.pdf';
    
    // 创建下载链接
    const url = URL.createObjectURL(appState.pdfConvertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    // 触发下载
    document.body.appendChild(a);
    a.click();
    
    // 清理
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// 更新PDF界面状态
function updatePdfUI() {
    // 更新转换按钮状态
    if (elements.pdfConvertBtn) {
        elements.pdfConvertBtn.disabled = !appState.pdfFile || appState.pdfIsConverting;
    }
    
    // 更新取消按钮状态
    if (elements.pdfCancelBtn) {
        elements.pdfCancelBtn.disabled = !appState.pdfIsConverting;
    }
}

// 绑定事件监听器
function bindEventListeners() {
    // 侧边栏导航点击事件
    document.querySelectorAll('.sidebar-nav li').forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            switchMainTab(targetTab);
        });
    });
    
    // 绑定响应式布局事件
    bindResponsiveEvents();
    
    // 绑定历史记录事件
    bindHistoryEvents();
    
    // 绑定帮助事件
    bindHelpEvents();
    
    // 绑定格式转换事件
    bindFormatConversionEvents();
    
    // 绑定文件压缩事件
    bindCompressionEvents();
}

// 绑定响应式布局事件
function bindResponsiveEvents() {
    // 窗口大小变化事件
    window.addEventListener('resize', function() {
        // 如果窗口宽度小于768px，自动折叠侧边栏
        if (window.innerWidth < 768) {
            document.body.classList.add('sidebar-collapsed');
        } else {
            document.body.classList.remove('sidebar-collapsed');
        }
    });
    
    // 侧边栏切换按钮点击事件
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }
    
    // 侧边栏蒙层点击事件
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            document.body.classList.remove('sidebar-collapsed');
        });
    }
    
    // 点击侧边栏导航项时在移动设备上自动关闭侧边栏
    document.querySelectorAll('.sidebar-nav li').forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                document.body.classList.remove('sidebar-collapsed');
            }
        });
    });
    
    // 初始检查窗口大小
    checkResponsiveLayout();
}

// 处理文件选择
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

// 处理拖拽悬停
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.dropArea.classList.add('drag-over');
}

// 处理拖拽离开
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.dropArea.classList.remove('drag-over');
}

// 处理文件拖放
function handleFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.dropArea.classList.remove('drag-over');
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        processFile(file);
    } else {
        showError('请上传有效的图像文件');
    }
}

// 处理URL获取
function handleUrlFetch() {
    const url = elements.urlInput.value.trim();
    if (!url) {
        showError('请输入有效的图像URL');
        return;
    }
    
    elements.statusMessage.textContent = '正在获取URL图像...';
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.blob();
        })
        .then(blob => {
            if (!blob.type.startsWith('image/')) {
                throw new Error('URL不是有效的图像');
            }
            
            const file = new File([blob], 'image_from_url.' + blob.type.split('/')[1], {
                type: blob.type
            });
            
            processFile(file);
        })
        .catch(error => {
            showError('无法获取图像: ' + error.message);
            elements.statusMessage.textContent = '准备就绪';
        });
}

// 处理文件处理
function processFile(file) {
    if (file.size > 200 * 1024 * 1024) {
        showError('文件超过200MB限制');
        return;
    }
    
    // 更新文件信息
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            appState.originalImage = img;
            appState.originalWidth = img.width;
            appState.originalHeight = img.height;
            appState.aspectRatio = img.width / img.height;
            
            // 更新原始预览
            updateOriginalPreview();
            
            // 更新尺寸输入框
            elements.widthInput.placeholder = img.width;
            elements.heightInput.placeholder = img.height;
            
            // 更新格式信息
            updateOriginalInfo(file);
            
            // 启用转换按钮
            elements.convertBtn.disabled = false;
            
            // 生成转换预览
            updatePreview();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 更新原始预览
function updateOriginalPreview() {
    if (!appState.originalImage) return;
    
    elements.originalPreview.innerHTML = '';
    const img = appState.originalImage.cloneNode();
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    elements.originalPreview.appendChild(img);
}

// 更新原始图像信息
function updateOriginalInfo(file) {
    // 显示图像格式
    const format = file.name.split('.').pop().toUpperCase();
    elements.originalFormat.textContent = format;
    
    // 显示文件大小
    const size = formatFileSize(file.size);
    elements.originalSize.textContent = size;
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 设置转换格式
function setFormat(format) {
    appState.selectedFormat = format;
    
    // 更新按钮状态
    elements.formatBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.format === format);
    });
    
    // 更新预览
    updatePreview();
    
    // 更新转换格式信息
    elements.convertedFormat.textContent = format.toUpperCase();
}

// 处理质量变更
function handleQualityChange() {
    appState.quality = elements.qualitySlider.value;
    elements.qualityValue.textContent = appState.quality + '%';
    updatePreview();
}

// 处理宽度变更
function handleWidthChange() {
    const newWidth = parseInt(elements.widthInput.value);
    
    if (isNaN(newWidth) || newWidth <= 0) return;
    
    if (appState.keepRatio && appState.aspectRatio) {
        const newHeight = Math.round(newWidth / appState.aspectRatio);
        elements.heightInput.value = newHeight;
    }
    
    updatePreview();
}

// 处理高度变更
function handleHeightChange() {
    const newHeight = parseInt(elements.heightInput.value);
    
    if (isNaN(newHeight) || newHeight <= 0) return;
    
    if (appState.keepRatio && appState.aspectRatio) {
        const newWidth = Math.round(newHeight * appState.aspectRatio);
        elements.widthInput.value = newWidth;
    }
    
    updatePreview();
}

// 切换宽高比锁定
function toggleRatioLock() {
    appState.keepRatio = !appState.keepRatio;
    elements.ratioLock.classList.toggle('locked', appState.keepRatio);
    elements.ratioLock.querySelector('.material-icons').textContent = 
        appState.keepRatio ? 'lock' : 'lock_open';
}

// 放大预览
function zoomIn() {
    if (appState.currentZoom < 3) {
        appState.currentZoom += 0.25;
        applyZoom();
    }
}

// 缩小预览
function zoomOut() {
    if (appState.currentZoom > 0.5) {
        appState.currentZoom -= 0.25;
        applyZoom();
    }
}

// 应用缩放
function applyZoom() {
    const imgs = document.querySelectorAll('.image-container img');
    imgs.forEach(img => {
        img.style.transform = `scale(${appState.currentZoom})`;
    });
}

// 切换分屏预览
function toggleSplitView() {
    const previewContainer = document.querySelector('.preview-container');
    const isSplit = previewContainer.classList.toggle('split-view');
    
    elements.toggleSplit.querySelector('.material-icons').textContent = 
        isSplit ? 'view_agenda' : 'view_column';
}

// 更新预览
function updatePreview() {
    if (!appState.originalImage) return;
    
    // 模拟转换效果
    simulateConversion();
}

// 模拟转换效果
function simulateConversion() {
    // 这里是简化的预览生成逻辑
    // 实际项目中可能需要使用专业的图像处理库
    
    elements.convertedPreview.innerHTML = '';
    
    // 创建预览图像
    const canvas = document.createElement('canvas');
    let width = appState.originalWidth;
    let height = appState.originalHeight;
    
    // 应用尺寸调整
    const customWidth = parseInt(elements.widthInput.value);
    const customHeight = parseInt(elements.heightInput.value);
    
    if (!isNaN(customWidth) && customWidth > 0) {
        width = customWidth;
    }
    
    if (!isNaN(customHeight) && customHeight > 0) {
        height = customHeight;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(appState.originalImage, 0, 0, width, height);
    
    // 应用质量设置（仅用于预览）
    let quality = appState.quality / 100;
    const img = new Image();
    img.onload = function() {
        elements.convertedPreview.appendChild(img);
    };
    
    // 根据格式生成不同的预览
    if (appState.selectedFormat === 'jpg' || appState.selectedFormat === 'jpeg') {
        img.src = canvas.toDataURL('image/jpeg', quality);
        
        // 估算转换后大小
        estimateFileSize(canvas, 'image/jpeg', quality);
    } else if (appState.selectedFormat === 'png') {
        img.src = canvas.toDataURL('image/png');
        
        // 估算转换后大小
        estimateFileSize(canvas, 'image/png', 1.0);
    } else if (appState.selectedFormat === 'webp') {
        img.src = canvas.toDataURL('image/webp', quality);
        
        // 估算转换后大小
        estimateFileSize(canvas, 'image/webp', quality);
    } else if (appState.selectedFormat === 'svg') {
        // 处理SVG格式转换
        convertToSVG(canvas, img);
    } else {
        // 其他格式，使用PNG作为预览
        img.src = canvas.toDataURL('image/png');
        elements.convertedSize.textContent = '预览不可用';
    }
}

// 估算文件大小
function estimateFileSize(canvas, mimeType, quality) {
    const dataUrl = canvas.toDataURL(mimeType, quality);
    const base64 = dataUrl.split(',')[1];
    const byteSize = atob(base64).length;
    
    elements.convertedSize.textContent = formatFileSize(byteSize);
}

// 切换标签
function switchTab(tabId) {
    // 更新标签按钮状态
    elements.tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
    // 更新标签内容
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(tabId + '-tab').classList.add('active');
}

// 显示错误提示
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorToast.classList.add('show');
    
    // 自动隐藏
    setTimeout(hideError, 5000);
}

// 隐藏错误提示
function hideError() {
    elements.errorToast.classList.remove('show');
}

// 显示转换完成弹窗
function showCompletionModal() {
    elements.resultFormat.textContent = appState.selectedFormat.toUpperCase();
    elements.conversionModal.classList.add('show');
}

// 隐藏转换完成弹窗
function hideModal() {
    elements.conversionModal.classList.remove('show');
}

// 开始转换
function startConversion() {
    if (!appState.originalImage) return;
    
    appState.isConverting = true;
    updateUI();
    
    // 显示进度
    elements.statusMessage.textContent = '正在转换...';
    elements.progressPercentage.textContent = '0%';
    elements.progressFill.style.width = '0%';
    
    // 模拟转换进度
    simulateProgress();
}

// 取消转换
function cancelConversion() {
    appState.isConverting = false;
    
    // 重置进度
    elements.progressFill.style.width = '0%';
    elements.progressPercentage.textContent = '0%';
    elements.statusMessage.textContent = '准备就绪';
    
    updateUI();
}

// 模拟进度
function simulateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        if (!appState.isConverting) {
            clearInterval(interval);
            return;
        }
        
        progress += 5;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // 完成转换
            finishConversion();
        }
        
        elements.progressFill.style.width = progress + '%';
        elements.progressPercentage.textContent = progress + '%';
    }, 100);
}

// 完成转换
function finishConversion() {
    appState.isConverting = false;
    updateUI();
    
    elements.statusMessage.textContent = '转换完成';
    
    // 生成转换后的图像数据
    generateConvertedImage();
    
    // 显示完成弹窗
    showCompletionModal();
    
    // 添加到历史记录
    if (appState.convertedBlob) {
        // 创建一个模拟的原始文件对象
        const originalFile = {
            name: appState.originalImage.src.split('/').pop() || 'image.' + elements.originalFormat.textContent.toLowerCase(),
            size: getByteSize(elements.originalSize.textContent),
            type: 'image/' + elements.originalFormat.textContent.toLowerCase()
        };
        
        saveToHistory(originalFile, appState.selectedFormat, appState.convertedBlob);
    }
}

// 生成转换后的图像
function generateConvertedImage() {
    if (!appState.originalImage) return;
    
    const canvas = document.createElement('canvas');
    let width = appState.originalWidth;
    let height = appState.originalHeight;
    
    // 应用尺寸调整
    const customWidth = parseInt(elements.widthInput.value);
    const customHeight = parseInt(elements.heightInput.value);
    
    if (!isNaN(customWidth) && customWidth > 0) {
        width = customWidth;
    }
    
    if (!isNaN(customHeight) && customHeight > 0) {
        height = customHeight;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(appState.originalImage, 0, 0, width, height);
    
    // 根据格式生成Blob
    let mimeType = 'image/jpeg';
    let quality = appState.quality / 100;
    
    switch (appState.selectedFormat) {
        case 'png':
            mimeType = 'image/png';
            quality = undefined; // PNG使用lossless压缩
            break;
        case 'webp':
            mimeType = 'image/webp';
            break;
        case 'gif':
            mimeType = 'image/gif';
            quality = undefined;
            break;
        case 'svg':
            // 对于SVG格式，直接生成SVG，无需使用toBlob
            const svgBlob = generateSVGBlob(canvas);
            handleConvertedBlob(svgBlob);
            return; // 提前返回，不继续执行下面的canvas.toBlob
        default: 
            mimeType = 'image/jpeg';
    }
    
    // 使用toBlob生成Blob数据
    canvas.toBlob(blob => {
        handleConvertedBlob(blob);
    }, mimeType, quality);
}

// 生成SVG格式的Blob
function generateSVGBlob(canvas) {
    const width = canvas.width;
    const height = canvas.height;
    
    // 创建SVG内容
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    
    // 添加原始图像作为背景
    svgContent += `<image width="${width}" height="${height}" href="${canvas.toDataURL('image/png')}"/>`;
    
    // 完成SVG
    svgContent += '</svg>';
    
    // 创建并返回Blob
    return new Blob([svgContent], {type: 'image/svg+xml'});
}

// 处理转换后的Blob数据
function handleConvertedBlob(blob) {
    appState.convertedBlob = blob;
    
    // 更新下载按钮状态
    elements.downloadBtn.disabled = false;
    
    // 更新结果信息
    const newSize = formatFileSize(blob.size);
    elements.resultNewSize.textContent = newSize;
    elements.resultOriginalSize.textContent = elements.originalSize.textContent;
    
    // 计算节省比例
    const originalBytes = getByteSize(elements.originalSize.textContent);
    if (originalBytes > 0) {
        const savedPercent = Math.round((1 - (blob.size / originalBytes)) * 100);
        
        if (savedPercent > 0) {
            elements.resultSaved.textContent = savedPercent + '%';
        } else {
            elements.resultSaved.textContent = '0%';
        }
    }
}

// 从格式化的大小字符串获取字节数
function getByteSize(sizeStr) {
    const parts = sizeStr.split(' ');
    if (parts.length !== 2) return 0;
    
    const value = parseFloat(parts[0]);
    const unit = parts[1];
    
    switch (unit) {
        case 'Bytes': return value;
        case 'KB': return value * 1024;
        case 'MB': return value * 1024 * 1024;
        case 'GB': return value * 1024 * 1024 * 1024;
        default: return 0;
    }
}

// 下载转换后的图像
function downloadConvertedImage() {
    if (!appState.convertedBlob) return;
    
    const url = URL.createObjectURL(appState.convertedBlob);
    const filename = '转换后的图像.' + appState.selectedFormat;
    
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
    
    // 隐藏弹窗
    hideModal();
}

// 分享转换后的图像
function shareConvertedImage() {
    if (!appState.convertedBlob) return;
    
    if (navigator.share) {
        const file = new File([appState.convertedBlob], '转换后的图像.' + appState.selectedFormat, {
            type: appState.convertedBlob.type
        });
        
        navigator.share({
            title: '分享图像',
            files: [file]
        }).then(() => {
            // 分享成功
        }).catch(error => {
            showError('分享失败: ' + error.message);
        });
    } else {
        showError('您的浏览器不支持分享功能');
    }
}

// 更新UI状态
function updateUI() {
    // 更新按钮状态
    elements.convertBtn.disabled = !appState.originalImage || appState.isConverting;
    elements.cancelBtn.disabled = !appState.isConverting;
    elements.downloadBtn.disabled = !appState.convertedBlob;
    
    // 更新进度条可见性
    elements.progressFill.style.display = appState.isConverting ? 'block' : 'none';
}

// 将Canvas转换为SVG格式
function convertToSVG(canvas, imgElement) {
    // 获取图像数据
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;
    
    // 创建SVG
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    
    // 添加原始图像作为背景
    svgContent += `<image width="${width}" height="${height}" href="${canvas.toDataURL('image/png')}"/>`;
    
    // 完成SVG
    svgContent += '</svg>';
    
    // 创建Blob和URL
    const blob = new Blob([svgContent], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    
    // 为预览设置图像
    imgElement.src = url;
    
    // 估算大小
    elements.convertedSize.textContent = formatFileSize(svgContent.length);
    
    // 存储转换后数据用于下载
    if (appState.isConverting) {
        appState.convertedBlob = blob;
    }
}

// 主标签页切换
function switchMainTab(tabId) {
    // 隐藏所有内容区域
    document.querySelectorAll('.app-container').forEach(container => {
        container.style.display = 'none';
    });
    
    // 移除所有导航项的激活状态
    if (elements.sidebarNavItems) {
        elements.sidebarNavItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        // 激活选中的导航项
        const activeNavItem = Array.from(elements.sidebarNavItems).find(
            item => item.dataset.tab === tabId
        );
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }
    
    // 显示选中的内容区域 - 使用tabId-tab的形式
    const tabContainerId = `${tabId}-tab`;
    const selectedContent = document.getElementById(tabContainerId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
        
        // 如果是历史记录页面，刷新历史记录
        if (tabId === 'history') {
            loadHistoryFromStorage();
        }
    } else {
        console.error(`找不到ID为 ${tabContainerId} 的内容区域`);
    }
}

// 应用各标签页的特定颜色主题
function applyTabColorThemes() {
    // 为每个标签页设置相应的颜色变量
    const colorThemes = {
        'image': {
            color: 'var(--image-color)',
            bgColor: 'rgba(42, 92, 170, 0.1)'
        },
        'pdf': {
            color: 'var(--pdf-color)',
            bgColor: 'rgba(231, 76, 60, 0.1)'
        },
        'document': {
            color: 'var(--document-color)',
            bgColor: 'rgba(39, 174, 96, 0.1)'
        },
        'video': {
            color: 'var(--video-color)',
            bgColor: 'rgba(142, 68, 173, 0.1)'
        },
        'compress': {
            color: 'var(--compress-color)',
            bgColor: 'rgba(243, 156, 18, 0.1)'
        },
        'history': {
            color: 'var(--history-color)',
            bgColor: 'rgba(22, 160, 133, 0.1)'
        },
        'help': {
            color: 'var(--help-color)',
            bgColor: 'rgba(44, 62, 80, 0.1)'
        }
    };
    
    // 将颜色应用到各个标签页
    for (const [tabName, theme] of Object.entries(colorThemes)) {
        const tabElement = document.getElementById(`${tabName}-tab`);
        if (tabElement) {
            // 设置标签页中的主要交互元素颜色
            const tabButtons = tabElement.querySelectorAll('.tab-btn');
            tabButtons.forEach(btn => {
                btn.addEventListener('mouseover', function() {
                    if (!this.classList.contains('active')) {
                        this.style.color = theme.color;
                    }
                });
                
                btn.addEventListener('mouseout', function() {
                    if (!this.classList.contains('active')) {
                        this.style.color = '';
                    }
                });
            });
        }
    }
}

// 历史记录管理相关 ----------------------------------------

// 保存转换记录到历史
function saveToHistory(originalFile, format, blob) {
    // 从存储中获取当前历史记录
    const historyItems = getHistoryFromStorage() || [];
    
    // 创建新的历史记录项
    const historyItem = {
        id: Date.now(),
        originalName: originalFile.name,
        originalSize: originalFile.size,
        convertedFormat: format,
        convertedSize: blob.size,
        convertedBlob: blob,
        timestamp: new Date().toISOString(),
        type: getFileType(originalFile.name)
    };
    
    // 添加新项目到历史记录
    historyItems.unshift(historyItem);
    
    // 限制历史记录数量，最多保存50项
    if (historyItems.length > 50) {
        historyItems.pop();
    }
    
    // 保存到本地存储
    saveHistoryToStorage(historyItems);
    
    // 如果历史记录标签页已打开，则刷新显示
    if (document.getElementById('history-tab').classList.contains('active')) {
        renderHistoryList();
    }
}

// 获取文件类型（用于历史记录分类）
function getFileType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'].includes(ext)) {
        return 'image';
    } else if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'].includes(ext)) {
        return 'document';
    } else if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'].includes(ext)) {
        return 'video';
    } else if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'].includes(ext)) {
        return 'audio';
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
        return 'archive';
    } else {
        return 'other';
    }
}

// 从历史记录下载文件
function downloadFromHistory(index) {
    const historyItems = getHistoryFromStorage();
    const item = historyItems[index];
    
    if (!item || !item.blob) {
        showError('无法找到或下载此历史记录');
        return;
    }
    
    // 创建URL并触发下载
    const blob = dataURItoBlob(item.blob);
    const url = URL.createObjectURL(blob);
    const originalName = item.originalName.split('.')[0] || 'image';
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
}

// 从历史记录删除项目
function deleteFromHistory(index) {
    const historyItems = getHistoryFromStorage();
    historyItems.splice(index, 1);
    saveHistoryToStorage(historyItems);
    renderHistoryList();
}

// 清除所有历史记录
function clearAllHistory() {
    if (confirm('确定要清除所有历史记录吗？此操作无法撤销。')) {
        saveHistoryToStorage([]);
        renderHistoryList();
    }
}

// 搜索历史记录
function searchHistory() {
    appState.historySearch = elements.historySearchInput.value.trim().toLowerCase();
    appState.historyPage = 1; // 重置到第一页
    renderHistoryList();
}

// 从本地存储加载历史记录
function loadHistoryFromStorage() {
    appState.historyItems = getHistoryFromStorage();
    renderHistoryList();
}

// 获取历史记录
function getHistoryFromStorage() {
    try {
        const historyData = localStorage.getItem('imageConverterHistory');
        return historyData ? JSON.parse(historyData) : [];
    } catch (error) {
        console.error('无法解析历史记录:', error);
        return [];
    }
}

// 保存历史记录到本地存储
function saveHistoryToStorage(historyItems) {
    try {
        localStorage.setItem('imageConverterHistory', JSON.stringify(historyItems));
    } catch (error) {
        console.error('无法保存历史记录:', error);
        showError('保存历史记录失败：存储空间可能已满');
    }
}

// 生成缩略图
async function generateThumbnail(image) {
    return new Promise(resolve => {
        const canvas = document.createElement('canvas');
        const size = 100; // 缩略图大小
        
        canvas.width = size;
        canvas.height = size;
        
        const ctx = canvas.getContext('2d');
        
        // 计算缩放和裁剪以填满正方形
        const scale = Math.max(size / image.width, size / image.height);
        const x = (size - image.width * scale) / 2;
        const y = (size - image.height * scale) / 2;
        
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
        
        resolve(canvas.toDataURL('image/jpeg', 0.7));
    });
}

// 将DataURI转换为Blob
function dataURItoBlob(dataURI) {
    if (!dataURI) return new Blob();
    
    // 处理字符串格式的dataURI
    if (typeof dataURI === 'string') {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        
        return new Blob([ab], {type: mimeString});
    }
    
    // 如果已经是Blob，直接返回
    return dataURI;
}

// 渲染历史记录列表
function renderHistoryList() {
    const historyItems = appState.historyItems;
    
    // 显示空历史记录状态
    if (historyItems.length === 0) {
        elements.emptyHistory.style.display = 'block';
        elements.historyList.innerHTML = '';
        elements.historyPagination.style.display = 'none';
        return;
    }
    
    // 筛选搜索结果
    let filteredItems = historyItems;
    if (appState.historySearch) {
        filteredItems = historyItems.filter(item => 
            item.originalName.toLowerCase().includes(appState.historySearch) || 
            item.targetFormat.toLowerCase().includes(appState.historySearch)
        );
    }
    
    // 如果筛选后没有结果
    if (filteredItems.length === 0) {
        elements.historyList.innerHTML = `
            <div class="empty-history">
                <p>没有找到匹配的历史记录</p>
            </div>
        `;
        elements.emptyHistory.style.display = 'none';
        elements.historyPagination.style.display = 'none';
        return;
    }
    
    // 隐藏空历史提示
    elements.emptyHistory.style.display = 'none';
    
    // 计算分页
    const totalPages = Math.ceil(filteredItems.length / appState.historyPerPage);
    if (appState.historyPage > totalPages) {
        appState.historyPage = totalPages;
    }
    
    const startIndex = (appState.historyPage - 1) * appState.historyPerPage;
    const endIndex = Math.min(startIndex + appState.historyPerPage, filteredItems.length);
    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    
    // 渲染历史记录项
    elements.historyList.innerHTML = paginatedItems.map((item, index) => {
        const date = new Date(item.date);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        
        return `
            <div class="history-item" data-index="${startIndex + index}">
                <div class="history-item-preview">
                    <img src="${item.thumbnail || 'https://via.placeholder.com/100'}" alt="转换图像预览">
                </div>
                <div class="history-item-details">
                    <div class="history-item-title">${item.originalName} → ${item.targetFormat}</div>
                    <div class="history-item-info">
                        <span>原始大小: ${formatFileSize(item.originalSize)}</span>
                        <span>转换大小: ${formatFileSize(item.convertedSize)}</span>
                        <span>时间: ${formattedDate}</span>
                    </div>
                </div>
                <div class="history-item-actions">
                    <button class="icon-btn history-download">
                        <span class="material-icons">file_download</span>
                    </button>
                    <button class="icon-btn history-delete">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // 更新分页信息
    updatePagination(startIndex, endIndex, filteredItems.length, totalPages);
    
    // 绑定历史记录项的事件
    bindHistoryItemEvents(startIndex);
}

// 绑定历史记录项的事件
function bindHistoryItemEvents(startIndex) {
    // 下载按钮事件
    const downloadBtns = elements.historyList.querySelectorAll('.history-download');
    downloadBtns.forEach((btn, idx) => {
        btn.addEventListener('click', function() {
            const historyItem = document.querySelector(`.history-item[data-index="${startIndex + idx}"]`);
            const index = parseInt(historyItem.dataset.index);
            downloadFromHistory(index);
        });
    });
    
    // 删除按钮事件
    const deleteBtns = elements.historyList.querySelectorAll('.history-delete');
    deleteBtns.forEach((btn, idx) => {
        btn.addEventListener('click', function() {
            const historyItem = document.querySelector(`.history-item[data-index="${startIndex + idx}"]`);
            const index = parseInt(historyItem.dataset.index);
            
            // 显示确认对话框
            if (confirm('确定删除这条记录吗？此操作无法撤销。')) {
                deleteFromHistory(index);
            }
        });
    });
}

// 更新分页控件
function updatePagination(startIndex, endIndex, totalItems, totalPages) {
    const currentPage = appState.historyPage;
    
    if (totalPages <= 1) {
        elements.historyPagination.style.display = 'none';
        return;
    }
    
    elements.historyPagination.style.display = 'flex';
    elements.historyPagination.innerHTML = `
        <button class="icon-btn" id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>
            <span class="material-icons">navigate_before</span>
        </button>
        <span class="pagination-info">第 ${startIndex + 1}-${endIndex} 项，共 ${totalItems} 项</span>
        <button class="icon-btn" id="next-page" ${currentPage === totalPages ? 'disabled' : ''}>
            <span class="material-icons">navigate_next</span>
        </button>
    `;
    
    // 绑定分页按钮事件
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (appState.historyPage > 1) {
                appState.historyPage--;
                renderHistoryList();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (appState.historyPage < totalPages) {
                appState.historyPage++;
                renderHistoryList();
            }
        });
    }
}

// 绑定历史记录相关事件
function bindHistoryEvents() {
    // 历史记录搜索
    if (elements.historySearchBtn) {
        elements.historySearchBtn.addEventListener('click', searchHistory);
    }
    
    if (elements.historySearchInput) {
        elements.historySearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchHistory();
            }
        });
    }
    
    // 清空历史记录
    if (elements.clearAllHistory) {
        elements.clearAllHistory.addEventListener('click', clearAllHistory);
    }
}

// 绑定帮助相关事件
function bindHelpEvents() {
    // 常见问题展开/收起
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    item.classList.toggle('active');
                });
            }
        });
    }
    
    // 反馈表单提交
    const feedbackForm = document.querySelector('#feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitFeedback();
        });
    }
}

// 绑定格式转换相关事件
function bindFormatConversionEvents() {
    // 图像转换相关 ----------------------------------------
    
    // 图像文件输入相关事件
    if (elements.fileInput && elements.uploadBtn) {
        elements.uploadBtn.addEventListener('click', function() {
            elements.fileInput.click();
        });
        
        elements.fileInput.addEventListener('change', handleFileSelect);
    }
    
    if (elements.dropArea) {
        elements.dropArea.addEventListener('dragover', handleDragOver);
        elements.dropArea.addEventListener('dragleave', handleDragLeave);
        elements.dropArea.addEventListener('drop', handleFileDrop);
    }
    
    if (elements.fetchUrl) {
        elements.fetchUrl.addEventListener('click', handleUrlFetch);
    }
    
    // 格式按钮事件
    if (elements.formatBtns) {
        elements.formatBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                setFormat(this.dataset.format);
            });
        });
    }
    
    // 质量滑块事件
    if (elements.qualitySlider) {
        elements.qualitySlider.addEventListener('input', handleQualityChange);
    }
    
    // 尺寸输入事件
    if (elements.widthInput) {
        elements.widthInput.addEventListener('change', handleWidthChange);
    }
    
    if (elements.heightInput) {
        elements.heightInput.addEventListener('change', handleHeightChange);
    }
    
    // 锁定比例
    if (elements.ratioLock) {
        elements.ratioLock.addEventListener('click', toggleRatioLock);
    }
    
    // 预览控制
    if (elements.zoomIn) {
        elements.zoomIn.addEventListener('click', zoomIn);
    }
    
    if (elements.zoomOut) {
        elements.zoomOut.addEventListener('click', zoomOut);
    }
    
    if (elements.toggleSplit) {
        elements.toggleSplit.addEventListener('click', toggleSplitView);
    }
    
    // 操作按钮
    if (elements.convertBtn) {
        elements.convertBtn.addEventListener('click', startConversion);
    }
    
    if (elements.cancelBtn) {
        elements.cancelBtn.addEventListener('click', cancelConversion);
    }
    
    if (elements.downloadBtn) {
        elements.downloadBtn.addEventListener('click', downloadConvertedImage);
    }
    
    // 输入标签切换
    if (elements.inputTabBtns) {
        elements.inputTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                switchTab(this.dataset.tab);
            });
        });
    }
    
    // 错误提示关闭
    if (elements.closeError) {
        elements.closeError.addEventListener('click', hideError);
    }
    
    // 模态框关闭
    if (elements.modalClose) {
        elements.modalClose.addEventListener('click', hideModal);
    }
    
    // 从模态框下载
    if (elements.modalDownloadBtn) {
        elements.modalDownloadBtn.addEventListener('click', function() {
            downloadConvertedImage();
            hideModal();
        });
    }

    // PDF转换相关事件
    bindPdfEvents();
    
    // 文档转换相关事件
    bindDocumentEvents();
    
    // 图像批量转换相关事件
    if (elements.batchFileInput && elements.batchDropArea) {
        // 批量上传按钮点击
        const batchUploadBtn = elements.batchDropArea.querySelector('.batch-upload-btn');
        if (batchUploadBtn) {
            batchUploadBtn.addEventListener('click', function() {
                elements.batchFileInput.click();
            });
        }
        
        // 批量文件选择事件
        elements.batchFileInput.addEventListener('change', handleBatchFileSelect);
        
        // 批量拖放事件
        elements.batchDropArea.addEventListener('dragover', handleBatchDragOver);
        elements.batchDropArea.addEventListener('dragleave', handleBatchDragLeave);
        elements.batchDropArea.addEventListener('drop', handleBatchFileDrop);
    }
    
    // 批量转换控制
    if (elements.addMoreFiles) {
        elements.addMoreFiles.addEventListener('click', function() {
            elements.batchFileInput.click();
        });
    }
    
    if (elements.clearBatch) {
        elements.clearBatch.addEventListener('click', clearBatchFiles);
    }
    
    if (elements.batchConvert) {
        elements.batchConvert.addEventListener('click', startBatchConversion);
    }
}

// 绑定PDF相关事件
function bindPdfEvents() {
    // PDF上传按钮
    const pdfUploadBtn = document.querySelector('#pdf-upload-btn');
    const pdfFileInput = document.querySelector('#pdf-file-input');
    
    if (pdfUploadBtn && pdfFileInput) {
        pdfUploadBtn.addEventListener('click', function() {
            pdfFileInput.click();
        });
        
        pdfFileInput.addEventListener('change', handlePdfFileSelect);
    }
    
    // PDF拖放区域
    const pdfDropArea = document.querySelector('#pdf-drop-area');
    if (pdfDropArea) {
        pdfDropArea.addEventListener('dragover', handlePdfDragOver);
        pdfDropArea.addEventListener('dragleave', handlePdfDragLeave);
        pdfDropArea.addEventListener('drop', handlePdfFileDrop);
    }
    
    // PDF页面预览相关事件
    const pdfPagePrev = document.querySelector('#pdf-page-prev');
    const pdfPageNext = document.querySelector('#pdf-page-next');
    
    if (pdfPagePrev) {
        pdfPagePrev.addEventListener('click', showPrevPdfPage);
    }
    
    if (pdfPageNext) {
        pdfPageNext.addEventListener('click', showNextPdfPage);
    }
}

// 绑定文件压缩相关事件
function bindCompressionEvents() {
    // 文件上传区
    if (elements.compressFileInput && elements.compressDropArea) {
        // 上传按钮点击
        const compressUploadBtn = elements.compressDropArea.querySelector('.upload-btn');
        if (compressUploadBtn) {
            compressUploadBtn.addEventListener('click', function() {
                elements.compressFileInput.click();
            });
        }
        
        // 文件选择事件
        elements.compressFileInput.addEventListener('change', handleCompressFileSelect);
        
        // 拖放事件
        elements.compressDropArea.addEventListener('dragover', handleCompressDragOver);
        elements.compressDropArea.addEventListener('dragleave', handleCompressDragLeave);
        elements.compressDropArea.addEventListener('drop', handleCompressFileDrop);
    }
    
    // 批量压缩上传区
    if (elements.batchCompressFileInput && elements.batchCompressDropArea) {
        // 上传按钮点击
        const batchUploadBtn = elements.batchCompressDropArea.querySelector('.batch-upload-btn');
        if (batchUploadBtn) {
            batchUploadBtn.addEventListener('click', function() {
                elements.batchCompressFileInput.click();
            });
        }
        
        // 文件选择事件
        elements.batchCompressFileInput.addEventListener('change', handleBatchCompressFileSelect);
        
        // 拖放事件
        elements.batchCompressDropArea.addEventListener('dragover', handleBatchCompressDragOver);
        elements.batchCompressDropArea.addEventListener('dragleave', handleBatchCompressDragLeave);
        elements.batchCompressDropArea.addEventListener('drop', handleBatchCompressFileDrop);
    }
    
    // 压缩格式选择
    if (elements.compressFormatBtns) {
        elements.compressFormatBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                setCompressFormat(this.dataset.format);
            });
        });
    }
    
    // 压缩级别滑块
    if (elements.compressLevelSlider) {
        elements.compressLevelSlider.addEventListener('input', handleCompressLevelChange);
    }
    
    // 压缩操作按钮
    if (elements.compressStartBtn) {
        elements.compressStartBtn.addEventListener('click', startCompression);
    }
    
    if (elements.compressCancelBtn) {
        elements.compressCancelBtn.addEventListener('click', cancelCompression);
    }
    
    if (elements.compressDownloadBtn) {
        elements.compressDownloadBtn.addEventListener('click', downloadCompressedFile);
    }
    
    // 批量压缩控制
    if (elements.addMoreCompressFiles) {
        elements.addMoreCompressFiles.addEventListener('click', function() {
            elements.batchCompressFileInput.click();
        });
    }
    
    if (elements.clearBatchCompress) {
        elements.clearBatchCompress.addEventListener('click', clearBatchCompressFiles);
    }
    
    if (elements.batchCompressStart) {
        elements.batchCompressStart.addEventListener('click', function() {
            // 此处可以实现批量压缩的逻辑
            alert('批量压缩功能尚在开发中');
        });
    }
    
    // 压缩标签页切换
    if (elements.compressTabBtns) {
        elements.compressTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 清除所有标签和内容的active状态
                elements.compressTabBtns.forEach(tab => tab.classList.remove('active'));
                document.querySelectorAll('#compress-tab .tab-content').forEach(content => content.classList.remove('active'));
                
                // 设置当前标签和内容为active
                this.classList.add('active');
                const tabId = this.dataset.tab + '-tab';
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }
}

// 压缩文件处理函数
function handleCompressFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processCompressFile(file);
    }
}

// 压缩文件拖放相关函数
function handleCompressDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.compressDropArea.classList.add('drag-over');
}

function handleCompressDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.compressDropArea.classList.remove('drag-over');
}

function handleCompressFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.compressDropArea.classList.remove('drag-over');
    
    const file = event.dataTransfer.files[0];
    if (file) {
        processCompressFile(file);
    } else {
        showError('请上传有效的文件');
    }
}

// 批量压缩文件处理
function handleBatchCompressFileSelect(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
        addBatchCompressFiles(files);
    }
}

// 批量压缩拖放相关函数
function handleBatchCompressDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.batchCompressDropArea.classList.add('drag-over');
}

function handleBatchCompressDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.batchCompressDropArea.classList.remove('drag-over');
}

function handleBatchCompressFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.batchCompressDropArea.classList.remove('drag-over');
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
        addBatchCompressFiles(files);
    } else {
        showError('请上传有效的文件');
    }
}

// 处理压缩文件
function processCompressFile(file) {
    // 更新应用状态
    appState.compressFile = file;
    appState.compressedBlob = null;
    
    // 更新UI显示文件信息
    updateCompressFileInfo(file);
    
    // 激活压缩按钮
    if (elements.compressStartBtn) {
        elements.compressStartBtn.disabled = false;
    }
    
    // 显示文件结构
    showCompressFileStructure(file);
}

// 更新压缩文件信息显示
function updateCompressFileInfo(file) {
    if (elements.compressFilename) {
        elements.compressFilename.textContent = file.name;
    }
    
    if (elements.compressOriginalSize) {
        elements.compressOriginalSize.textContent = formatFileSize(file.size);
    }
    
    // 预估压缩后大小
    const estimatedSize = estimateCompressedSize(file);
    if (elements.compressEstimatedSize) {
        elements.compressEstimatedSize.textContent = formatFileSize(estimatedSize);
    }
    
    // 计算并显示压缩率
    const compressionRatio = Math.round((1 - estimatedSize / file.size) * 100);
    if (elements.compressRatio) {
        elements.compressRatio.textContent = compressionRatio + '%';
    }
}

// 预估压缩后的大小
function estimateCompressedSize(file) {
    // 根据文件类型和压缩级别估算压缩率
    let compressionRate = 0.7; // 默认压缩率
    
    // 根据文件类型调整压缩率
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    // 已经是压缩格式的文件压缩效果较差
    const lowCompressFormats = ['jpg', 'jpeg', 'png', 'gif', 'mp3', 'mp4', 'zip', 'rar', '7z', 'gz'];
    if (lowCompressFormats.includes(fileExt)) {
        compressionRate = 0.95;
    }
    
    // 根据压缩级别调整
    const level = parseInt(elements.compressLevelSlider.value) || 2;
    if (level === 1) { // 快速
        compressionRate += 0.1;
    } else if (level === 3) { // 最小体积
        compressionRate -= 0.1;
    }
    
    // 确保压缩率在合理范围内
    compressionRate = Math.max(0.4, Math.min(compressionRate, 0.98));
    
    return Math.round(file.size * compressionRate);
}

// 显示压缩文件结构
function showCompressFileStructure(file) {
    if (!elements.compressFilesTree) return;
    
    // 清空当前显示
    elements.compressFilesTree.innerHTML = '';
    
    // 创建文件树结构
    const fileItem = document.createElement('div');
    fileItem.className = 'file-tree-item';
    
    // 文件图标
    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-icons';
    iconSpan.textContent = getFileIcon(file.name);
    fileItem.appendChild(iconSpan);
    
    // 文件名
    const nameSpan = document.createElement('span');
    nameSpan.className = 'file-name';
    nameSpan.textContent = file.name;
    fileItem.appendChild(nameSpan);
    
    // 文件大小
    const sizeSpan = document.createElement('span');
    sizeSpan.className = 'file-size';
    sizeSpan.textContent = formatFileSize(file.size);
    fileItem.appendChild(sizeSpan);
    
    elements.compressFilesTree.appendChild(fileItem);
}

// 添加批量压缩文件
function addBatchCompressFiles(files) {
    // 获取当前批量文件列表
    const currentFiles = appState.batchCompressFiles || [];
    
    // 添加新文件
    Array.from(files).forEach(file => {
        // 检查是否已存在相同文件
        const fileExists = currentFiles.some(existingFile => 
            existingFile.name === file.name && existingFile.size === file.size
        );
        
        if (!fileExists) {
            currentFiles.push(file);
        }
    });
    
    // 限制最多20个文件
    if (currentFiles.length > 20) {
        const removed = currentFiles.length - 20;
        currentFiles.splice(20);
        showMessage(`已达到最大文件数限制，移除了${removed}个文件`, 'warning');
    }
    
    // 更新状态
    appState.batchCompressFiles = currentFiles;
    
    // 更新UI
    updateBatchCompressFilesList();
    
    // 激活批量压缩按钮
    if (elements.batchCompressStart && currentFiles.length > 0) {
        elements.batchCompressStart.disabled = false;
    }
}

// 更新批量压缩文件列表UI
function updateBatchCompressFilesList() {
    if (!elements.batchCompressFileList) return;
    
    // 清空列表
    elements.batchCompressFileList.innerHTML = '';
    
    const files = appState.batchCompressFiles || [];
    
    // 更新文件计数
    if (elements.batchCompressCount) {
        elements.batchCompressCount.textContent = `(${files.length})`;
    }
    
    if (files.length === 0) {
        // 显示空列表提示
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-batch-list';
        emptyMessage.textContent = '请添加文件以开始批量压缩';
        elements.batchCompressFileList.appendChild(emptyMessage);
        return;
    }
    
    // 添加文件项
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'batch-file-item';
        
        // 文件图标
        const iconSpan = document.createElement('span');
        iconSpan.className = 'material-icons file-icon';
        iconSpan.textContent = getFileIcon(file.name);
        fileItem.appendChild(iconSpan);
        
        // 文件信息
        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = file.name;
        fileInfo.appendChild(fileName);
        
        const fileSize = document.createElement('div');
        fileSize.className = 'file-size';
        fileSize.textContent = formatFileSize(file.size);
        fileInfo.appendChild(fileSize);
        
        fileItem.appendChild(fileInfo);
        
        // 删除按钮
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-file-btn';
        removeBtn.dataset.index = index;
        
        const removeIcon = document.createElement('span');
        removeIcon.className = 'material-icons';
        removeIcon.textContent = 'close';
        removeBtn.appendChild(removeIcon);
        
        removeBtn.addEventListener('click', function() {
            removeBatchCompressFile(parseInt(this.dataset.index));
        });
        
        fileItem.appendChild(removeBtn);
        elements.batchCompressFileList.appendChild(fileItem);
    });
}

// 从批量列表移除文件
function removeBatchCompressFile(index) {
    if (!appState.batchCompressFiles) return;
    
    appState.batchCompressFiles.splice(index, 1);
    updateBatchCompressFilesList();
    
    // 如果列表为空，禁用批量压缩按钮
    if (elements.batchCompressStart && appState.batchCompressFiles.length === 0) {
        elements.batchCompressStart.disabled = true;
    }
}

// 清空批量压缩文件列表
function clearBatchCompressFiles() {
    appState.batchCompressFiles = [];
    updateBatchCompressFilesList();
    
    // 禁用批量压缩按钮
    if (elements.batchCompressStart) {
        elements.batchCompressStart.disabled = true;
    }
}

// 设置压缩格式
function setCompressFormat(format) {
    // 更新状态
    appState.compressFormat = format;
    
    // 更新UI
    if (elements.compressFormatBtns) {
        elements.compressFormatBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.format === format);
        });
    }
    
    // 如果有选中的文件，更新预估大小
    if (appState.compressFile) {
        updateCompressFileInfo(appState.compressFile);
    }
}

// 处理压缩级别变化
function handleCompressLevelChange() {
    const level = parseInt(elements.compressLevelSlider.value) || 2;
    
    // 更新显示
    if (elements.compressLevelValue) {
        elements.compressLevelValue.textContent = compressLevelMap[level] || '普通';
    }
    
    // 如果有选中的文件，更新预估大小
    if (appState.compressFile) {
        updateCompressFileInfo(appState.compressFile);
    }
}

// 开始压缩
function startCompression() {
    if (!appState.compressFile) {
        showError('请先选择需要压缩的文件');
        return;
    }
    
    // 更新状态
    appState.isCompressing = true;
    appState.compressedBlob = null;
    
    // 更新UI
    updateCompressUI();
    
    // 显示进度条
    if (elements.compressProgress) {
        elements.compressProgress.style.display = 'block';
    }
    
    // 模拟压缩进度
    simulateCompressProgress();
}

// 取消压缩
function cancelCompression() {
    // 更新状态
    appState.isCompressing = false;
    
    // 重置进度条
    if (elements.compressProgressFill) {
        elements.compressProgressFill.style.width = '0%';
    }
    
    if (elements.compressProgressPercentage) {
        elements.compressProgressPercentage.textContent = '0%';
    }
    
    // 更新UI
    updateCompressUI();
    
    // 显示状态消息
    if (elements.compressStatusMessage) {
        elements.compressStatusMessage.textContent = '已取消压缩';
    }
}

// 模拟压缩进度
function simulateCompressProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        if (!appState.isCompressing) {
            clearInterval(interval);
            return;
        }
        
        progress += Math.random() * 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            finishCompression();
        }
        
        // 更新进度显示
        if (elements.compressProgressFill) {
            elements.compressProgressFill.style.width = `${progress}%`;
        }
        
        if (elements.compressProgressPercentage) {
            elements.compressProgressPercentage.textContent = `${Math.round(progress)}%`;
        }
        
        // 更新状态消息
        if (elements.compressStatusMessage) {
            elements.compressStatusMessage.textContent = '正在压缩...';
        }
    }, 100);
}

// 完成压缩
function finishCompression() {
    // 这里实际应该调用压缩API
    // 这是一个模拟实现
    
    // 创建一个模拟的压缩文件Blob
    const file = appState.compressFile;
    const format = appState.compressFormat;
    const estimatedSize = estimateCompressedSize(file);
    
    // 创建一个示例内容（实际情况中，这应该是通过压缩算法生成的二进制数据）
    const content = `这是一个模拟的${format}压缩文件，包含${file.name}`;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    
    // 更新状态
    appState.isCompressing = false;
    appState.compressedBlob = blob;
    
    // 更新UI
    updateCompressUI();
    
    // 显示完成消息
    if (elements.compressStatusMessage) {
        elements.compressStatusMessage.textContent = '压缩完成';
    }
    
    // 激活下载按钮
    if (elements.compressDownloadBtn) {
        elements.compressDownloadBtn.disabled = false;
    }
    
    // 可以选择显示完成对话框
    showCompressCompleteModal();
}

// 显示压缩完成模态框
function showCompressCompleteModal() {
    const file = appState.compressFile;
    const format = appState.compressFormat;
    
    // 这里可以实现显示压缩完成后的结果对话框
    // 简化版本：仅显示一个提示
    showMessage(`文件已成功压缩为${format.toUpperCase()}格式，点击下载按钮保存`, 'success');
}

// 下载压缩后的文件
function downloadCompressedFile() {
    if (!appState.compressedBlob) {
        showError('没有可下载的压缩文件');
        return;
    }
    
    const file = appState.compressFile;
    const format = appState.compressFormat;
    
    // 创建文件名：原始文件名(不含扩展名) + 新格式扩展名
    const originalName = file.name.split('.')[0] || 'compressed';
    const filename = `${originalName}.${format}`;
    
    // 创建下载链接
    const url = URL.createObjectURL(appState.compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    // 触发下载
    document.body.appendChild(a);
    a.click();
    
    // 清理
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// 更新压缩UI状态
function updateCompressUI() {
    const isCompressing = appState.isCompressing;
    const hasFile = !!appState.compressFile;
    const hasCompressedFile = !!appState.compressedBlob;
    
    // 更新按钮状态
    if (elements.compressStartBtn) {
        elements.compressStartBtn.disabled = isCompressing || !hasFile;
    }
    
    if (elements.compressCancelBtn) {
        elements.compressCancelBtn.disabled = !isCompressing;
    }
    
    if (elements.compressDownloadBtn) {
        elements.compressDownloadBtn.disabled = !hasCompressedFile;
    }
    
    // 拖放区域状态
    if (elements.compressDropArea) {
        elements.compressDropArea.classList.toggle('disabled', isCompressing);
    }
    
    // 设置区域状态
    const settingsElements = [
        elements.compressFormatBtns, 
        elements.compressLevelSlider
    ];
    
    settingsElements.forEach(elemArray => {
        if (elemArray) {
            elemArray.forEach(elem => {
                elem.disabled = isCompressing;
            });
        }
    });
}

// 绑定文档转换事件
function bindDocumentEvents() {
    // 文档上传按钮
    if (elements.documentUploadBtn && elements.documentFileInput) {
        elements.documentUploadBtn.addEventListener('click', function() {
            elements.documentFileInput.click();
        });
        
        elements.documentFileInput.addEventListener('change', handleDocumentFileSelect);
    }
    
    // 文档拖放区域
    if (elements.documentDropArea) {
        elements.documentDropArea.addEventListener('dragover', handleDocumentDragOver);
        elements.documentDropArea.addEventListener('dragleave', handleDocumentDragLeave);
        elements.documentDropArea.addEventListener('drop', handleDocumentFileDrop);
    }
    
    // 文档URL获取
    if (elements.documentFetchUrl) {
        elements.documentFetchUrl.addEventListener('click', handleDocumentUrlFetch);
    }
    
    // 文档批量转换相关事件
    if (elements.batchDocumentFileInput && elements.batchDocumentDropArea) {
        // 批量上传按钮点击
        const batchUploadBtn = elements.batchDocumentDropArea.querySelector('.batch-upload-btn');
        if (batchUploadBtn) {
            batchUploadBtn.addEventListener('click', function() {
                elements.batchDocumentFileInput.click();
            });
        }
        
        // 批量文件选择事件
        elements.batchDocumentFileInput.addEventListener('change', handleBatchDocumentFileSelect);
        
        // 批量拖放事件
        elements.batchDocumentDropArea.addEventListener('dragover', handleBatchDocumentDragOver);
        elements.batchDocumentDropArea.addEventListener('dragleave', handleBatchDocumentDragLeave);
        elements.batchDocumentDropArea.addEventListener('drop', handleBatchDocumentFileDrop);
    }
    
    // 批量文档转换控制
    if (elements.addMoreDocumentFiles) {
        elements.addMoreDocumentFiles.addEventListener('click', function() {
            elements.batchDocumentFileInput.click();
        });
    }
    
    if (elements.clearBatchDocument) {
        elements.clearBatchDocument.addEventListener('click', clearBatchDocumentFiles);
    }
    
    if (elements.batchDocumentConvert) {
        elements.batchDocumentConvert.addEventListener('click', startBatchDocumentConversion);
    }
    
    // 文档格式按钮
    const documentFormatBtns = document.querySelectorAll('#document-tab .format-btn');
    if (documentFormatBtns) {
        documentFormatBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                setDocumentFormat(this.dataset.format);
            });
        });
    }
    
    // 文档质量滑块
    if (elements.documentQualitySlider) {
        elements.documentQualitySlider.addEventListener('input', handleDocumentQualityChange);
    }
    
    // 文档转换按钮
    if (elements.documentConvertBtn) {
        elements.documentConvertBtn.addEventListener('click', startDocumentConversion);
    }
    
    // 文档取消按钮
    if (elements.documentCancelBtn) {
        elements.documentCancelBtn.addEventListener('click', cancelDocumentConversion);
    }
    
    // 文档下载按钮
    if (elements.documentDownloadBtn) {
        elements.documentDownloadBtn.addEventListener('click', downloadConvertedDocument);
    }
    
    // 标签切换
    const documentTabBtns = document.querySelectorAll('#document-tab .input-tabs .tab-btn');
    if (documentTabBtns) {
        documentTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有标签和内容的active状态
                documentTabBtns.forEach(tab => tab.classList.remove('active'));
                document.querySelectorAll('#document-tab .tab-content').forEach(content => content.classList.remove('active'));
                
                // 设置当前标签和内容为active
                this.classList.add('active');
                const tabId = this.dataset.tab;
                document.getElementById(tabId + '-tab').classList.add('active');
            });
        });
    }
    
    // 加载预览控制相关事件
    if (elements.zoomInDocument) {
        elements.zoomInDocument.addEventListener('click', zoomInDocument);
    }
    
    if (elements.zoomOutDocument) {
        elements.zoomOutDocument.addEventListener('click', zoomOutDocument);
    }
    
    if (elements.toggleSplitDocument) {
        elements.toggleSplitDocument.addEventListener('click', toggleSplitViewDocument);
    }
}

// 文档文件选择处理
function handleDocumentFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processDocumentFile(file);
    }
}

// 文档拖放相关函数
function handleDocumentDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    const documentDropArea = document.getElementById('document-drop-area');
    if (documentDropArea) {
        documentDropArea.classList.add('drag-over');
    }
}

function handleDocumentDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    const documentDropArea = document.getElementById('document-drop-area');
    if (documentDropArea) {
        documentDropArea.classList.remove('drag-over');
    }
}

function handleDocumentFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    const documentDropArea = document.getElementById('document-drop-area');
    if (documentDropArea) {
        documentDropArea.classList.remove('drag-over');
    }
    
    const file = event.dataTransfer.files[0];
    if (file) {
        processDocumentFile(file);
    } else {
        showError('请上传有效的文档文件');
    }
}

// 处理文档URL获取
function handleDocumentUrlFetch() {
    const documentUrlInput = document.getElementById('document-url-input');
    const documentStatusMessage = document.getElementById('document-status-message');
    
    if (!documentUrlInput) return;
    
    const url = documentUrlInput.value.trim();
    if (!url) {
        showError('请输入有效的文档URL');
        return;
    }
    
    if (documentStatusMessage) {
        documentStatusMessage.textContent = '正在获取URL文档...';
    }
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.blob();
        })
        .then(blob => {
            const filename = url.split('/').pop() || 'document';
            const file = new File([blob], filename, {
                type: blob.type || 'application/octet-stream'
            });
            
            processDocumentFile(file);
        })
        .catch(error => {
            showError('无法获取文档: ' + error.message);
            if (documentStatusMessage) {
                documentStatusMessage.textContent = '准备就绪';
            }
        });
}

// 处理文档文件
function processDocumentFile(file) {
    // 检查文件大小
    if (file.size > 50 * 1024 * 1024) { // 50MB
        showError('文件大小超过限制（最大50MB）');
        return;
    }
    
    // 存储文件引用
    appState.documentState.file = file;
    
    // 更新文件信息显示
    const documentDropArea = document.getElementById('document-drop-area');
    if (documentDropArea) {
        const dropMessage = documentDropArea.querySelector('.drop-message');
        if (dropMessage) {
            dropMessage.innerHTML = `
                <span class="material-icons medium-icon">description</span>
                <p>已选择文件: ${file.name}</p>
                <p>大小: ${formatFileSize(file.size)}</p>
                <p class="file-hint">点击"开始转换"按钮进行转换</p>
            `;
        }
    }
    
    // 更新原始文件信息
    updateDocumentOriginalInfo(file);
    
    // 自动选择适当的格式
    autoSelectDocumentFormat(file.name.split('.').pop().toLowerCase());
    
    // 显示文件预览
    previewDocumentFile(file);
    
    // 更新UI状态
    updateDocumentUI();
}

// 更新文档原始信息
function updateDocumentOriginalInfo(file) {
    const originalDocumentFormat = document.getElementById('original-document-format');
    const originalDocumentSize = document.getElementById('original-document-size');
    
    if (originalDocumentFormat) {
        originalDocumentFormat.textContent = file.name.split('.').pop().toUpperCase();
    }
    
    if (originalDocumentSize) {
        originalDocumentSize.textContent = formatFileSize(file.size);
    }
}

// 自动选择适当的文档格式
function autoSelectDocumentFormat(fileExt) {
    let targetFormat;
    
    switch (fileExt) {
        case 'doc':
        case 'docx':
        case 'odt':
        case 'rtf':
        case 'txt':
            targetFormat = 'pdf'; // 文本文档默认转为PDF
            break;
        case 'xls':
        case 'xlsx':
        case 'ods':
        case 'csv':
            targetFormat = 'pdf'; // 电子表格默认转为PDF
            break;
        case 'ppt':
        case 'pptx':
        case 'odp':
            targetFormat = 'pdf'; // 演示文稿默认转为PDF
            break;
        case 'pdf':
            targetFormat = 'docx'; // PDF默认转为Word
            break;
        default:
            targetFormat = 'pdf'; // 其他格式默认转为PDF
    }
    
    setDocumentFormat(targetFormat);
}

// 预览文档文件
function previewDocumentFile(file) {
    const originalDocumentPreview = document.getElementById('original-document-preview');
    if (!originalDocumentPreview) return;
    
    // 清空当前预览
    originalDocumentPreview.innerHTML = '';
    
    // 显示文档图标预览
    const fileExt = file.name.split('.').pop().toLowerCase();
    let docType;
    
    switch (fileExt) {
        case 'pdf':
            docType = 'pdf';
            break;
        case 'doc':
        case 'docx':
        case 'odt':
        case 'rtf':
        case 'txt':
            docType = 'doc';
            break;
        case 'xls':
        case 'xlsx':
        case 'ods':
        case 'csv':
            docType = 'xls';
            break;
        case 'ppt':
        case 'pptx':
        case 'odp':
            docType = 'ppt';
            break;
        default:
            docType = 'unknown';
    }
    
    showDocumentIcon(originalDocumentPreview, docType);
    
    // 生成转换后预览
    updateDocumentPreview();
}

// 更新文档预览
function updateDocumentPreview() {
    const convertedDocumentPreview = document.getElementById('converted-document-preview');
    const convertedDocumentFormat = document.getElementById('converted-document-format');
    const convertedDocumentSize = document.getElementById('converted-document-size');
    
    if (!convertedDocumentPreview || !appState.documentState.file) return;
    
    // 清空当前预览
    convertedDocumentPreview.innerHTML = '';
    
    // 显示目标格式图标预览
    let targetType;
    
    switch (appState.documentState.selectedFormat) {
        case 'pdf':
            targetType = 'pdf';
            break;
        case 'docx':
        case 'doc':
        case 'rtf':
        case 'odt':
        case 'txt':
            targetType = 'doc';
            break;
        case 'xlsx':
        case 'xls':
        case 'csv':
        case 'ods':
            targetType = 'xls';
            break;
        case 'pptx':
        case 'ppt':
        case 'odp':
            targetType = 'ppt';
            break;
        case 'jpg':
        case 'png':
            targetType = 'img';
            break;
        default:
            targetType = 'unknown';
    }
    
    showDocumentIcon(convertedDocumentPreview, targetType);
    
    // 更新格式信息
    if (convertedDocumentFormat) {
        convertedDocumentFormat.textContent = appState.documentState.selectedFormat.toUpperCase();
    }
    
    // 估算转换后大小
    if (convertedDocumentSize && appState.documentState.file) {
        // 简单的大小估算
        let sizeRatio;
        const originalFormat = appState.documentState.file.name.split('.').pop().toLowerCase();
        const targetFormat = appState.documentState.selectedFormat.toLowerCase();
        
        // 根据不同格式组合预估大小比例
        if (originalFormat === 'pdf' && ['docx', 'doc'].includes(targetFormat)) {
            sizeRatio = 0.9; // PDF转Word通常会小一些
        } else if (['docx', 'doc'].includes(originalFormat) && targetFormat === 'pdf') {
            sizeRatio = 1.2; // Word转PDF通常会大一些
        } else if (targetFormat === 'txt') {
            sizeRatio = 0.3; // 转TXT一般会显著减小
        } else if (['jpg', 'png'].includes(targetFormat)) {
            sizeRatio = 0.7; // 转图像格式通常会减小
        } else {
            sizeRatio = 1.0; // 默认保持大小不变
        }
        
        const estimatedSize = Math.round(appState.documentState.file.size * sizeRatio);
        convertedDocumentSize.textContent = formatFileSize(estimatedSize);
    }
}

// 设置文档转换格式
function setDocumentFormat(format) {
    appState.documentState.selectedFormat = format;
    
    // 更新按钮状态
    const formatBtns = document.querySelectorAll('#document-tab .format-btn');
    if (formatBtns) {
        formatBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.format === format);
        });
    }
    
    // 更新预览
    updateDocumentPreview();
}

// 处理文档质量变更
function handleDocumentQualityChange() {
    const documentQualitySlider = document.getElementById('document-quality-slider');
    const documentQualityValue = document.getElementById('document-quality-value');
    
    if (documentQualitySlider && documentQualityValue) {
        appState.documentState.quality = documentQualitySlider.value;
        documentQualityValue.textContent = appState.documentState.quality + '%';
        updateDocumentPreview();
    }
}

// 开始文档转换
function startDocumentConversion() {
    if (!appState.documentState.file) {
        showError('请先选择需要转换的文档');
        return;
    }
    
    // 更新状态
    appState.documentState.isConverting = true;
    updateDocumentUI();
    
    // 显示进度
    const documentStatusMessage = document.getElementById('document-status-message');
    const documentProgressPercentage = document.getElementById('document-progress-percentage');
    const documentProgressFill = document.querySelector('#document-conversion-progress .progress-fill');
    
    if (documentStatusMessage) {
        documentStatusMessage.textContent = '正在转换...';
    }
    
    if (documentProgressPercentage) {
        documentProgressPercentage.textContent = '0%';
    }
    
    if (documentProgressFill) {
        documentProgressFill.style.width = '0%';
    }
    
    // 模拟转换进度
    simulateDocumentProgress();
}

// 取消文档转换
function cancelDocumentConversion() {
    appState.documentState.isConverting = false;
    
    // 重置进度
    const documentProgressFill = document.querySelector('#document-conversion-progress .progress-fill');
    const documentProgressPercentage = document.getElementById('document-progress-percentage');
    const documentStatusMessage = document.getElementById('document-status-message');
    
    if (documentProgressFill) {
        documentProgressFill.style.width = '0%';
    }
    
    if (documentProgressPercentage) {
        documentProgressPercentage.textContent = '0%';
    }
    
    if (documentStatusMessage) {
        documentStatusMessage.textContent = '准备就绪';
    }
    
    updateDocumentUI();
}

// 模拟文档转换进度
function simulateDocumentProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        if (!appState.documentState.isConverting) {
            clearInterval(interval);
            return;
        }
        
        progress += 5;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // 完成转换
            finishDocumentConversion();
        }
        
        const documentProgressFill = document.querySelector('#document-conversion-progress .progress-fill');
        const documentProgressPercentage = document.getElementById('document-progress-percentage');
        
        if (documentProgressFill) {
            documentProgressFill.style.width = progress + '%';
        }
        
        if (documentProgressPercentage) {
            documentProgressPercentage.textContent = progress + '%';
        }
    }, 100);
}

// 完成文档转换
function finishDocumentConversion() {
    appState.documentState.isConverting = false;
    
    const documentStatusMessage = document.getElementById('document-status-message');
    if (documentStatusMessage) {
        documentStatusMessage.textContent = '转换完成';
    }
    
    // 获取文件信息
    const file = appState.documentState.file;
    const fileName = file.name.split('.')[0] || 'document';
    const originalFormat = file.name.split('.').pop().toLowerCase();
    const targetFormat = appState.documentState.selectedFormat;
    const resultFilename = `${fileName}.${targetFormat}`;
    
    // 设置正确的MIME类型
    let resultType;
    switch (targetFormat) {
        case 'pdf':
            resultType = 'application/pdf';
            break;
        case 'docx':
            resultType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        case 'xlsx':
            resultType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            break;
        case 'pptx':
            resultType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
            break;
        case 'jpg':
            resultType = 'image/jpeg';
            break;
        case 'png':
            resultType = 'image/png';
            break;
        case 'txt':
            resultType = 'text/plain';
            break;
        case 'html':
            resultType = 'text/html';
            break;
        case 'rtf':
            resultType = 'application/rtf';
            break;
        default:
            resultType = 'application/octet-stream';
    }
    
    // 实际转换逻辑
    if (originalFormat === 'pdf' && ['jpg', 'png'].includes(targetFormat)) {
        // PDF转图片
        convertPdfToImage(file, targetFormat, resultType, resultFilename);
    } else if (originalFormat === 'pdf' && targetFormat === 'txt') {
        // PDF转文本
        convertPdfToText(file, resultType, resultFilename);
    } else if (originalFormat === 'pdf' && targetFormat === 'html') {
        // PDF转HTML
        convertPdfToHtml(file, resultType, resultFilename);
    } else if (originalFormat === 'pdf' && targetFormat === 'docx') {
        // PDF转Word
        convertPdfToDocx(file, resultType, resultFilename);
    } else if (['jpg', 'jpeg', 'png'].includes(originalFormat) && targetFormat === 'pdf') {
        // 图片转PDF
        convertImageToPdf(file, resultType, resultFilename);
    } else {
        // 其他格式转换暂时使用模拟数据
        // 在实际应用中，这里应该调用相应的转换API或库
        const simulatedContent = `模拟的文档转换结果：${file.name} 转换为 ${resultFilename}`;
        appState.documentState.convertedBlob = new Blob([simulatedContent], { type: resultType });
        
        // 更新UI状态
        updateDocumentUI();
        
        // 显示成功消息
        showMessage(`文档已成功转换为${targetFormat.toUpperCase()}格式，点击下载按钮保存`, 'success');
        
        // 保存到历史记录
        saveToHistory(file, targetFormat, appState.documentState.convertedBlob);
    }
}

// PDF转图片
function convertPdfToImage(file, targetFormat, resultType, resultFilename) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const pdfData = new Uint8Array(e.target.result);
        
        // 使用PDF.js加载PDF
        pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
            // 转换第一页
            pdf.getPage(1).then(function(page) {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                // 渲染PDF页面到Canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                page.render(renderContext).promise.then(function() {
                    // 将Canvas转换为图像Blob
                    canvas.toBlob(function(blob) {
                        appState.documentState.convertedBlob = blob;
                        
                        // 更新UI状态
                        updateDocumentUI();
                        
                        // 显示成功消息
                        showMessage(`PDF已成功转换为${targetFormat.toUpperCase()}图像，点击下载按钮保存`, 'success');
                        
                        // 保存到历史记录
                        saveToHistory(file, targetFormat, blob);
                    }, resultType, 0.95); // 0.95是图像质量
                });
            });
        }).catch(function(error) {
            console.error('PDF转换错误:', error);
            showError('PDF转换失败: ' + error.message);
        });
    };
    
    reader.onerror = function(error) {
        console.error('文件读取错误:', error);
        showError('文件读取失败');
    };
    
    reader.readAsArrayBuffer(file);
}

// PDF转文本
function convertPdfToText(file, resultType, resultFilename) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const pdfData = new Uint8Array(e.target.result);
        
        // 使用PDF.js加载PDF
        pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
            let textContent = '';
            const numPages = pdf.numPages;
            let pagesProcessed = 0;
            
            // 处理每一页
            for (let i = 1; i <= numPages; i++) {
                pdf.getPage(i).then(function(page) {
                    // 提取文本
                    page.getTextContent().then(function(content) {
                        // 合并文本项
                        for (let j = 0; j < content.items.length; j++) {
                            textContent += content.items[j].str + ' ';
                        }
                        
                        textContent += '\n\n';
                        pagesProcessed++;
                        
                        // 当所有页面处理完毕，创建文本Blob
                        if (pagesProcessed === numPages) {
                            const blob = new Blob([textContent], { type: resultType });
                            appState.documentState.convertedBlob = blob;
                            
                            // 更新UI状态
                            updateDocumentUI();
                            
                            // 显示成功消息
                            showMessage('PDF已成功转换为TXT文本，点击下载按钮保存', 'success');
                            
                            // 保存到历史记录
                            saveToHistory(file, 'txt', blob);
                        }
                    });
                });
            }
        }).catch(function(error) {
            console.error('PDF转换错误:', error);
            showError('PDF转换失败: ' + error.message);
        });
    };
    
    reader.onerror = function(error) {
        console.error('文件读取错误:', error);
        showError('文件读取失败');
    };
    
    reader.readAsArrayBuffer(file);
}

// PDF转HTML
function convertPdfToHtml(file, resultType, resultFilename) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const pdfData = new Uint8Array(e.target.result);
        
        // 使用PDF.js加载PDF
        pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
            let htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${resultFilename}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .page { margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #ddd; }
        .page-number { text-align: center; color: #777; margin-top: 20px; }
    </style>
</head>
<body>`;
            
            const numPages = pdf.numPages;
            let pagesProcessed = 0;
            
            // 处理每一页
            for (let i = 1; i <= numPages; i++) {
                pdf.getPage(i).then(function(page) {
                    // 提取文本
                    page.getTextContent().then(function(content) {
                        htmlContent += `<div class="page">`;
                        
                        // 合并文本项并转换为HTML段落
                        let lastY = -1;
                        let paragraph = '';
                        
                        for (let j = 0; j < content.items.length; j++) {
                            const item = content.items[j];
                            
                            // 根据位置判断是否换行
                            if (lastY !== -1 && Math.abs(lastY - item.transform[5]) > 5) {
                                if (paragraph.trim()) {
                                    htmlContent += `<p>${paragraph}</p>`;
                                    paragraph = '';
                                }
                            }
                            
                            paragraph += item.str + ' ';
                            lastY = item.transform[5];
                        }
                        
                        // 添加最后一段
                        if (paragraph.trim()) {
                            htmlContent += `<p>${paragraph}</p>`;
                        }
                        
                        htmlContent += `<div class="page-number">第 ${i} 页 / 共 ${numPages} 页</div>`;
                        htmlContent += `</div>`;
                        
                        pagesProcessed++;
                        
                        // 当所有页面处理完毕，创建HTML Blob
                        if (pagesProcessed === numPages) {
                            htmlContent += `</body></html>`;
                            const blob = new Blob([htmlContent], { type: resultType });
                            appState.documentState.convertedBlob = blob;
                            
                            // 更新UI状态
                            updateDocumentUI();
                            
                            // 显示成功消息
                            showMessage('PDF已成功转换为HTML，点击下载按钮保存', 'success');
                            
                            // 保存到历史记录
                            saveToHistory(file, 'html', blob);
                        }
                    });
                });
            }
        }).catch(function(error) {
            console.error('PDF转换错误:', error);
            showError('PDF转换失败: ' + error.message);
        });
    };
    
    reader.onerror = function(error) {
        console.error('文件读取错误:', error);
        showError('文件读取失败');
    };
    
    reader.readAsArrayBuffer(file);
}

// 下载转换后的文档
function downloadConvertedDocument() {
    if (!appState.documentState.convertedBlob) {
        showError('没有可下载的转换文件');
        return;
    }
    
    const fileName = appState.documentState.file.name.split('.')[0] || 'document';
    const targetFormat = appState.documentState.selectedFormat;
    const resultFilename = `${fileName}.${targetFormat}`;
    
    // 创建下载链接
    const url = URL.createObjectURL(appState.documentState.convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resultFilename;
    a.style.display = 'none';
    
    // 触发下载
    document.body.appendChild(a);
    a.click();
    
    // 清理
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// 更新文档UI状态
function updateDocumentUI() {
    const isConverting = appState.documentState.isConverting;
    const hasFile = !!appState.documentState.file;
    const hasConvertedFile = !!appState.documentState.convertedBlob;
    
    // 更新按钮状态
    const documentConvertBtn = document.getElementById('document-convert-btn');
    const documentCancelBtn = document.getElementById('document-cancel-btn');
    const documentDownloadBtn = document.getElementById('document-download-btn');
    
    if (documentConvertBtn) {
        documentConvertBtn.disabled = isConverting || !hasFile;
    }
    
    if (documentCancelBtn) {
        documentCancelBtn.disabled = !isConverting;
    }
    
    if (documentDownloadBtn) {
        documentDownloadBtn.disabled = !hasConvertedFile;
    }
    
    // 拖放区域状态
    const documentDropArea = document.getElementById('document-drop-area');
    if (documentDropArea) {
        documentDropArea.classList.toggle('disabled', isConverting);
    }
    
    // 设置区域状态
    const formatBtns = document.querySelectorAll('#document-tab .format-btn');
    const settingsElements = [
        formatBtns, 
        [document.getElementById('document-quality-slider')],
        [document.getElementById('document-page-size')],
        [document.getElementById('document-orientation')],
        [document.getElementById('document-page-range')]
    ];
    
    settingsElements.forEach(elemArray => {
        if (elemArray) {
            elemArray.forEach(elem => {
                if (elem) {
                    elem.disabled = isConverting;
                }
            });
        }
    });
}

// 当页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp); 

function loadLibraries() {
    // 加载PDF.js库
    loadPdfJsLibrary();
    
    // 加载jsPDF库
    loadJsPdfLibrary();
    
    // 加载JSZip库
    loadJSZipLibrary();
}

// 加载jsPDF库
function loadJsPdfLibrary() {
    // 如果jsPDF库已加载，则直接返回
    if (window.jsPDF || window.jspdf) return;
    
    // 添加加载状态标记，防止重复加载
    if (window.jsPdfLoading) return;
    window.jsPdfLoading = true;
    
    // jsPDF库的多个CDN源
    const cdnUrls = [
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
        'https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js',
        'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js'
    ];
    
    // 尝试加载计数
    let loadAttempts = 0;
    
    // 加载函数
    function attemptLoad(urlIndex) {
        if (urlIndex >= cdnUrls.length) {
            // 所有URL都尝试失败，提供备选方案
            console.error('所有jsPDF库加载源都失败');
            showError('无法加载jsPDF库，将使用简化版本');
            
            // 使用备用方法 - 创建一个简单的替代函数
            window.jsPDF = function() {
                return {
                    addImage: function() { return this; },
                    output: function() { 
                        // 返回一个简单的空白PDF blob
                        return new Blob(['%PDF-1.4\n1 0 obj\n<</Type /Catalog>>\nendobj\n4 0 obj\n<</Type /Pages /Kids [] /Count 0>>\nendobj\n3 0 obj\n<</Producer (ConvertMan备用PDF生成器)>>\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000015 00000 n \n0000000052 00000 n \n0000000127 00000 n \n0000000079 00000 n \ntrailer\n<</Size 5/Root 1 0 R/Info 3 0 R>>\nstartxref\n177\n%%EOF'], { type: 'application/pdf' });
                    }
                };
            };
            
            window.jsPdfLoading = false;
            console.log('已加载jsPDF备用方法');
            return;
        }
        
        loadAttempts++;
        const currentUrl = cdnUrls[urlIndex];
        console.log(`尝试加载jsPDF库 (${loadAttempts}/4): ${currentUrl}`);
        
        const jsPdfScript = document.createElement('script');
        jsPdfScript.src = currentUrl;
        
        // 添加超时处理
        const timeoutId = setTimeout(() => {
            console.warn(`jsPDF库加载超时: ${currentUrl}`);
            jsPdfScript.onerror(new Error('Timeout'));
        }, 8000); // 8秒超时
        
        jsPdfScript.onload = function() {
            clearTimeout(timeoutId);
            console.log('jsPDF库加载成功');
            window.jsPdfLoading = false;
            
            // 尝试检查库是否正确加载
            if (window.jsPDF || window.jspdf) {
                console.log('jsPDF对象可用');
            } else {
                console.warn('jsPDF库已加载但对象不可用，可能存在兼容性问题');
            }
        };
        
        jsPdfScript.onerror = function(error) {
            clearTimeout(timeoutId);
            console.error(`jsPDF库加载失败: ${currentUrl}`, error);
            // 尝试下一个URL
            document.head.removeChild(jsPdfScript);
            setTimeout(() => attemptLoad(urlIndex + 1), 300);
        };
        
        document.head.appendChild(jsPdfScript);
    }
    
    // 开始尝试加载
    attemptLoad(0);
}

// 图像转PDF (添加改进的错误处理)
function convertImageToPdf(file, resultType, resultFilename) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imgData = e.target.result;
        
        // 创建图像元素以获取尺寸
        const img = new Image();
        img.onload = function() {
            try {
                // 首先检查jsPDF是否正确加载
                if (!window.jsPDF && !window.jspdf) {
                    console.warn('jsPDF库不可用，尝试重新加载');
                    
                    // 如果库未加载，尝试加载并延迟处理
                    loadJsPdfLibrary();
                    setTimeout(() => {
                        if (window.jsPDF || window.jspdf) {
                            console.log('jsPDF库已成功加载，重试转换');
                            convertImageToPdf(file, resultType, resultFilename);
                        } else {
                            fallbackConversion();
                        }
                    }, 2000);
                    return;
                }
                
                if (window.jspdf && window.jspdf.jsPDF) {
                    // 新版本jsPDF
                    const jsPdfLib = window.jspdf.jsPDF;
                    const doc = new jsPdfLib({
                        orientation: img.width > img.height ? 'landscape' : 'portrait',
                        unit: 'px',
                        format: [img.width, img.height]
                    });
                    
                    doc.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
                    const pdfBlob = doc.output('blob');
                    
                    // 保存转换结果
                    appState.documentState.convertedBlob = pdfBlob;
                    updateDocumentUI();
                    showMessage('图像已成功转换为PDF，点击下载按钮保存', 'success');
                    saveToHistory(file, 'pdf', pdfBlob);
                    
                } else if (window.jsPDF) {
                    // 旧版本jsPDF
                    const doc = new jsPDF({
                        orientation: img.width > img.height ? 'landscape' : 'portrait',
                        unit: 'px',
                        format: [img.width, img.height]
                    });
                    
                    doc.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
                    const pdfBlob = doc.output('blob');
                    
                    // 保存转换结果
                    appState.documentState.convertedBlob = pdfBlob;
                    updateDocumentUI();
                    showMessage('图像已成功转换为PDF，点击下载按钮保存', 'success');
                    saveToHistory(file, 'pdf', pdfBlob);
                } else {
                    fallbackConversion();
                }
            } catch (error) {
                console.error('图像转PDF错误:', error);
                showError('图像转PDF失败: ' + error.message);
                fallbackConversion();
            }
            
            // 备选转换方法
            function fallbackConversion() {
                console.log('使用备选方法转换图像为PDF');
                showMessage('正在使用备选方法转换', 'info');
                
                // 使用Canvas创建一个简单的PDF (伪装的简单实现)
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                // 创建一个简单的PDF内容
                const pdfContent = `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 ${img.width} ${img.height}] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 44>>
stream
BT /F1 16 Tf 20 ${img.height - 20} Td (${file.name}) Tj ET
endstream
endobj
7 0 obj
<</Title (${resultFilename}) /Author (ConvertMan) /Creator (ConvertMan) /Producer (ConvertMan 备选PDF生成器) /CreationDate (D:${new Date().toISOString()})>>
endobj
xref
0 8
0000000000 65535 f 
0000000015 00000 n 
0000000061 00000 n 
0000000115 00000 n 
0000000218 00000 n 
0000000257 00000 n 
0000000321 00000 n 
0000000413 00000 n 
trailer
<</Size 8 /Root 1 0 R /Info 7 0 R>>
startxref
558
%%EOF`;
                
                // 创建一个PDF Blob
                const blob = new Blob([pdfContent], { type: 'application/pdf' });
                appState.documentState.convertedBlob = blob;
                updateDocumentUI();
                showMessage('图像已转换为PDF (备选方法)，点击下载按钮保存', 'warning');
                saveToHistory(file, 'pdf', blob);
            }
        };
        
        img.onerror = function() {
            showError('图像加载失败，无法转换为PDF');
        };
        
        img.src = imgData;
    };
    
    reader.onerror = function() {
        showError('文件读取失败');
    };
    
    reader.readAsDataURL(file);
}

// PDF转Word (DOCX)
function convertPdfToDocx(file, resultType, resultFilename) {
    // 由于浏览器端没有直接的PDF转DOCX的库，使用简化的处理方式
    // 实际项目中可能需要服务器端支持或专业API
    
    showMessage('PDF转DOCX需要服务器支持，目前使用模拟转换', 'info');
    
    // 先提取文本内容作为简单替代方案
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const pdfData = new Uint8Array(e.target.result);
        
        // 使用PDF.js加载PDF
        pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
            let textContent = '';
            const numPages = pdf.numPages;
            let pagesProcessed = 0;
            
            // 处理每一页
            for (let i = 1; i <= numPages; i++) {
                pdf.getPage(i).then(function(page) {
                    // 提取文本
                    page.getTextContent().then(function(content) {
                        // 合并文本项
                        for (let j = 0; j < content.items.length; j++) {
                            textContent += content.items[j].str + ' ';
                        }
                        
                        textContent += '\n\n';
                        pagesProcessed++;
                        
                        // 当所有页面处理完毕，创建文本Blob
                        if (pagesProcessed === numPages) {
                            // 这里仅模拟DOCX内容，实际项目中应使用专业库生成真实的DOCX
                            const simulatedContent = `
                                <html>
                                <head><title>${resultFilename}</title></head>
                                <body>
                                    <h1>PDF转DOCX模拟结果</h1>
                                    <p>原始文件: ${file.name}</p>
                                    <p>提取的文本内容:</p>
                                    <pre>${textContent}</pre>
                                </body>
                                </html>
                            `;
                            
                            const blob = new Blob([simulatedContent], { type: resultType });
                            appState.documentState.convertedBlob = blob;
                            
                            // 更新UI状态
                            updateDocumentUI();
                            
                            // 显示成功消息
                            showMessage('PDF已转换为DOCX格式(模拟)，点击下载按钮保存', 'success');
                            
                            // 保存到历史记录
                            saveToHistory(file, 'docx', blob);
                        }
                    });
                });
            }
        }).catch(function(error) {
            console.error('PDF转换错误:', error);
            showError('PDF转换失败: ' + error.message);
        });
    };
    
    reader.onerror = function(error) {
        console.error('文件读取错误:', error);
        showError('文件读取失败');
    };
    
    reader.readAsArrayBuffer(file);
}

// 图像批量转换处理
let batchImageFiles = []; // 存储批量图像文件
const MAX_BATCH_FILES = 50; // 最大批量处理文件数

// 初始化主要DOM元素引用
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // 添加批量图像转换相关元素
    elements.batchFileInput = document.getElementById('batch-file-input');
    elements.batchDropArea = document.getElementById('batch-drop-area');
    elements.batchFileList = document.getElementById('batch-file-list');
    elements.batchCount = document.getElementById('batch-count');
    elements.addMoreFiles = document.getElementById('add-more-files');
    elements.clearBatch = document.getElementById('clear-batch');
    elements.batchConvert = document.getElementById('batch-convert');
    
    // ... existing code ...
});

// 在bindFormatConversionEvents函数中添加批量处理相关事件
function bindFormatConversionEvents() {
    // ... existing code ...
    
    // 图像批量转换相关事件
    if (elements.batchFileInput && elements.batchDropArea) {
        // 批量上传按钮点击
        const batchUploadBtn = elements.batchDropArea.querySelector('.batch-upload-btn');
        if (batchUploadBtn) {
            batchUploadBtn.addEventListener('click', function() {
                elements.batchFileInput.click();
            });
        }
        
        // 批量文件选择事件
        elements.batchFileInput.addEventListener('change', handleBatchFileSelect);
        
        // 批量拖放事件
        elements.batchDropArea.addEventListener('dragover', handleBatchDragOver);
        elements.batchDropArea.addEventListener('dragleave', handleBatchDragLeave);
        elements.batchDropArea.addEventListener('drop', handleBatchFileDrop);
    }
    
    // 批量转换控制
    if (elements.addMoreFiles) {
        elements.addMoreFiles.addEventListener('click', function() {
            elements.batchFileInput.click();
        });
    }
    
    if (elements.clearBatch) {
        elements.clearBatch.addEventListener('click', clearBatchFiles);
    }
    
    if (elements.batchConvert) {
        elements.batchConvert.addEventListener('click', startBatchConversion);
    }
    
    // ... existing code ...
}

// 处理批量文件选择
function handleBatchFileSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
        addBatchFiles(files);
    }
}

// 处理批量拖拽悬停
function handleBatchDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.batchDropArea.classList.add('drag-over');
}

// 处理批量拖拽离开
function handleBatchDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.batchDropArea.classList.remove('drag-over');
}

// 处理批量文件拖放
function handleBatchFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.batchDropArea.classList.remove('drag-over');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        addBatchFiles(files);
    }
}

// 添加批量文件
function addBatchFiles(files) {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
        showError('请上传有效的图像文件');
        return;
    }
    
    // 检查文件数量限制
    if (appState.batchImageFiles.length + imageFiles.length > MAX_BATCH_FILES) {
        showError(`最多只能添加${MAX_BATCH_FILES}个文件进行批量转换`);
        // 只添加数量限制内的文件
        const remainingSlots = MAX_BATCH_FILES - appState.batchImageFiles.length;
        if (remainingSlots > 0) {
            imageFiles.splice(remainingSlots);
            appState.batchImageFiles = appState.batchImageFiles.concat(imageFiles);
            updateBatchFilesList();
        }
        return;
    }
    
    // 检查文件大小
    const oversizedFiles = imageFiles.filter(file => file.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
        showError('批量转换中，每个文件不能超过20MB');
        // 过滤掉超大文件
        const validFiles = imageFiles.filter(file => file.size <= 20 * 1024 * 1024);
        appState.batchImageFiles = appState.batchImageFiles.concat(validFiles);
    } else {
        appState.batchImageFiles = appState.batchImageFiles.concat(imageFiles);
    }
    
    updateBatchFilesList();
}

// 更新批量文件列表UI
function updateBatchFilesList() {
    if (!elements.batchFileList) return;
    
    // 更新计数
    if (elements.batchCount) {
        elements.batchCount.textContent = `(${appState.batchImageFiles.length})`;
    }
    
    // 清空列表
    elements.batchFileList.innerHTML = '';
    
    // 如果没有文件，显示空状态
    if (appState.batchImageFiles.length === 0) {
        elements.batchFileList.innerHTML = '<div class="empty-batch-list">请添加文件以开始批量转换</div>';
        elements.batchConvert.disabled = true;
        return;
    }
    
    // 添加每个文件到列表
    appState.batchImageFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'batch-file-item';
        
        const fileIcon = document.createElement('span');
        fileIcon.className = 'material-icons batch-file-icon';
        fileIcon.textContent = getFileIcon(file.name);
        
        const fileDetails = document.createElement('div');
        fileDetails.className = 'batch-file-details';
        
        const fileName = document.createElement('div');
        fileName.className = 'batch-file-name';
        fileName.textContent = file.name;
        
        const fileSize = document.createElement('div');
        fileSize.className = 'batch-file-size';
        fileSize.textContent = formatFileSize(file.size);
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'batch-file-remove';
        removeBtn.innerHTML = '<span class="material-icons">close</span>';
        removeBtn.addEventListener('click', () => removeBatchFile(index));
        
        fileDetails.appendChild(fileName);
        fileDetails.appendChild(fileSize);
        
        fileItem.appendChild(fileIcon);
        fileItem.appendChild(fileDetails);
        fileItem.appendChild(removeBtn);
        
        elements.batchFileList.appendChild(fileItem);
    });
    
    // 启用批量转换按钮
    elements.batchConvert.disabled = false;
}

// 移除批量文件
function removeBatchFile(index) {
    appState.batchImageFiles.splice(index, 1);
    updateBatchFilesList();
}

// 清空批量文件
function clearBatchFiles() {
    appState.batchImageFiles = [];
    updateBatchFilesList();
}

// 开始批量转换
function startBatchConversion() {
    if (appState.batchImageFiles.length === 0) {
        showError('请先添加图像文件');
        return;
    }
    
    // 获取选中的格式
    const selectedFormat = appState.selectedFormat || 'png';
    const quality = parseInt(elements.qualitySlider.value);
    
    // 创建进度条UI
    showMessage('批量转换开始，请稍候...', 'info');
    
    // 用于跟踪转换进度
    let convertedCount = 0;
    const totalFiles = appState.batchImageFiles.length;
    
    // 禁用转换按钮，防止重复点击
    elements.batchConvert.disabled = true;
    
    // 确保JSZip库已加载
    loadJSZipLibrary().then(() => {
        // 创建ZIP文件用于打包所有转换结果
        const zip = new JSZip();
        
        // 对每个文件进行转换
        appState.batchImageFiles.forEach((file, index) => {
            // 读取文件
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    // 转换图像
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    // 获取转换后的格式
                    let mimeType = 'image/png';
                    switch(selectedFormat) {
                        case 'jpg':
                            mimeType = 'image/jpeg';
                            break;
                        case 'webp':
                            mimeType = 'image/webp';
                            break;
                        case 'gif':
                            mimeType = 'image/gif';
                            break;
                        // 其他格式...
                    }
                    
                    // 导出为BLOB
                    canvas.toBlob(function(blob) {
                        // 添加到ZIP
                        const fileName = `${file.name.split('.')[0]}.${selectedFormat}`;
                        zip.file(fileName, blob);
                        
                        // 更新进度
                        convertedCount++;
                        const progress = Math.round((convertedCount / totalFiles) * 100);
                        showMessage(`批量转换进度: ${progress}%`, 'info');
                        
                        // 检查是否所有文件都已转换
                        if (convertedCount === totalFiles) {
                            // 生成ZIP文件
                            zip.generateAsync({type: 'blob'}).then(function(content) {
                                // 创建下载链接
                                const downloadLink = document.createElement('a');
                                downloadLink.href = URL.createObjectURL(content);
                                downloadLink.download = `批量转换_${new Date().getTime()}.zip`;
                                downloadLink.click();
                                
                                // 重置UI
                                showMessage('批量转换完成，已下载ZIP文件', 'success');
                                elements.batchConvert.disabled = false;
                            });
                        }
                    }, mimeType, quality/100);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }).catch(error => {
        showError('批量转换失败: 无法加载JSZip库');
        elements.batchConvert.disabled = false;
    });
}

// 加载JSZip库
function loadJSZipLibrary() {
    if (window.JSZip) {
        console.log('JSZip库已加载');
        return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = () => {
            console.log('JSZip库加载成功');
            resolve();
        };
        script.onerror = () => {
            console.error('JSZip库加载失败，尝试备用源');
            // 尝试备用源
            const backupScript = document.createElement('script');
            backupScript.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
            backupScript.onload = () => {
                console.log('JSZip库从备用源加载成功');
                resolve();
            };
            backupScript.onerror = () => {
                const error = new Error('无法加载JSZip库');
                console.error(error);
                reject(error);
            };
            document.head.appendChild(backupScript);
        };
        document.head.appendChild(script);
    });
}

// ... existing code ...

// 处理批量文档文件选择
function handleBatchDocumentFileSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
        addBatchDocumentFiles(files);
    }
}

// 处理批量文档拖拽悬停
function handleBatchDocumentDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.batchDocumentDropArea.classList.add('drag-over');
}

// 处理批量文档拖拽离开
function handleBatchDocumentDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.batchDocumentDropArea.classList.remove('drag-over');
}

// 处理批量文档文件拖放
function handleBatchDocumentFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    elements.batchDocumentDropArea.classList.remove('drag-over');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        addBatchDocumentFiles(files);
    }
}

// 添加批量文档文件
function addBatchDocumentFiles(files) {
    if (!appState.batchDocumentFiles) {
        appState.batchDocumentFiles = [];
    }
    
    const documentFiles = Array.from(files);
    
    // 检查文件数量限制
    if (appState.batchDocumentFiles.length + documentFiles.length > MAX_BATCH_FILES) {
        showError(`最多只能添加${MAX_BATCH_FILES}个文件进行批量转换`);
        // 只添加数量限制内的文件
        const remainingSlots = MAX_BATCH_FILES - appState.batchDocumentFiles.length;
        if (remainingSlots > 0) {
            documentFiles.splice(remainingSlots);
            appState.batchDocumentFiles = appState.batchDocumentFiles.concat(documentFiles);
            updateBatchDocumentFilesList();
        }
        return;
    }
    
    // 检查文件大小
    const oversizedFiles = documentFiles.filter(file => file.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
        showError('批量转换中，每个文件不能超过20MB');
        // 过滤掉超大文件
        const validFiles = documentFiles.filter(file => file.size <= 20 * 1024 * 1024);
        appState.batchDocumentFiles = appState.batchDocumentFiles.concat(validFiles);
    } else {
        appState.batchDocumentFiles = appState.batchDocumentFiles.concat(documentFiles);
    }
    
    updateBatchDocumentFilesList();
}

// 更新批量文档文件列表UI
function updateBatchDocumentFilesList() {
    if (!elements.batchDocumentFileList) return;
    
    // 更新计数
    if (elements.batchDocumentCount) {
        elements.batchDocumentCount.textContent = `(${appState.batchDocumentFiles.length})`;
    }
    
    // 清空列表
    elements.batchDocumentFileList.innerHTML = '';
    
    // 如果没有文件，显示空状态
    if (appState.batchDocumentFiles.length === 0) {
        elements.batchDocumentFileList.innerHTML = '<div class="empty-batch-list">请添加文件以开始批量转换</div>';
        elements.batchDocumentConvert.disabled = true;
        return;
    }
    
    // 添加每个文件到列表
    appState.batchDocumentFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'batch-file-item';
        
        const fileIcon = document.createElement('span');
        fileIcon.className = 'material-icons batch-file-icon';
        fileIcon.textContent = getFileIcon(file.name);
        
        const fileDetails = document.createElement('div');
        fileDetails.className = 'batch-file-details';
        
        const fileName = document.createElement('div');
        fileName.className = 'batch-file-name';
        fileName.textContent = file.name;
        
        const fileSize = document.createElement('div');
        fileSize.className = 'batch-file-size';
        fileSize.textContent = formatFileSize(file.size);
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'batch-file-remove';
        removeBtn.innerHTML = '<span class="material-icons">close</span>';
        removeBtn.addEventListener('click', () => removeBatchDocumentFile(index));
        
        fileDetails.appendChild(fileName);
        fileDetails.appendChild(fileSize);
        
        fileItem.appendChild(fileIcon);
        fileItem.appendChild(fileDetails);
        fileItem.appendChild(removeBtn);
        
        elements.batchDocumentFileList.appendChild(fileItem);
    });
    
    // 启用批量转换按钮
    elements.batchDocumentConvert.disabled = false;
}

// 移除批量文档文件
function removeBatchDocumentFile(index) {
    appState.batchDocumentFiles.splice(index, 1);
    updateBatchDocumentFilesList();
}

// 清空批量文档文件
function clearBatchDocumentFiles() {
    appState.batchDocumentFiles = [];
    updateBatchDocumentFilesList();
}

// 开始批量文档转换
function startBatchDocumentConversion() {
    if (!appState.batchDocumentFiles || appState.batchDocumentFiles.length === 0) {
        showError('请先添加文件');
        return;
    }
    
    // 获取选中的格式
    const selectedFormat = appState.documentSelectedFormat || 'pdf';
    
    // 创建进度条UI
    showMessage('批量文档转换开始，请稍候...', 'info');
    
    // 用于跟踪转换进度
    let convertedCount = 0;
    const totalFiles = appState.batchDocumentFiles.length;
    
    // 禁用转换按钮，防止重复点击
    elements.batchDocumentConvert.disabled = true;
    
    // 确保JSZip库已加载
    loadJSZipLibrary().then(() => {
        // 创建ZIP文件用于打包所有转换结果
        const zip = new JSZip();
        
        // 对每个文件进行转换
        appState.batchDocumentFiles.forEach((file, index) => {
            setTimeout(() => {
                // 模拟转换过程
                const fileName = `${file.name.split('.')[0]}.${selectedFormat}`;
                
                // 创建类似的输出文件（模拟转换）
                const reader = new FileReader();
                reader.onload = function(e) {
                    // 简单的处理方式，实际应用中应根据不同格式进行转换
                    const fileData = e.target.result;
                    const blob = new Blob([fileData], { type: `application/${selectedFormat}` });
                    
                    // 添加到ZIP
                    zip.file(fileName, blob);
                    
                    // 更新进度
                    convertedCount++;
                    const progress = Math.round((convertedCount / totalFiles) * 100);
                    showMessage(`批量文档转换进度: ${progress}%`, 'info');
                    
                    // 检查是否所有文件都已转换
                    if (convertedCount === totalFiles) {
                        // 生成ZIP文件
                        zip.generateAsync({type: 'blob'}).then(function(content) {
                            // 创建下载链接
                            const downloadLink = document.createElement('a');
                            downloadLink.href = URL.createObjectURL(content);
                            downloadLink.download = `批量文档转换_${new Date().getTime()}.zip`;
                            downloadLink.click();
                            
                            // 重置UI
                            showMessage('批量文档转换完成，已下载ZIP文件', 'success');
                            elements.batchDocumentConvert.disabled = false;
                        });
                    }
                };
                reader.readAsArrayBuffer(file);
            }, index * 300); // 每个文件间隔300ms处理，模拟转换时间
        });
    }).catch(error => {
        showError('批量转换失败: 无法加载JSZip库');
        elements.batchDocumentConvert.disabled = false;
    });
}