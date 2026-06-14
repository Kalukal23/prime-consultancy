import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Setup successful! You are now logged in.');
        await login(email, password);
        navigate('/admin');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Setup failed: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary-dark)', marginBottom: '24px' }}>Admin Login</h2>
        
        {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '12px', border: 'none', cursor: 'pointer' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
          <p>First time? Enter desired credentials and click <button onClick={handleSetup} style={{background:'none', border:'none', color:'var(--primary)', cursor:'pointer', textDecoration:'underline'}}>Setup Admin</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
