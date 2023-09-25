// eslint-disable-next-line no-unused-vars
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateWatch from './pages/CreateWatch';
import ShowWatch from './pages/ShowWatch';
import EditWatch from './pages/EditWatch';
import DeleteWatch from './pages/DeleteWatch';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/watches/create' element={<CreateWatch/>}/>
      <Route path='/watches/details/:id' element={<ShowWatch/>}/>
      <Route path='/watches/edit/:id' element={<EditWatch/>}/>
      <Route path='/watches/delete/:id' element={<DeleteWatch/>}/>
    </Routes>
    )
}

export default App