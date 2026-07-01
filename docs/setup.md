# Local Development Setup Guide

Follow these steps to set up and run the Online Hypermarket platform locally.

## Prerequisites
- **Node.js**: Version 20.x or higher
- **MongoDB**: A local MongoDB instance or a MongoDB Atlas cloud URI
- **Expo Go App**: Installed on your physical Android or iOS device (for mobile testing)

---

## 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd hypermarket-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and configure your credentials.
4. Run the database seed script to populate sample accounts and products:
   ```bash
   node data/seed.js
   ```
5. Start the local server:
   ```bash
   npm start
   ```
   *The backend will boot up on `http://localhost:5000`.*

---

## 2. Mobile App Setup

1. Navigate to the app directory:
   ```bash
   cd hypermarket-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Metro developer server:
   ```bash
   npm start
   ```
4. **Running on Physical Device**:
   - Make sure your phone and computer are on the same Wi-Fi network.
   - Scan the terminal's QR code using the **Expo Go** app (or system Camera app).
   - The application dynamically maps to your computer's local IP address.
5. **Running on Emulator/Simulator**:
   - Press `a` in the terminal for Android Emulator, or `i` for iOS Simulator.
