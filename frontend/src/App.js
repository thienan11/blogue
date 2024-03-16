import './App.css';
import {Route, Routes, Switch} from "react-router-dom";
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth0 } from '@auth0/auth0-react';
import NotFoundPage from './pages/NotFoundPage';
import UserContextProvider from './components/UserContext';
import CreatePostPage from './pages/CreatePostPage';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        
        <Route path="/" element={<Layout/>}>

          <Route index element={ <HomePage/> }/>

          <Route path={'/login'} element={ <LoginPage/> }/>

          <Route path={'/register'} element={ <RegisterPage/> }/>

          <Route path={'/create'} element={ <CreatePostPage/> }/>

          <Route path="*" element={<NotFoundPage />} />

        </Route>
      
      </Routes>

    </UserContextProvider>
  );
}

export default App;
