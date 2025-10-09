
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';
import Issues from './components/Issues';
import GitCheatsheet from './pages/GitCheatsheet';
import { SpeedInsights } from "@vercel/speed-insights/react"
import OpenSourceDocumentation from './pages/Doc';
import { Analytics } from "@vercel/analytics/react"
import SEO from './components/SEO';


function App() {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={
                <main>
                  <SEO />
                  <Hero />
                  <div className='sm:px-20'>
                    <Features />
                    <About />
                  </div>
                </main>
              } />
              <Route path="/issues" element={
                <>
                  <SEO 
                    title="Find Beginner-Friendly GitHub Issues | FirstPullRequest"
                    description="Browse thousands of beginner-friendly GitHub issues labeled 'good first issue' and 'documentation'. Filter by programming language and find your perfect first contribution."
                    canonical="https://www.firstpullrequest.space/issues"
                  />
                  <Issues />
                </>
              } />
              <Route path="/git-cheatsheet" element={
                <>
                  <SEO 
                    title="Git Cheatsheet for Beginners | FirstPullRequest"
                    description="Complete Git cheatsheet with essential commands for beginners. Learn Git basics to make your first pull request with confidence."
                    canonical="https://www.firstpullrequest.space/git-cheatsheet"
                  />
                  <GitCheatsheet />
                </>
              } />
              <Route path="/OpenSourceDocumentation" element={
                <>
                  <SEO 
                    title="Open Source Documentation & Guide | FirstPullRequest"
                    description="Complete guide to open source contribution. Learn how to contribute to open source projects, understand GitHub workflow, and make meaningful contributions."
                    canonical="https://www.firstpullrequest.space/OpenSourceDocumentation"
                  />
                  <OpenSourceDocumentation />
                </>
              } />
            </Routes>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;