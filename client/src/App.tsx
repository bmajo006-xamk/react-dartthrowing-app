import React from 'react';
import {Container} from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Kilpailijat from './components/Kilpailijat';
import Kilpailut from './components/Kilpailut';
import Kierrokset from './components/Kierrokset';
import Kierros from './components/Kierros';
import KilpailuLopputulos from './components/KilpailuLopputulos';
import {KilpailuProvider} from './context/KilpailuContext';


const App : React.FC = () : React.ReactElement =>  {


  return (
  <KilpailuProvider>
    <Container>
      <Routes>
        <Route path="/" element={<Kilpailut />} />
        <Route path="/kilpailijat" element={<Kilpailijat />}/>
        <Route path="/kierrokset" element={<Kierrokset />} />
        <Route path="/kierros" element={<Kierros />} />
        <Route path="/lopputulokset" element={<KilpailuLopputulos />} />
      </Routes>
    </Container>
  </KilpailuProvider>
  );
}
export default App;
