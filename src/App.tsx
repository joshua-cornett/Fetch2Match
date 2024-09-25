import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Search, Match } from './pages';

function App() {
  return (
    /** @NOTE - Navbar w/ logout would go here */
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/** @TODO - Protect routes requiring authentication */}
        <Route path="/search" element={<Search />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
