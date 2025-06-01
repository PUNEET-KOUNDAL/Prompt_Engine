// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PromptProvider } from './context/PromptContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import PromptForm from './components/PromptForm';
import ResultsDisplay from './components/ResultsDisplay';
import ExamplesPage from './components/ExamplesPage';
import AboutPage from './components/AboutPage';
import PricingPage from './components/PricingPage';
import NotFoundPage from './components/NotFoundPage';
import CareerPage from './components/Career';       // ✅ Added CareerPage
import EducationPage from './components/EducationPage'; // ✅ Added EducationPage

function App() {
  return (
    <PromptProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/create" element={<PromptForm />} />
              <Route path="/result" element={<ResultsDisplay />} />
              <Route path="/examples" element={<ExamplesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/career" element={<CareerPage />} />       {/* ✅ Career route */}
              <Route path="/education" element={<EducationPage />} /> {/* ✅ Education route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PromptProvider>
  );
}

export default App;
