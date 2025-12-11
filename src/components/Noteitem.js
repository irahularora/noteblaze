import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteState';

export default function Noteitem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const deleter = () => {
    deleteNote(note._id);
    props.showAlert('Note Successfully Deleted', 'success');
  };
  return (
    <>
      <div className="card carder">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="action">
            <i
              className="fa-solid fa-trash-can"
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={deleter}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              style={{ color: 'orange', cursor: 'pointer' }}
              onClick={() => updateNote(note)}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
