// Safe Performance Optimizer
// No named exports unless we actually create them

export default class PerformanceOptimizer {
  constructor(options = {}) {
    this.targets = options.targets || []
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
        if (!(el instanceof HTMLElement)) return // filter out non-HTML nodes
        try {
          const existing = el.style.transform || ''
          if (!/\btranslateZ\(\s*0\s*\)/.test(existing)) {
            el.style.transform = `${existing} translateZ(0)`.trim()
          }
        } catch (err) {
          console.warn('PerformanceOptimizer failed on element:', err)
        }
      })
    })
  }

  disableGPUAcceleration() {
    // noop safe
  }
}
