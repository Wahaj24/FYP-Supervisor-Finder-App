


import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';

function Admin() {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [evaluationSlots, setEvaluationSlots] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newComment, setNewComment] = useState('');
  const [commentProjectId, setCommentProjectId] = useState(null);
  const [newSlot, setNewSlot] = useState({ faculty: '', date: '', time: '' });
  const [showFacultyForm, setShowFacultyForm] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '', email: '', domain: '', slots: 0, officeHours: ''
  });

  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const facultySnapshot = await getDocs(collection(db, 'faculty'));
      const facultyData = facultySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFacultyMembers(facultyData);

      const projectsSnapshot = await getDocs(collection(db, 'proposals'));
      const projectsData = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        comments: doc.data().comments || []
      }));
      setProjects(projectsData);

      const slotsSnapshot = await getDocs(collection(db, 'evaluationSlots'));
      const slotsData = slotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvaluationSlots(slotsData);
    };

    fetchData();
  }, []);

  // Project management functions
  const updateProjectStatus = async (projectId, status) => {
    try {
      await updateDoc(doc(db, 'proposals', projectId), { status });
      setProjects(projects.map(project =>
        project.id === projectId ? { ...project, status } : project
      ));
    } catch (error) {
      console.error("Error updating project status: ", error);
    }
  };

  const addComment = async (projectId) => {
    if (!newComment.trim()) return;
    const comment = {
      text: newComment,
      author: 'Admin',
      date: new Date().toISOString().split('T')[0]
    };
    try {
      const projectRef = doc(db, 'proposals', projectId);
      await updateDoc(projectRef, {
        comments: [...projects.find(p => p.id === projectId).comments, comment]
      });
      setProjects(projects.map(project =>
        project.id === projectId
          ? { ...project, comments: [...project.comments, comment] }
          : project
      ));
      setNewComment('');
      setCommentProjectId(null);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  // Faculty management functions
  const addFacultyMember = async () => {
    try {
      const docRef = await addDoc(collection(db, 'faculty'), {
        ...newFaculty,
        slots: parseInt(newFaculty.slots)
      });
      setFacultyMembers([...facultyMembers, { id: docRef.id, ...newFaculty }]);
      setNewFaculty({
        name: '', email: '', domain: '', slots: 0, officeHours: ''
      });
      setShowFacultyForm(false);
    } catch (error) {
      console.error("Error adding faculty: ", error);
    }
  };

  const deleteFacultyMember = async (id) => {
    try {
      await deleteDoc(doc(db, 'faculty', id));
      setFacultyMembers(facultyMembers.filter(member => member.id !== id));
      // Also delete any evaluation slots for this faculty
      const slotsToDelete = evaluationSlots.filter(slot => slot.facultyId === id);
      for (const slot of slotsToDelete) {
        await deleteDoc(doc(db, 'evaluationSlots', slot.id));
      }
      setEvaluationSlots(evaluationSlots.filter(slot => slot.facultyId !== id));
    } catch (error) {
      console.error("Error deleting faculty: ", error);
    }
  };

  // Evaluation slot functions
  const addEvaluationSlot = async () => {
    try {
      const faculty = facultyMembers.find(f => f.name === newSlot.faculty);
      if (!faculty) return;
      const docRef = await addDoc(collection(db, 'evaluationSlots'), {
        faculty: newSlot.faculty,
        facultyId: faculty.id,
        date: newSlot.date,
        time: newSlot.time,
        status: 'available'
      });
      setEvaluationSlots([...evaluationSlots, {
        id: docRef.id,
        faculty: newSlot.faculty,
        facultyId: faculty.id,
        date: newSlot.date,
        time: newSlot.time,
        status: 'available'
      }]);
      setNewSlot({ faculty: '', date: '', time: '' });
    } catch (error) {
      console.error("Error adding evaluation slot: ", error);
    }
  };

  const deleteEvaluationSlot = async (id) => {
    try {
      await deleteDoc(doc(db, 'evaluationSlots', id));
      setEvaluationSlots(evaluationSlots.filter(slot => slot.id !== id));
    } catch (error) {
      console.error("Error deleting evaluation slot: ", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'revision': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">FYP Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium shadow">A</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="bg-white/80 shadow rounded-lg mb-8">
          <nav className="flex space-x-4 p-4 overflow-x-auto">
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-md text-sm font-semibold ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-50'}`}>Dashboard</button>
            <button onClick={() => setActiveTab('faculty')} className={`px-4 py-2 rounded-md text-sm font-semibold ${activeTab === 'faculty' ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-50'}`}>Faculty Management</button>
            <button onClick={() => setActiveTab('projects')} className={`px-4 py-2 rounded-md text-sm font-semibold ${activeTab === 'projects' ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-50'}`}>Project Approvals</button>
            <button onClick={() => setActiveTab('evaluations')} className={`px-4 py-2 rounded-md text-sm font-semibold ${activeTab === 'evaluations' ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-50'}`}>Evaluation Slots</button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-indigo-700">{projects.length}</span>
                <span className="text-gray-600 mt-2">Total Projects</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-indigo-700">{facultyMembers.length}</span>
                <span className="text-gray-600 mt-2">Faculty Members</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-indigo-700">{evaluationSlots.length}</span>
                <span className="text-gray-600 mt-2">Evaluation Slots</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4 text-indigo-900">Recent Project Activities</h3>
              <div className="divide-y">
                {projects.slice(0, 5).map(project => (
                  <div key={project.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-indigo-800">{project.title}</p>
                      <p className="text-sm text-gray-500">{project.studentName} with {project.supervisor}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Faculty Management Tab */}
        {activeTab === 'faculty' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-indigo-900">Faculty Members</h3>
              <button
                onClick={() => setShowFacultyForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Add New Faculty
              </button>
            </div>

            {showFacultyForm && (
              <div className="p-6 border-b border-gray-200">
                <h4 className="text-md font-semibold mb-4">Add New Faculty Member</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={newFaculty.name}
                      onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={newFaculty.email}
                      onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={newFaculty.domain}
                      onChange={(e) => setNewFaculty({ ...newFaculty, domain: e.target.value })}
                    >
                      <option value="">Select Domain</option>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Slots</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={newFaculty.slots}
                      onChange={(e) => setNewFaculty({ ...newFaculty, slots: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Office Hours</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={newFaculty.officeHours}
                      onChange={(e) => setNewFaculty({ ...newFaculty, officeHours: e.target.value })}
                      placeholder="Example: Mon 10-12, Wed 2-4"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowFacultyForm(false);
                      setNewFaculty({ name: '', email: '', domain: '', slots: 0, officeHours: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addFacultyMember}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            <div className="p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Domain</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Slots</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Office Hours</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {facultyMembers.map(member => (
                    <tr key={member.id}>
                      <td className="px-4 py-2">{member.name}</td>
                      <td className="px-4 py-2">{member.email}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDomainColor(member.domain)}`}>
                          {member.domain}
                        </span>
                      </td>
                      <td className="px-4 py-2">{member.slots}</td>
                      <td className="px-4 py-2">{member.officeHours}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => deleteFacultyMember(member.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {facultyMembers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-gray-400">No faculty members found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Project Approvals Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-indigo-900">Project Approvals</h3>
            </div>
            <div className="p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Student</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Supervisor</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.map(project => (
                    <tr key={project.id}>
                      <td className="px-4 py-2">{project.title}</td>
                      <td className="px-4 py-2">{project.studentName}</td>
                      <td className="px-4 py-2">{project.supervisor}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => updateProjectStatus(project.id, 'approved')}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 text-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateProjectStatus(project.id, 'revision')}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-xs"
                        >
                          Revision
                        </button>
                        <button
                          onClick={() => updateProjectStatus(project.id, 'rejected')}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-xs"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-400">No projects found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Comments Section */}
              <div className="mt-8">
                <h4 className="text-md font-semibold mb-2">Project Comments</h4>
                {projects.map(project => (
                  <div key={project.id} className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="font-medium">{project.title}</span>
                      <button
                        className="ml-3 text-indigo-600 text-xs underline"
                        onClick={() => setCommentProjectId(commentProjectId === project.id ? null : project.id)}
                      >
                        {commentProjectId === project.id ? 'Hide' : 'Add/View Comments'}
                      </button>
                    </div>
                    {commentProjectId === project.id && (
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="space-y-2 mb-2">
                          {project.comments && project.comments.length > 0 ? (
                            project.comments.map((c, idx) => (
                              <div key={idx} className="text-sm text-gray-700">
                                <span className="font-semibold">{c.author}:</span> {c.text} <span className="text-gray-400 text-xs">({c.date})</span>
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-gray-400">No comments yet.</div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                          />
                          <button
                            onClick={() => addComment(project.id)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Evaluation Slots Tab */}
        {activeTab === 'evaluations' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-indigo-900">Evaluation Slots</h3>
              <button
                onClick={addEvaluationSlot}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Add Slot
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={newSlot.faculty}
                  onChange={e => setNewSlot({ ...newSlot, faculty: e.target.value })}
                >
                  <option value="">Select Faculty</option>
                  {facultyMembers.map(f => (
                    <option key={f.id} value={f.name}>{f.name}</option>
                  ))}
                </select>
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={newSlot.date}
                  onChange={e => setNewSlot({ ...newSlot, date: e.target.value })}
                />
                <input
                  type="time"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={newSlot.time}
                  onChange={e => setNewSlot({ ...newSlot, time: e.target.value })}
                />
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Faculty</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {evaluationSlots.map(slot => (
                    <tr key={slot.id}>
                      <td className="px-4 py-2">{slot.faculty}</td>
                      <td className="px-4 py-2">{slot.date}</td>
                      <td className="px-4 py-2">{slot.time}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${slot.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {slot.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => deleteEvaluationSlot(slot.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {evaluationSlots.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-400">No evaluation slots found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;
