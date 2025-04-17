/**
 * 格式转码侠 - 主脚本文件
 * 实现图像格式转换工具的核心功能
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
    mainNavItems: document.querySelectorAll('.main-nav li'),
    converterTab: document.getElementById('converter-tab'),
    historyTab: document.getElementById('history-tab'),
    helpTab: document.getElementById('help-tab'),
    
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
    addMoreFilesBtn: document.getElementById('add-more-files'),
    clearBatchBtn: document.getElementById('clear-batch'),
    batchConvertBtn: document.getElementById('batch-convert'),
    
    // 主导航标签页相关
    imageTab: document.getElementById('image-tab'),
    pdfTab: document.getElementById('pdf-tab'),
    documentTab: document.getElementById('document-tab'),
    videoTab: document.getElementById('video-tab'),
    compressTab: document.getElementById('compress-tab'),
    
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
};

// 初始化应用
function initApp() {
    bindEventListeners();
    updateUI();
}

// 绑定事件监听器
function bindEventListeners() {
    // 文件上传相关事件
    elements.uploadBtn.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileSelect);
    elements.dropArea.addEventListener('dragover', handleDragOver);
    elements.dropArea.addEventListener('dragleave', handleDragLeave);
    elements.dropArea.addEventListener('drop', handleFileDrop);
    elements.fetchUrlBtn.addEventListener('click', handleUrlFetch);
    
    // 格式选择事件
    elements.formatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setFormat(btn.dataset.format);
        });
    });
    
    // 质量设置事件
    elements.qualitySlider.addEventListener('input', handleQualityChange);
    
    // 尺寸设置事件
    elements.widthInput.addEventListener('input', handleWidthChange);
    elements.heightInput.addEventListener('input', handleHeightChange);
    elements.ratioLock.addEventListener('click', toggleRatioLock);
    
    // 预览控制事件
    elements.zoomIn.addEventListener('click', zoomIn);
    elements.zoomOut.addEventListener('click', zoomOut);
    elements.toggleSplit.addEventListener('click', toggleSplitView);
    
    // 操作按钮事件
    elements.convertBtn.addEventListener('click', startConversion);
    elements.cancelBtn.addEventListener('click', cancelConversion);
    elements.downloadBtn.addEventListener('click', downloadConvertedImage);
    
    // 标签切换事件
    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // 错误提示事件
    elements.closeError.addEventListener('click', hideError);
    
    // 弹窗事件
    elements.modalClose.addEventListener('click', hideModal);
    elements.modalDownloadBtn.addEventListener('click', downloadConvertedImage);
    elements.modalShareBtn.addEventListener('click', shareConvertedImage);
    
    // 高级选项变更事件
    elements.metadataToggle.addEventListener('change', updatePreview);
    elements.compressionType.addEventListener('change', updatePreview);
    
    // 主标签页切换事件
    elements.mainNavItems.forEach(item => {
        item.addEventListener('click', () => {
            switchMainTab(item.dataset.tab);
        });
    });
    
    // 历史记录相关事件
    elements.historySearchBtn.addEventListener('click', searchHistory);
    elements.historySearchInput.addEventListener('keyup', event => {
        if (event.key === 'Enter') searchHistory();
    });
    elements.clearAllHistory.addEventListener('click', clearAllHistory);
    
    // 委托事件绑定，处理历史记录项的操作
    elements.historyList.addEventListener('click', event => {
        const target = event.target.closest('button');
        if (!target) return;
        
        const historyItem = target.closest('.history-item');
        if (!historyItem) return;
        
        const itemIndex = historyItem.dataset.index;
        
        if (target.classList.contains('history-download')) {
            downloadFromHistory(itemIndex);
        } else if (target.classList.contains('history-delete')) {
            deleteFromHistory(itemIndex);
        }
    });
    
    // 新增快速转换相关事件
    elements.quickUploadBtn.addEventListener('click', () => elements.quickFileInput.click());
    elements.quickFileInput.addEventListener('change', handleQuickFileSelect);
    elements.quickFormatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setQuickFormat(btn.dataset.format);
        });
    });
    elements.quickConvertBtn.addEventListener('click', startQuickConversion);
    
    // 新增批量转换相关事件
    elements.batchUploadBtn.addEventListener('click', () => elements.batchFileInput.click());
    elements.batchFileInput.addEventListener('change', handleBatchFilesSelect);
    elements.batchDropArea.addEventListener('dragover', handleBatchDragOver);
    elements.batchDropArea.addEventListener('dragleave', handleBatchDragLeave);
    elements.batchDropArea.addEventListener('drop', handleBatchFileDrop);
    elements.addMoreFilesBtn.addEventListener('click', () => elements.batchFileInput.click());
    elements.clearBatchBtn.addEventListener('click', clearBatchFiles);
    elements.batchConvertBtn.addEventListener('click', startBatchConversion);
    
    // PDF转换相关事件
    if (elements.pdfUploadBtn) {
        elements.pdfUploadBtn.addEventListener('click', () => elements.pdfFileInput.click());
        elements.pdfFileInput.addEventListener('change', handlePdfFileSelect);
        elements.pdfDropArea.addEventListener('dragover', handlePdfDragOver);
        elements.pdfDropArea.addEventListener('dragleave', handlePdfDragLeave);
        elements.pdfDropArea.addEventListener('drop', handlePdfFileDrop);
        elements.pdfFetchUrl.addEventListener('click', handlePdfUrlFetch);
        elements.pdfConvertBtn.addEventListener('click', startPdfConversion);
        elements.pdfCancelBtn.addEventListener('click', cancelPdfConversion);
        elements.pdfDownloadBtn.addEventListener('click', downloadPdfConvertedFile);
        elements.pdfShareBtn.addEventListener('click', sharePdfConvertedFile);
        
        // 格式选择
        elements.pdfFormatItems.forEach(item => {
            item.addEventListener('click', () => {
                selectPdfFormat(item.dataset.format);
            });
        });
        
        // 转换类型切换
        elements.conversionTypes.forEach(item => {
            item.addEventListener('click', () => {
                switchConversionType(item.dataset.conversion);
            });
        });
    }
    
    // 文档转换相关事件
    if (elements.documentUploadBtn) {
        elements.documentUploadBtn.addEventListener('click', () => elements.documentFileInput.click());
        elements.documentFileInput.addEventListener('change', handleDocumentFileSelect);
        elements.documentDropArea.addEventListener('dragover', handleDocumentDragOver);
        elements.documentDropArea.addEventListener('dragleave', handleDocumentDragLeave);
        elements.documentDropArea.addEventListener('drop', handleDocumentFileDrop);
        elements.documentFetchUrl.addEventListener('click', handleDocumentUrlFetch);
        elements.documentConvertBtn.addEventListener('click', startDocumentConversion);
        elements.documentCancelBtn.addEventListener('click', cancelDocumentConversion);
    }
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

// 切换主标签页
function switchMainTab(tabId) {
    if (!tabId || tabId === appState.currentMainTab) return;
    
    appState.currentMainTab = tabId;
    
    // 更新导航项选中状态
    elements.mainNavItems.forEach(item => {
        item.classList.toggle('active', item.dataset.tab === tabId);
    });
    
    // 隐藏所有标签页内容
    elements.converterTab.style.display = 'none';
    elements.historyTab.style.display = 'none';
    elements.helpTab.style.display = 'none';
    
    // 显示选中的标签页
    switch (tabId) {
        case 'converter':
            elements.converterTab.style.display = 'grid';
            break;
        case 'history':
            elements.historyTab.style.display = 'block';
            loadHistoryFromStorage();
            break;
        case 'help':
            elements.helpTab.style.display = 'block';
            break;
    }
}

// 历史记录管理相关 ----------------------------------------

// 保存转换记录到历史
function saveToHistory(originalFile, format, blob) {
    const historyItem = {
        id: Date.now(), // 使用时间戳作为唯一ID
        originalName: originalFile.name,
        originalFormat: originalFile.name.split('.').pop().toUpperCase(),
        originalSize: originalFile.size,
        targetFormat: format.toUpperCase(),
        convertedSize: blob.size,
        date: new Date().toISOString(),
        blob: blob, // 转换后的文件数据
        thumbnail: null // 缩略图将稍后生成
    };
    
    // 生成缩略图
    generateThumbnail(appState.originalImage).then(thumbnail => {
        historyItem.thumbnail = thumbnail;
        
        // 添加到历史记录并保存
        const historyItems = getHistoryFromStorage();
        historyItems.unshift(historyItem); // 添加到开头
        
        // 限制历史记录数量，最多保存50条
        if (historyItems.length > 50) {
            historyItems.pop();
        }
        
        saveHistoryToStorage(historyItems);
    });
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

// 当页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp); 