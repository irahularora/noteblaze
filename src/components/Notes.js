import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import { NoteContext } from '../context/NoteState';
import Updatemodal from './Updatemodal';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
  const context = useContext(NoteContext);
  let history = useNavigate();
  const { notes, getNotes } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      history('/auth');
    }
  }, []);
  const ref = useRef(null);
  const updater = async (note) => {
    ref.current.click();
    await setNote(note);
  };

  return (
    <>
      <Updatemodal refer={ref} currentnote={note} showAlert={props.showAlert} />
      <div
        className="row my-3"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <h2>Your Notes</h2>
        <p style={{ textAlign: 'center' }}>
          {notes.length === 0 && 'No Notes To Display'}
        </p>

        {notes.map((notes) => {
          return (
            <Noteitem
              key={notes._id}
              updateNote={updater}
              note={notes}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
}
