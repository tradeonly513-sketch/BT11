import React, { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/all'
import BackToHome from './BackToHome'
import { useOptimizedGSAP } from '../../hooks/useOptimizedGSAP'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const PageWrapper = ({ children, className = '' }) => {
  const pageRef = useRef(null)
  const location = useLocation()

  // Reset scroll position on route change
  useEffect(() => {
    // Smooth scroll to top on route change
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: 0, autoKill: false },
      ease: "power2.out"
    })
    
    // Force refresh ScrollTrigger whenever route changes
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, 150)
    
    return () => clearTimeout(timer)
  }, [location.pathname])

  useOptimizedGSAP(() => {
    gsap.set(pageRef.current, { opacity: 1 })

    gsap.fromTo(
      pageRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.3,
        force3D: true
      }
    )
  }, [location.pathname], { enableScrollTrigger: true, refreshOnResize: true })

  return (
    <>
      <BackToHome />
      <div ref={pageRef} className={`min-h-screen ${className}`} style={{ opacity: 1 }}>
        {children}
      </div>
    </>
  )
}

export default PageWrapper
