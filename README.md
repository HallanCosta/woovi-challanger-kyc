# 🏦 Bank KYC - Woovi Challenge

Identity verification system (KYC - Know Your Customer) developed as a Woovi challenge, using facial recognition and field validation.

[🇧🇷 Read this README in Portuguese](https://github.com/HallanCosta/woovi-challanger-kyc/blob/main/README-ptBR.md)

## Live demo
- **Production:** https://kyc.hallancosta.com
- **Storybook:** https://kyc-storybook.hallancosta.com

## 📸 Preview
<img src="https://github.com/user-attachments/assets/05e83a2b-6d01-4276-ab3e-c687c41f1017">

## 🛠️ Technologies Used

### Frontend & Build
- **React 19** - Framework for building componentized interfaces
- **Vite** - Modern and extremely fast build tool for development
- **TypeScript 5.9** - JavaScript superset with static typing

### Styling
- **Tailwind CSS v4** - Utility CSS framework for rapid styling
- **Shadcn UI / Radix UI** - Accessible and customizable components (Avatar, Select, Toast)
- **Framer Motion** - Library for fluid and professional animations
- **Lucide React** - Consistent and lightweight icon set
- **Storybook** - Tool for documenting and testing user interface (UI) components in isolation

### Forms & Validation
- **React Hook Form** - Performant form management
- **Zod v4** - Schema validation for data validation (CPF, RG, etc)
- **@hookform/resolvers** - Integration between React Hook Form and Zod
- 

### Artificial Intelligence
- **@vladmandic/human v3.3.6** - ML (Machine Learning) library for:
  - Real-time facial detection
  - Facial feature recognition
  - Real person validation (liveness detection)
  - Age and emotion estimation

### Testing
- **Vitest** - Fast and modern testing framework
- **Testing Library** - React component testing
- **@vitest/coverage-v8** - Code coverage

### Others
- **PWA** - Progressive Web App with vite-plugin-pwa
- **PM2** - Process management in production


## ⏱️ Estimated time
- Development time was around 40 hours


## 🚀 How to Run the Project

### Prerequisites
- **Node.js** (version 22 recommended, minimum 18)
  ```sh
  https://nodejs.org/en/download/
  ```

- **PNPM** (package manager)
  ```sh
  npm install pnpm -g
  ```

### Installation

```bash
# Clone the repository
git clone https://github.com/HallanCosta/woovi-challanger-kyc.git

# Enter the project folder
cd woovi-challanger-kyc

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Start storybook
pnpm storybook

# Access in browser (application)
http://localhost:5173

# Access in browser (storybook)
http://localhost:6006
```

### Build & Production

```bash
# Generate production build
pnpm build

# Start application in production with PM2
pnpm start:production

# Restart application in production with PM2
pnpm restart:production
```

### Build & Production (Storybook)

```bash
# Generate production build
pnpm build:storybook
```

### Testing

```bash
# Run tests
pnpm test

# Tests with visual interface
pnpm test:ui

# Test coverage
pnpm test:coverage

# Code linting
pnpm lint
```

## 😅 Challenges Encountered

During development, some main challenges were:

1. **vladmandic/human integration**
   - Face model configuration
   - Detect lighting to not accept dark photos
   - Determine face reliability to not accept anything
   - Performance optimization

**Reference:** https://medium.com/@viktorolivares/facial-analysis-with-human-js-and-react-in-a-vite-project-d61a21c3bc9e

## 🎯 About @vladmandic/human

The **vladmandic/human** library is the heart of the project's biometric validation. It allows:

- ✅ **Real-time facial detection** - Identifies faces in camera
- ✅ **Feature analysis** - Recognizes eyes, nose, mouth, contours
- ✅ **Real person validation** - Basic liveness detection
- ✅ **Local processing** - Everything runs in browser (privacy)
- ✅ **Optimized performance** - Light and fast models

**Why I found it interesting?**
- Doesn't require complex backend for AI
- Sensitive data doesn't leave user's device
- Very good for selfie validation in KYC flows

## 🚀 Future Implementations

### Security & Anti-fraud
- [ ] **Advanced facial biometric verification**
  - Face Match: Compare selfie with document photo
  - Liveness proof: Detect movements (blinking, head turning)
  - Depth sensor: Ensure it's not a photo of a photo

- [ ] **Fake document detection**
  - OCR to automatically extract data
  - Anti-fraud system to detect edits
  - Document security pattern validation

### Automation
- [ ] **Automatic address verification**
  - CEP API integration
  - Geolocation validation
  - Residence confirmation

### User Experience
- [ ] **Real-time feedback**
  - "Cropped image" - document not complete
  - "Illegible document" - photo too dark/blurry
  - "Get closer" - document too far
  - "Avoid reflections" - flash interfering with reading
  - Automatic draft saving


- [ ] **Visual guides**
  - Outline showing where to position document
  - Real-time photo quality indicators
  - Interactive tutorial before process

### Infrastructure
- [ ] Robust backend with processing queue
- [ ] Logging and monitoring system

## 🧩 Features 
- [x] Translation to other languages
- [x] Selfie capture using device camera (Light sensor and Face detected)
- [x] Dark Mode
- [x] Real-time field validations
- [x] PWA on Android and iOS (Progressive Web App)
- [x] Drag and drop for file / photo upload

## 📂 Project Structure

```
woovi-challanger-kyc/
├── .storybook/          # Storybook components
├── src/
    ├── __tests__        # Application tests
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities and configurations
│   ├── pages/           # Application pages
│   └── main.tsx         # Entry point
├── public/              # Static files
├── ecosystem.config.cjs # PM2 configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 👨‍💻 Contributors

[<img width="115" height="115" src="https://github.com/HallanCosta.png"  /><br><sub>@HallanCosta</sub>](https://github.com/HallanCosta)

⭐ If this project was useful to you, consider giving a star to the repository!
