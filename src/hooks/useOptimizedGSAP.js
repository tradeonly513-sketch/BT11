import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import PerformanceOptimizer from '../utils/performanceOptimizer'

gsap.registerPlugin(ScrollTrigger)

export default function useOptimizedGSAP() {
  const perfRef = useRef(null)

  useEffect(() => {
    perfRef.current = new PerformanceOptimizer()
    return () => {
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill?.())
      } catch {}
      try {
        perfRef.current?.disableGPUAcceleration()
      } catch {}
    }
  }, [])

  function createOptimizedScrollTrigger(options = {}) {
    if (typeof window === 'undefined') return null
    const { target, targets, onRefresh, ...stOptions } = options

    let elements = []
    const normalize = (t) => {
      if (!t) return []
      if (typeof t === 'string') return Array.from(document.querySelectorAll(t))
      if (t instanceof Element) return [t]
      if (NodeList.prototype.isPrototypeOf(t) || Array.isArray(t)) return Array.from(t)
      return []
    }

    elements = [...normalize(target), ...normalize(targets)].filter(
      (el) => el instanceof HTMLElement
    )

    if (elements.length === 0 && !stOptions.trigger) return null

    try {
      if (perfRef.current && elements.length > 0) {
        perfRef.current.targets = elements
        perfRef.current.enableGPUAcceleration()
      }
    } catch (err) {
      console.warn('enableGPUAcceleration failed', err)
    }

    const safeOnRefresh = () => {
      try {
        perfRef.current?.enableGPUAcceleration()
        if (typeof onRefresh === 'function') onRefresh()
      } catch (err) {
        console.warn('onRefresh failed', err)
      }
    }

    try {
      return ScrollTrigger.create({
        ...stOptions,
        trigger: stOptions.trigger || elements[0] || null,
        onRefresh: safeOnRe
