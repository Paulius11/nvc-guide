# NVC Empathy Guide

A comprehensive empathy reference application built with Expo/React Native that helps users understand and identify human needs and emotions based on Nonviolent Communication (NVC) principles. The app supports both English and Lithuanian languages and includes content from multiple NVC sources.

## 🌐 Live Demo

You can try the web version of the app at: [https://paulius11.github.io/nvc-guide](https://paulius11.github.io/nvc-guide)

## 📱 About

This app is designed to help users develop empathy skills by providing easy access to:
- **Human Needs**: Based on NVC principles with categorized needs, definitions, and examples
- **Emotions**: Comprehensive emotion library with intensity ratings and contexts
- **Bilingual Support**: Available in English and Lithuanian
- **Offline Access**: All content available without internet connection

## Features

### 🎯 Core Features
- **📚 Needs Directory**: Searchable catalog of human needs with definitions, examples, and synonyms
- **💭 Emotions Library**: Comprehensive list of emotions with descriptions, intensity ratings, and related feelings  
- **🔍 Search & Filter**: Quick search functionality across needs and emotions with category filtering
- **📁 Categories**: Organized content into logical categories for easy navigation
- **⭐ Favorites System**: Bookmark frequently referenced items for quick access
- **🌓 Dark/Light Mode**: Toggle between themes for comfortable viewing
- **📱 Offline Support**: All content available without internet connection
- **🌍 Bilingual Support**: Complete content in English and Lithuanian

### 🛠️ Technical Features
- **Cross-Platform**: Built with Expo/React Native (iOS, Android, Web)
- **Type Safety**: Full TypeScript implementation
- **Data Persistence**: AsyncStorage for offline favorites and settings
- **Responsive Design**: Optimized for different screen sizes and orientations
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Performance**: Optimized rendering with efficient data structures
- **Modern UI**: Clean, calming design focused on emotional wellness

## 🚀 Getting Started

### Prerequisites
- **Node.js** (16 or newer) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** - Install with: `npm install -g @expo/cli`

### 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Paulius11/nvc-guide.git
cd nvc-guide
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

### 📱 Running the App

#### Mobile Development
- **iOS**: `npm run ios` (requires Xcode on macOS)
- **Android**: `npm run android` (requires Android Studio)
- **Expo Go**: Scan QR code with Expo Go app on your device

#### Web Development
- **Web Browser**: `npm run web`
- **Custom Port**: `npm run start:3000` or `npm run start:8082`

### 🌐 Web Deployment

The app supports web deployment and can be hosted on GitHub Pages:

1. **Build for web**
```bash
npx expo export --platform web
```
2. **Deploy to GitHub Pages** (automated via GitHub Actions)
   - Push to `main` branch
   - GitHub Actions will automatically build and deploy to `gh-pages` branch

## 📁 Project Architecture

### Directory Structure
```
src/
├── 🧩 components/          # Reusable UI components
│   ├── SearchBar.tsx       # Search functionality
│   ├── CategoryFilter.tsx  # Category filtering
│   ├── NeedCard.tsx       # Need display cards
│   └── EmotionCard.tsx    # Emotion display cards
├── 📱 screens/            # Main app screens
│   ├── NeedsScreen.tsx    # Needs exploration
│   ├── EmotionsScreen.tsx # Emotions library
│   ├── FavoritesScreen.tsx# Saved items
│   └── SettingsScreen.tsx # App configuration
├── 📊 data/               # NVC data sources
│   └── nvcData.ts         # Consolidated NVC data
├── 🔄 context/            # State management
│   └── AppContext.tsx     # Global app state
├── 📝 types/              # TypeScript definitions
│   └── index.ts           # Type definitions
└── 🛠️ utils/              # Helper functions
```

### Key Architecture Patterns
- **Context API**: Centralized state management with `AppContext`
- **AsyncStorage**: Persistent storage for favorites and settings
- **TypeScript**: Full type safety with comprehensive interfaces
- **Component Reusability**: Shared card components across screens
- **Bilingual Data**: Structured multilingual content support

## 📊 Data Structure & Content

### 🎯 Human Needs
Based on NVC principles, each need includes:
- **Name & Definition**: Clear explanation of the need
- **Category**: Organized groups (Autonomy, Connection, Physical, etc.)
- **Examples**: Real-world manifestations of the need
- **Synonyms**: Alternative terms for better searchability
- **Bilingual**: Available in English and Lithuanian

### 💭 Emotions
Comprehensive emotion library with:
- **Name & Description**: Clear emotional definitions  
- **Category**: Grouped by met/unmet need states
- **Intensity**: Emotional strength ratings (1-10)
- **Related Feelings**: Connected emotional experiences
- **Context**: When and how emotions typically arise
- **Bilingual**: Full content in both languages

### 📚 Data Sources
Content is curated from multiple NVC sources:
- **CNVC**: Center for Nonviolent Communication materials
- **IEVA**: Lithuanian NVC translations and adaptations  
- **ROLAND**: Additional specialized NVC content

## 🛠️ Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser


Building adroid:
eas build --platform android --profile production

Starting on custom port:
npm run start:3000      # Starts on port 3000
npm run start:8082      # Starts on port 8082
npm run start:port 9000 # Starts on port 9000

## 🚀 Future Enhancements

- **🔍 Detailed Views**: Individual screens for needs/emotions with deeper content
- **🧘 Guided Exercises**: Interactive reflection prompts and empathy-building activities
- **📈 Progress Tracking**: Personal growth metrics and learning paths
- **🎨 Customization**: User themes, font sizes, and content preferences
- **📤 Export/Share**: Save and share insights with others
- **🌐 Community**: User-generated content and shared experiences
- **🔊 Audio Support**: Pronunciation guides and mindfulness features

## 🤝 Contributing

We welcome contributions that enhance emotional wellness and empathy building! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports**: Submit issues with detailed descriptions
- 💡 **Feature Requests**: Suggest improvements or new functionality  
- 🌍 **Translations**: Help expand language support
- 📚 **Content**: Add NVC resources, needs, or emotions
- ♿ **Accessibility**: Improve usability for all users
- 🎨 **Design**: Enhance UI/UX for better user experience

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code of Conduct
This project promotes empathy and respect. Please maintain a welcoming environment for all contributors.

## 📄 License

MIT License - Feel free to use this project as a foundation for your own empathy-focused applications.

## 🙏 Acknowledgments

- **Marshall Rosenberg**: Creator of Nonviolent Communication
- **CNVC**: Center for Nonviolent Communication for foundational materials
- **NVC Community**: Contributors and translators of NVC resources
- **Expo Team**: For the amazing React Native development platform

## 📞 Support

If you find this app helpful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or suggesting features
- 🤝 Contributing to the codebase
- 💬 Sharing with others who might benefit

---

*Built with ❤️ for emotional wellness and empathy development*