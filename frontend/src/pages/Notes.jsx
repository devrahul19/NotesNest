import React, { useState } from 'react';

function Notes() {
  const [notes] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      author: 'John Doe',
      excerpt: 'Learn the basics of React and its core concepts...',
      date: '2024-01-15',
      category: 'Programming',
    },
    // Add more sample notes
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Browse Notes</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <article
            key={note.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>{note.category}</span>
              <span>•</span>
              <time>{note.date}</time>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {note.title}
            </h2>
            
            <p className="text-gray-600 mb-4">
              {note.excerpt}
            </p>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600">By {note.author}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Notes;
