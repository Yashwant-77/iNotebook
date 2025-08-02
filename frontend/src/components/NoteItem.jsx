import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function NoteItem({ note, updateNote, showAlert }) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-4 col-lg-3 col-sm-6">
      <div className="card bg-light my-3  shadow-sm border-0 rounded-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  showAlert("Note Deleted Successfully", "success");
                }}
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-2"
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
