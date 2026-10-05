import { Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './Dashboard';

// A simple dummy component for our settings page
function Settings() {
  return (
    <div>
      <h2>Settings</h2>
      <p>User preferences will go here.</p>
    </div>
  );
}

function App() {
  return (
    <div>
      {/* 1. Global Navigation Bar */}
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Dashboard</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      {/* 2. The Route Controller */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;