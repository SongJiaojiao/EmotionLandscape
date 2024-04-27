import './App.css';
import CBTFlow from './Components/CBTFlow';


export default function App() {
  return (

      <div style={globalStyles}>
        <CBTFlow />
      </div>

  );
}
const globalStyles = {
  width: '100%',
  display: 'flex',
  direction: 'row',
  justifyContent: 'center', // Horizontally center items
  margin: 0,
  padding: 0,
  height: '100vh',

};

