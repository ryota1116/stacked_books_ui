import Header from './components/Header';
import { TopPage } from './components/TopPage';
import './App.css';
import BookSearchForm from './components/BookSearchForm';
import { BrowserRouter, Routes, Route, RouteProps, Navigate } from 'react-router-dom';
import SignUpForm from './components/SignUp';
import SignInForm from './components/SignIn';
import { Token } from '@mui/icons-material';
import React from 'react';

function App() {
  // stateの管理
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [authToken, setAuthToken] = React.useState<string | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        <div>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={<TopPage />}
              />
              <Route
                path='/signup'
                element={<SignUpForm />}
              />
              <Route
                path='/signin'
                element={<SignInForm />}
              />
              <Route
                path='/books/search'
                element={
                  <PrivateRoute
                    path='/books/search'
                    element={<BookSearchForm />}
                    redirect='/signin'
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </body>
    </div>
  );
}

type Props = {
  isLoggedIn: boolean;
  authToken: string;
}

const fetchAuthToken = (): string | null => {
  return localStorage.getItem('token');
}

const IsLoggedIn = (): boolean => {
  return fetchAuthToken !== null;
}

// https://zenn.dev/longbridge/articles/61b05d8bdb014d
type PrivateRouteProps = {
  path: string;
  element: React.ReactNode | null;
  redirect: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path, element, redirect
}) => {
  if (IsLoggedIn()) {
    return (
      <Route
        path={path}
        element={element}
      />
      // <Routes>
      //   <Route
      //     path={path}
      //     element={element}
      //   />
      // </Routes>
    )
  } else {
    return <Navigate to={redirect} />
  }
}

export default App;
