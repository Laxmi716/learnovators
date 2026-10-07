# Firebase Configuration

Copy this file to `.env` and fill in your Firebase project credentials.

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Quick Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project → Add a Web App
3. Copy the firebaseConfig object values into your `.env` file
4. Enable **Authentication** → Sign-in methods → Email/Password + Google
5. Enable **Firestore Database** (start in test mode, then apply rules)
6. Run `npm install && npm run dev`
