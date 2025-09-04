import React, { useRef, useLayoutEffect, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Link } from 'react-router-dom'
import { useOptimizedGSAP, createOptimizedScrollTrigger } from '../../hooks/useOptimizedGSAP'
import { createOptimizedResizeHandler } from '../../utils/performanceOptimizer'

const CTASection = () => {
  const sectionRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  // Memoize animation configuration for better performance
  const animationConfig = useMemo(() => ({
    from: { opacity: 0, y: 40, visibility: 'hidden', force3D: true },
    to: {
      opacity: 1,
      y: 0,
      visibility: 'visible',
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
      force3D: true
    },
  }), [])

  useOptimizedGSAP(() => {
    createOptimizedScrollTrigger(sectionRef.current, {
      start: 'top 85%',
      onEnter: () => {
        const elements = gsap.utils.toArray('.cta-fade')
        if (elements.length) {
          gsap.fromTo(elements, animationConfig.from, animationConfig.to)
        }
      }
    })
  }, [animationConfig], { enableScrollTrigger: true, enableGPUAcceleration: true })

  // Fallback for elements already in view
  useOptimizedGSAP(() => {
    if (sectionRef.current && sectionRef.current.getBoundingClientRect().top < window.innerHeight) {
      const elements = gsap.utils.toArray('.cta-fade')
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 0.8,
        stagger: 0.2,
        force3D: true,
        overwrite: true
      })
    }
  }, [], { enableScrollTrigger: false })

  // Optimized refresh handling with debouncing
  useLayoutEffect(() => {
    const handleLoad = createOptimizedResizeHandler(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, { debounceMs: 100 })
    
    const handleResize = createOptimizedResizeHandler(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, { debounceMs: 150 })

    window.addEventListener('load', handleLoad, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Initial refresh with delay
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, 100)

    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  // Memoized stats data for performance
  const statsData = useMemo(() => [
    { value: '24h', label: 'Response Time' },
    { value: '100%', label: 'Satisfaction Rate' },
    { value: 'Free', label: 'Initial Consultation' }
  ], [])

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="min-h-screen section-dark-alt text-white relative depth-3 flex items-center section-transition"
      role="region"
      aria-labelledby="cta-heading"
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto text-center w-full">
        <div className="max-width-wide">
          <div className="floating-panel-dark space-y-8 sm:space-y-10 lg:space-y-12">
            <h2 
            id="cta-heading"
              className="cta-fade font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow"
            >
            Ready to Create Magic?
            </h2>

            <p className="cta-fade font-[font1] text-responsive leading-relaxed text-layer-2 max-width-text">
            Transformons votre jour spécial en un chef-d'œuvre cinématographique qui raconte votre histoire unique.
            </p>

            <div className="cta-fade flex-col-mobile justify-center">
              <Link
              to="/contact"
                className="btn-pill btn-primary h-12 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 inline-flex items-center justify-center group focus:outline-none"
              aria-label="Get started with our wedding videography services"
              >
                <span className="font-[font2] text-base sm:text-xl lg:text-2xl">
                Get Started Today
                </span>
              </Link>

              <Link
              to="/projects"
                className="btn-pill btn-secondary h-12 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 inline-flex items-center justify-center group focus:outline-none"
              aria-label="View our wedding videography portfolio"
              >
                <span className="font-[font2] text-base sm:text-xl lg:text-2xl">
                View Our Work
                </span>
              </Link>
            </div>

            <div className="cta-fade responsive-grid-3 text-center">
              {statsData.map((stat, index) => (
                <div key={stat.label} className="floating-panel-dark glass-hover space-y-3 sm:space-y-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-[font2] text-[#D3FD50] glow-accent text-layer-2 text-glow-strong">
                  {stat.value}
                  </div>
                  <div className="font-[font1] text-xs sm:text-sm lg:text-base text-layer-1 uppercase tracking-wide">
                  {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection