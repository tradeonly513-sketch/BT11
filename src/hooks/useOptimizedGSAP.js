// Hook that uses GSAP + ScrollTrigger but is defensive
// - ensures targets exist before creating ScrollTriggers
// - wraps performance optimizer calls in try/catch
// - returns a small API for creating optimized triggers
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import PerformanceOptimizer from '../utils/performanceOptimizer'

gsap.registerPlugin(ScrollTrigger)

export default function useOptimizedGSAP() {
  const perfRef = useRef(null)

  useEffect(() => {
    perfRef.current = new PerformanceOptimizer()
    // nothing else on mount
    return () => {
      // cleanup all ScrollTriggers and any other global GSAP state if necessary
      try {
        ScrollTrigger.getAll().forEach((t) => {
          try { t.kill && t.kill() } catch (err) { /* ignore individual errors */ }
        })
      } catch (err) {
        // avoid crashing on unmount
        console.warn('useOptimizedGSAP cleanup error', err)
      }
      // optional: disable GPU acceleration (noop in current PerformanceOptimizer)
      try { perfRef.current && perfRef.current.disableGPUAcceleration() } catch (err) {}
    }
  }, [])

  /**
   * Create an optimized ScrollTrigger.
   * options: same as ScrollTrigger.create plus `target` or `targets`:
   * - target: CSS selector | Element
   * - targets: array or NodeList
   */
  function createOptimizedScrollTrigger(options = {}) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return null

    const { target, targets, onRefresh, ...stOptions } = options

    // Determine the actual list of DOM elements to operate on
    let elements = []
    if (target) {
      try {
        if (typeof target === 'string') elements = Array.from(document.querySelectorAll(target))
        else if (target instanceof Element) elements = [target]
      } catch (err) {
        console.warn('createOptimizedScrollTrigger: invalid target', target, err)
      }
    }
    if (targets) {
      try {
        if (typeof targets === 'string') elements = elements.concat(Array.from(document.querySelectorAll(targets)))
        else if (targets instanceof Element) elements.push(targets)
        else if (NodeList.prototype.isPrototypeOf(targets) || Array.isArray(targets)) {
          elements = elements.concat(Array.from(targets).filter((n) => n instanceof Element))
        }
      } catch (err) {
        console.warn('createOptimizedScrollTrigger: invalid targets', targets, err)
      }
    }

    // If no elements resolved and no explicit scroller/trigger provided, bail out safely
    if (elements.length === 0 && !stOptions.trigger) {
      // Nothing to bind to; return null instead of throwing
      return null
    }

    // Try to enable GPU acceleration for resolved elements (defensively)
    try {
      if (perfRef.current && elements.length > 0) {
        perfRef.current.targets = elements
        perfRef.current.enableGPUAcceleration()
      }
    } catch (err) {
      console.warn('createOptimizedScrollTrigger: enableGPUAcceleration failed', err)
    }

    // Wrap the user's onRefresh to ensure it doesn't crash ScrollTrigger
    const safeOnRefresh = function () {
      try {
        // Re-run any optimizer steps on refresh (defensive)
        if (perfRef.current && perfRef.current.enableGPUAcceleration) {
          try { perfRef.current.enableGPUAcceleration() } catch (inner) { /* ignore */ }
        }
        if (typeof onRefresh === 'function') {
          try { onRefresh.apply(this, arguments) } catch (err) { console.warn('user onRefresh error', err) }
        }
      } catch (err) {
        console.warn('safeOnRefresh error', err)
      }
    }

    // Build final options object for ScrollTrigger
    const finalOptions = {
      ...stOptions,
      trigger: stOptions.trigger || (elements[0] || null),
      onRefresh: safeOnRefresh
    }

    try {
      const st = ScrollTrigger.create(finalOptions)
      return st
    } catch (err) {
      console.warn('createOptimizedScrollTrigger: ScrollTrigger.create failed', err)
      return null
    }
  }

  return {
    createOptimizedScrollTrigger,
    perf: perfRef.current
  }
}
