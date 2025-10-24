export type Language = "en" | "pt" | "es"

export const translations = {
  en: {
    // Validation
    validation: {
      email: { invalid: "Please enter a valid email address" },
      fullName: {
        required: "Full name is required",
        format: "Please enter your full name with at least first and last name",
      },
      dateOfBirth: {
        required: "Date of birth is required",
        minAge: "You must be at least 18 years old",
        invalid: "Invalid date of birth",
      },
      phone: {
        required: "Phone number is required",
        invalid: "Please enter a valid phone number",
      },
      country: { required: "Country is required" },
      address: {
        street: { required: "Full address is required" },
        city: { required: "City is required" },
        state: { required: "State is required" },
        postalCode: { required: "Postal code is required" },
        addressProof: {
          required: "Address proof document is required",
          maxSize: "File must be at most 5MB",
          type: "Only PDF, JPG or PNG files are allowed",
        },
      },
      identity: {
        idType: { required: "Please select an ID type" },
        idNumber: { 
          required: "ID number is required",
          invalid: "Invalid CPF number",
        },
        idFront: {
          required: "ID front image is required",
          maxSize: "File must be at most 5MB",
          type: "Only JPG or PNG images are allowed",
        },
        idBack: { 
          required: "Back side image is required for this ID type",
          maxSize: "File must be at most 5MB",
          type: "Only JPG or PNG images are allowed",
        },
      },
      selfie: { 
        required: "Selfie is required",
        maxSize: "File must be at most 5MB", 
        type: "Only JPG or PNG images are allowed" 
      },
      terms: { accept: "You must accept the terms and conditions" },
    },
    // Generic/Header/Sidebar
    menu: "Menu",
    dashboard: "Dashboard",
    accounts: "Accounts",
    deposit: "Deposit",
    transfer: "Transfer",
    withdraw: "Withdraw",
    affiliate: "Affiliate",
    leaderboards: "Leaderboards",
    faq: "FAQ",
    contactUs: "Contact us",
    legalDocuments: "Legal Documents",

    // KYC Steps
    kycVerification: "KYC Verification",
    personalInfo: "Personal Info",
    address: "Address",
    identity: "Identity",
    selfie: "Selfie",
    review: "Review",

    // Personal Info Step
    personalInformation: "Personal Information",
    providePersonalDetails: "Please provide your personal details to begin the verification process.",
    fullName: "Full Name",
    fullNamePlaceholder: "Woovi Tester",
    email: "Email Address",
    emailPlaceholder: "challanger@woovi.com.br",
    phone: "Phone Number",
    phonePlaceholder: "+1 (555) 123-4567",
    dateOfBirth: "Date of Birth",
    country: "Country of Residence",
    selectCountry: "Select your country",
    selectCountryFirst: "Please select your country first",

    // Address Step
    addressVerification: "Address Verification",
    provideAddressDetails: "Enter your full address and upload a proof of address.",
    streetAddress: "Full Address",
    streetAddressPlaceholder: "123 Main St, Apt 4B, Building A",
    city: "City",
    cityPlaceholder: "New York",
    stateProvince: "State/Province",
    stateProvincePlaceholder: "NY",
    postalCode: "Postal Code",
    postalCodePlaceholder: "10001",
    addressProof: "Proof of Address (PDF, JPG, PNG)",
    fileConstraintsAddress: "Accepted: PDF, JPG, PNG. Max size: 5MB.",

    // Identity Step
    identityVerification: "Identity Verification",
    provideIdentityDetails: "Select your ID type, inform the number and upload documents.",
    idType: "ID Type",
    selectIdType: "Select an ID type",
    passport: "Passport",
    driversLicense: "Driver's License",
    rg: "RG",
    idNumber: "ID Number",
    idNumberPlaceholder: "000.000.000-00",
    idFrontUpload: "Upload ID (Front)",
    idBackUpload: "Upload ID (Back)",
    identityDocuments: "Identity Documents",
    fileConstraintsIdentity: "Accepted: JPG, PNG. Max size: 5MB.",
    idBackNote: "Back side required for RG and Driver's License.",

    // Selfie Step
    selfieVerification: "Selfie Verification",
    selfieInstructions: "Capture or upload a selfie. Face clearly visible, good lighting, no hats or sunglasses.",
    selfieUpload: "Upload Selfie",
    fileConstraintsSelfie: "Accepted: JPG, PNG. Max size: 5MB.",

    // Review Step
    reviewAndSubmit: "Review & Submit",
    reviewSummaryHint: "Review all information. You can edit any step before submitting.",
    edit: "Edit",
    termsAndConditions: "Terms and Conditions",
    acceptTermsLabel: "I have read and accept the",
    termsLink: "Terms and Conditions",
    openDocument: "Open document",

    // Buttons
    back: "Back",
    continue: "Continue",
    submit: "Submit",
    submitting: "Submitting...",

    // Success
    verificationSubmitted: "Verification Submitted!",
    submittedSuccessfully: "Your KYC verification has been submitted successfully. We'll review your information and notify you within 24-48 hours.",

    // Accessibility
    toggleTheme: "Toggle theme",
    changeLanguage: "Change language",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    install: "Install",
    installApp: "Install app",
    installAppTitle: "Add to Home Screen",
    installAppMessageIOS: "On iPhone, tap Share → Add to Home Screen.",

    // Keyboard Shortcuts
    keyboardShortcuts: "Keyboard Shortcuts",
    shortcutNext: "Continue/Submit",
    shortcutPrev: "Back",
    shortcutTab: "Navigate fields",

    // File Upload
    dropFileHere: "Drop file here",
    clickOrDragFile: "Click or drag file",
    selfieReady: "Selfie uploaded successfully",

    // Face Detection
    faceDetection: {
      selfieCaptureTitle: "Selfie Capture",
      selfieCaptureDesc: "We will verify your identity using a live selfie with face detection.",
      activateCamera: "Activate Camera",
      activatingCamera: "Activating camera...",
      acceptedFormats: "Accepted: JPG, PNG. Max size: 5MB.",
      placeFaceCenter: "Position your face in the center",
      faceDetected: "Face detected",
      noFaceDetected: "No face detected",
      noFaceDescription: "Position your face in the center and try again.",
      cancel: "Cancel",
      capturePhoto: "Capture Photo",
      delete: "Delete",
      retakePhoto: "Take another photo",
      selfieCaptured: "Selfie captured successfully",
      tipsTitle: "Tips for a good selfie:",
      tipFaceCentered: "Face fully visible and centered",
      tipGoodLighting: "Good lighting, avoid shadows",
      tipRemoveAccessories: "Remove sunglasses or hats",
      tipLookAtCamera: "Look directly at the camera",
      tipNoPhotosOrVideos: "Do not use photos or videos",
    },
  },
  pt: {
    // Validation
    validation: {
      email: { invalid: "Informe um e-mail válido" },
      fullName: {
        required: "Nome completo é obrigatório",
        format: "Informe nome e sobrenome (mínimo duas palavras)",
      },
      dateOfBirth: {
        required: "Data de nascimento é obrigatória",
        minAge: "Você deve ter pelo menos 18 anos",
        invalid: "Data de nascimento inválida",
      },
      phone: {
        required: "Número de telefone é obrigatório",
        invalid: "Informe um número de telefone válido",
      },
      country: { required: "País é obrigatório" },
      address: {
        street: { required: "Endereço completo é obrigatório" },
        city: { required: "Cidade é obrigatória" },
        state: { required: "Estado é obrigatório" },
        postalCode: { required: "CEP é obrigatório" },
        addressProof: {
          required: "Comprovante de endereço é obrigatório",
          maxSize: "Arquivo deve ter no máximo 5MB",
          type: "Apenas PDF, JPG ou PNG são permitidos",
        },
      },
      identity: {
        idType: { required: "Selecione um tipo de documento" },
        idNumber: { 
          required: "Número do documento é obrigatório",
          invalid: "CPF inválido",
        },
        idFront: {
          required: "Imagem da frente do documento é obrigatória",
          maxSize: "Arquivo deve ter no máximo 5MB",
          type: "Apenas imagens JPG ou PNG são permitidas",
        },
        idBack: { 
          required: "Imagem do verso é obrigatória para este tipo de documento",
          maxSize: "Arquivo deve ter no máximo 5MB",
          type: "Apenas imagens JPG ou PNG são permitidas",
        },
      },
      selfie: { 
        required: "Selfie é obrigatória",
        maxSize: "Arquivo deve ter no máximo 5MB", 
        type: "Apenas imagens JPG ou PNG são permitidas" 
      },
      terms: { accept: "Você deve aceitar os termos e condições" },
    },
    // Generic/Header/Sidebar
    menu: "Menu",
    dashboard: "Painel",
    accounts: "Contas",
    deposit: "Depositar",
    transfer: "Transferir",
    withdraw: "Sacar",
    affiliate: "Afiliado",
    leaderboards: "Classificações",
    faq: "Perguntas Frequentes",
    contactUs: "Fale Conosco",
    legalDocuments: "Documentos Legais",

    // KYC Steps
    kycVerification: "Verificação KYC",
    personalInfo: "Informações Pessoais",
    address: "Endereço",
    identity: "Identidade",
    selfie: "Selfie",
    review: "Revisão",

    // Personal Info Step
    personalInformation: "Informações Pessoais",
    providePersonalDetails: "Por favor, forneça seus dados pessoais para iniciar o processo de verificação.",
    fullName: "Nome Completo",
    fullNamePlaceholder: "Woovi Tester",
    email: "Endereço de E-mail",
    emailPlaceholder: "challanger@woovi.com.br",
    phone: "Número de Telefone",
    phonePlaceholder: "+55 (11) 98765-4321",
    dateOfBirth: "Data de Nascimento",
    country: "País de Residência",
    selectCountry: "Selecione seu país",
    selectCountryFirst: "Por favor, selecione seu país primeiro",

    // Address Step
    addressVerification: "Verificação de Endereço",
    provideAddressDetails: "Informe seu endereço completo e envie um comprovante.",
    streetAddress: "Endereço Completo",
    streetAddressPlaceholder: "Rua Exemplo, 123, Apto 4B, Bloco A",
    city: "Cidade",
    cityPlaceholder: "São Paulo",
    stateProvince: "Estado/Província",
    stateProvincePlaceholder: "SP",
    postalCode: "CEP",
    postalCodePlaceholder: "01234-567",
    addressProof: "Comprovante de Endereço (PDF, JPG, PNG)",
    fileConstraintsAddress: "Aceitos: PDF, JPG, PNG. Tamanho máx.: 5MB.",

    // Identity Step
    identityVerification: "Verificação de Identidade",
    provideIdentityDetails: "Selecione o tipo de documento, informe o número e envie os arquivos.",
    idType: "Tipo de Documento",
    selectIdType: "Selecione o tipo de documento",
    passport: "Passaporte",
    driversLicense: "Carteira de Motorista",
    rg: "RG",
    idNumber: "Número do Documento",
    idNumberPlaceholder: "000.000.000-00",
    idFrontUpload: "Enviar Documento (Frente)",
    idBackUpload: "Enviar Documento (Verso)",
    identityDocuments: "Documentos de Identidade",
    fileConstraintsIdentity: "Aceitos: JPG, PNG. Tamanho máx.: 5MB.",
    idBackNote: "Verso obrigatório para RG e CNH.",

    // Selfie Step
    selfieVerification: "Verificação de Selfie",
    selfieInstructions: "Capture ou envie uma selfie. Rosto visível, boa iluminação, sem bonés ou óculos escuros.",
    selfieUpload: "Enviar Selfie",
    fileConstraintsSelfie: "Aceitos: JPG, PNG. Tamanho máx.: 5MB.",

    // Review Step
    reviewAndSubmit: "Revisar e Enviar",
    reviewSummaryHint: "Revise todas as informações. Você pode editar qualquer etapa antes de enviar.",
    edit: "Editar",
    termsAndConditions: "Termos e Condições",
    acceptTermsLabel: "Li e aceito os",
    termsLink: "Termos e Condições",
    openDocument: "Abrir documento",

    // Buttons
    back: "Voltar",
    continue: "Continuar",
    submit: "Enviar",
    submitting: "Enviando...",

    // Success
    verificationSubmitted: "Verificação Enviada!",
    submittedSuccessfully: "Sua verificação KYC foi enviada com sucesso. Revisaremos suas informações e notificaremos você em 24-48 horas.",

    // Accessibility
    toggleTheme: "Alternar tema",
    changeLanguage: "Mudar idioma",
    closeMenu: "Fechar menu",
    openMenu: "Abrir menu",
    install: "Instalar",
    installApp: "Instalar app",
    installAppTitle: "Adicionar à Tela de Início",
    installAppMessageIOS: "No iPhone, toque em Compartilhar → Adicionar à Tela de Início.",

    // Keyboard Shortcuts
    keyboardShortcuts: "Atalhos de Teclado",
    shortcutNext: "Continuar/Enviar",
    shortcutPrev: "Voltar",
    shortcutTab: "Percorrer campos",

    // File Upload
    dropFileHere: "Solte o arquivo aqui",
    clickOrDragFile: "Clique ou arraste o arquivo",
    selfieReady: "Selfie enviada com sucesso",

    // Face Detection
    faceDetection: {
      selfieCaptureTitle: "Captura de Selfie",
      selfieCaptureDesc: "Vamos verificar sua identidade através de uma selfie ao vivo com detecção facial.",
      activateCamera: "Ativar Câmera",
      activatingCamera: "Ativando câmera...",
      acceptedFormats: "Aceitos: JPG, PNG. Tamanho máx.: 5MB.",
      placeFaceCenter: "Posicione seu rosto no centro",
      faceDetected: "Rosto detectado",
      noFaceDetected: "Nenhum rosto detectado",
      noFaceDescription: "Posicione o rosto no centro e tente novamente.",
      cancel: "Cancelar",
      capturePhoto: "Capturar Foto",
      delete: "Excluir",
      retakePhoto: "Tirar nova foto",
      selfieCaptured: "Selfie capturada com sucesso",
      tipsTitle: "Dicas para uma boa selfie:",
      tipFaceCentered: "Rosto totalmente visível e centralizado",
      tipGoodLighting: "Boa iluminação, evite sombras",
      tipRemoveAccessories: "Remova óculos escuros ou bonés",
      tipLookAtCamera: "Olhe diretamente para a câmera",
      tipNoPhotosOrVideos: "Não use fotos ou vídeos",
    },
  },
  es: {
    // Validation
    validation: {
      email: { invalid: "Ingrese un correo electrónico válido" },
      fullName: {
        required: "El nombre completo es obligatorio",
        format: "Ingrese nombre y apellido (al menos dos palabras)",
      },
      dateOfBirth: {
        required: "La fecha de nacimiento es obligatoria",
        minAge: "Debe tener al menos 18 años",
        invalid: "Fecha de nacimiento inválida",
      },
      phone: {
        required: "El número de teléfono es obligatorio",
        invalid: "Ingrese un número de teléfono válido",
      },
      country: { required: "El país es obligatorio" },
      address: {
        street: { required: "La dirección completa es obligatoria" },
        city: { required: "La ciudad es obligatoria" },
        state: { required: "El estado es obligatorio" },
        postalCode: { required: "El código postal es obligatorio" },
        addressProof: {
          required: "El comprobante de domicilio es obligatorio",
          maxSize: "El archivo debe tener un máximo de 5MB",
          type: "Solo se permiten archivos PDF, JPG o PNG",
        },
      },
      identity: {
        idType: { required: "Seleccione un tipo de documento" },
        idNumber: { 
          required: "El número de documento es obligatorio",
          invalid: "CPF inválido",
        },
        idFront: {
          required: "La imagen frontal del documento es obligatoria",
          maxSize: "El archivo debe tener un máximo de 5MB",
          type: "Solo se permiten imágenes JPG o PNG",
        },
        idBack: { 
          required: "La imagen trasera es obligatoria para este tipo de documento",
          maxSize: "El archivo debe tener un máximo de 5MB",
          type: "Solo se permiten imágenes JPG o PNG",
        },
      },
      selfie: { 
        required: "La selfie es obligatoria",
        maxSize: "El archivo debe tener un máximo de 5MB", 
        type: "Solo se permiten imágenes JPG o PNG" 
      },
      terms: { accept: "Debe aceptar los términos y condiciones" },
    },
    // Generic/Header/Sidebar
    menu: "Menú",
    dashboard: "Panel",
    accounts: "Cuentas",
    deposit: "Depositar",
    transfer: "Transferir",
    withdraw: "Retirar",
    affiliate: "Afiliado",
    leaderboards: "Clasificaciones",
    faq: "Preguntas Frecuentes",
    contactUs: "Contáctenos",
    legalDocuments: "Documentos Legales",

    // KYC Steps
    kycVerification: "Verificación KYC",
    personalInfo: "Información Personal",
    address: "Dirección",
    identity: "Identidad",
    selfie: "Selfie",
    review: "Revisión",

    // Personal Info Step
    personalInformation: "Información Personal",
    providePersonalDetails: "Por favor, proporciona tus datos personales para comenzar el proceso de verificación.",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Woovi Tester",
    email: "Dirección de Correo Electrónico",
    emailPlaceholder: "challanger@woovi.com.br",
    phone: "Número de Teléfono",
    phonePlaceholder: "+34 612 345 678",
    dateOfBirth: "Fecha de Nacimiento",
    country: "País de Residencia",
    selectCountry: "Selecciona tu país",
    selectCountryFirst: "Por favor, selecciona tu país primero",

    // Address Step
    addressVerification: "Verificación de Dirección",
    provideAddressDetails: "Ingresa tu dirección completa y sube un comprobante de domicilio.",
    streetAddress: "Dirección Completa",
    streetAddressPlaceholder: "Calle Ejemplo, 123, Apto 4B, Edificio A",
    city: "Ciudad",
    cityPlaceholder: "Madrid",
    stateProvince: "Estado/Provincia",
    stateProvincePlaceholder: "Madrid",
    postalCode: "Código Postal",
    postalCodePlaceholder: "28001",
    addressProof: "Comprobante de Domicilio (PDF, JPG, PNG)",
    fileConstraintsAddress: "Aceptados: PDF, JPG, PNG. Tamaño máx.: 5MB.",

    // Identity Step
    identityVerification: "Verificación de Identidad",
    provideIdentityDetails: "Selecciona el tipo de documento, ingresa el número y sube los archivos.",
    idType: "Tipo de Documento",
    selectIdType: "Selecciona el tipo de documento",
    passport: "Pasaporte",
    driversLicense: "Licencia de Conducir",
    rg: "RG",
    idNumber: "Número de Documento",
    idNumberPlaceholder: "000.000.000-00",
    idFrontUpload: "Subir Documento (Frente)",
    idBackUpload: "Subir Documento (Reverso)",
    identityDocuments: "Documentos de Identidad",
    fileConstraintsIdentity: "Aceptados: JPG, PNG. Tamaño máx.: 5MB.",
    idBackNote: "Reverso obligatorio para RG y Licencia de Conducir.",

    // Selfie Step
    selfieVerification: "Verificación de Selfie",
    selfieInstructions: "Captura o sube una selfie. Rostro visible, buena iluminación, sin gorras ni lentes oscuros.",
    selfieUpload: "Subir Selfie",
    fileConstraintsSelfie: "Aceptados: JPG, PNG. Tamaño máx.: 5MB.",

    // Review Step
    reviewAndSubmit: "Revisar y Enviar",
    reviewSummaryHint: "Revisa toda la información. Puedes editar cualquier etapa antes de enviar.",
    edit: "Editar",
    termsAndConditions: "Términos y Condiciones",
    acceptTermsLabel: "He leído y acepto los",
    termsLink: "Términos y Condiciones",
    openDocument: "Abrir documento",

    // Buttons
    back: "Atrás",
    continue: "Continuar",
    submit: "Enviar",
    submitting: "Enviando...",

    // Success
    verificationSubmitted: "¡Verificación Enviada!",
    submittedSuccessfully: "Tu verificación KYC ha sido enviada con éxito. Revisaremos tu información y te notificaremos en 24-48 horas.",

    // Accessibility
    toggleTheme: "Cambiar tema",
    changeLanguage: "Cambiar idioma",
    closeMenu: "Cerrar menú",
    openMenu: "Abrir menú",
    install: "Instalar",
    installApp: "Instalar app",
    installAppTitle: "Agregar a la pantalla de inicio",
    installAppMessageIOS: "En iPhone, toca Compartir → Agregar a la pantalla de inicio.",
    
    // Keyboard Shortcuts
    keyboardShortcuts: "Atajos de Teclado",
    shortcutNext: "Continuar/Enviar",
    shortcutPrev: "Atrás",
    shortcutTab: "Recorrer campos",

    // File Upload
    dropFileHere: "Suelta el archivo aquí",
    clickOrDragFile: "Haz clic o arrastra el archivo",
    selfieReady: "Selfie subida exitosamente",

    // Face Detection
    faceDetection: {
      selfieCaptureTitle: "Captura de Selfie",
      selfieCaptureDesc: "Verificaremos tu identidad con una selfie en vivo con detección facial.",
      activateCamera: "Activar Cámara",
      activatingCamera: "Activando cámara...",
      acceptedFormats: "Aceptados: JPG, PNG. Tamaño máx.: 5MB.",
      placeFaceCenter: "Coloca tu rostro en el centro",
      faceDetected: "Rostro detectado",
      noFaceDetected: "Ningún rostro detectado",
      noFaceDescription: "Coloca tu rostro en el centro e inténtalo de nuevo.",
      cancel: "Cancelar",
      capturePhoto: "Tomar Foto",
      delete: "Eliminar",
      retakePhoto: "Tomar otra foto",
      selfieCaptured: "Selfie capturada con éxito",
      tipsTitle: "Consejos para una buena selfie:",
      tipFaceCentered: "Rostro totalmente visible y centrado",
      tipGoodLighting: "Buena iluminación, evita sombras",
      tipRemoveAccessories: "Quita gafas de sol o gorras",
      tipLookAtCamera: "Mira directamente a la cámara",
      tipNoPhotosOrVideos: "No uses fotos o videos",
    },
  },
}
