

import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebaseconfig';

function Student() {
  const [facultyList, setFacultyList] = useState([]);
  const [filters, setFilters] = useState({ domain: '', officeHours: '', slots: '' });
  const [ideaForm, setIdeaForm] = useState({ title: '', description: '', supervisor: '' });
  const [submittedIdeas, setSubmittedIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' or 'view'
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showFacultyDetails, setShowFacultyDetails] = useState(false);

  // Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setCurrentUser(user));
    return () => unsubscribe();
  }, []);

  // Fetch faculty
  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'faculty'));
        const facultyData = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          slots: doc.data().slots || 0
        }));
        setFacultyList(facultyData);
      } catch (error) {
        console.error("Error fetching faculty: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  // Fetch ideas
  useEffect(() => {
    if (!currentUser) return;
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'proposals'), where('submittedBy', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const ideasData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            submittedAt: data.submittedAt?.toDate ? data.submittedAt.toDate() : new Date(data.submittedAt)
          };
        }).sort((a, b) => b.submittedAt - a.submittedAt);
        setSubmittedIdeas(ideasData);
      } catch (error) {
        console.error("Error fetching ideas: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, [currentUser]);

  // Handlers
  const handleFilterChange = (e) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleIdeaChange = (e) => setIdeaForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const filteredFaculty = facultyList.filter(member => {
    const domainMatch = !filters.domain || member.domain.toLowerCase().includes(filters.domain.toLowerCase());
    const officeMatch = !filters.officeHours || member.officeHours.toLowerCase().includes(filters.officeHours.toLowerCase());
    const slotMatch = !filters.slots || (member.slots >= parseInt(filters.slots));
    return domainMatch && officeMatch && slotMatch;
  });

  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!currentUser) {
      alert("You must be logged in to submit an idea.");
      setLoading(false);
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'proposals'), {
        title: ideaForm.title,
        description: ideaForm.description,
        supervisor: ideaForm.supervisor,
        status: "pending",
        submittedBy: currentUser.uid,
        submittedAt: serverTimestamp(),
        studentName: currentUser.displayName || "Anonymous Student",
        studentEmail: currentUser.email || "",
        domain: facultyList.find(f => f.name === ideaForm.supervisor)?.domain || "General"
      });
      setSubmittedIdeas(prev => [{
        id: docRef.id,
        ...ideaForm,
        status: "pending",
        submittedAt: new Date(),
        studentName: currentUser.displayName || "Anonymous Student",
        studentEmail: currentUser.email || "",
        domain: facultyList.find(f => f.name === ideaForm.supervisor)?.domain || "General"
      }, ...prev]);
      setIdeaForm({ title: '', description: '', supervisor: '' });
      setActiveTab('view');
      alert("FYP idea submitted successfully!");
    } catch (error) {
      console.error("Error submitting idea: ", error);
      alert("Failed to submit FYP idea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProposal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this proposal?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'proposals', id));
      setSubmittedIdeas(prev => prev.filter(idea => idea.id !== id));
      alert("Proposal deleted successfully!");
    } catch (error) {
      console.error("Error deleting proposal: ", error);
      alert("Failed to delete proposal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const viewFacultyDetails = (faculty) => {
    setSelectedFaculty(faculty);
    setShowFacultyDetails(true);
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'revision': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };
  const getDomainColor = (domain) => {
    const colors = {
      'AI': 'bg-purple-100 text-purple-800',
      'Cybersecurity': 'bg-green-100 text-green-800',
      'Data Science': 'bg-blue-100 text-blue-800',
      'Networks': 'bg-orange-100 text-orange-800',
      'Web Development': 'bg-red-100 text-red-800',
      'Machine Learning': 'bg-indigo-100 text-indigo-800',
      'Cloud Computing': 'bg-cyan-100 text-cyan-800',
      'Software Engineering': 'bg-amber-100 text-amber-800',
      'IoT': 'bg-emerald-100 text-emerald-800'
    };
    return colors[domain] || 'bg-gray-100 text-gray-800';
  };
  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    try {
      const d = date instanceof Date ? date : new Date(date);
      return d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">🎓 Student FYP Dashboard</h1>
          <p className="text-lg text-blue-700 mt-1">Manage your FYP ideas and find the perfect supervisor.</p>
        </div>
        {currentUser && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Hi,</span>
            <span className="font-semibold text-blue-800">{currentUser.displayName || "Student"}</span>
            <img 
              src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || "Student"}`} 
              alt="avatar" 
              className="w-10 h-10 rounded-full border-2 border-blue-200" 
            />
          </div>
        )}
      </header>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-blue-700 font-medium">Processing...</span>
          </div>
        </div>
      )}

      {/* Faculty Details Modal */}
      {showFacultyDetails && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-blue-900">{selectedFaculty.name}</h3>
                  <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-semibold ${getDomainColor(selectedFaculty.domain)}`}>
                    {selectedFaculty.domain}
                  </span>
                </div>
                <button 
                  onClick={() => setShowFacultyDetails(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="mt-1 text-blue-600">
                    <a href={`mailto:${selectedFaculty.email}`} className="hover:underline">
                      {selectedFaculty.email}
                    </a>
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Office Hours</h4>
                  <p className="mt-1 text-gray-700">{selectedFaculty.officeHours || 'Not specified'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Available Slots</h4>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${(selectedFaculty.slots / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {selectedFaculty.slots} available
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Research Interests</h4>
                  <p className="mt-1 text-gray-700">
                    {selectedFaculty.researchInterests || 'Not specified'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => {
                    setIdeaForm(prev => ({ ...prev, supervisor: selectedFaculty.name }));
                    setShowFacultyDetails(false);
                    setActiveTab('submit');
                  }}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Select as Supervisor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('submit')}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'submit' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Submit New Idea
          </button>
          <button
            onClick={() => setActiveTab('view')}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'view' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            My Submissions ({submittedIdeas.length})
          </button>
          <button
            onClick={() => setActiveTab('supervisors')}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'supervisors' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Find Supervisors
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Filters - Only shown on Supervisors tab */}
          {activeTab === 'supervisors' && (
            <aside className="md:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 mb-6">🔍 Filter Supervisors</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Domain</label>
                  <select
                    name="domain"
                    onChange={handleFilterChange}
                    value={filters.domain}
                    className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">All Domains</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Networks">Networks</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="IoT">Internet of Things</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Office Hours</label>
                  <input
                    name="officeHours"
                    onChange={handleFilterChange}
                    value={filters.officeHours}
                    className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., Mon, Tue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Minimum Slots</label>
                  <input
                    name="slots"
                    onChange={handleFilterChange}
                    value={filters.slots}
                    type="number"
                    min="0"
                    className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
                    placeholder="Available slots"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFilters({ domain: '', officeHours: '', slots: '' })}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Clear Filters
                </button>
              </form>
            </aside>
          )}

          {/* Main Content */}
          <main className={`${activeTab === 'supervisors' ? 'md:col-span-2' : 'md:col-span-3'} flex flex-col gap-8`}>
            {/* Submit Idea Tab */}
            {activeTab === 'submit' && (
              <section className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                <h2 className="text-xl font-bold text-blue-900 mb-4">💡 Submit New FYP Idea</h2>
                <form onSubmit={handleIdeaSubmit} className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Project Title*</label>
                    <input
                      name="title"
                      value={ideaForm.title}
                      onChange={handleIdeaChange}
                      placeholder="Innovative title for your project"
                      className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Detailed Description*</label>
                    <textarea
                      name="description"
                      value={ideaForm.description}
                      onChange={handleIdeaChange}
                      placeholder="Describe your project in detail including objectives, methodology, and expected outcomes"
                      rows="5"
                      className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Select Supervisor*</label>
                    <select
                      name="supervisor"
                      value={ideaForm.supervisor}
                      onChange={handleIdeaChange}
                      className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
                      required
                    >
                      <option value="">-- Select a supervisor --</option>
                      {facultyList
                        .filter(f => f.slots > 0)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(f => (
                          <option key={f.id} value={f.name}>
                            {f.name} ({f.domain}) - {f.slots} slots available
                          </option>
                        ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-500">
                      Only showing supervisors with available slots
                    </p>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab('supervisors')}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                    >
                      Browse Supervisors
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-600 transition"
                      disabled={loading}
                    >
                      Submit Idea
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* View Submissions Tab */}
            {activeTab === 'view' && (
              <>
                {submittedIdeas.length === 0 ? (
                  <section className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No submissions yet</h3>
                    <p className="mt-2 text-gray-500">
                      You haven't submitted any FYP ideas yet. Get started by submitting your first idea!
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => setActiveTab('submit')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      >
                        Submit New Idea
                      </button>
                    </div>
                  </section>
                ) : (
                  <section className="bg-white rounded-2xl shadow-lg border border-blue-100">
                    <div className="p-6 border-b border-blue-50 flex justify-between items-center">
                      <h2 className="text-xl font-bold text-blue-900">Your Submitted Ideas</h2>
                      <span className="text-sm text-blue-500">{submittedIdeas.length} submissions</span>
                    </div>
                    <ul className="divide-y divide-blue-50">
                      {submittedIdeas.map((idea) => (
                        <li key={idea.id} className="p-6 hover:bg-blue-50 transition">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h3 className="text-lg font-bold text-blue-800">{idea.title}</h3>
                                <span className={`px-3 py-1 rounded-full border text-xs font-semibold capitalize ${getStatusColor(idea.status)}`}>
                                  {idea.status}
                                </span>
                              </div>
                              <p className="text-blue-700 mt-2">{idea.description}</p>
                              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-blue-600">
                                    <span className="font-medium">Supervisor:</span> {idea.supervisor}
                                  </p>
                                  <p className="text-sm text-blue-600">
                                    <span className="font-medium">Domain:</span> 
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getDomainColor(idea.domain)}`}>
                                      {idea.domain}
                                    </span>
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-blue-600">
                                    <span className="font-medium">Submitted:</span> {formatDate(idea.submittedAt)}
                                  </p>
                                  {idea.comments && idea.comments.length > 0 && (
                                    <p className="text-sm text-blue-600">
                                      <span className="font-medium">Feedback:</span> {idea.comments.length} comment(s)
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDeleteProposal(idea.id)}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition"
                                disabled={loading}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          {/* Show comments if any */}
                          {idea.comments && idea.comments.length > 0 && (
                            <div className="mt-4 border-t border-blue-100 pt-4">
                              <h4 className="text-sm font-medium text-blue-700 mb-2">Supervisor Feedback:</h4>
                              <ul className="space-y-2">
                                {idea.comments.map((comment, index) => (
                                  <li key={index} className="bg-blue-50 p-3 rounded-lg">
                                    <div className="flex justify-between items-start">
                                      <span className="text-sm font-medium">{comment.author}</span>
                                      <span className="text-xs text-gray-500">
                                        {new Date(comment.date).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}

            {/* Supervisors Tab */}
            {activeTab === 'supervisors' && (
              <section className="bg-white rounded-2xl shadow-lg border border-blue-100">
                <div className="p-6 border-b border-blue-50 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-blue-900">Available Supervisors</h2>
                  <span className="text-sm text-blue-500">
                    {filteredFaculty.length} {filteredFaculty.length === 1 ? 'match' : 'matches'} found
                  </span>
                </div>
                {filteredFaculty.length === 0 ? (
                  <div className="p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No supervisors found</h3>
                    <p className="mt-2 text-gray-500">
                      Try adjusting your filters or check back later for more availability.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => setFilters({ domain: '', officeHours: '', slots: '' })}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {filteredFaculty.map((faculty) => (
                      <div key={faculty.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-blue-800">{faculty.name}</h3>
                            <span className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDomainColor(faculty.domain)}`}>
                              {faculty.domain}
                            </span>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${faculty.slots > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {faculty.slots > 0 ? `${faculty.slots} slots` : 'No slots'}
                          </span>
                        </div>
                        <div className="mt-4 space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Office Hours:</span> {faculty.officeHours || 'Not specified'}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Email:</span> 
                            <a href={`mailto:${faculty.email}`} className="text-blue-600 hover:underline ml-1">
                              {faculty.email}
                            </a>
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() => viewFacultyDetails(faculty)}
                            className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Student;