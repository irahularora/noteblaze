import React, { useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteState';
import Alert from './Alert';
import Navbar from './Navbar';

export default function User(props) {
  const context = useContext(NoteContext);
  const { user, getdetails } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getdetails();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Alert mess={props.alert} />
      <div className="container" style={{ marginTop: '1.5rem' }}>
        <h1>USERACCOUT</h1>
      </div>
      <div className="container">
        <h5>Name: {user.name}</h5>
        <h5>Email: {user.email}</h5>
      </div>
    </div>
  );
}
