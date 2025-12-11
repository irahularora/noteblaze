import './App.css';
import About from './components/About';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import NoteState from './context/NoteState';
import User from './components/User';
import LoginSignup from './components/LoginSignup';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home showAlert={showAlert} alert={alert} />}
          ></Route>
          <Route exact path="/about" element={<About alert={alert} />}></Route>
          <Route exact path="/user" element={<User alert={alert} />}></Route>
          <Route
            exact
            path="/auth"
            element={<LoginSignup showAlert={showAlert} alert={alert} />}
          ></Route>
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
