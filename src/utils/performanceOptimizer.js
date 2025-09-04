// Complete Performance Optimizer with all required exports
class PerformanceOptimizer {
  constructor(options = {}) {
    this.targets = options.targets || []
    this.originalTransforms = new WeakMap()
  }

  _normalizeTargets(target) {
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
      return Array.from(target).filter((n) => n instanceof Element)
    }
    return []
  }

  enableGPUAcceleration() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    
    const targetsArr = Array.isArray(this.targets) ? this.targets : [this.targets]
    
    targetsArr.forEach((raw) => {
      const elems = this._normalizeTargets(raw)
      elems.forEach((el) => {
        if (!(el instanceof HTMLElement)) return
        
        try {
          if (!this.originalTransforms.has(el)) {
            this.originalTransforms.set(el, el.style.transform || '')
          }
          const existing = el.style.transform || ''
          if (!/\btranslateZ\(\s*0\s*\)/.test(existing)) {
            el.style.transform = `${existing} translateZ(0)`.trim()
            el.style.willChange = 'transform'
          }
        } catch (err) {
          console.warn('PerformanceOptimizer failed on element:', err)
        }
      })
    })
  }

  disableGPUAcceleration() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    
    const targetsArr = Array.isArray(this.targets) ? this.targets : [this.targets]
    
    targetsArr.forEach((raw) => {
      const elems = this._normalizeTargets(raw)
      elems.forEach((el) => {
        if (!(el instanceof HTMLElement)) return
        
        try {
          if (this.originalTransforms.has(el)) {
            const originalTransform = this.originalTransforms.get(el)
            el.style.transform = originalTransform
            this.originalTransforms.delete(el)
          }
          el.style.willChange = ''
        } catch (err) {
          console.warn('Failed to disable GPU acceleration:', err)
        }
      })
    })
  }

  updateTargets(newTargets) {
    this.targets = newTargets || []
  }

  destroy() {
    this.disableGPUAcceleration()
    this.originalTransforms.clear()
  }
}

// Preload Critical Resources
export const preloadCriticalResources = (resources = []) => {
  if (typeof document === 'undefined') return

  resources.forEach(resource => {
    try {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource.href
      link.as = resource.as || 'script'
      if (resource.type) link.type = resource.type
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin
      document.head.appendChild(link)
    } catch (err) {
      console.warn('Failed to preload resource:', resource.href, err)
    }
  })
}

// Create Optimized Scroll Handler
export const createOptimizedScrollHandler = (callback, options = {}) => {
  let ticking = false
  const { throttle = true, passive = true } = options

  const handleScroll = (event) => {
    if (throttle) {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback(event)
          ticking = false
        })
        ticking = true
      }
    } else {
      callback(event)
    }
  }

  // Add event listener with passive option for better performance
  const addListener = (element = window) => {
    element.addEventListener('scroll', handleScroll, { passive })
    return () => element.removeEventListener('scroll', handleScroll)
  }

  return { handleScroll, addListener }
}

// Create Optimized Resize Handler
export const createOptimizedResizeHandler = (callback, options = {}) => {
  let resizeTimeout
  const { debounce = 100 } = options

  const handleResize = (event) => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      callback(event)
    }, debounce)
  }

  const addListener = (element = window) => {
    element.addEventListener('resize', handleResize, { passive: true })
    return () => {
      element.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }

  return { handleResize, addListener }
}

// Optimize Video Loading
export const optimizeVideoLoading = (videoElement, options = {}) => {
  if (!videoElement || typeof document === 'undefined') return

  const {
    lazy = true,
    preload = 'metadata',
    playsinline = true,
    muted = true
  } = options

  try {
    // Set basic optimization attributes
    if (preload) videoElement.preload = preload
    if (playsinline) videoElement.playsInline = true
    if (muted) videoElement.muted = true

    // Implement lazy loading if requested
    if (lazy && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const video = entry.target
              if (video.dataset.src) {
                video.src = video.dataset.src
                video.removeAttribute('data-src')
              }
              observer.unobserve(video)
            }
          })
        },
        { rootMargin: '50px' }
      )

      observer.observe(videoElement)
      return () => observer.disconnect()
    }
  } catch (err) {
    console.warn('Failed to optimize video loading:', err)
  }
}

// Export the main class and utility function
export default PerformanceOptimizer
export { PerformanceOptimizer as performanceOptimizer }