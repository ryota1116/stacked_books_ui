import Button from '@mui/material/Button'
import Header from './Components/page/Header';
import './App.css';
import BookSearchForm from './Components/page/BookSearchForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Top } from './Components/page/Top';
import { SignIn } from './Components/page/signin';
import SignUpForm from './Components/page/signup';

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
              <Route path='signup' element={<SignUpForm />} />
              <Route path='/signin' element={SignIn} />
            </Routes>
          </BrowserRouter>
        </div>
      </body>
    </div>
  );
}

export default App;
