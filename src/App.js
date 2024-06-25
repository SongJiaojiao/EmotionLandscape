import './Styles/App.css';
import { AuthUser, ThemeProvider, AuthUserProvider, HistoryProvider } from './Contexts/Context';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { useEffect, useContext } from 'react'
import AnalyzeMood from './Components/Analyze/AnalyzeMood';
import CBTFlow from './Components/Reframe Exercise/CBTFlow';
import { dark, neobrutalism } from '@clerk/themes';
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import { SignedIn, SignedOut, SignInButton, UserButton, SignIn, SignOutButton } from "@clerk/clerk-react";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretLeft, faCaretRight, faSignOut } from '@fortawesome/free-solid-svg-icons';
library.add(faCaretLeft, faCaretRight, faSignOut);



const PUBLISHABLE_KEY = process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY


export default function App() {
  return (
    <div className='App'>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}  >
        <SignedOut >
          <SignIn />
        </SignedOut>
        <SignedIn>
          <AuthUserProvider>
            <AppContent />
          </AuthUserProvider>
        </SignedIn>
      </ClerkProvider>
    </div>
  );
}

function AppContent() {
  const { isLoaded, user } = useUser();
  const { authUser, updateAuthUser } = useContext(AuthUser);

  useEffect(() => {
    if (isLoaded && user) {
      updateAuthUser({
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName
      });
    }
  }, [isLoaded, user, updateAuthUser]);

  return (
    <HistoryProvider>
      <ThemeProvider>
        <Router>
            <Routes>
              <Route path="/" element={<AnalyzeMood />} />
              <Route path="/reframe" element={<CBTFlow />} />
            </Routes>
        </Router>
      </ThemeProvider>
    </HistoryProvider>
  );
}