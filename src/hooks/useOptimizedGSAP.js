import { useEffect, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { performanceOptimizer } from '../utils/performanceOptimizer'

gsap.registerPlugin(ScrollTrigger)

export const useOptimizedGSAP = (animationCallback, dependencies = [], options = {}) => {
  const contextRef = useRef(null)
  const isInitializedRef = useRef(false)
  
  const {
    enableScrollTrigger = true,
    refreshOnResize = true,
    refreshDelay = 100,
    enableGPUAcceleration = true
  } = options

  // Optimized refresh function
  const refreshScrollTrigger = useCallback(
    performanceOptimizer.debounce(() => {
      if (enableScrollTrigger) {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      }
    }, refreshDelay),
    [enableScrollTrigger, refreshDelay]
  )

  // Initialize GSAP context with performance optimizations
  useGSAP(() => {
    if (isInitializedRef.current) return

    contextRef.current = gsap.context(() => {
      // Enable GPU acceleration for better performance
      if (enableGPUAcceleration) {
        gsap.set('*', { force3D: true })
      }

      // Set default GSAP settings for performance
      gsap.defaults({
        ease: 'power2.out',
        duration: 0.8,
        force3D: true,
        lazy: false
      })

      // Execute animation callback
      if (typeof animationCallback === 'function') {
        animationCallback()
      }

      isInitializedRef.current = true
    })

    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
      }
    }
  }, dependencies)

  // Handle resize events for ScrollTrigger refresh
  useEffect(() => {
    if (!refreshOnResize || !enableScrollTrigger) return

    const handleResize = refreshScrollTrigger
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [refreshOnResize, enableScrollTrigger, refreshScrollTrigger])

  // Handle route changes
  useEffect(() => {
    if (enableScrollTrigger) {
      const timer = setTimeout(refreshScrollTrigger, refreshDelay)
      return () => clearTimeout(timer)
    }
  }, dependencies)

  return {
    context: contextRef.current,
    refresh: refreshScrollTrigger
  }
}

// Optimized scroll trigger creation
export const createOptimizedScrollTrigger = (element, options = {}) => {
  const defaultOptions = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
    fastScrollEnd: true,
    preventOverlaps: true,
    refreshPriority: 0,
    ...options
  }

  return ScrollTrigger.create({
    trigger: element,
    ...defaultOptions,
    onRefresh: () => {
      // Ensure proper positioning after refresh
      if (element) {
        performanceOptimizer.enableGPUAcceleration(element)
      }
    }
  })
}

// Batch animation utility for better performance
export const batchAnimations = (animations, options = {}) => {
  const { stagger = 0.1, delay = 0 } = options
  
  return gsap.timeline({ delay })
    .add(() => {
      animations.forEach((animation, index) => {
        gsap.delayedCall(index * stagger, () => {
          if (typeof animation === 'function') {
            animation()
          }
        })
      })
    })
}

export default useOptimizedGSAP