import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PerformanceOptimizer from '../utils/performanceOptimizer'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function useOptimizedGSAP() {
  const perfRef = useRef(null)
  const scrollTriggersRef = useRef([])

  useEffect(() => {
    // Initialize performance optimizer
    perfRef.current = new PerformanceOptimizer()

    // Cleanup function
    return () => {
      try {
        // Kill all created ScrollTriggers
        scrollTriggersRef.current.forEach((trigger) => {
          if (trigger && typeof trigger.kill === 'function') {
            trigger.kill()
          }
        })
        scrollTriggersRef.current = []
      } catch (err) {
        console.warn('Failed to kill ScrollTriggers:', err)
      }

      try {
        // Disable GPU acceleration and cleanup
        if (perfRef.current) {
          perfRef.current.destroy()
        }
      } catch (err) {
        console.warn('Failed to cleanup performance optimizer:', err)
      }
    }
  }, [])

  const normalizeTargets = useCallback((target) => {
    if (!target) return []
    if (typeof target === 'string') {
      try {
        return Array.from(document.querySelectorAll(target))
      } catch {
        return []
      }
    }
    if (target instanceof Element) return [target]
    if (NodeList.prototype.isPrototypeOf(target) || Array.isArray(target)) {
      return Array.from(target).filter((el) => el instanceof HTMLElement)
    }
    return []
  }, [])

  const createOptimizedScrollTrigger = useCallback((options = {}) => {
    if (typeof window === 'undefined') return null

    const { target, targets, onRefresh, ...stOptions } = options
    let elements = []

    // Normalize and collect all target elements
    elements = [
      ...normalizeTargets(target),
      ...normalizeTargets(targets)
    ].filter((el) => el instanceof HTMLElement)

    // If no elements and no explicit trigger, return null
    if (elements.length === 0 && !stOptions.trigger) {
      console.warn('No valid targets found for ScrollTrigger')
      return null
    }

    // Enable GPU acceleration for target elements
    try {
      if (perfRef.current && elements.length > 0) {
        perfRef.current.updateTargets(elements)
        perfRef.current.enableGPUAcceleration()
      }
    } catch (err) {
      console.warn('enableGPUAcceleration failed:', err)
    }

    // Create safe onRefresh handler
    const safeOnRefresh = () => {
      try {
        // Re-enable GPU acceleration after refresh
        if (perfRef.current) {
          perfRef.current.enableGPUAcceleration()
        }
        
        // Call user's onRefresh if provided
        if (typeof onRefresh === 'function') {
          onRefresh()
        }
      } catch (err) {
        console.warn('onRefresh failed:', err)
      }
    }

    // Create ScrollTrigger with error handling
    try {
      const trigger = ScrollTrigger.create({
        ...stOptions,
        trigger: stOptions.trigger || elements[0] || null,
        onRefresh: safeOnRefresh,
      })

      // Keep track of created triggers for cleanup
      if (trigger) {
        scrollTriggersRef.current.push(trigger)
      }

      return trigger
    } catch (err) {
      console.warn('ScrollTrigger.create failed:', err)
      return null
    }
  }, [normalizeTargets])

  // Method to manually kill a specific ScrollTrigger
  const killScrollTrigger = useCallback((trigger) => {
    if (!trigger) return

    try {
      trigger.kill()
      // Remove from tracking array
      const index = scrollTriggersRef.current.indexOf(trigger)
      if (index > -1) {
        scrollTriggersRef.current.splice(index, 1)
      }
    } catch (err) {
      console.warn('Failed to kill ScrollTrigger:', err)
    }
  }, [])

  // Method to refresh all ScrollTriggers
  const refreshScrollTriggers = useCallback(() => {
    try {
      ScrollTrigger.refresh()
    } catch (err) {
      console.warn('Failed to refresh ScrollTriggers:', err)
    }
  }, [])

  return {
    createOptimizedScrollTrigger,
    killScrollTrigger,
    refreshScrollTriggers,
    performanceOptimizer: perfRef.current
  }
}