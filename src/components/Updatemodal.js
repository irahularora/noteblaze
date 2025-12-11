import React, { useContext, useRef, useState } from 'react';
import { NoteContext } from '../context/NoteState';

export default function Updatemodal(props) {
  const context = useContext(NoteContext);
  const { editNote } = context;
  const refclose = useRef(null);
  const [currentnote, setCNote] = useState([]);
  React.useEffect(() => {
    setCNote(props.currentnote);
  }, [props.currentnote]);
  const storeInput = async (e) => {
    await setCNote({ ...currentnote, [e.target.name]: e.target.value });
  };
  const handleform = () => {
    editNote(currentnote._id, currentnote.title, currentnote.description);
    refclose.current.click();
    props.showAlert('Note Updated Successfully', 'success');
  };

  return (
    <div>
      {' '}
      <button
        ref={props.refer}
        type="button"
        style={{ display: 'none' }}
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                style={{
                  border: 'none',
                  fontSize: '2rem',
                  background: 'white',
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
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
                    value={currentnote.title}
                  />
                </div>
                <div className="form-group grouper my-3">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    name="description"
                    onChange={storeInput}
                    placeholder="Enter Description"
                    value={currentnote.description}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>

              {currentnote &&
                currentnote.description &&
                currentnote.description.length > 5 &&
                currentnote &&
                currentnote.title &&
                currentnote.title.length > 5 && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleform}
                  >
                    Update Note
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
