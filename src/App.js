import './Styles/App.css';
import { AuthUser, ThemeProvider, ThemeContext} from './Contexts/ThemeContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import AnalyzeMood from './Components/Analyze/AnalyzeMood';
import CBTFlow from './Components/Reframe Exercise/CBTFlow';


export default function App() {
  const [authUser, setAuthUser] = useState('Jiaojiao')
  return (

    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AnalyzeMood />}  />
            <Route path="/reframe" element={<CBTFlow />} />
          </Routes>
        </div>
      </Router>

    </ThemeProvider>

  );
}


