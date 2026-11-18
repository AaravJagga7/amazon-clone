# Amazon Clone (Website & Mobile)

A comprehensive, full-stack Amazon Clone reproducing the look, feel, and functionality of Amazon.in.

---

## 🌟 Tech Stacks

### 1. 🌐 Web Application (`flutterzon-web`)
* **Framework**: React 18 + Vite
* **Styling**: Tailwind CSS + Custom Amazon Ember Typography
* **Icons**: Lucide React
* **State Management**: React Context + LocalStorage persistence
* **Features**:
  - Full Amazon Navigation bar (Location selector, Category search dropdown, Language, Account & Lists, Returns & Orders, Cart badge)
  - Category Carousel Strip (Mobiles, Electronics, Appliances, Fashion, Home, Beauty, Books, Grocery, MiniTV)
  - Hero Promotional Banner Carousel with auto-rotation and category jumps
  - 4-Image Offer Cards & Deal of the Day with live countdown timer
  - Product Catalog with filters, ratings, and instant search
  - Product Details Page with thumbnail gallery, specifications, customer reviews & rating submission
  - Official Amazon Quality Badges (7 Days Replacement, Free Delivery, 1 Year Warranty, Pay on Delivery)
  - Shopping Cart with quantity increment/decrement/delete
  - **Save for Later** section with move-to-cart capabilities
  - Multi-step Checkout with delivery address management and payment method selector (Amazon Pay UPI, Cards, Net Banking, COD, Google Pay)
  - Festive Confetti celebration on order completion + instant receipt
  - Order Tracking Dashboard with 4-stage delivery timeline (`Ordered ➔ Shipped ➔ Out for Delivery ➔ Delivered`)
  - **Admin Control Panel**:
    - Real-time Category-wise Earnings Bar Charts
    - Product Inventory management (Add product with preview, Delete product)
    - Order dispatch status manager (Update order stages live)

### 2. 📱 Mobile Reference (`flutterzon_bloc`)
* **Framework**: Flutter + BLoC Architecture
* **Backend**: Node.js + Express.js + MongoDB

---

## 🚀 Quick Start (Web App)

```bash
# Clone the repository
git clone https://github.com/AaravJagga7/amazon-clone.git
cd amazon-clone

# Navigate to web application
cd flutterzon-web

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Test Credentials

* **Customer**: `user@email.com` / `123456`
* **Admin**: `admin@email.com` / `123456`
*(Quick 1-click login buttons are also available in the sign-in modal)*

---

## 📄 License

This project is created for educational and portfolio demonstration purposes. All Amazon logos and brand assets remain property of their respective owners.
