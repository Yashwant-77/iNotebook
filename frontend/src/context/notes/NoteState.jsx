import React, { useState } from "react";
import NoteContext from "./noteContext";

function NoteState(props) {
  const [notes, setNotes] = useState([]);
  const host = "https://inotebook-2-748t.onrender.com";

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/getallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Add note

  const addNote = async ({ title, description, tag }) => {
    // Api call to server
    try {
      // const noteTag = tag.length() === 0 ? "General" : tag;
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        body: JSON.stringify({ title, description, tag }),
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const note = await response.json();
      // Adding new note to notes array
      setNotes(notes.concat(note));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    // Api call to server
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
    } catch (error) {
      console.log(error.message);
    }

    // Logic to delete in client
    // console.log("Deleting the note of id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    // Api call to server

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
