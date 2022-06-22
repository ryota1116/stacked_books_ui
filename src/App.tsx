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
  const [isPrepared, setIsPrepared] = React.useState<boolean>(false);
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
              <Route path='/' element={<TopPage />} />
              <Route path='/books/search' element={<BookSearchForm />} />
              <Route path='/signup' element={<SignUpForm />} />
              <Route path='/signin' element={<SignInForm />} />
            </Routes>
          </BrowserRouter>
        </div>
      </body>
    </div>
  );
}

type PrivateRouteProps = {
  element?: React.ReactNode | null;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element, path
}) => {
  return (
    <Route
      element={
        <RouteAuthGuard
          component={element}
          redirect='/signin'
        />
      }
      path={path}
    />
  );
}

type Props = {
  isLoggedIn: boolean;
  isPrepared: boolean;
  authToken: string;
}

const fetchAuthToken = (): string | null => {
  return localStorage.getItem('token');
}

const IsLoggedIn = (): boolean => {
  return fetchAuthToken !== null;
}

// https://zenn.dev/longbridge/articles/61b05d8bdb014d
type RouteAuthGuardProps = {
  component: React.ReactNode;
  redirect: string;
}

const RouteAuthGuard: React.VFC<RouteAuthGuardProps> = (
  component, redirect
) => {
  if (IsLoggedIn()) {
    return <>{component}</>
  } else {
    return <Navigate
      to={redirect}
    />
  }
}

export default App;
