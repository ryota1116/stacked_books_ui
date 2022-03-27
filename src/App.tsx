import Button from '@mui/material/Button'
import Header from './Components/page/Header';
import './App.css';
import BookSearchForm from './Components/page/BookSearchForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Top } from './Components/page/Top';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Top />} />
              <Route path='/books/search' element={<BookSearchForm />} />
            </Routes>
          </BrowserRouter>
        </div>
      </body>
    </div>
  );
}

export default App;
