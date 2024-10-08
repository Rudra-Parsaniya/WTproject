import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from'react-router-dom'

import Registration from './Components/Registration'
import Login from './Components/Login'
import Home from './Components/Home'
import Nav from './Components/Nav'
import CreateBook from './Components/CreateBook'
import SavedBook from './Components/SavedBook'
import ReadBook from './Components/ReadBook'
import EditBook from './Components/EditBook'


function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/auth/register' element={<Registration />}></Route>
        <Route path='/auth/login' element={<Login />}></Route>
        <Route path='/book/create-book' element={<CreateBook />}></Route>
        <Route path='/book/saved-book' element={<SavedBook />}></Route>
        <Route path='/read-book/:id' element={<ReadBook />}></Route>
        <Route path='/book/edit/:id' element={<EditBook />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
