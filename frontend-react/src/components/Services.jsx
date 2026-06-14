import { useEffect, useState } from 'react';
import { ArrowRight, Briefcase, TrendingUp, Users, FileText, BookOpen, Search } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const iconMap = {
  'briefcase': <Briefcase size={32} />,
  'chart-line': <TrendingUp size={32} />,
  'users': <Users size={32} />,
  'file-alt': <FileText size={32} />,
  'chalkboard-teacher': <BookOpen size={32} />,
  'search': <Search size={32} />,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        // Fallback data
        setServices([
          { _id: '1', title: 'Corporate Strategy', description: 'Comprehensive strategy planning to elevate your business position.', icon: 'briefcase' },
          { _id: '2', title: 'Growth Transformation', description: 'Transforming operations for scalable and sustainable growth.', icon: 'chart-line' },
          { _id: '3', title: 'Organizational Design', description: 'Restructuring organizations for optimal efficiency and synergy.', icon: 'users' },
          { _id: '4', title: 'Feasibility Study', description: 'In-depth project analysis to determine viability and risks.', icon: 'file-alt' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive consulting solutions tailored to your business needs</p>
        </div>
        <div className="services-grid">
          {loading ? (
            <p>Loading services...</p>
          ) : (
            services.map(service => (
              <div key={service._id} className="service-card">
                <div className="service-icon">
                  {iconMap[service.icon] || <Briefcase size={32} />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description.substring(0, 120)}...</p>
                <a href="#appointment" className="learn-more">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
