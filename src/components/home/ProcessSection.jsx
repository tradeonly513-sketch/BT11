import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const ProcessSection = () => {
  const sectionRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.fromTo(
      '.process-title',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process-title',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    gsap.fromTo(
      '.process-step',
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: {
          amount: 0.6
        },
        scrollTrigger: {
          trigger: '.process-timeline',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  const processSteps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description:
        'We discuss your vision, preferences, and wedding details to understand your unique story.',
      duration: '1-2 hours'
    },
    {
      step: '02',
      title: 'Planning & Preparation',
      description:
        'We create a detailed shooting plan, scout locations, and coordinate with your wedding planner.',
      duration: '2-3 weeks'
    },
    {
      step: '03',
      title: 'Wedding Day Coverage',
      description: 'Our team captures every moment with professional equipment and artistic expertise.',
      duration: '8-12 hours'
    },
    {
      step: '04',
      title: 'Post-Production Magic',
      description: 'Expert editing, color grading, and audio enhancement to create your cinematic masterpiece.',
      duration: '4-6 weeks'
    },
    {
      step: '05',
      title: 'Final Delivery',
      description: 'Receive your complete wedding film package with highlights reel and full ceremony footage.',
      duration: 'Digital delivery'
    }
  ]

  return (
    <section id="process" ref={sectionRef} className="min-h-screen section-dark text-white relative depth-3 section-transition">
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="process-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow">
            Our Process
          </h2>
          <div className="floating-panel-dark max-width-content">
            <p className="font-[font1] text-responsive leading-relaxed text-layer-2">
              Un processus éprouvé qui garantit des résultats exceptionnels à chaque étape de votre projet.
            </p>
          </div>
        </div>

        <div className="process-timeline max-width-content space-y-6 sm:space-y-8">
          {processSteps.map((step, index) => (
            <div key={index} className="process-step group relative">
              <div className="floating-panel-dark glass-hover flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                {/* Step Number */}
                <div className="flex-shrink-0 self-center sm:self-start">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#D3FD50] to-[#b8e03e] rounded-full flex items-center justify-center micro-bounce glow-accent animate-glow-pulse">
                    <span className="font-[font2] text-lg sm:text-xl lg:text-2xl text-black">{step.step}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                    <h3 className="font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-layer-2">{step.title}</h3>
                    <span className="font-[font1] text-xs sm:text-sm lg:text-base text-layer-1 glass px-3 sm:px-4 py-1 sm:py-2 rounded-full micro-bounce self-center sm:self-auto">{step.duration}</span>
                  </div>
                  <p className="font-[font1] text-responsive leading-relaxed text-layer-1">{step.description}</p>
                </div>
              </div>

              {/* Progress line */}
              {index < processSteps.length - 1 && (
                <div className="absolute left-1/2 sm:left-6 lg:left-10 -bottom-3 sm:-bottom-4 accent-line-vertical h-6 sm:h-8 bg-gradient-to-b from-[#D3FD50] to-transparent rounded-full glow-accent transform -translate-x-1/2 sm:translate-x-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
