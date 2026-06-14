import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Strategic Consulting Solutions for Sustainable Growth</h1>
          <p className="hero-subtitle">
            Empowering businesses, NGOs, and institutions with expert strategy, feasibility studies, 
            organizational development, project evaluation, and capacity-building services.
          </p>
          <div className="hero-buttons">
            <a href="#appointment" className="btn-primary">
              Book Consultation <ArrowRight size={20} />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Us
            </a>
          </div>
          <div className="stats-container">
            <div className="stat-item">
              <h3>50+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <h3>25+</h3>
              <p>Expert Consultants</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
