import './App.css'
import { FC } from 'react';
import { RecoilRoot } from "recoil";
import { Routes, Route } from 'react-router-dom';
import Demo from './pages/demo';
import Examples from "./pages/examples";

const App: FC = () => {
  return (
      <RecoilRoot>
          <Routes>
              <Route index path="/" element={<Demo />} />
              <Route path="/examples" element={<Examples />}>
                  <Route path=":id" element={<Examples />} />
              </Route>
          </Routes>
      </RecoilRoot>
  )
}

export default App