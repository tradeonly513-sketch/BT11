import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useOptimizedGSAP, createOptimizedScrollTrigger } from '../../hooks/useOptimizedGSAP'

const AboutSection = () => {
  const sectionRef = useRef(null)
  
  gsap.registerPlugin(ScrollTrigger)

  useOptimizedGSAP(() => {
    createOptimizedScrollTrigger('.about-title', {
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.about-title',
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

    createOptimizedScrollTrigger('.about-grid', {
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo('.about-content',
          {
            opacity: 0,
            y: 30,
            force3D: true
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: {
              amount: 0.3
            },
            force3D: true
          }
        )
      }
    })
  }, [], { enableScrollTrigger: true, enableGPUAcceleration: true })

  // Fallback animation for elements already in view
  useOptimizedGSAP(() => {
    const aboutTitle = document.querySelector('.about-title')
    const aboutGrid = document.querySelector('.about-grid')
    
    if (aboutTitle && aboutTitle.getBoundingClientRect().top < window.innerHeight) {
      gsap.to('.about-title',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
        overwrite: true
      }
      )
    }
    
    if (aboutGrid && aboutGrid.getBoundingClientRect().top < window.innerHeight) {
      gsap.to('.about-content', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        force3D: true,
        overwrite: true
      })
    }
  }, [], { enableScrollTrigger: false })

  return (
    <section id="about" ref={sectionRef} className='min-h-screen section-dark-alt text-white relative depth-3 section-transition'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding'>
        <div className='text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8'>
          <h2 className='about-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow'>
            About Us
          </h2>
        </div>

        <div className='about-grid max-width-wide'>
          <div className='floating-panel-dark mb-12 sm:mb-16'>
            <div className='responsive-grid-2 items-center'>
            {/* Story Content */}
              <div className='about-content space-y-6 sm:space-y-8 order-2 lg:order-1'>
                <h3 className='font-[font2] heading-responsive-lg uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow'>
                Our Story
                </h3>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
                For 7 years, we’ve dedicated ourselves to transforming weddings into cinematic stories. With equal parts craft and heart, we create films that feel as real as the moments themselve, memories designed to last a lifetime.
                </p>
                <div className='floating-quote'>
                  <p className='font-[font1] text-responsive leading-relaxed text-layer-2 italic'>
              "Our approach is simple,  to be present, to listen, and to see your day as you live it. With equal parts skill and sensitivity, we create films that feel real, timeless, and true to you."
                  </p>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className='about-content order-1 lg:order-2'>
                <div className='aspect-square rounded-2xl sm:rounded-3xl overflow-hidden video-glass gpu-accelerated'>
                <img 
                  src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
                  alt="K72 team at work"
                    className='w-full h-full object-cover transition-transform duration-700 lazy-image'
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                />
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className='responsive-grid-3'>
            <div className='about-content text-center space-y-4'>
              <div className='floating-panel-dark glass-hover space-y-4 sm:space-y-6'>
                <div className='text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 micro-bounce glow-accent'>🎯</div>
                <h4 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-layer-2'>
                Vision
                </h4>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
              We want every wedding film to feel like a piece of your story.  real, timeless, and full of love.
                </p>
              </div>
            </div>

            <div className='about-content text-center space-y-4'>
              <div className='floating-panel-dark glass-hover space-y-4 sm:space-y-6'>
                <div className='text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 micro-bounce glow-accent'>💎</div>
                <h4 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-layer-2'>
                Mission
                </h4>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
              Our goal is simple: to give you memories that feel alive, not staged. Films that make you feel the day all over again.
                </p>
              </div>
            </div>

            <div className='about-content text-center space-y-4'>
              <div className='floating-panel-dark glass-hover space-y-4 sm:space-y-6'>
                <div className='text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 micro-bounce glow-accent'>⚡</div>
                <h4 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-layer-2'>
                Values
                </h4>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
              We stay true to what’s real. We create with heart and imagination. And we give our very best, every single time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection