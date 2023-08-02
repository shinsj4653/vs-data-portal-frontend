import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orgchart from './pages/orgchart';
import DataMap from './pages/dataMap';
import Main from './pages/main';
import MetaDataInfo from './pages/metadataInfo';
import { QueryClientProvider } from 'react-query';

function App() {
  return (
    <>    
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/DataMap" element={<DataMap />} />
            <Route path="/Orgchart" element={<Orgchart />} />
            <Route path="/MetaDataInfo" element={<MetaDataInfo />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
