"use client";

import React, { useState, useEffect } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Here you would fetch notes from your backend
    // For now using dummy data
    const dummyNotes = [
      { id: 1, title: 'First Note', content: 'This is my first note', author: 'John Doe' },
      { id: 2, title: 'Second Note', content: 'This is another note', author: 'Jane Smith' },
    ];
    setNotes(dummyNotes);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Latest Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
              <p className="text-gray-600 mb-4">{note.content}</p>
              <p className="text-sm text-gray-500">By {note.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes; 