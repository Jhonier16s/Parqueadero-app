
import './App.css';
import Show from './components/Show';
import Create from './components/Create';
import Edit from './components/Edit';
import Welcome from './components/Welcome';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/show" element={<Show />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>  
      <Footer/>
    </div>
  );
}

export default App;
