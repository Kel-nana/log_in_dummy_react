/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AuthContext from './store/auth-context';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const loggedInUser = localStorage.getItem('is_logged_in');
useEffect(()=>{
if(loggedInUser==='1'){
  setIsLoggedIn(true);
}

},[])
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('is_logged_in', '1')
    setIsLoggedIn(true);
  };
 
  const logoutHandler = () => {
    localStorage.setItem('is_logged_in', '0')
    setIsLoggedIn(false);
  };

  return (
      <AuthContext.Provider 
      value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler
      }
      }>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
  );
} 

export default App;
