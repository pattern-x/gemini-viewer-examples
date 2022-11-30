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
              <Route path="/" element={<Examples />}>
                  <Route path=":id" element={<Examples />} />
              </Route>
              <Route path="/demo" element={<Demo />} />
          </Routes>
      </RecoilRoot>
  )
}

export default App