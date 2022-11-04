import './App.css'
import { FC } from 'react';
import { RecoilRoot } from "recoil";
import { Routes, Route } from "react-router-dom";
import Demo from './pages/demo';

const App: FC = () => {
  return (
      <RecoilRoot>
          <Routes>
              <Route path="/" element={<Demo />} />
          </Routes>
      </RecoilRoot>
  )
}

export default App