
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';
import Issues from './components/Issues';
import GitCheatsheet from './pages/GitCheatsheet';
import Documentation from './pages/Doc';
import OpenSourceDocumentation from './pages/Doc';



function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Header />
          <Routes>
            <Route path="/" element={
              <main >
                <Hero />
                <div className='px-20'>
                  <Features />
                  <About />
                </div>
              </main>
            } />
            <Route path="/issues" element={<Issues />} />

            <Route path="/git-cheatsheet" element={<GitCheatsheet />} />
            <Route path="/OpenSourceDocumentation" element={<OpenSourceDocumentation />} />

          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;