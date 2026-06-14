import { CheckCircle2, TrendingUp, Building2, Target, Handshake } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="section bg-light">
      <div className="container">
        <div className="two-columns">
          <div className="col-left">
            <div className="image-placeholder">
              <Handshake size={100} />
            </div>
          </div>
          <div className="col-right">
            <h2>Why Choose Prime Consultancy</h2>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4>Expert Consultants</h4>
                  <p>Experienced professionals with multidisciplinary expertise</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4>Results-Oriented Approach</h4>
                  <p>Solutions focused on measurable outcomes</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4>Industry Experience</h4>
                  <p>Serving public, private, and nonprofit sectors</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Target size={24} />
                </div>
                <div>
                  <h4>Customized Solutions</h4>
                  <p>Tailored recommendations for every client</p>
                </div>
              </div>
            </div>
            <div className="mini-stats">
              <div className="stat-card">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-card">
                <h3>200+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-card">
                <h3>15+</h3>
                <p>Industries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
