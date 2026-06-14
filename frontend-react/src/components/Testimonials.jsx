import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const defaultTestimonials = [
  { _id: '1', rating: 5, content: "Prime Consultancy transformed our business strategy. Their insights were invaluable.", clientName: "Abebe Tadesse", company: "CEO, Tech Solutions" },
  { _id: '2', rating: 5, content: "Professional, data-driven, and deeply committed to our organization's growth.", clientName: "Sara Mohammed", company: "Director, Green Agri" },
  { _id: '3', rating: 5, content: "Their feasibility study was thorough and enabled confident investment decisions.", clientName: "Dawit Bekele", company: "National Bank" }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/testimonials`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) setTestimonials(defaultTestimonials);
        else setTestimonials(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err);
        setTestimonials(defaultTestimonials);
        setLoading(false);
      });
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Client Testimonials</h2>
          <p>Hear from our satisfied clients</p>
        </div>
        <div className="testimonials-grid">
          {loading ? (
            <p>Loading...</p>
          ) : (
            testimonials.map(t => (
              <div key={t._id} className="testimonial-card">
                <div className="stars">
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <div className="quote-text">"{t.content}"</div>
                <div className="author">
                  <div className="author-avatar">{t.clientName.charAt(0)}</div>
                  <div>
                    <strong>{t.clientName}</strong><br />
                    <span style={{color: 'var(--body-gray)', fontSize: '14px'}}>{t.company}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
