import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export const useLenis = () => {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis with optimized settings
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      syncTouch: false,
      syncTouchLerp: 0.075,
      touchInertiaMultiplier: 35,
      orientation: 'vertical',
      lerp: 0.1,
      normalizeWheel: true,
      wheelMultiplier: 1,
    })

    // RAF loop for smooth animation
    function raf(time) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  return lenisRef.current
}

export default useLenis