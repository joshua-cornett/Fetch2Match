// React imports
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Context imports
import ProtectedRoute from './contexts/ProtectedRoute';

// Page imports
import { Login, Search, Match } from './pages';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/match"
          element={
            <ProtectedRoute>
              <Match />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
