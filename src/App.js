import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orgchart from './pages/orgchart';
import DataMap from './pages/dataMap';
import Main from './pages/main';
import MetaDataInfo from './pages/metadataInfo';
import SystemInfo from './pages/systemInfo';
import { QueryClientProvider } from 'react-query';
import { MainProvider } from './context/MainContext';
import TableInfo from './pages/tableInfo';
import AIStatusMap from './pages/aiStatusMap';

function App() {
  return (
    <>    
        <Router>
          <MainProvider>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/DataMap" element={<DataMap />} />
              <Route path="/Orgchart" element={<Orgchart />} />
              <Route path="/AiStatusMap" element={<AIStatusMap />} />
              <Route path="/MetaDataInfo" element={<MetaDataInfo />} />
              <Route path="/TableInfo" element={<TableInfo />} />
              <Route path="/SystemInfo" element={<SystemInfo />} />
            </Routes>
          </MainProvider>
        </Router>
    </>
  );
}

export default App;
