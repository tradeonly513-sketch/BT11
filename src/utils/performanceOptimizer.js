// Performance optimization utilities

export class PerformanceOptimizer {
  constructor() {
    this.rafCallbacks = new Set()
    this.isRunning = false
    this.lastTime = 0
    this.targetFPS = 60
    this.frameInterval = 1000 / this.targetFPS
  }

  // Optimized RAF loop with frame limiting
  startRAFLoop() {
    if (this.isRunning) return

    this.isRunning = true
    const loop = (currentTime) => {
      if (!this.isRunning) return

      const deltaTime = currentTime - this.lastTime

      if (deltaTime >= this.frameInterval) {
        this.rafCallbacks.forEach(callback => {
          try {
            callback(currentTime, deltaTime)
          } catch (error) {
            console.warn('RAF callback error:', error)
          }
        })
        this.lastTime = currentTime - (deltaTime % this.frameInterval)
      }

      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }

  // Add callback to RAF loop
  addRAFCallback(callback) {
    this.rafCallbacks.add(callback)
    if (!this.isRunning) {
      this.startRAFLoop()
    }
  }

  // Remove callback from RAF loop
  removeRAFCallback(callback) {
    this.rafCallbacks.delete(callback)
    if (this.rafCallbacks.size === 0) {
      this.isRunning = false
    }
  }

  // Debounced function utility
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Throttled function utility
  throttle(func, limit) {
    let inThrottle
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  // Intersection Observer for lazy loading
  createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    }

    return new IntersectionObserver(callback, defaultOptions)
  }

  // GPU acceleration helper
  enableGPUAcceleration(element) {
    if (element) {
      element.style.transform = 'translateZ(0)'
      element.style.willChange = 'transform, opacity'
      element.style.backfaceVisibility = 'hidden'
      element.style.webkitBackfaceVisibility = 'hidden'
    }
  }

  // Disable GPU acceleration when not needed
  disableGPUAcceleration(element) {
    if (element) {
      element.style.willChange = 'auto'
      element.style.transform = ''
    }
  }

  // Memory cleanup utility
  cleanup() {
    this.rafCallbacks.clear()
    this.isRunning = false
  }
}

// Global performance optimizer instance
export const performanceOptimizer = new PerformanceOptimizer()

// Optimized scroll handler
export const createOptimizedScrollHandler = (callback, options = {}) => {
  const { throttleMs = 16, useRAF = true } = options
  
  if (useRAF) {
    let ticking = false
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback()
          ticking = false
        })
        ticking = true
      }
    }
  } else {
    return performanceOptimizer.throttle(callback, throttleMs)
  }
}

// Optimized resize handler
export const createOptimizedResizeHandler = (callback, options = {}) => {
  const { debounceMs = 250 } = options
  return performanceOptimizer.debounce(callback, debounceMs)
}

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload fonts
  const fontUrls = [
    '/fonts/Lausanne-300.woff2',
    '/fonts/Lausanne-500.woff2'
  ]

  fontUrls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    link.href = url
    document.head.appendChild(link)
  })

  // Preload critical images
  const criticalImages = [
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  ]

  criticalImages.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

// Optimize video loading
export const optimizeVideoLoading = (videoElement) => {
  if (!videoElement) return

  // Set optimal video attributes for performance
  videoElement.preload = 'metadata'
  videoElement.playsInline = true
  videoElement.muted = true
  
  // Add error handling
  videoElement.addEventListener('error', () => {
    console.warn('Video failed to load, hiding element')
    videoElement.style.display = 'none'
  })

  // Optimize for mobile
  if (window.innerWidth <= 768) {
    videoElement.style.objectFit = 'cover'
    videoElement.style.objectPosition = 'center center'
  }
}

// Batch DOM operations
export const batchDOMOperations = (operations) => {
  requestAnimationFrame(() => {
    operations.forEach(operation => {
      try {
        operation()
      } catch (error) {
        console.warn('DOM operation failed:', error)
      }
    })
  })
}