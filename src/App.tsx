import Header from './components/Header';
import { TopPage } from './components/TopPage';
import './App.css';
import BookSearchForm from './components/BookSearchForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
              <Route path='/' element={<TopPage />} />
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
