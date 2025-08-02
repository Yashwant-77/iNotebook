import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({
      title: "",
      description: "",
      tag: "",
    });

    showAlert("Note Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="card shadow p-4" style={{ borderRadius: "1rem" }}>
      <div className="container d-flex justify-content-center my-5">
        {/* form here */}

        <form className="">
          <h2 className="text-center text-primary mb-4">Add a New Note</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-outline-primary w-100"
            onClick={handleClick}
          >
            Add note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
