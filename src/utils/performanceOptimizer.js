// src/utils/performanceOptimizer.js

export default class PerformanceOptimizer {
  constructor() {
    // Use Map instead of object so we can call .clear(), .set(), .get()
    this.originalTransforms = new Map();
    this.mutationObserver = null;
  }

  optimize() {
    const elements = document.querySelectorAll("*");

    elements.forEach((el) => {
      const computedStyle = window.getComputedStyle(el);
      const transform = computedStyle.getPropertyValue("transform");

      if (transform && transform !== "none") {
        // Save original transform
        this.originalTransforms.set(el, transform);
        // Disable transforms to improve performance
        el.style.transform = "none";
      }
    });

    // Watch DOM changes and disable transforms for new elements
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const computedStyle = window.getComputedStyle(node);
            const transform = computedStyle.getPropertyValue("transform");
            if (transform && transform !== "none") {
              this.originalTransforms.set(node, transform);
              node.style.transform = "none";
            }
          }
        });
      });
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  restore() {
    this.originalTransforms.forEach((transform, el) => {
      if (el && el.style) {
        el.style.transform = transform;
      }
    });
  }

  destroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    // Restore transforms before clearing
    this.restore();
    this.originalTransforms.clear();
  }
}
