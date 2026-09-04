import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { getResources, createResource, deleteResource, getUsers } from './services/api';

function App() {
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_type: 'PDF',
    file_path: 'https://example.com/demo.pdf'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [resResponse, usersResponse] = await Promise.all([
        getResources(),
        getUsers()
      ]);
      setResources(resResponse.data);
      setUsers(usersResponse.data);
      if (usersResponse.data.length > 0) {
        setSelectedOwnerId(usersResponse.data[0].id);
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to FastAPI server. Ensure backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateResource = async (e) => {
    e.preventDefault();
    try {
      await createResource(formData, selectedOwnerId);
      setShowModal(false);
      setFormData({
        title: '',
        description: '',
        file_type: 'PDF',
        file_path: 'https://example.com/demo.pdf'
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error creating resource: ' + (err.response?.data?.detail?.[0]?.msg || err.message));
    }
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm('Delete this resource?')) {
      try {
        await deleteResource(id);
        setResources(resources.filter((item) => item.id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete resource.');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #1e293b', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen color="#38bdf8" size={28} />
          <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>Digi Book</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={fetchData} 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }}
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button 
            onClick={() => setShowModal(true)} 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0284c7', border: 'none', color: '#ffffff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            <Plus size={16} /> Add Resource
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px' }}>
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#450a0a', border: '1px solid #b91c1c', padding: '14px', borderRadius: '8px', marginBottom: '24px', color: '#fca5a5' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '60px' }}>Loading resources from PostgreSQL...</p>
        ) : resources.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #334155', borderRadius: '12px' }}>
            <FileText size={48} color="#64748b" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', color: '#cbd5e1' }}>No resources found</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Upload your first notes or book using the button above.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {resources.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: '#0369a1', color: '#e0f2fe', padding: '3px 8px', borderRadius: '4px' }}>
                      {item.file_type || 'DOC'}
                    </span>
                    <button 
                      onClick={() => handleDeleteResource(item.id)} 
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                      title="Delete resource"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#f1f5f9' }}>{item.title}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.4' }}>{item.description || 'No description provided.'}</p>
                </div>
                <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #334155', fontSize: '12px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Owner ID: #{item.owner_id || 1}</span>
                  <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 }}>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '24px', width: '100%', maxWidth: '460px' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Add Academic Resource</h2>
              <form onSubmit={handleCreateResource}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Title</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    style={{ width: '100%', padding: '8px 12px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Description</label>
                  <textarea 
                    rows={3} 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    style={{ width: '100%', padding: '8px 12px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>File Type</label>
                  <select 
                    value={formData.file_type} 
                    onChange={(e) => setFormData({ ...formData, file_type: e.target.value })} 
                    style={{ width: '100%', padding: '8px 12px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="PDF">PDF</option>
                    <option value="Notes">Notes</option>
                    <option value="Book">Book</option>
                    <option value="PYQ">PYQ</option>
                  </select>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Uploaded By (Owner)</label>
                  <select 
                    value={selectedOwnerId} 
                    onChange={(e) => setSelectedOwnerId(Number(e.target.value))} 
                    style={{ width: '100%', padding: '8px 12px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.full_name || u.email} (ID: {u.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>File URL / Link</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.file_path} 
                    onChange={(e) => setFormData({ ...formData, file_path: e.target.value })} 
                    style={{ width: '100%', padding: '8px 12px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    style={{ padding: '8px 14px', backgroundColor: '#334155', border: 'none', borderRadius: '6px', color: '#e2e8f0', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={{ padding: '8px 16px', backgroundColor: '#0284c7', border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Save Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;