import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaEnvelope, FaCalendarCheck, FaClock } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reply Modal State
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        
        const [resApt, resContact] = await Promise.all([
          fetch(`${API_URL}/appointments`, { headers }),
          fetch(`${API_URL}/contacts`, { headers })
        ]);
        
        if (resApt.status === 401 || resContact.status === 401) {
          logout();
          navigate('/login');
          return;
        }

        const dataApt = await resApt.json();
        const dataContact = await resContact.json();
        
        setAppointments(Array.isArray(dataApt) ? dataApt : []);
        setContacts(Array.isArray(dataContact) ? dataContact : []);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchData();
    }
  }, [token, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openReplyModal = (contact) => {
    setSelectedContact(contact);
    setReplyMessage('');
  };

  const closeReplyModal = () => {
    setSelectedContact(null);
    setReplyMessage('');
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return alert('Please enter a message');
    
    setReplying(true);
    try {
      const res = await fetch(`${API_URL}/contacts/${selectedContact._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ replyMessage })
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert('Reply sent successfully!');
        setContacts(contacts.map(c => c._id === selectedContact._id ? { ...c, status: 'replied' } : c));
        closeReplyModal();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      alert('Failed to send reply');
    } finally {
      setReplying(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6' }}>
        <h2 style={{color: 'var(--primary-dark)'}}>Loading Dashboard...</h2>
      </div>
    );
  }

  // Calculate Summary Stats
  const totalInquiries = contacts.length;
  const pendingReplies = contacts.filter(c => c.status !== 'replied').length;
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments.filter(a => new Date(a.preferredDate) >= new Date()).length;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#1e293b', margin: 0, fontWeight: 700 }}>Prime Admin Portal</h1>
            <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>Manage your consultations and inquiries</p>
          </div>
          <button 
            onClick={handleLogout} 
            style={{ padding: '8px 20px', backgroundColor: 'white', color: '#ef4444', border: '1px solid #fee2e2', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="admin-stats-grid">
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#e0f2fe', padding: '16px', borderRadius: '12px', marginRight: '20px' }}>
              <FaEnvelope style={{ color: '#0ea5e9', fontSize: '24px' }} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Total Inquiries</p>
              <h3 style={{ margin: '5px 0 0 0', color: '#0f172a', fontSize: '24px', fontWeight: 700 }}>{totalInquiries}</h3>
            </div>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fef3c7', padding: '16px', borderRadius: '12px', marginRight: '20px' }}>
              <FaClock style={{ color: '#d97706', fontSize: '24px' }} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Pending Replies</p>
              <h3 style={{ margin: '5px 0 0 0', color: '#0f172a', fontSize: '24px', fontWeight: 700 }}>{pendingReplies}</h3>
            </div>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#dcfce7', padding: '16px', borderRadius: '12px', marginRight: '20px' }}>
              <FaUsers style={{ color: '#16a34a', fontSize: '24px' }} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Total Appointments</p>
              <h3 style={{ margin: '5px 0 0 0', color: '#0f172a', fontSize: '24px', fontWeight: 700 }}>{totalAppointments}</h3>
            </div>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#f3e8ff', padding: '16px', borderRadius: '12px', marginRight: '20px' }}>
              <FaCalendarCheck style={{ color: '#9333ea', fontSize: '24px' }} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Upcoming Bookings</p>
              <h3 style={{ margin: '5px 0 0 0', color: '#0f172a', fontSize: '24px', fontWeight: 700 }}>{upcomingAppointments}</h3>
            </div>
          </div>

        </div>

        {/* Lists Section */}
        <div className="admin-lists-grid">
          
          {/* Inquiries List */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <h2 style={{ fontSize: '18px', color: '#0f172a', margin: 0 }}>New Inquiries</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {contacts.length === 0 ? (
                <p style={{ color: '#64748b', textAlign: 'center', py: 4 }}>No inquiries yet.</p>
              ) : (
                contacts.map(c => (
                  <div key={c._id} style={{ display: 'flex', alignItems: 'flex-start', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px', transition: 'all 0.2s', border: '1px solid transparent', cursor: 'pointer' }} onClick={() => c.status !== 'replied' && openReplyModal(c)} onMouseOver={(e) => e.currentTarget.style.borderColor = '#e2e8f0'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                    
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e293b', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 600, fontSize: '14px', flexShrink: 0, marginRight: '15px' }}>
                      {getInitials(c.fullName)}
                    </div>
                    
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <h4 style={{ margin: 0, fontSize: '15px', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {c.fullName} <span style={{ color: '#94a3b8', fontWeight: 400 }}>— {c.companyName || 'Individual'}</span>
                        </h4>
                        <span style={{ 
                          padding: '4px 10px', 
                          borderRadius: '20px', 
                          fontSize: '11px', 
                          fontWeight: 600,
                          backgroundColor: c.status === 'replied' ? '#f3e8ff' : '#e0f2fe',
                          color: c.status === 'replied' ? '#7e22ce' : '#0369a1'
                        }}>
                          {c.status === 'replied' ? 'Responded' : 'New'}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: '#3b82f6', fontWeight: 500 }}>{c.service || 'General Inquiry'}</p>
                      <p style={{ margin: 0, fontSize: '13px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.message}
                      </p>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

          {/* Appointments List */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <h2 style={{ fontSize: '18px', color: '#0f172a', margin: 0 }}>Recent Appointments</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {appointments.length === 0 ? (
                <p style={{ color: '#64748b', textAlign: 'center', py: 4 }}>No appointments yet.</p>
              ) : (
                appointments.map(a => (
                  <div key={a._id} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0f172a', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 600, fontSize: '14px', flexShrink: 0, marginRight: '15px' }}>
                      {getInitials(a.fullName)}
                    </div>
                    
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#0f172a' }}>{a.fullName}</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{a.service}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#334155', fontWeight: 500 }}>
                          {new Date(a.preferredDate).toLocaleDateString()}
                        </p>
                        <span style={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          display: 'inline-block',
                          backgroundColor: a.status === 'confirmed' ? '#22c55e' : '#f59e0b'
                        }}></span>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Reply Modal */}
      {selectedContact && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'}}>
          <div style={{background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'}}>
            <h3 style={{marginTop: 0, fontSize: '20px', color: '#0f172a'}}>Reply to {selectedContact.fullName}</h3>
            <p style={{fontSize: '14px', color: '#64748b', marginBottom: '20px'}}><FaEnvelope style={{verticalAlign:'middle', marginRight:'5px'}}/> {selectedContact.email}</p>
            
            <div style={{background: '#f8fafc', padding: '16px', borderRadius: '12px', fontSize: '14px', marginBottom: '24px', border: '1px solid #e2e8f0'}}>
              <strong style={{color: '#334155'}}>Message:</strong>
              <p style={{color: '#475569', margin: '8px 0 0 0', lineHeight: 1.5}}>{selectedContact.message}</p>
            </div>
            
            <textarea 
              rows="5"
              style={{width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '24px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical'}}
              placeholder="Type your reply here... (An email will be sent)"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
            
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
              <button onClick={closeReplyModal} style={{padding: '10px 20px', background: 'white', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: 500}}>Cancel</button>
              <button onClick={handleSendReply} disabled={replying} style={{padding: '10px 20px', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.3)'}}>
                {replying ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
