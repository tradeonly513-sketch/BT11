// Safe Performance Optimizer - Fixed Export
class PerformanceOptimizer {
  constructor(options = {}) {
    this.targets = options.targets || []
    this.originalTransforms = new WeakMap() // Store original transforms for cleanup
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
          // Store original transform if not already stored
          if (!this.originalTransforms.has(el)) {
            this.originalTransforms.set(el, el.style.transform || '')
          }
          const existing = el.style.transform || ''
          if (!/\btranslateZ\(\s*0\s*\)/.test(existing)) {
            el.style.transform = `${existing} translateZ(0)`.trim()
            el.style.willChange = 'transform' // Also set will-change for better optimization
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
          // Restore original transform
          if (this.originalTransforms.has(el)) {
            const originalTransform = this.originalTransforms.get(el)
            el.style.transform = originalTransform
            this.originalTransforms.delete(el)
          }
          
          // Remove will-change
          el.style.willChange = ''
        } catch (err) {
          console.warn('Failed to disable GPU acceleration:', err)
        }
      })
    })
  }
  // Method to update targets
  updateTargets(newTargets) {
    this.targets = newTargets || []
  }
  // Clean up method
  destroy() {
    this.disableGPUAcceleration()
    this.originalTransforms.clear()
  }
}

// Export both as default and named export for flexibility
export default PerformanceOptimizer
export { PerformanceOptimizer as performanceOptimizer }