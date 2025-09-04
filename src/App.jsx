import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy, useEffect, useRef } from 'react'
import LoadingFallback from './components/common/LoadingFallback'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import useLenis from './hooks/useLenis'
import PerformanceOptimizer, { preloadCriticalResources } from './utils/performanceOptimizer'

// Register GSAP plugin once
gsap.registerPlugin(ScrollTrigger)

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const AffiliateProgram = lazy(() => import('./pages/AffiliateProgram'))

const App = () => {
  // Initialize Lenis smooth scrolling
  const lenis = useLenis()
  const optimizerRef = useRef(null)

  useEffect(() => {
    // Preload critical resources for better performance
    preloadCriticalResources()

    // Create and use the optimizer
    optimizerRef.current = new PerformanceOptimizer({
      // adjust targets if needed
      targets: ['.stair', 'body']
    })
    optimizerRef.current.enableGPUAcceleration()

    // ✅ Refresh ScrollTrigger on load
    const handleLoad = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', handleLoad)

    // ✅ Also refresh after React paints (fixes desktop bug)
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    // Optimize initial render
    requestAnimationFrame(() => {
      document.body.classList.remove('loading')
    })

    return () => {
      window.removeEventListener('load', handleLoad)
      cancelAnimationFrame(raf)
      optimizerRef.current?.destroy()
    }
  }, [])

  // Sync GSAP ScrollTrigger with Lenis
  useEffect(() => {
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)

      const tick = (time) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tick)

      return () => {
        lenis.off('scroll', ScrollTrigger.update)
        gsap.ticker.remove(tick)
      }
    }
  }, [lenis])

  return (
    <div className='overflow-x-hidden'>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-of-service' element={<TermsOfService />} />
          <Route path='/affiliate-program' element={<AffiliateProgram />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
