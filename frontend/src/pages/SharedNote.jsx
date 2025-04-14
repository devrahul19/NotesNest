import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function SharedNote() {
  const { shareableLink } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedNote = async () => {
      try {
        const response = await fetch(`http://localhost:4000/notes/shared/${shareableLink}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setNote(data.note);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedNote();
  }, [shareableLink]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 py-12 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{note.title}</h1>
            <span className="inline-block px-2 py-1 rounded-full text-sm font-medium bg-violet-100 text-violet-800">
              {note.category}
            </span>
            <div className="mt-6 prose">{note.desc}</div>
            
            {note.pdfUrl && (
              <div className="mt-6">
                <a 
                  href={note.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  View PDF
                </a>
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Shared by <span className="font-medium">{note.authorId.username}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SharedNote;
