import Button from '@mui/material/Button'
import Header from './components/Header';
import { TopPage } from './components/TopPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <body>
        <TopPage />
      </body>
    </div>
  );
}

export default App;
