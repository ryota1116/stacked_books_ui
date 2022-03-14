import Button from '@mui/material/Button'
import Header from './Components/page/Header';
import './App.css';
import BookSearchForm from './Components/page/BookSearchForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <body>
        <div>
          <BookSearchForm />
        </div>
      </body>
    </div>
  );
}

export default App;