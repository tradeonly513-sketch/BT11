import React, { useRef, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { createOptimizedScrollHandler } from '../../utils/performanceOptimizer'

const Header = () => {
  const headerRef = useRef(null)
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll state for subtle background changes
  useEffect(() => {
    const handleScroll = createOptimizedScrollHandler(() => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }, { throttleMs: 16, useRAF: true })

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])
  useGSAP(() => {
    // Smooth header entrance animation
    gsap.fromTo(headerRef.current,
      {
        opacity: 0,
        y: -20
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.8
      }
    )

    // Animate navigation items with stagger
    gsap.fromTo('.nav-item-animate',
      {
        opacity: 0,
        y: -10
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        delay: 1.2
      }
    )
  }, [])

  const navigationItems = [
    { name: 'Portfolio', href: '/projects' },
    { name: 'Pricing', href: '#services' },
    { name: 'Contact Us', href: '/contact' }
  ]

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.getElementById(href.substring(1))
      if (element) {
        // Use optimized smooth scrolling
        const targetPosition = element.offsetTop - 80
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: targetPosition, autoKill: false },
          ease: "power2.inOut"
        })
      }
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out w-full ${
          isScrolled ? 'backdrop-blur-md bg-black/20' : 'bg-transparent'
        }`}
        style={{ zIndex: 1000 }}
      >
        {/* Subtle gradient fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto py-4 sm:py-6 lg:py-8">
          <nav className="flex items-center justify-between relative z-10">
            {/* Logo Area */}
            <div className="nav-item-animate flex-shrink-0">
              <Link 
                to="/"
                className="flex items-center space-x-3 group"
              >
                {/* Placeholder logo area - easily replaceable */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#D3FD50] to-[#b8e03e] rounded-full flex items-center justify-center glow-accent micro-bounce">
                  <span className="font-[font2] text-black text-lg sm:text-xl lg:text-2xl">K</span>
                </div>
                <span className="font-[font2] text-lg sm:text-xl lg:text-2xl text-white uppercase tracking-wide">
                  K72
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {navigationItems.map((item, index) => (
                <div key={index} className="nav-item-animate">
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className="nav-link font-[font2] text-sm lg:text-base xl:text-lg text-white uppercase tracking-wide relative group"
                    >
                      {item.name}
                      <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="nav-link font-[font2] text-sm lg:text-base xl:text-lg text-white uppercase tracking-wide relative group"
                    >
                      {item.name}
                      <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                    </Link>
                  )}
                </div>
              ))}

              {/* Become an Affiliate Button */}
              <div className="nav-item-animate">
                <Link
                  to="/affiliate-program"
                  className="affiliate-btn font-[font2] text-xs lg:text-sm xl:text-base text-white uppercase tracking-wide px-4 lg:px-6 py-2 lg:py-3 border border-gray-400 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-white/10 active:scale-95"
                >
                  Become an Affiliate
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden nav-item-animate mobile-menu-container">
              <button 
                onClick={toggleMobileMenu}
                className="w-12 h-12 flex flex-col items-center justify-center space-y-1.5 group p-2 relative z-50"
                aria-label="Toggle mobile menu"
              >
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-6'}`} />
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'group-hover:w-6'}`} />
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-6'}`} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-out ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Menu Header */}
          <div className="pt-20 pb-8 px-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D3FD50] to-[#b8e03e] rounded-full flex items-center justify-center glow-accent">
                <span className="font-[font2] text-black text-sm">K</span>
              </div>
              <span className="font-[font2] text-lg text-white uppercase tracking-wide">
                K72
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="px-6 py-8 space-y-6">
            {navigationItems.map((item, index) => (
              <div key={index} className="mobile-nav-item">
                {item.href.startsWith('#') ? (
                  <button
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="w-full text-left font-[font2] text-lg text-white uppercase tracking-wide py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/5 hover:text-[#D3FD50] relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-[#D3FD50] transition-all duration-300 group-hover:w-8" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="block font-[font2] text-lg text-white uppercase tracking-wide py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/5 hover:text-[#D3FD50] relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-[#D3FD50] transition-all duration-300 group-hover:w-8" />
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Affiliate Button */}
            <div className="pt-4 border-t border-white/10">
              <Link
                to="/affiliate-program"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center font-[font2] text-sm text-white uppercase tracking-wide px-6 py-3 border border-gray-400 rounded-full transition-all duration-300 hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50]"
              >
                Become an Affiliate
              </Link>
            </div>
          </div>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
            <p className="text-xs text-gray-400 text-center">
              © 2025 K72 Wedding Videography
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header