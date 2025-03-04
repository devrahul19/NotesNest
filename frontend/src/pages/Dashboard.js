"use client";

import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    // Fetch user's notes
    // For now using dummy data
    const userNotes = [
      { id: 1, title: 'My Note', content: 'Personal note content' },
      { id: 2, title: 'Ideas', content: 'Some ideas for projects' },
    ];
    setNotes(userNotes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new note logic here
    const note = {
      id: Date.now(),
      ...newNote,
    };
    setNotes([...notes, note]);
    setNewNote({ title: '', content: '' });
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
        
        {/* Create Note Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Content</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="4"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Note
            </button>
          </form>
        </div>

        {/* Notes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
              <p className="text-gray-600 mb-4">{note.content}</p>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 