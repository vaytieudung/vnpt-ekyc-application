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
                mainTitle: 'XĂ¡c thá»±c giáº¥y tá»',
                mainSubtitle: 'Chá»n giáº¥y tá» báº¡n muá»‘n xĂ¡c thá»±c',
                idCardText: 'Chá»©ng minh thÆ°, Tháº» cÄƒn cÆ°á»›c',
                passportText: 'Há»™ chiáº¿u',
                licenseText: 'Báº±ng lĂ¡i xe',
                otherText: 'Giáº¥y tá» khĂ¡c',
                modalTitle: 'HÆ°á»›ng dáº«n chá»¥p áº£nh CMT, CCCD',
                step1Text: 'BÆ°á»›c 1: Chá»¥p máº·t trÆ°á»›c',
                step2Text: 'BÆ°á»›c 2: Chá»¥p máº·t sau',
                instruction1: 'ÄÆ°a giáº¥y tá» vĂ o gáº§n camera sao cho 4 gĂ³c cá»§a giáº¥y tá» trĂ¹ng vá»›i vĂ¹ng giá»›i háº¡n',
                instruction2: 'Chá»¥p rĂµ nĂ©t vĂ  Ä‘áº§y Ä‘á»§ thĂ´ng tin trĂªn giáº¥y tá»',
                badExample1: 'KhĂ´ng chá»¥p quĂ¡ má»',
                badExample2: 'KhĂ´ng chá»¥p máº¥t gĂ³c',
                badExample3: 'KhĂ´ng chá»¥p lĂ³a sĂ¡ng',
                startBtn: 'Báº®T Äáº¦U',
                cameraTitle: 'CHá»¤P Máº¶T TRÆ¯á»C',
                captureBtnText: 'CHá»¤P áº¢NH',
                uploadBtnText: 'Táº¢I áº¢NH LĂN',
                cameraInstructions: 'Xin vui lĂ²ng Ä‘áº·t giáº¥y tá» náº±m vá»«a khung hĂ¬nh chá»¯ nháº­t, chá»¥p Ä‘á»§ Ă¡nh sĂ¡ng vĂ  rĂµ nĂ©t',
                guideLink: 'HÆ°á»›ng dáº«n',
                faceTitle: 'XĂC THá»°C KHUĂ”N Máº¶T',
                faceCaptureBtnText: 'CHá»¤P áº¢NH',
                faceInstructions: 'Äáº·t khuĂ´n máº·t vĂ o khung hĂ¬nh oval vĂ  giá»¯ yĂªn',
                loadingText: 'Äang táº£i mĂ´ hĂ¬nh AI...',
                progressStep: 'BÆ°á»›c',
                faceProgressStep: 'BÆ°á»›c 3/4',
                faceDetected: 'ÄĂ£ phĂ¡t hiá»‡n khuĂ´n máº·t',
                faceNotDetected: 'KhĂ´ng phĂ¡t hiá»‡n khuĂ´n máº·t',
                positionFace: 'HĂ£y Ä‘áº·t máº·t vĂ o khung oval',
                cameraError: 'KhĂ´ng thá»ƒ truy cáº­p camera. Vui lĂ²ng kiá»ƒm tra quyá»n truy cáº­p.',
                modelLoadError: 'KhĂ´ng thá»ƒ táº£i mĂ´ hĂ¬nh AI. Vui lĂ²ng thá»­ láº¡i.',
                captureSuccess: 'Chá»¥p áº£nh thĂ nh cĂ´ng!',
                processingImage: 'Äang xá»­ lĂ½ áº£nh...',
                httpsRequired: 'YĂªu cáº§u HTTPS Ä‘á»ƒ sá»­ dá»¥ng camera. Vui lĂ²ng truy cáº­p qua HTTPS.',
                browserNotSupported: 'TrĂ¬nh duyá»‡t khĂ´ng há»— trá»£ camera. Vui lĂ²ng sá»­ dá»¥ng trĂ¬nh duyá»‡t hiá»‡n Ä‘áº¡i.',
                permissionDenied: 'Quyá»n truy cáº­p camera bá»‹ tá»« chá»‘i. Vui lĂ²ng cho phĂ©p truy cáº­p camera.',
                deviceNotFound: 'KhĂ´ng tĂ¬m tháº¥y camera. Vui lĂ²ng kiá»ƒm tra thiáº¿t bá»‹.',
                fallbackMode: 'Cháº¿ Ä‘á»™ dá»± phĂ²ng: Sá»­ dá»¥ng táº£i áº£nh lĂªn thay vĂ¬ camera.',
                faceGuideTitle: 'HÆ°á»›ng dáº«n xĂ¡c thá»±c khuĂ´n máº·t',
                videoCaption: 'Xem video hÆ°á»›ng dáº«n Ä‘á»ƒ biáº¿t cĂ¡ch Ä‘áº·t khuĂ´n máº·t Ä‘Ăºng cĂ¡ch',
                skipVideoBtn: 'Bá» qua',
                continueAfterVideoBtn: 'Tiáº¿p tá»¥c'
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
                fallbackMode: 'Fallback mode: Using file upload instead of camera.',
                faceGuideTitle: 'Face Verification Guide',
                videoCaption: 'Watch the guide video to learn how to position your face correctly',
                skipVideoBtn: 'Skip',
                continueAfterVideoBtn: 'Continue'
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

    // 1. Kiá»ƒm tra quyá»n truy cáº­p Camera
    async checkCameraPermissions() {
        try {
            if (this.debugMode) console.log('Checking camera permissions...');
            
            // Kiá»ƒm tra vĂ  yĂªu cáº§u quyá»n camera
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: this.config.faceAuth.width,
                    height: this.config.faceAuth.height,
                    facingMode: this.config.faceAuth.facingMode
                } 
            });
            
            // Dá»«ng stream test
            stream.getTracks().forEach(track => track.stop());
            
            if (this.debugMode) console.log('Camera permissions granted');
            return true;
            
        } catch (error) {
            this.handleFaceAuthError(error);
            return false;
        }
    }

    // 2. Kiá»ƒm tra HTTPS
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

    // 3. Kiá»ƒm tra Browser Support
    checkBrowserSupport() {
        // Kiá»ƒm tra browser há»— trá»£
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showError(this.translations[this.currentLanguage].browserNotSupported);
            this.enableFallbackMode();
            return false;
        }

        // Kiá»ƒm tra cĂ¡c API cáº§n thiáº¿t
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

    // 4. Cáº¥u hĂ¬nh SDK Ä‘Ăºng cĂ¡ch
    configureFaceAuthSDK() {
        // VĂ­ dá»¥ cáº¥u hĂ¬nh cÆ¡ báº£n
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

    // 5. Kiá»ƒm tra DOM Element
    checkDOMElements() {
        // Kiá»ƒm tra element tá»“n táº¡i
        const container = document.getElementById('faceVideoElement');
        if (!container) {
            console.error('Face auth container not found');
            return false;
        }

        // Kiá»ƒm tra kĂ­ch thÆ°á»›c container
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            console.error('Face auth container has no dimensions');
            return false;
        }

        if (this.debugMode) console.log('DOM elements check passed');
        return true;
    }

    // 6. Xá»­ lĂ½ lá»—i phá»• biáº¿n
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
                errorMessage = 'Camera Ä‘ang Ä‘Æ°á»£c sá»­ dá»¥ng bá»Ÿi á»©ng dá»¥ng khĂ¡c';
                break;
            case 'OverconstrainedError':
            case 'ConstraintNotSatisfiedError':
                errorMessage = 'Camera khĂ´ng há»— trá»£ cáº¥u hĂ¬nh yĂªu cáº§u';
                break;
            case 'NotSupportedError':
                errorMessage = this.translations[this.currentLanguage].browserNotSupported;
                break;
            case 'AbortError':
                errorMessage = 'Truy cáº­p camera bá»‹ há»§y bá»';
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
        // Fallback náº¿u face auth khĂ´ng hoáº¡t Ä‘á»™ng
        if (!this.faceAuthSupported) {
            this.showError(this.translations[this.currentLanguage].fallbackMode);
            
            // áº¨n camera controls, chá»‰ hiá»‡n upload button
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

        // Face guide video modal controls
        const skipVideoBtn = document.getElementById('skipVideoBtn');
        const continueAfterVideoBtn = document.getElementById('continueAfterVideoBtn');

        if (skipVideoBtn) {
            skipVideoBtn.addEventListener('click', () => {
                this.hideFaceGuideModal();
            });
        }

        if (continueAfterVideoBtn) {
            continueAfterVideoBtn.addEventListener('click', () => {
                this.hideFaceGuideModal();
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
                    title = this.currentLanguage === 'vi' ? 'HÆ°á»›ng dáº«n chá»¥p áº£nh Há»™ chiáº¿u' : 'Passport Photo Guidelines';
                    break;
                case 'license':
                    title = this.currentLanguage === 'vi' ? 'HÆ°á»›ng dáº«n chá»¥p áº£nh Báº±ng lĂ¡i xe' : 'Driver License Photo Guidelines';
                    break;
                case 'other':
                    title = this.currentLanguage === 'vi' ? 'HÆ°á»›ng dáº«n chá»¥p áº£nh Giáº¥y tá» khĂ¡c' : 'Other Document Photo Guidelines';
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
                cameraTitle.textContent = this.currentLanguage === 'vi' ? 'CHá»¤P Máº¶T TRÆ¯á»C' : 'TAKE FRONT PHOTO';
            } else if (this.currentStep === 2) {
                cameraTitle.textContent = this.currentLanguage === 'vi' ? 'CHá»¤P Máº¶T SAU' : 'TAKE BACK PHOTO';
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
            this.showError('Lá»—i khi chá»¥p áº£nh. Vui lĂ²ng thá»­ láº¡i.');
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
            this.showError('Lá»—i khi táº£i áº£nh lĂªn. Vui lĂ²ng thá»­ láº¡i.');
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
        
        // Hide camera interface
        if (cameraInterface) {
            cameraInterface.classList.add('hidden');
        }

        // Stop document camera
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
        }

        // Show face guide video modal first
        this.showFaceGuideModal();
    }

    showFaceGuideModal() {
        const faceGuideModal = document.getElementById('faceGuideModal');
        const faceGuideVideo = document.getElementById('faceGuideVideo');
        
        if (faceGuideModal) {
            faceGuideModal.classList.remove('hidden');
            faceGuideModal.classList.add('fade-in');
            
            // Auto play video if possible
            if (faceGuideVideo) {
                faceGuideVideo.currentTime = 0;
                faceGuideVideo.play().catch(e => {
                    console.log('Auto-play prevented:', e);
                });
            }
        }
    }

    hideFaceGuideModal() {
        const faceGuideModal = document.getElementById('faceGuideModal');
        const faceGuideVideo = document.getElementById('faceGuideVideo');
        
        if (faceGuideModal) {
            faceGuideModal.classList.add('fade-out');
            
            // Pause video
            if (faceGuideVideo) {
                faceGuideVideo.pause();
            }
            
            setTimeout(() => {
                faceGuideModal.classList.add('hidden');
                faceGuideModal.classList.remove('fade-in', 'fade-out');
                
                // Now show face verification
                this.showFaceVerificationInterface();
            }, 300);
        }
    }

    async showFaceVerificationInterface() {
        const faceVerification = document.getElementById('faceVerification');
        
        if (faceVerification) {
            faceVerification.classList.remove('hidden');
            faceVerification.classList.add('fade-in');
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
            
            // 7. Debug Steps - Báº­t debug mode
            const config = {
                debug: this.debugMode,
                modelPath: './models',
                loadTimeout: 30000
            };

            if (this.debugMode) {
                console.log('Loading face detection models with config:', config);
            }
            
            // Load face-api.js models from CDN URLs
            await faceapi.nets.tinyFaceDetector.loadFromUri('https://vaytieudung.github.io/shinhanbank/models/tiny_face_detector_model-weights_manifest.json');
            await faceapi.nets.faceLandmark68Net.loadFromUri('https://vaytieudung.github.io/shinhanbank/models/face_landmark_68_model-weights_manifest.json');
            await faceapi.nets.faceRecognitionNet.loadFromUri('https://vaytieudung.github.io/shinhanbank/models/face_recognition_model-weights_manifest.json');
            await faceapi.nets.faceExpressionNet.loadFromUri('https://vaytieudung.github.io/shinhanbank/models/face_expression_model-weights_manifest.json');
            
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
            this.showError('Lá»—i khi chá»¥p áº£nh khuĂ´n máº·t. Vui lĂ²ng thá»­ láº¡i.');
        }
    }

    completeVerification() {
        // Stop camera
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
        }
        
        this.faceDetectionActive = false;
        
        // Show completion message
        this.showSuccess('XĂ¡c thá»±c hoĂ n táº¥t! Äang chuyá»ƒn hÆ°á»›ng...');
        
        // Redirect to success page after 2 seconds
        setTimeout(() => {
            window.location.href = 'https://vaytieudung.github.io/shinhanbank/pages/vi/step5.html';
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
                <span class="error-icon">âœ“</span>
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
