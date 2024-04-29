import './App.css';
import { AuthUser, ThemeProvider, ThemeContext} from './Contexts/ThemeContext';
import { useState, useEffect, useContext } from 'react'
import AnalyzeMood from './Components/Analyze/AnalyzeMood';


export default function App() {
  const [authUser, setAuthUser] = useState('Jiaojiao')
  return (

    <ThemeProvider>
      <div className="App" >
           <AnalyzeMood />  
      </div>

    </ThemeProvider>

  );
}


