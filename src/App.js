import './App.css';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/home/Home';
import Chat from './Pages/Chat/Chat';
import Profile from './Pages/Profile/Profile';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
      <Routes>
        <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
        <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="../auth" />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="../auth" />} />
      </Routes>
      {/* <Home /> */}
      {/* <Profile/> */}
      {/* <Auth /> */}
      {/* <Signin/> */}
    </div>
  );
}

export default App;
