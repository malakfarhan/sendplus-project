# Mobile Packages Dashboard

A comprehensive mobile packages management application similar to telecom companies like Zong, Telenor, and Jazz.

## Features

### 📱 Package Management
- **Package Cards**: Display mobile packages with detailed information
- **Provider Support**: Zong, Telenor, Jazz, and Ufone
- **Package Details**: Data, minutes, SMS, features, and pricing
- **Favorites System**: Save and manage favorite packages
- **Purchase Integration**: Direct package purchase functionality

### 📊 Usage Statistics
- **Real-time Usage**: Live data, minutes, and SMS usage tracking
- **Progress Indicators**: Visual progress bars for usage monitoring
- **Network Performance**: Speed, signal strength, and latency metrics
- **App Usage Analytics**: Top apps by data consumption

### 🔍 Package Comparison
- **Comparison Table**: Side-by-side package comparison
- **Feature Matrix**: Detailed feature comparison across providers
- **Best Value Indicators**: Highlight best deals and features
- **Summary Cards**: Quick overview of package strengths

### 📡 Network Coverage
- **Coverage Maps**: Visual network coverage information
- **Signal Strength**: Real-time signal quality indicators
- **Location-based**: Coverage data for current location
- **Provider Status**: Network status and maintenance information

## Components

### Main Dashboard (`/dashboard/mobile-packages`)
- **Header Section**: Application title and status indicators
- **Package Grid**: Display all available packages
- **Usage Stats**: Current package usage and analytics
- **Network Coverage**: Provider coverage information
- **Comparison Table**: Detailed package comparison

### Package Cards
- Provider branding with color-coded avatars
- Package details (data, minutes, SMS)
- Feature chips (4G LTE, social media free, etc.)
- Rating and subscriber information
- Purchase buttons with provider-specific styling

### Usage Statistics
- Progress bars for data, minutes, and SMS usage
- Network performance metrics
- Top apps by data consumption
- Real-time updates every 5 seconds

### Network Coverage
- Provider-specific coverage cards
- Signal strength indicators
- Coverage percentage and speed metrics
- Coverage area listings

## Providers Supported

### Zong
- **Color**: Orange (#ff6b35)
- **Features**: 4G LTE, Night Binge, Social Media Free
- **Coverage**: 95% with excellent signal

### Telenor
- **Color**: Gold (#ffd700)
- **Features**: 4G LTE, WhatsApp Free, YouTube Free
- **Coverage**: 88% with good signal

### Jazz
- **Color**: Red (#e74c3c)
- **Features**: 4G LTE, Facebook Free, Instagram Free
- **Coverage**: 92% with excellent signal

### Ufone
- **Color**: Blue (#3498db)
- **Features**: 4G LTE, TikTok Free, Snapchat Free
- **Coverage**: 85% with good signal

## Navigation

The mobile packages dashboard is accessible via:
- **Menu**: Dashboard → Mobile Packages
- **URL**: `/dashboard/mobile-packages`

## Technical Details

### File Structure
```
src/views/dashboard/MobilePackages/
├── index.jsx              # Main dashboard component
├── PackageCard.jsx        # Package display cards
├── PackageComparison.jsx  # Comparison table
├── UsageStats.jsx         # Usage analytics
└── NetworkCoverage.jsx    # Network coverage info
```

### Key Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live usage statistics
- **Interactive Elements**: Favorites, purchases, and comparisons
- **Provider Branding**: Color-coded provider identification
- **Modern UI**: Material-UI components with custom styling

### State Management
- Package favorites management
- Real-time usage data simulation
- Network coverage status
- Comparison data

## Usage

1. **Browse Packages**: View all available mobile packages
2. **Compare Options**: Use the comparison table to evaluate packages
3. **Check Usage**: Monitor current package usage and statistics
4. **Network Status**: View coverage and signal information
5. **Purchase**: Select and purchase packages directly

## Future Enhancements

- **Payment Integration**: Real payment processing
- **User Accounts**: Personal package management
- **Notifications**: Usage alerts and package expiry reminders
- **Maps Integration**: Interactive coverage maps
- **Customer Support**: Live chat and support integration 