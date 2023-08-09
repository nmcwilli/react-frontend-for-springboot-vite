import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Routes and Navigate
import ClientList from './components/ClientList/ClientList';
import ClientEdit from "./components/ClientEdit/ClientEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/clients' element={<ClientList />} />
            <Route path='/clients/:id' element={<ClientEdit />} />
            <Route path='*' element={<Navigate to="/" />} /> {/* Handle unknown routes */}
          </Routes>
        </Router>
    );
  }
}

export default App;
