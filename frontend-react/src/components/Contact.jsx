import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Contact() {
  const [aptForm, setAptForm] = useState({
    fullName: '', email: '', phone: '', company: '', service: 'Corporate Strategy', preferredDate: ''
  });
  const [msgForm, setMsgForm] = useState({
    fullName: '', email: '', companyName: '', phone: '', service: '', message: ''
  });
  const [aptStatus, setAptStatus] = useState(null);
  const [msgStatus, setMsgStatus] = useState(null);

  const handleAptSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aptForm)
      });
      const data = await res.json();
      setAptStatus({ type: 'success', message: data.message || 'Appointment requested successfully!' });
      setAptForm({fullName: '', email: '', phone: '', company: '', service: 'Corporate Strategy', preferredDate: ''});
    } catch (err) {
      setAptStatus({ type: 'error', message: 'Error submitting form. Please try again.' });
    }
    setTimeout(() => setAptStatus(null), 5000);
  };

  const handleMsgSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgForm)
      });
      const data = await res.json();
      setMsgStatus({ type: 'success', message: data.message || 'Message sent successfully!' });
      setMsgForm({fullName: '', email: '', companyName: '', phone: '', service: '', message: ''});
    } catch (err) {
      setMsgStatus({ type: 'error', message: 'Error sending message. Please try again.' });
    }
    setTimeout(() => setMsgStatus(null), 5000);
  };

  return (
    <>
      {/* Appointment Section */}
      <section id="appointment" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Book a Consultation</h2>
            <p>Let's discuss how we can help your organization grow</p>
          </div>
          <div className="contact-wrapper">
            <div className="contact-form-card">
              <h3 style={{marginBottom: '24px', fontSize: '24px', color: 'var(--primary-dark)'}}>Request Consultation</h3>
              <form onSubmit={handleAptSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" required placeholder="Enter your full name" 
                         value={aptForm.fullName} onChange={e => setAptForm({...aptForm, fullName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" required placeholder="hello@company.com" 
                         value={aptForm.email} onChange={e => setAptForm({...aptForm, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" required placeholder="+251..." 
                         value={aptForm.phone} onChange={e => setAptForm({...aptForm, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" placeholder="Your organization" 
                         value={aptForm.company} onChange={e => setAptForm({...aptForm, company: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Service Needed *</label>
                  <select value={aptForm.service} onChange={e => setAptForm({...aptForm, service: e.target.value})}>
                    <option value="Corporate Strategy">Corporate & Business Strategy</option>
                    <option value="Growth Transformation">Growth & Business Transformation</option>
                    <option value="Organizational Design">Organizational Design & Development</option>
                    <option value="Feasibility Study">Project Feasibility Study</option>
                    <option value="Training">Training & Capacity Building</option>
                    <option value="Research">Research & Advisory Services</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input type="date" required value={aptForm.preferredDate} onChange={e => setAptForm({...aptForm, preferredDate: e.target.value})} />
                </div>
                <button type="submit" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                  Request Consultation <ArrowRight size={18} />
                </button>
              </form>
              {aptStatus && <div className={`form-message ${aptStatus.type}`}>{aptStatus.message}</div>}
            </div>

            <div className="contact-info-card" id="contact">
              <h3>Contact Information</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon"><MapPin size={24} /></div>
                  <div><strong>Address</strong><br/>Bole, Addis Ababa, Ethiopia</div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><Phone size={24} /></div>
                  <div><strong>Phone</strong><br/>+251 911 134 390</div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><Mail size={24} /></div>
                  <div><strong>Email</strong><br/>etayehuyibeltal@gmail.com</div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><MessageCircle size={24} /></div>
                  <div><strong>WhatsApp</strong><br/>+251 950370926</div>
                </div>
              </div>
              <div className="map-placeholder">
                <MapPin size={24} /> Bole, Addis Ababa
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="section">
        <div className="container">
          <div className="contact-message-card">
            <h3 style={{marginBottom: '24px', fontSize: '28px', color: 'var(--primary-dark)', textAlign: 'center'}}>Send us a Message</h3>
            <form onSubmit={handleMsgSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Full Name *" required 
                         value={msgForm.fullName} onChange={e => setMsgForm({...msgForm, fullName: e.target.value})} />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address *" required 
                         value={msgForm.email} onChange={e => setMsgForm({...msgForm, email: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Company Name" 
                         value={msgForm.companyName} onChange={e => setMsgForm({...msgForm, companyName: e.target.value})} />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" 
                         value={msgForm.phone} onChange={e => setMsgForm({...msgForm, phone: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <select value={msgForm.service} onChange={e => setMsgForm({...msgForm, service: e.target.value})}>
                  <option value="">Select Service</option>
                  <option>Corporate Strategy</option>
                  <option>Feasibility Study</option>
                  <option>Organizational Design</option>
                  <option>Training</option>
                </select>
              </div>
              <div className="form-group">
                <textarea rows="4" placeholder="Your message *" required 
                          value={msgForm.message} onChange={e => setMsgForm({...msgForm, message: e.target.value})}></textarea>
              </div>
              <div style={{textAlign: 'center'}}>
                <button type="submit" className="btn-primary" style={{padding: '16px 40px'}}>Send Message</button>
              </div>
            </form>
            {msgStatus && <div className={`form-message ${msgStatus.type}`}>{msgStatus.message}</div>}
          </div>
        </div>
      </section>
    </>
  );
}
