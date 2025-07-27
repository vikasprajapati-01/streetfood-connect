# 🍜 StreetConnect - Bridging Street Food Vendors & Suppliers

> **Hackathon Project**: Revolutionizing the street food supply chain through digital connectivity

StreetConnect is a comprehensive B2B marketplace platform that connects street food vendors with verified suppliers, enabling efficient ingredient sourcing, cost reduction through group buying, and streamlined supply chain management.

## 🎯 Problem Statement

Street food vendors in India face significant challenges:
- **Inefficient Supply Chain**: Manual sourcing from multiple scattered suppliers
- **High Costs**: No bulk buying power leads to expensive ingredient purchases
- **Quality Issues**: Difficulty finding reliable, quality suppliers
- **Time Wastage**: Hours spent daily on procurement instead of cooking
- **Payment Hassles**: Cash-based transactions with no credit facilities

## 💡 Solution

StreetConnect provides a **digital marketplace** that:
- **Connects** verified suppliers with street food vendors
- **Enables** group buying for bulk discounts (up to 15% savings)
- **Streamlines** ordering, delivery, and payment processes
- **Ensures** quality through supplier verification and ratings
- **Provides** analytics and inventory management tools

## 🌟 Key Features

### For Vendors 🏪
- **Supplier Discovery**: Browse verified suppliers by location and category
- **Group Buying**: Join or create group orders for bulk discounts
- **Order Management**: Track orders from placement to delivery
- **Analytics Dashboard**: Monitor spending, savings, and order history
- **Supplier Reviews**: Rate and review suppliers for community benefit

### For Suppliers 📦
- **Product Catalog**: Comprehensive product and inventory management
- **Order Processing**: Streamlined order fulfillment workflow
- **Customer Management**: Track customer relationships and preferences
- **Analytics & Insights**: Revenue tracking and business intelligence
- **Group Buy Management**: Handle bulk orders efficiently

### Platform Features 🚀
- **Secure Authentication**: Firebase-based user authentication
- **Real-time Updates**: Live order tracking and notifications
- **Mobile Responsive**: Works seamlessly on all devices
- **Payment Integration**: Multiple payment options with credit facilities
- **Quality Assurance**: Supplier verification and rating system

## 🖥️ Live URLs & Navigation

### 🏠 **Main Website**
- **Homepage**: `/` - Platform introduction and features
- **How It Works**: `/how-it-works` - Step-by-step process guide
- **About Us**: `/about` - Company mission and story
- **Contact**: `/contact` - Support and inquiry forms
- **Suppliers Marketplace**: `/suppliers` - Browse all suppliers

### 🔐 **Authentication**
- **Login**: `/login` - User authentication
- **Vendor Registration**: `/register/vendor` - New vendor signup
- **Supplier Registration**: `/register/supplier` - New supplier signup
- **Logout**: `/logout` - Secure session termination

### 🏪 **Vendor Dashboard** (`/vendor/`)
- **Dashboard**: `/vendor/dashboard` - Overview and quick actions
- **Orders**: `/vendor/orders` - Order history and tracking
- **Products**: `/vendor/products` - Browse and search products
- **Suppliers**: `/vendor/suppliers` - Manage supplier relationships
- **Group Buys**: `/vendor/group-buys` - Join/create group orders
- **Create Group Buy**: `/vendor/group-buys/create` - Start new group purchase
- **Settings**: `/vendor/settings` - Account and preferences

### 📦 **Supplier Dashboard** (`/supplier/`)
- **Dashboard**: `/supplier/dashboard` - Business overview
- **Analytics**: `/supplier/analytics` - Revenue and performance metrics
- **Product Catalog**: `/supplier/catalog` - Product management
- **Add Product**: `/supplier/catalog/add` - Create new products
- **Orders**: `/supplier/orders` - Process customer orders
- **Customers**: `/supplier/customers` - Customer relationship management
- **Settings**: `/supplier/settings` - Account configuration

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.4.4** - React framework with App Router
- **React 19** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling

### Backend & Database
- **Firebase** - Authentication and Firestore database
- **React Hook Form** - Form validation and handling

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Turbopack** - Fast development builds

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm/yarn package manager
- Firebase project setup

### 1. Clone Repository
```bash
git clone https://github.com/vikasprajapati-01/streetfood-connect.git
cd street-connect
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create `.env.local` file in root directory:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Update firestore rules (already configured in project)
5. Deploy firestore indexes:
```bash
firebase deploy --only firestore:indexes
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 6. Build for Production
```bash
npm run build
npm start
```

## 🔒 Security Features

- **Firebase Authentication** - Secure user management
- **Firestore Security Rules** - Database access control
- **Form Validation** - Client and server-side validation
- **Session Management** - Secure logout and session handling
- **Data Protection** - User data privacy and security

## 📱 Mobile Responsiveness

- **Responsive Design** - Works on all screen sizes
- **Touch Optimized** - Mobile-friendly interactions
- **Progressive Web App** - App-like experience
- **Fast Loading** - Optimized performance

## 🎯 Business Impact

### For Vendors
- **15% Cost Reduction** through group buying
- **Time Savings** of 2-3 hours daily
- **Quality Assurance** through verified suppliers
- **Credit Facilities** for better cash flow

### For Suppliers
- **Increased Reach** to more customers
- **Bulk Orders** for better margins
- **Digital Presence** and marketing
- **Streamlined Operations**

### Market Impact
- **Supply Chain Efficiency** in street food industry
- **Digital Transformation** of traditional markets
- **Economic Empowerment** of small businesses
- **Food Quality Improvement** across the ecosystem

## 🚀 Future Roadmap

### Phase 1 (Current)
- ✅ Core marketplace functionality
- ✅ Vendor and supplier dashboards
- ✅ Group buying system
- ✅ Basic analytics

### Phase 2 (Next 3 months)
- 📱 Mobile app development
- 💳 Payment gateway integration
- 🚚 Logistics partnership
- 📊 Advanced analytics

### Phase 3 (6 months)
- 🤖 AI-powered recommendations
- 🗺️ Route optimization
- 💰 Credit scoring system
- 🌍 Multi-city expansion

## 👥 Team & Contribution

This project was developed as part of a hackathon to address real-world challenges in the street food industry supply chain.

## 📄 License

This project is created for hackathon purposes. All rights reserved.

---
