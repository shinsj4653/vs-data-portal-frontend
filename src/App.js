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
import { Suspense } from 'react';

function App() {
  return (
    <>    
        <Router>
          <MainProvider>
            <Routes>
              <Route path="/" element={<Suspense><Main /></Suspense>} />
              <Route path="/DataMap" element={<Suspense><DataMap /></Suspense>} />
              <Route path="/Orgchart" element={<Suspense><Orgchart /></Suspense>} />
              <Route path="/AiStatusMap" element={<Suspense><AIStatusMap /></Suspense>} />
              <Route path="/MetaDataInfo" element={<Suspense><MetaDataInfo /></Suspense>} />
              <Route path="/TableInfo" element={<Suspense><TableInfo /></Suspense>} />
              <Route path="/SystemInfo" element={<Suspense><SystemInfo /></Suspense>} />
            </Routes>
          </MainProvider>
        </Router>
    </>
  );
}

export default App;
