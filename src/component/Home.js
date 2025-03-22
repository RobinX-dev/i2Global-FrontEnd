import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import "./Styles.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage add note popup visibility
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to manage edit note popup visibility
  const [noteText, setNoteText] = useState(""); // State to manage note input text
  const [messageText, setMessageText] = useState(""); // State to manage message input text
  const [notes, setNotes] = useState([]); // State to store all notes
  const [selectedNote, setSelectedNote] = useState(null); // State to store the selected note for editing
  const username = localStorage.getItem("username"); // Get the username from localStorage
  const navigate = useNavigate(); // Hook for navigation

  // Fetch notes from the backend when the component loads
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/get_notes?username=${username}`);
        if (response.status === 200) {
          // Sort notes by created_on in ascending order
          const sortedNotes = response.data.sort(
            (a, b) => new Date(a.created_on) - new Date(b.created_on)
          );
          setNotes(sortedNotes); // Set the sorted notes fetched from the backend
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (username) {
      fetchNotes(); // Fetch notes only if the username is available
    }
  }, [username]);

  // Function to handle opening the add note popup
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to handle closing the add note popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setNoteText(""); // Clear the note input field
    setMessageText(""); // Clear the message input field
  };

  // Function to handle adding a note
  const handleAddNote = async () => {
    if (noteText.trim() !== "") {
      const newNote = {
        username, // Include the username
        heading: noteText,
        message: messageText,
        created_on: new Date().toISOString(), // Add created_on timestamp
        last_update: new Date().toISOString(), // Add last_update timestamp
      };

      try {
        // Send the new note to the backend
        const response = await axios.post("http://127.0.0.1:5000/add_note", newNote);
        if (response.status === 201) {
          // Update the local state with the new note
          setNotes([...notes, newNote]);
          setNoteText(""); // Clear the note input field
          setMessageText(""); // Clear the message input field
          setIsPopupOpen(false); // Close the popup
        }
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  // Function to handle opening the edit note popup
  const handleOpenEditPopup = (note) => {
    setSelectedNote(note); // Set the selected note
    setMessageText(note.message); // Set the message text for editing
    setIsEditPopupOpen(true); // Open the edit popup
  };

  // Function to handle closing the edit note popup
  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedNote(null); // Clear the selected note
    setMessageText(""); // Clear the message input field
  };

  // Function to handle saving the edited note
  const handleSaveNote = async () => {
    if (selectedNote) {
      const updatedNote = {
        ...selectedNote,
        message: messageText, // Update the message
        last_update: new Date().toISOString(), // Update the last_update timestamp
      };

      try {
        // Send the updated note to the backend
        const response = await axios.put(
          `http://127.0.0.1:5000/update_note/${selectedNote._id}`,
          updatedNote
        );
        if (response.status === 200) {
          // Update the local state with the updated note
          const updatedNotes = notes.map((note) =>
            note._id === selectedNote._id ? updatedNote : note
          );
          setNotes(updatedNotes);
          setIsEditPopupOpen(false); // Close the edit popup
        }
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };

  // Function to handle deleting a note
  const handleDeleteNote = async () => {
    if (selectedNote) {
      try {
        // Send a request to delete the note
        const response = await axios.delete(
          `http://127.0.0.1:5000/delete_note/${selectedNote._id}`
        );
        if (response.status === 200) {
          // Remove the deleted note from the local state
          const updatedNotes = notes.filter((note) => note._id !== selectedNote._id);
          setNotes(updatedNotes);
          setIsEditPopupOpen(false); // Close the edit popup
        }
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("username"); // Remove username from localStorage
      navigate("/login"); // Redirect to the login page
    }
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <h1>Keep notes</h1>
        <nav className="nav">
          <button onClick={() => console.log("About clicked")}>About</button>
          <button onClick={() => console.log("Account clicked")}>Account</button>
          <button onClick={() => console.log("Notes clicked")}>Notes</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      {/* Display all notes */}
      <div className="notes-container">
        {notes.map((note, index) => (
          <div key={index} className="note-window" onClick={() => handleOpenEditPopup(note)}>
            <div className="note-header">
              <h3>{note.heading}</h3>
            </div>
            <div className="note-body">
              <textarea
                value={note.message}
                readOnly // Make it read-only for display
              />
            </div>
            <div className="note-footer">
              <p>Last Updated: {new Date(note.last_update).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Notes icon in the bottom right corner */}
      <div className="notes-icon" onClick={handleOpenPopup}>
        📝
      </div>

      {/* Popup for adding notes */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-window">
            <div className="popup-header">
              <h2>Add Note</h2>
              <span className="close-icon" onClick={handleClosePopup}>
                ✖
              </span>
            </div>
            <div className="popup-body">
              <input
                type="text"
                placeholder="Enter your note"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <textarea
                placeholder="Enter your message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            <div className="popup-buttons">
              <button onClick={handleAddNote}>Add</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for editing notes */}
      {isEditPopupOpen && selectedNote && (
        <div className="popup">
          <div className="popup-window">
            <div className="popup-header">
              <h2>{selectedNote.heading}</h2>
              <span className="close-icon" onClick={handleCloseEditPopup}>
                ✖
              </span>
            </div>
            <div className="popup-body">
              <textarea
                placeholder="Enter your message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            <div className="popup-buttons">
              <button onClick={handleSaveNote}>Save</button>
              <button onClick={handleDeleteNote}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;