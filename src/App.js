import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orgchart from './pages/orgchart';
import DataMap from './pages/dataMap';
import Main from './pages/main';
import MetaDataInfo from './pages/metadataInfo';
import { QueryClientProvider } from 'react-query';
import { MainProvider } from './context/MainContext';

function App() {
  return (
    <>    
        <Router>
          <MainProvider>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/DataMap" element={<DataMap />} />
              <Route path="/Orgchart" element={<Orgchart />} />
              <Route path="/MetaDataInfo" element={<MetaDataInfo />} />
              <Route path="/SystemInfo" element={<MetaDataInfo />} />
            </Routes>
          </MainProvider>
        </Router>
    </>
  );
}

export default App;
