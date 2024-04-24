import './App.css';
import CBTFlow from './Components/CBTFlow';


function App() {
  return (
    <div className="App" style={globalStyles}>
     <CBTFlow/>
    </div>
  );
}
const globalStyles = {
  width:'100%',
  display: 'flex',
  direction:'row',
  justifyContent: 'center', // Horizontally center items
  margin: 0,
  padding: 0,
  height: '100vh', 

};
export default App;
