import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

export default function LoginSignup(props) {
  var history = useNavigate();
  const [containerName, setconName] = useState('containerunique');
  const [alertSide, setAlertSide] = useState('right');

  const [signin, setSignin] = useState({ email: '', password: '' });
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const signinStore = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };
  const signupStore = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.name === 'signin') {
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signin.email,
          password: signin.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        history('/');
        props.showAlert('LogedIn Successfully', 'success');
      } else {
        props.showAlert(json.error[0].msg, 'danger');
      }
    } else {
      if (signup.password === signup.cpassword) {
        const response = await fetch(`/api/auth/createuser/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: signup.name,
            email: signup.email,
            password: signup.password,
          }),
        });
        const json = await response.json();
        if (json.success) {
          localStorage.setItem('token', json.authToken);
          props.showAlert('Account Register Successfully', 'success');
        } else {
          props.showAlert(json.error[0].msg, 'danger');
        }
      } else {
        props.showAlert('Password and Confirm Password Must be Same', 'danger');
      }
    }
  };

  const clickHandler = (e) => {
    if (e.currentTarget.name === 'signup') {
      setAlertSide('left');
      setconName('containerunique sign-up-mode');
    } else {
      setconName('containerunique');
      setAlertSide('right');
    }
  };
  return (
    <>
      <Alert mess={props.alert} align={alertSide} />
      <div className={containerName}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  name="email"
                  onChange={signinStore}
                  placeholder="Username"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  name="password"
                  onChange={signinStore}
                  placeholder="Password"
                />
              </div>
              <button
                className="btn solid"
                name="signin"
                onClick={handlesubmit}
              >
                Submit
              </button>
            </form>

            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  name="name"
                  onChange={signupStore}
                  placeholder="Name"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  type="email"
                  name="email"
                  onChange={signupStore}
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  name="password"
                  onChange={signupStore}
                  placeholder="Password"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  name="cpassword"
                  onChange={signupStore}
                  placeholder="Confirm Password"
                />
              </div>
              <input
                type="submit"
                className="btn"
                onClick={handlesubmit}
                defaultValue="Sign up"
              />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Sign up for INotebook and use it for free. It's perfect for
                writing down your thoughts, notes and ideas so you have them all
                in one place.
              </p>
              <button
                className="btn transparent"
                name="signup"
                id="sign-up-btn"
                onClick={clickHandler}
              >
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                LogIn InstaNotebook and use it for free. It's perfect for
                writing down your thoughts, notes and ideas so you have them all
                in one place.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                name="signin"
                onClick={clickHandler}
              >
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
