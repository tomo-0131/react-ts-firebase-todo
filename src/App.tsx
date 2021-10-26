import React from 'react';
import { Header } from './components/Header'
import {  AuthProvider } from './providers/AuthProvider';
import { Dashboard } from './components/Dashboard';
import './service/firebase';
import './App.css';

function App() {

  return (
    <AuthProvider>
        <Header />
        <Dashboard />
    </AuthProvider>
  );
}

export default App;
