import './Styles/App.css';
import { HistoryProvider, HistoryContext } from './Contexts/historyContext';
import { AuthUser, AuthUserProvider } from './Contexts/userContext';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react'
import ReactModal from 'react-modal';
import Home from './Components/Home/Home'
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretLeft, faCaretRight, faSignOut, faClose } from '@fortawesome/free-solid-svg-icons';
import Landing from './Components/Landing';
import NavigationTab from './Components/NavigationTab';
import Memories from './Components/Memories/Memories'
import EmotionChart from './Components/EmotionChart';
import FeedbackPopup from './Components/FeedbackPopup';

library.add(faCaretLeft, faCaretRight, faSignOut, faClose);


const PUBLISHABLE_KEY = process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY

function SignInPage() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
ReactModal.setAppElement('#root');
export default function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

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
  const { updateAuthUser } = useContext(AuthUser);
  const { fetchData, fetchCoordinate } = useContext(HistoryContext);


  useEffect(() => {
    if (isLoaded && user) {
      const newAuthUser = {
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      updateAuthUser(newAuthUser);
      fetchData(newAuthUser.email);
      fetchCoordinate(newAuthUser.email)
    }
  }, [isLoaded, user, updateAuthUser]);

  return (
    <div className='container'>
      <NavigationTab />
      <Routes>
        <Route >

          <Route path="/" element={<Home />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/analysis" element={<EmotionChart />} />
        </Route>
      </Routes>
    </div>
  );
}