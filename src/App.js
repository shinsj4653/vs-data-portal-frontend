import Layout from './components/layout';
import Main from './pages/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orgchart from './pages/orgchart';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/orgchart" element={<Orgchart/>} />
        </Routes>      
      </Router>
    </>
  );
}

export default App;
