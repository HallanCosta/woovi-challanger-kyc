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
        street: { required: "Street is required" },
        city: { required: "City is required" },
        state: { required: "State is required" },
        postalCode: { required: "Postal code is required" },
      },
      identity: {
        idType: { required: "Please select an ID type" },
        idNumber: { required: "ID number is required" },
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
    fullNamePlaceholder: "John Doe",
    email: "Email Address",
    emailPlaceholder: "john@example.com",
    phone: "Phone Number",
    phonePlaceholder: "+1 (555) 123-4567",
    dateOfBirth: "Date of Birth",
    country: "Country of Residence",
    selectCountry: "Select your country",
    selectCountryFirst: "Please select your country first",

    // Buttons
    back: "Back",
    continue: "Continue",
    submit: "Submit Verification",
    submitting: "Submitting...",

    // Success
    verificationSubmitted: "Verification Submitted!",
    submittedSuccessfully: "Your KYC verification has been submitted successfully. We'll review your information and notify you within 24-48 hours.",
    submitAnother: "Submit Another Verification",

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
        street: { required: "Rua é obrigatória" },
        city: { required: "Cidade é obrigatória" },
        state: { required: "Estado é obrigatório" },
        postalCode: { required: "CEP é obrigatório" },
      },
      identity: {
        idType: { required: "Selecione um tipo de documento" },
        idNumber: { required: "Número do documento é obrigatório" },
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
    fullNamePlaceholder: "João Silva",
    email: "Endereço de E-mail",
    emailPlaceholder: "joao@exemplo.com",
    phone: "Número de Telefone",
    phonePlaceholder: "+55 (11) 98765-4321",
    dateOfBirth: "Data de Nascimento",
    country: "País de Residência",
    selectCountry: "Selecione seu país",
    selectCountryFirst: "Por favor, selecione seu país primeiro",

    // Buttons
    back: "Voltar",
    continue: "Continuar",
    submit: "Enviar Verificação",
    submitting: "Enviando...",

    // Success
    verificationSubmitted: "Verificação Enviada!",
    submittedSuccessfully: "Sua verificação KYC foi enviada com sucesso. Revisaremos suas informações e notificaremos você em 24-48 horas.",
    submitAnother: "Enviar Outra Verificação",

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
        street: { required: "La calle es obligatoria" },
        city: { required: "La ciudad es obligatoria" },
        state: { required: "El estado es obligatorio" },
        postalCode: { required: "El código postal es obligatorio" },
      },
      identity: {
        idType: { required: "Seleccione un tipo de documento" },
        idNumber: { required: "El número de documento es obligatorio" },
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
    fullNamePlaceholder: "Juan Pérez",
    email: "Dirección de Correo Electrónico",
    emailPlaceholder: "juan@ejemplo.com",
    phone: "Número de Teléfono",
    phonePlaceholder: "+34 612 345 678",
    dateOfBirth: "Fecha de Nacimiento",
    country: "País de Residencia",
    selectCountry: "Selecciona tu país",
    selectCountryFirst: "Por favor, selecciona tu país primero",

    // Buttons
    back: "Atrás",
    continue: "Continuar",
    submit: "Enviar Verificación",
    submitting: "Enviando...",

    // Success
    verificationSubmitted: "¡Verificación Enviada!",
    submittedSuccessfully: "Tu verificación KYC ha sido enviada con éxito. Revisaremos tu información y te notificaremos en 24-48 horas.",
    submitAnother: "Enviar Otra Verificación",

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
  },
}
