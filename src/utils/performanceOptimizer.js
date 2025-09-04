// Defensive Performance Optimizer utilities
// - Safely applies GPU-acceleration hints (translateZ(0)) to DOM elements
// - Guards against null/undefined, SVG elements, and NodeLists
// - Silently fails with console.warn instead of throwing

export default class PerformanceOptimizer {
  /**
   * options.targets can be:
   *  - a CSS selector string (single or plural, e.g. '.card' or '#app')
   *  - an Element
   *  - a NodeList / Array of elements
   */
  constructor(options = {}) {
    this.targets = options.targets || []
    // track which elements we modified so we can optionally revert later
    this._modified = new WeakSet()
  }

  _normalizeTargets(target) {
    if (!target) return []
    // string selector -> elements
    if (typeof target === 'string') {
      try {
        return Array.from(document.querySelectorAll(target))
      } catch (err) {
        console.warn('PerformanceOptimizer: invalid selector', target, err)
        return []
      }
    }

    // Element
    if (target instanceof Element) return [target]

    // NodeList or Array-like
    if (NodeList.prototype.isPrototypeOf(target) || Array.isArray(target)) {
      return Array.from(target).filter((n) => n instanceof Element)
    }

    // unknown type
    return []
  }

  enableGPUAcceleration() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const targetsArr = Array.isArray(this.targets) ? this.targets : [this.targets]

    targetsArr.forEach((raw) => {
      const elems = this._normalizeTargets(raw)
      elems.forEach((el) => {
        if (!el) return
        try {
          // Only touch elements that expose .style and transform
          if (el.style && typeof el.style.transform !== 'undefined') {
            // If already has a transform, append a translateZ(0) safely
            const existing = el.style.transform || ''
            // Avoid duplicating translateZ(0)
            if (!/\btranslateZ\(\s*0\s*\)/.test(existing)) {
              el.style.transform = `${existing} translateZ(0)`.trim()
              this._modified.add(el)
            }
          } else {
            // For elements without style (e.g., some SVG nodes), skip
            // but attempt a safe fallback for elements supporting setAttribute('style')
            if (typeof el.setAttribute === 'function') {
              const currentStyle = el.getAttribute('style') || ''
              if (!/\btranslateZ\(\s*0\s*\)/.test(currentStyle)) {
                el.setAttribute('style', `${currentStyle} transform: translateZ(0);`)
                this._modified.add(el)
              }
            } else {
              // final fallback: do nothing
              // no reason to throw
              // console.debug('PerformanceOptimizer: element has no style API', el)
            }
          }
        } catch (err) {
          // Never let this crash the app — only log
          // Keep logs concise so it is easier to scan console
          console.warn('PerformanceOptimizer.enableGPUAcceleration failed on element:', el, err)
        }
      })
    })
  }

  // Optional: revert changes we made (safe no-op if not used)
  disableGPUAcceleration() {
    try {
      // WeakSet can't be iterated; to avoid extra bookkeeping we don't revert inline styles,
      // but we provide a best-effort approach if needed in the future.
      // If you need exact revert, change _modified to an array and store previous styles.
      // For now, this is a placeholder so callers can call safely.
      // Implementation intentionally left minimal to avoid accidental removals.
      return
    } catch (err) {
      console.warn('PerformanceOptimizer.disableGPUAcceleration error', err)
    }
  }
}
