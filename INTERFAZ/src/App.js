
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Orders from './Component/Orders';
import Neworder from './Component/newOrder';
import Editorder from './Component/editOrder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<Orders></Orders>}></Route>
       <Route path='/my-orders' element={<Orders/>}></Route>
       <Route path='/add-order' element={<Neworder/>}></Route>
       <Route path='/add-order/:id' element={<Editorder/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
