# React Native Platform-specific Considerations Lab: Weather App

A well-built, native-feeling app doesn't just function well—it looks and feels right at home on every device. This weather application project focuses on developing cross-platform skills with React Native.

## Project Overview

This is a fully functional weather application built with React Native that demonstrates platform-specific design patterns and adaptability. The app provides weather information and allows users to manage favorite cities across iOS, Android, and web platforms.

## Key Features Implemented

### Core Functionality
- **Weather Search**: Enter a city name to fetch weather information (simulated with random data)
- **Weather Display**: Shows temperature, conditions, and humidity for searched cities
- **Favorites Management**: Add cities to favorites and quickly access their weather with one tap
- **Cross-platform Support**: Seamlessly works on iOS, Android, and web platforms

### Platform-Specific Customization

#### Styling & UI
- **Background Colors**: Tailored for each platform (light blue for iOS, cyan for Android)
- **Typography**: Platform-optimized font sizes and weights
  - iOS: Smaller, more refined fonts (17px titles)
  - Android: Larger, bolder fonts (20px titles)
- **Input Fields**: Different border styles and corner radius per platform
- **Shadows & Elevation**: Native shadow effects on iOS, Android elevation system

#### Native Buttons
- **iOS Button**: Opacity-based feedback with mint green accent color
- **Android Button**: Material Design ripple effect with purple accent
- **Web Button**: Standard blue button with press feedback

#### Temperature Units
- **iOS**: Defaults to Fahrenheit
- **Android**: Defaults to Celsius
- **Web**: Defaults to Celsius

#### Localization
- Platform-specific text for placeholders, section titles, and UI labels
- Dynamic platform detection for optimal UX

### AppState Monitoring
- Tracks app state changes (active, background, inactive)
- Displays current platform and version information
- Real-time state updates

## Technical Stack

- **React Native**: 0.81.5
- **React**: 19.1.0
- **TypeScript**: 5.9.3
- **Expo**: 54.0.20
- **React Native Safe Area Context**: 5.6.1

## Component Structure

```
App.tsx                           # Main app component with weather logic
├── components/
│   ├── NativeButton.tsx          # Base button component
│   ├── NativeButton.ios.tsx      # iOS-specific button (opacity feedback)
│   ├── NativeButton.android.tsx  # Android-specific button (ripple effect)
```

## How Platform-Specific Features Work

This app uses React Native's `Platform` API and module resolution to deliver platform-specific experiences:

1. **Platform.select()**: Used throughout to apply platform-specific values
2. **Platform.OS**: Detects current OS (ios, android, or web)
3. **Platform.Version**: Displays current platform version
4. **Module Resolution**: `.ios.tsx` and `.android.tsx` files are loaded automatically based on platform

## Running the App

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

Run on specific platform:
```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

## Recent Updates

### Bug Fixes & Improvements
- Fixed type inconsistencies across platform-specific button components
- Standardized `NativeButtonProps` interface across all button variants
- Removed unused imports (`TouchableOpacity` from iOS button)
- Fixed syntax error in Android button component
- Added `style` prop support to all button variants for consistent customization

### Code Quality
- All platform-specific components now share a consistent interface
- Improved TypeScript type safety with interface standardization
- Cleaner component props handling

## Learning Outcomes

By working with this project, you'll master:

- ✅ Using `Platform.select()` to detect and react to device OS
- ✅ Creating platform-specific components that share a common interface
- ✅ Implementing styling tweaks that respect platform conventions
- ✅ Handling safe areas and spacing differences across devices
- ✅ Building responsive UIs that feel native on each platform
- ✅ Managing AppState to track app lifecycle events
- ✅ TypeScript best practices in React Native

## Project Philosophy

This project demonstrates how React Native bridges multiple platforms while maintaining a native, polished feel. Rather than using a "one-size-fits-all" approach, we embrace platform conventions to create intuitive experiences that users expect on iOS, Android, and the web.

Whether you perfectly match the sample design or put your own spin on things, the key is understanding how to make your app feel at home on every platform.