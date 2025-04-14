import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Move CreateNoteModal outside of Dashboard component
const CreateNoteModal = ({ 
  isModalOpen, 
  setIsModalOpen, 
  newNote, 
  setNewNote, 
  handleCreateNote, 
  isSubmitting, 
  createError 
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newNote.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!newNote.desc.trim()) {
      newErrors.desc = 'Content is required';
    }
    if (newNote.desc.length > 1000) {
      newErrors.desc = 'Content must be less than 1000 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleCreateNote();
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.8,
                y: -20
              },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  damping: 25,
                  stiffness: 500
                }
              }
            }}
            className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">Create New Note</h2>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => {
                      setNewNote(prev => ({ ...prev, title: e.target.value }));
                      if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
                    }}
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${
                      errors.title 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent'
                    }`}
                    placeholder="Enter note title..."
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="relative">
                    <select 
                      value={newNote.category}
                      onChange={(e) => setNewNote(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                    >
                      <option value="Programming">Programming</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Technology">Technology</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content 
                    <span className="text-gray-400 text-xs ml-2">
                      {newNote.desc.length}/1000
                    </span>
                  </label>
                  <textarea
                    value={newNote.desc}
                    onChange={(e) => {
                      setNewNote(prev => ({ ...prev, desc: e.target.value }));
                      if (errors.desc) setErrors(prev => ({ ...prev, desc: '' }));
                    }}
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all h-32 resize-none ${
                      errors.desc 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent'
                    }`}
                    placeholder="Write your note content..."
                  />
                  {errors.desc && (
                    <p className="mt-1 text-sm text-red-500">{errors.desc}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PDF Attachment (optional)</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-violet-500 transition-colors">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-4h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-violet-600 hover:text-violet-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input 
                            type="file"
                            accept=".pdf"
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setNewNote(prev => ({ ...prev, pdfFile: file }));
                              }
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                  {newNote.pdfFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {newNote.pdfFile.name}
                    </p>
                  )}
                </div>

                {createError && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                    {createError}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:bg-violet-300 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Creating...</span>
                    </>
                  ) : (
                    'Create Note'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Add this component after the CreateNoteModal component and before the Dashboard function
const UpdateProfileModal = ({ 
  isOpen, 
  onClose, 
  userData, 
  onUpdate, 
  isUpdating, 
  updateError 
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.8,
              y: -20
            },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 500
              }
            }
          }}
          className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Update Profile</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>

          <form onSubmit={onUpdate} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                defaultValue={userData?.username}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={userData?.email}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {updateError && (
              <div className="text-red-500 text-sm">{updateError}</div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={onClose}
                disabled={isUpdating}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:bg-violet-300"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Update NoteModal to include comments in a split layout
const NoteModal = ({ note, onClose }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/notes/${note._id}/comments`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to load comments');
        }
        
        setComments(data.comments || []);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [note._id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/notes/${note._id}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: comment })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add comment');
      }

      setComments(prevComments => [data.comment, ...prevComments]);
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      alert(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-6xl overflow-hidden shadow-xl max-h-[90vh] flex"
        onClick={e => e.stopPropagation()}
      >
        {/* Main Content - Left Side */}
        <div className="flex-1 flex flex-col max-w-[60%] border-r border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
                <p className="text-sm text-violet-600 mt-1">{note.category}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <p className="text-gray-600 leading-relaxed">{note.desc}</p>
            
            {note.pdfUrl && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-2">Attached PDF</h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 16H8V8h4v8zm2 0V8h4v8h-4zm5-14H5a2 2 0 00-2 2v20a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2zm0 21H5V5h14v18z"/>
                      </svg>
                      <div>
                        <p className="font-medium text-gray-800">PDF Document</p>
                        <p className="text-sm text-gray-500">Click to download</p>
                      </div>
                    </div>
                    <a 
                      href={note.pdfUrl}
                      download={`note-${note._id}.pdf`}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors inline-flex items-center space-x-2"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = note.pdfUrl;
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 mt-auto">
            <p className="text-sm text-gray-500">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Comments Section - Right Side */}
        <div className="w-[40%] flex flex-col h-[90vh]">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-medium text-gray-800">Comments</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin h-5 w-5 text-violet-600" />
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm">{error}</p>
              ) : comments.length === 0 ? (
                <p className="text-gray-500 text-sm">No comments yet</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-medium text-sm">
                        {comment.userId?.username?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {comment.userId?.username || 'Unknown User'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm ml-10">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-sm"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:bg-violet-300 text-sm font-medium whitespace-nowrap"
              >
                Comment
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add DeleteConfirmationModal component before Dashboard function
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isDeleting }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Delete Note</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Add ShareLinkModal component before Dashboard function
const ShareLinkModal = ({ isOpen, onClose, shareableLink }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Share Note Link</h3>
          <p className="text-gray-600 mb-6">Copy the link below to share this note:</p>
          <div className="flex items-center space-x-2 mb-6">
            <input
              type="text"
              readOnly
              value={shareableLink}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigator.clipboard.writeText(shareableLink)}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
            >
              Copy
            </motion.button>
          </div>
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

function Dashboard() {
  const navigate = useNavigate();
  const [selectedNote, setSelectedNote] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isNotesLoading, setIsNotesLoading] = useState(true);
  const [notesError, setNotesError] = useState(null);
  const [newNote, setNewNote] = useState({
    title: '',
    desc: '',
    category: 'Programming',
    pdfFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [stats, setStats] = useState({
    totalNotes: 0,
    categories: {}
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // Add these new states after existing states
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [shareLinkModalOpen, setShareLinkModalOpen] = useState(false);
  const [currentShareableLink, setCurrentShareableLink] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:4000/user/getuser', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // if you're using Authorization header
            'Content-Type': 'application/json'
        },
          credentials: 'include'
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user data');
        }

        setUserData(data);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('unauthorized') || err.message.includes('Invalid token')) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      setIsNotesLoading(true);
      setNotesError(null);
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/notes/allnotes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch notes');
      }

      // Filter notes to only show the current user's notes
      const userNotes = data.notes.filter(note => 
        note.authorId?._id === userData?._id
      );

      setNotes(userNotes);

      // Calculate stats from user's notes only
      const categoryCount = userNotes.reduce((acc, note) => {
        acc[note.category] = (acc[note.category] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalNotes: userNotes.length,
        categories: categoryCount
      });

    } catch (err) {
      console.error('Fetch notes error:', err);
      setNotesError(err.message);
    } finally {
      setIsNotesLoading(false);
    }
  };

  // Update useEffect to fetch notes after user data is loaded
  useEffect(() => {
    if (userData) {
      fetchNotes();
    }
  }, [userData]); // Depend on userData instead of empty array

  const statsItems = [
    { label: 'Total Notes', value: stats.totalNotes.toString(), icon: '📝' },
    { label: 'Categories', value: Object.keys(stats.categories).length.toString(), icon: '🏷️' }
    // { label: 'Bookmarks', value: '12', icon: '🔖' },
    // { label: 'Comments', value: '45', icon: '💬' },
  ];

  const handleCreateNote = async () => {
    try {
      setIsSubmitting(true);
      setCreateError(null);
      
      const token = localStorage.getItem('token');
      
      const formData = new FormData();
      formData.append('title', newNote.title);
      formData.append('desc', newNote.desc);
      formData.append('category', newNote.category);
      if (newNote.pdfFile) {
        formData.append('file', newNote.pdfFile); // Change pdfFile to file
      }

      const response = await fetch('http://localhost:4000/notes/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create note');
      }

      // Reset form and close modal
      setNewNote({
        title: '',
        desc: '',
        category: 'Programming',
        pdfFile: null
      });
      setIsModalOpen(false);
      
      // Refresh notes list
      fetchNotes();

    } catch (err) {
      setCreateError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this new function to handle profile updates
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);

    const formData = new FormData(e.target);
    const updates = {
        username: formData.get('username').trim(),
        email: formData.get('email').trim()
    };

    // Only include password if it's not empty
    const password = formData.get('password');
    if (password && password.trim()) {
        updates.password = password;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/user/update/${userData._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile');
        }

        const data = await response.json();
        setUserData(data);
        setIsProfileModalOpen(false);
        alert('Profile updated successfully!');
        
    } catch (err) {
        console.error('Update error:', err);
        setUpdateError(err.message || 'Failed to update profile');
    } finally {
        setIsUpdating(false);
    }
  };

  // Add delete note handler function after fetchNotes
  const handleDeleteNote = async (noteId) => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      // Handle both success and error JSON responses
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete note');
      }

      // Remove note from state
      setNotes(prev => prev.filter(note => note._id !== noteId));
      setNoteToDelete(null);

      // Update stats
      const updatedNotes = notes.filter(note => note._id !== noteId);
      const categoryCount = updatedNotes.reduce((acc, note) => {
        acc[note.category] = (acc[note.category] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalNotes: updatedNotes.length,
        categories: categoryCount
      });

    } catch (err) {
      console.error('Delete error:', err);
      alert(err.message || 'Failed to delete note');
    } finally {
      setIsDeleting(false);
    }
  };

  // Add share link handler function
  const handleGenerateShareLink = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/notes/${noteId}/share-link`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setCurrentShareableLink(data.shareableLink);
      setShareLinkModalOpen(true);
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <svg className="animate-spin h-8 w-8 text-violet-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200 max-w-md mx-4">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="text-violet-600 hover:text-violet-700 font-medium"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 pb-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-gray-200 px-4 py-3"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="p-2 hover:bg-violet-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/notes')}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
            >
              Browse Notes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="px-4 py-2 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* User Profile Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
                {userData?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{userData?.username || 'User'}</h2>
                <p className="text-gray-500 text-sm mt-1">{userData?.email}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileModalOpen(true)}
              className="px-4 py-2 text-violet-600 border border-violet-600 rounded-lg hover:bg-violet-50 transition-colors"
            >
              Edit Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {statsItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Notes and Categories Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Your Notes */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Your Notes</h3>
            </div>
            <div className="p-4">
              {isNotesLoading ? (
                <div className="flex items-center justify-center p-8">
                  <svg className="animate-spin h-6 w-6 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : notesError ? (
                <div className="text-red-500 text-center p-4">
                  {notesError}
                </div>
              ) : notes.length === 0 ? (
                <div className="text-gray-500 text-center p-8">
                  No notes found. Create your first note!
                </div>
              ) : (
                notes.map((note) => (
                  <motion.div
                    key={note._id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="p-4 hover:bg-gray-50 rounded-lg transition-all mb-2 last:mb-0 group"
                  >
                    <div 
                      onClick={() => setSelectedNote(note)}
                      className="cursor-pointer"
                    >
                      <h4 className="font-medium text-gray-800">{note.title}</h4>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{note.desc}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-violet-600 text-xs font-medium">{note.category}</span>
                        <span className="text-gray-400 text-xs">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGenerateShareLink(note._id);
                        }}
                        className="text-violet-600 hover:text-violet-700 text-sm font-medium mr-3"
                      >
                        Share Link
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNoteToDelete(note);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Categories Overview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Categories Overview</h3>
            </div>
            <div className="p-6">
              {Object.entries(stats.categories).map(([category, count], index) => (
                <motion.div
                  key={category}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4 last:mb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="text-sm text-gray-500">{count} notes</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / stats.totalNotes) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-violet-600 to-indigo-600"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Note View Modal */}
      <AnimatePresence>
        {selectedNote && (
          <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
        )}
      </AnimatePresence>

      <CreateNoteModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newNote={newNote}
        setNewNote={setNewNote}
        handleCreateNote={handleCreateNote}
        isSubmitting={isSubmitting}
        createError={createError}
      />

      <UpdateProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userData={userData}
        onUpdate={handleUpdateProfile}
        isUpdating={isUpdating}
        updateError={updateError}
      />

      <DeleteConfirmationModal
        isOpen={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={() => handleDeleteNote(noteToDelete?._id)}
        isDeleting={isDeleting}
      />

      <ShareLinkModal
        isOpen={shareLinkModalOpen}
        onClose={() => setShareLinkModalOpen(false)}
        shareableLink={currentShareableLink}
      />
    </motion.div>
  );
}

export default Dashboard;
