import React, { useContext, useState } from 'react';
import { NoteContext } from '../context/NoteState';

export default function Addnote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const storeInput = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleform = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({ title: '', description: '', tag: '' });
    props.showAlert('Note Added', 'success');
  };
  return (
    <>
      <h1 style={{ textTransform: 'capitalize' }}>Add a note</h1>
      <form className="my-3 former">
        <div className="form-group grouper my-3">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            name="title"
            onChange={storeInput}
            value={note.title}
          />
        </div>
        <div className="form-group grouper my-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            name="description"
            onChange={storeInput}
            placeholder="Enter Description"
            value={note.description}
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleform}
        >
          Add a Note
        </button>
      </form>
    </>
  );
}
