import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Addnote from './Addnote';
import Alert from './Alert';
import Navbar from './Navbar';
import Notes from './Notes';
export default function Home(props) {
  const history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history('/auth');
    }
  }, []);
  return (
    <>
      <Navbar />
      <Alert mess={props.alert} />
      <div
        className="container my-4"
        style={{ width: '90%', margin: 'auto', marginTop: '5rem' }}
      >
        <Addnote showAlert={props.showAlert} />
        <Notes showAlert={props.showAlert} />
      </div>
    </>
  );
}
