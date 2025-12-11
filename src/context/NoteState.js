import { React, useState } from 'react';
import { createContext } from 'react';

const NoteContext = createContext();
const NoteState = (props) => {
  const notesInit = [];
  const [notes, setNotes] = useState(notesInit);
  const [user, setUser] = useState([]);

  // Get all Notes
  const getdetails = async () => {
    const response = await fetch(`/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    setUser(json);
  };

  const getNotes = async () => {
    const response = await fetch(`/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (note) => {
    await fetch(`/api/notes/addnotes/`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
      }),
    });
    getNotes();
  };

  // Delete A Note

  const deleteNote = async (id) => {
    await fetch(`/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    getNotes();
  };

  // Edit A Note
  const editNote = async (id, title, description) => {
    await fetch(`/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title, description: description }),
    });
    getNotes();
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        getNotes,
        editNote,
        getdetails,
        user,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
export { NoteContext };
