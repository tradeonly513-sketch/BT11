// useOptimizedGSAP Hook - Complete implementation
import { useEffect, useRef, useCallback } from 'react'

// Custom hook for optimized GSAP animations
export const useOptimizedGSAP = (animationCallback, dependencies = [], options = {}) => {
  const elementRef = useRef(null)
  const contextRef = useRef(null)
  const { 
    scope = null, 
    revertOnUpdate = true,
    immediate = false 
  } = options

  const runAnimation = useCallback(() => {
    if (!elementRef.current && !scope) return

    try {
      // If GSAP is available, use it
      if (typeof window !== 'undefined' && window.gsap) {
        // Create GSAP context for cleanup
        contextRef.current = window.gsap.context(() => {
          animationCallback(elementRef.current || scope)
        }, scope || elementRef.current)
      } else {
        // Fallback: run animation without GSAP
        console.warn('GSAP not available, running callback without animations')
        animationCallback(elementRef.current || scope)
      }
    } catch (error) {
      console.error('Error in GSAP animation:', error)
    }
  }, [animationCallback, scope])

  useEffect(() => {
    if (immediate) {
      runAnimation()
    } else {
      // Use RAF for better performance
      const rafId = requestAnimationFrame(runAnimation)
      return () => cancelAnimationFrame(rafId)
    }

    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
      }
    }
  }, dependencies)

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (contextRef.current) {
        contextRef.current.kill()
      }
    }
  }, [])

  return elementRef
}

// Create Optimized ScrollTrigger
export const createOptimizedScrollTrigger = (config = {}) => {
  const {
    trigger,
    animation,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    toggleActions = 'play none none reverse',
    markers = false,
    refreshPriority = 0,
    ...otherConfig
  } = config

  try {
    // Check if ScrollTrigger is available
    if (typeof window !== 'undefined' && window.gsap && window.gsap.ScrollTrigger) {
      const scrollTrigger = window.gsap.ScrollTrigger.create({
        trigger,
        start,
        end,
        scrub,
        toggleActions,
        markers,
        refreshPriority,
        animation,
        ...otherConfig,
        // Add performance optimizations
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true
      })

      return scrollTrigger
    } else {
      console.warn('ScrollTrigger not available')
      return null
    }
  } catch (error) {
    console.error('Error creating ScrollTrigger:', error)
    return null
  }
}

// Batch animations for better performance
export const batchGSAPAnimations = (animations = []) => {
  if (typeof window === 'undefined' || !window.gsap) {
    console.warn('GSAP not available for batch animations')
    return
  }

  try {
    // Use GSAP's batch method for performance
    if (window.gsap.batch) {
      return window.gsap.batch(animations, {
        interval: 0.1,
        batchMax: 3,
        onComplete: () => console.log('Batch animations complete')
      })
    } else {
      // Fallback: run animations with RAF spacing
      animations.forEach((animation, index) => {
        setTimeout(() => {
          if (typeof animation === 'function') {
            animation()
          }
        }, index * 100)
      })
    }
  } catch (error) {
    console.error('Error in batch animations:', error)
  }
}

// Kill all GSAP animations and ScrollTriggers
export const killAllGSAPAnimations = () => {
  try {
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.killTweensOf('*')
      if (window.gsap.ScrollTrigger) {
        window.gsap.ScrollTrigger.killAll()
      }
    }
  } catch (error) {
    console.error('Error killing GSAP animations:', error)
  }
}

// Refresh ScrollTrigger - useful after layout changes
export const refreshScrollTrigger = () => {
  try {
    if (typeof window !== 'undefined' && window.gsap && window.gsap.ScrollTrigger) {
      window.gsap.ScrollTrigger.refresh()
    }
  } catch (error) {
    console.error('Error refreshing ScrollTrigger:', error)
  }
}

// Default export for the main hook
export default useOptimizedGSAP