@@ .. @@
 import React, { useRef, useContext, useEffect } from 'react'
 import Video from '../components/home/Video'
 import HomeHeroText from '../components/home/HomeHeroText'
 import HomeBottomText from '../components/home/HomeBottomText'
 import Header from '../components/common/Header'
 import WhyUsSection from '../components/home/WhyUsSection'
 import PortfolioSection from '../components/home/PortfolioSection'
 import StatsSection from '../components/home/StatsSection'
 import ServicesSection from '../components/home/ServicesSection'
 import ProcessSection from '../components/home/ProcessSection'
 import CTASection from '../components/home/CTASection'
 import AboutSection from '../components/home/AboutSection'
 import ContactSection from '../components/home/ContactSection'
 import Footer from '../components/home/Footer'
-import { useGSAP } from '@gsap/react'
 import gsap from 'gsap'
+import { useOptimizedGSAP } from '../hooks/useOptimizedGSAP'
+import { optimizeVideoLoading } from '../utils/performanceOptimizer'

 const Home = () => {
   const heroSectionRef = useRef(null)

-  useGSAP(() => {
+  useOptimizedGSAP(() => {
     // Smooth fade-in animation for hero content
     gsap.fromTo('.hero-content', 
       {
         opacity: 0,
-        y: 30
+        y: 30,
+        force3D: true
       },
       {
         opacity: 1,
         y: 0,
         duration: 1.2,
         ease: "power2.out",
-        delay: 0.5
+        delay: 0.5,
+        force3D: true
       }
     )
-  })
+  }, [], { enableScrollTrigger: false, enableGPUAcceleration: true })
+
+  // Optimize video performance on mount
+  useEffect(() => {
+    const videos = document.querySelectorAll('video')
+    videos.forEach(optimizeVideoLoading)
+  }, [])

   return (
     <div className='text-white relative overflow-x-hidden'>