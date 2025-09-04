import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useOptimizedGSAP, createOptimizedScrollTrigger } from '../../hooks/useOptimizedGSAP'

const ServicesSection = () => {
  const sectionRef = useRef(null)
  
  gsap.registerPlugin(ScrollTrigger)

  useOptimizedGSAP(() => {
    createOptimizedScrollTrigger('.services-title', {
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.services-title',
          {
            opacity: 0,
            y: 50,
            force3D: true
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            force3D: true
          }
        )
      }
    })

    createOptimizedScrollTrigger('.services-grid', {
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo('.service-card',
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
            force3D: true
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: {
              amount: 0.4
            },
            force3D: true
          }
        )
      }
    })
  }, [], { enableScrollTrigger: true, enableGPUAcceleration: true })

  // Fallback for elements already in view
  useOptimizedGSAP(() => {
    const servicesTitle = document.querySelector('.services-title')
    const servicesGrid = document.querySelector('.services-grid')
    
    if (servicesTitle && servicesTitle.getBoundingClientRect().top < window.innerHeight) {
      gsap.to('.services-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        force3D: true,
        overwrite: true
      })
    }
    
    if (servicesGrid && servicesGrid.getBoundingClientRect().top < window.innerHeight) {
      gsap.to('.service-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        force3D: true,
        overwrite: true
      })
    }
  }, [], { enableScrollTrigger: false })

  const services = [
    {
      icon: '🎬',
      title: 'Wedding Cinematography',
      description: 'Cinematic storytelling that captures every precious moment of your special day with artistic flair.',
      features: ['4K Ultra HD', 'Drone Footage', 'Multiple Angles', 'Same-Day Highlights']
    },
    {
      icon: '📸',
      title: 'Photography',
      description: 'Professional wedding photography that preserves memories with stunning visual artistry.',
      features: ['High Resolution', 'RAW Processing', 'Quick Turnaround', 'Online Gallery']
    },
    {
      icon: '✂️',
      title: 'Post-Production',
      description: 'Expert editing and color grading to transform raw footage into cinematic masterpieces.',
      features: ['Color Grading', 'Audio Enhancement', 'Motion Graphics', 'Custom Music']
    },
    {
      icon: '🎵',
      title: 'Live Streaming',
      description: 'Share your special moments with loved ones who cannot attend in person.',
      features: ['HD Quality', 'Multiple Cameras', 'Real-time Streaming', 'Recording Included']
    }
  ]

  return (
    <section id="services" ref={sectionRef} className='min-h-screen section-dark-alt text-white relative depth-3 section-transition'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding'>
        <div className='text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8'>
          <h2 className='services-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow'>
            Services
          </h2>
          <div className='floating-panel-dark max-width-content'>
            <p className='font-[font1] text-responsive leading-relaxed text-layer-2'>
            Everything you need to relive your wedding. beautifully filmed, thoughtfully crafted, and made just for you.
            </p>
          </div>
        </div>

        <div className='services-grid responsive-grid-2 max-width-wide'>
          {services.map((service, index) => (
            <div 
              key={index}
              className='service-card group floating-panel-dark glass-hover glass-click gpu-accelerated'
            >
              <div className='text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8 micro-bounce glow-accent'>
                {service.icon}
              </div>
              
              <div className='space-y-4 sm:space-y-6 mb-6 sm:mb-8'>
                <h3 className='font-[font2] heading-responsive-md uppercase text-layer-2'>
                  {service.title}
                </h3>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
                  {service.description}
                </p>
              </div>

              <ul className='space-y-2 sm:space-y-3 mb-6 sm:mb-8'>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className='flex items-center font-[font1] text-sm sm:text-base text-layer-1'>
                    <span className='w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#D3FD50] to-[#b8e03e] rounded-full mr-3 sm:mr-4 micro-bounce glow-accent flex-shrink-0'></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className='w-full accent-line mt-6 sm:mt-8 rounded-full glow-accent'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

        }
      }
    )

    gsap.fromTo('.service-card',
      {
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          amount: 0.4
        },
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  const services = [
    {
      icon: '🎬',
      title: 'Wedding Cinematography',
      description: 'Cinematic storytelling that captures every precious moment of your special day with artistic flair.',
      features: ['4K Ultra HD', 'Drone Footage', 'Multiple Angles', 'Same-Day Highlights']
    },
    {
      icon: '📸',
      title: 'Photography',
      description: 'Professional wedding photography that preserves memories with stunning visual artistry.',
      features: ['High Resolution', 'RAW Processing', 'Quick Turnaround', 'Online Gallery']
    },
    {
      icon: '✂️',
      title: 'Post-Production',
      description: 'Expert editing and color grading to transform raw footage into cinematic masterpieces.',
      features: ['Color Grading', 'Audio Enhancement', 'Motion Graphics', 'Custom Music']
    },
    {
      icon: '🎵',
      title: 'Live Streaming',
      description: 'Share your special moments with loved ones who cannot attend in person.',
      features: ['HD Quality', 'Multiple Cameras', 'Real-time Streaming', 'Recording Included']
    }
  ]

  return (
    <section id="services" ref={sectionRef} className='min-h-screen section-dark-alt text-white relative depth-3 section-transition'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding'>
        <div className='text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8'>
          <h2 className='services-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow'>
            Services
          </h2>
          <div className='floating-panel-dark max-width-content'>
            <p className='font-[font1] text-responsive leading-relaxed text-layer-2'>
            Everything you need to relive your wedding. beautifully filmed, thoughtfully crafted, and made just for you.
            </p>
          </div>
        </div>

        <div className='services-grid responsive-grid-2 max-width-wide'>
          {services.map((service, index) => (
            <div 
              key={index}
              className='service-card group floating-panel-dark glass-hover glass-click gpu-accelerated'
            >
              <div className='text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8 micro-bounce glow-accent'>
                {service.icon}
              </div>
              
              <div className='space-y-4 sm:space-y-6 mb-6 sm:mb-8'>
                <h3 className='font-[font2] heading-responsive-md uppercase text-layer-2'>
                  {service.title}
                </h3>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
                  {service.description}
                </p>
              </div>

              <ul className='space-y-2 sm:space-y-3 mb-6 sm:mb-8'>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className='flex items-center font-[font1] text-sm sm:text-base text-layer-1'>
                    <span className='w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#D3FD50] to-[#b8e03e] rounded-full mr-3 sm:mr-4 micro-bounce glow-accent flex-shrink-0'></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className='w-full accent-line mt-6 sm:mt-8 rounded-full glow-accent'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection