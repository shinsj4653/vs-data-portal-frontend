import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orgchart from './pages/orgchart';
import CirclePack from './pages/circlePack';
import Main from './pages/main';

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/CirclePack" element={<CirclePack />} />
            <Route path="/orgchart" element={<Orgchart />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
