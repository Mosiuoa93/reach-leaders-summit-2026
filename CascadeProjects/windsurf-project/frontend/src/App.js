import React, { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import ChoicePage from './pages/ChoicePage';
import IndividualRegistration from './pages/IndividualRegistration';
import CoupleRegistration from './pages/CoupleRegistration';
import GroupRegistration from './pages/GroupRegistration';
import CheckInPage from './pages/CheckInPage';
import AdminDashboard from './pages/AdminDashboard';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [registrationData, setRegistrationData] = useState(null);

  const handleNavigateToPayment = (registration) => {
    setRegistrationData(registration);
    setCurrentPage('payment');
  };

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <LandingPage onNavigate={setCurrentPage} />
      )}
      {currentPage === 'choice' && (
        <ChoicePage onNavigate={setCurrentPage} />
      )}
      {currentPage === 'register-individual' && (
        <IndividualRegistration onNavigate={setCurrentPage} onPayment={handleNavigateToPayment} />
      )}
      {currentPage === 'register-couple' && (
        <CoupleRegistration onNavigate={setCurrentPage} onPayment={handleNavigateToPayment} />
      )}
      {currentPage === 'register-group' && (
        <GroupRegistration onNavigate={setCurrentPage} onPayment={handleNavigateToPayment} />
      )}
      {currentPage === 'payment' && registrationData && (
        <PaymentPage onNavigate={setCurrentPage} registration={registrationData} />
      )}
      {currentPage === 'confirmation' && registrationData && (
        <ConfirmationPage onNavigate={setCurrentPage} registration={registrationData} />
      )}
      {currentPage === 'checkin' && (
        <CheckInPage onNavigate={setCurrentPage} />
      )}
      {currentPage === 'admin' && (
        <AdminDashboard onNavigate={setCurrentPage} />
      )}
    </div>
  );
}

export default App;
