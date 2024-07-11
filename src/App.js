import './Styles/App.css';
import { AuthUser, AuthUserProvider, HistoryProvider, HistoryContext } from './Contexts/Context';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { useEffect, useContext } from 'react'
import Home from './Components/Home/Home'
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import { SignedIn, SignedOut, SignInButton, UserButton, SignIn, SignOutButton } from "@clerk/clerk-react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretLeft, faCaretRight, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Landing from './Components/Landing';
import NavigationTab from './Components/NavigationTab';
import Memories from './Components/Memories/Memories'
import EmotionChart from './Components/EmotionChart';
library.add(faCaretLeft, faCaretRight, faSignOut);


const PUBLISHABLE_KEY = process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY

function SignInPage() {
  return (
    <div>
      <SignIn />
    </div>
  );
}

export default function App() {
  return (
    <div className='App'>
      <Router>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}  >
          <SignedOut >
            <Routes>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </SignedOut>

          <SignedIn>
            <AuthUserProvider>
              <HistoryProvider>
                <AppContent />
              </HistoryProvider>
            </AuthUserProvider>
          </SignedIn>
        </ClerkProvider>
      </Router>
    </div>
  );
}

function AppContent() {
  const { isLoaded, user } = useUser();
  const { authUser, updateAuthUser } = useContext(AuthUser);
  const { history, updateHistory, fetchData } = useContext(HistoryContext);

  useEffect(() => {
    if (isLoaded && user) {
      const newAuthUser = {
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      updateAuthUser(newAuthUser);
      fetchData(newAuthUser.email);
    }
  }, [isLoaded, user, updateAuthUser]);

  return (
    <HistoryProvider >
      <NavigationTab/>
      <Routes>
        <Route >
          <Route path="/" element={<Home />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/analysis" element={<EmotionChart />} />
        </Route>
      </Routes>
    </HistoryProvider>
  );
}