import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useOptimizedGSAP, createOptimizedScrollTrigger } from '../../hooks/useOptimizedGSAP';

const ContactSection = () => {
  const sectionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useOptimizedGSAP(() => {
    createOptimizedScrollTrigger(sectionRef.current, {
      start: 'top 95%',
      onEnter: () => {
        gsap.fromTo(
          '.contact-title',
          { opacity: 0, y: 50, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            force3D: true
          }
        )
      }
    })

    createOptimizedScrollTrigger(sectionRef.current, {
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo(
          '.contact-info',
          { opacity: 0, y: 30, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            force3D: true
          }
        )
      }
    })
  }, [], { enableScrollTrigger: true, enableGPUAcceleration: true })

  // Fallback for elements already in view
  useOptimizedGSAP(() => {
    if (sectionRef.current && sectionRef.current.getBoundingClientRect().top < window.innerHeight) {
      gsap.to('.contact-title, .contact-info', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        force3D: true,
        overwrite: true
      })
    }
  }, [], { enableScrollTrigger: false })

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/s111khar', icon: '📷' },
    { name: 'Facebook', url: 'https://facebook.com/k72wedding', icon: '📘' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/k72wedding', icon: '💼' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen section-dark text-white relative depth-3 section-transition"
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="contact-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow">
            Get In Touch
          </h2>
          <div className="floating-panel-dark max-width-content">
            <p className="font-[font1] text-responsive leading-relaxed text-layer-2">
            The first step to your perfect film is a simple hello. Reach out to us today :)
            </p>
          </div>
        </div>

        <div className="contact-grid responsive-grid-2 max-width-wide">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="contact-info floating-panel-dark space-y-4 sm:space-y-6">
              <h3 className="font-[font2] heading-responsive-md uppercase text-[#D3FD50] text-layer-2 text-glow">
                Contact Details
              </h3>
              <div className="space-y-3 sm:space-y-4 font-[font1] text-responsive text-layer-1">
                <p className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                  <span className="micro-bounce glow-accent">📧</span>
                  <span className="break-all sm:break-normal">contact@amouraworks.com</span>
                </p>
                <p className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                  <span className="micro-bounce glow-accent">📍</span>
                  <span>22 ruelle du Clerc, 59126, Linselles (France)</span>
                </p>
                <p className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                  <span className="micro-bounce glow-accent">🕒</span>
                  <span>M–F: 9am – 7pm (UTC+1)</span>
                </p>
              </div>
            </div>

            <div className="contact-info floating-panel-dark space-y-4 sm:space-y-6">
              <h3 className="font-[font2] heading-responsive-md uppercase text-[#D3FD50] text-layer-2 text-glow">
                Follow Us
              </h3>
              <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 glass glass-hover glass-click rounded-full flex items-center justify-center group glow-accent"
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl micro-bounce glow-accent">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-info floating-panel-dark">
              <h4 className="font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow">
                  Quick Response Guarantee
              </h4>
              <p className="font-[font1] text-responsive text-layer-1 leading-relaxed">
                  We respond to all inquiries within 24 hours. Your project deserves our immediate attention.
              </p>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="contact-info floating-panel-dark">
            <h3 className="font-[font2] heading-responsive-md uppercase text-[#D3FD50] mb-6 sm:mb-8 lg:mb-10 text-layer-2 text-glow">
                Quick Inquiry
            </h3>

            <form className="space-y-6 sm:space-y-8">
              <div className="form-grid form-grid-2 gap-4 sm:gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full input-inset text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full input-inset text-white placeholder-gray-400"
                  />
              </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full input-inset text-white placeholder-gray-400"
                />

                <input
                  type="date"
                  placeholder="Wedding Date"
                  className="w-full input-inset text-white placeholder-gray-400"
                />

                <textarea
                  placeholder="Tell us about your wedding vision..."
                  rows="3"
                  className="w-full input-inset text-white placeholder-gray-400 resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full btn-pill btn-primary h-12 sm:h-14 font-[font2] text-base sm:text-lg lg:text-xl"
                >
                  Send Inquiry
                </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

        }
      );

      // Info blocks animation
      gsap.fromTo(
        '.contact-info',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ✅ fallback if already visible (desktop on load)
      if (sectionRef.current.getBoundingClientRect().top < window.innerHeight) {
        gsap.to('.contact-title, .contact-info', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          overwrite: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/s111khar', icon: '📷' },
    { name: 'Facebook', url: 'https://facebook.com/k72wedding', icon: '📘' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/k72wedding', icon: '💼' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen section-dark text-white relative depth-3 section-transition"
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="contact-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow">
            Get In Touch
          </h2>
          <div className="floating-panel-dark max-width-content">
            <p className="font-[font1] text-responsive leading-relaxed text-layer-2">
            The first step to your perfect film is a simple hello. Reach out to us today :)
            </p>
          </div>
        </div>

        <div className="contact-grid responsive-grid-2 max-width-wide">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="contact-info floating-panel-dark space-y-4 sm:space-y-6">
              <h3 className="font-[font2] heading-responsive-md uppercase text-[#D3FD50] text-layer-2 text-glow">
                Contact Details
              </h3>
              <div className="space-y-3 sm:space-y-4 font-[font1] text-responsive text-layer-1">
                <p className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                  <span className="micro-bounce glow-accent">📧</span>
                  <span className="break-all sm:break-normal">contact@amouraworks.com</span>
                </p>
                <p className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                  <span className="micro-bounce glow-accent">📍</span>
                  <span>22 ruelle du Clerc, 59126, Linselles (France)</span>
                </p>
                <p className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                  <span className="micro-bounce glow-accent">🕒</span>
                  <span>M–F: 9am – 7pm (UTC+1)</span>
                </p>
              </div>
            </div>

            <div className="contact-info floating-panel-dark space-y-4 sm:space-y-6">
              <h3 className="font-[font2] heading-responsive-md uppercase text-[#D3FD50] text-layer-2 text-glow">
                Follow Us
              </h3>
              <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 glass glass-hover glass-click rounded-full flex items-center justify-center group glow-accent"
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl micro-bounce glow-accent">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-info floating-panel-dark">
              <h4 className="font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow">
                  Quick Response Guarantee
              </h4>
              <p className="font-[font1] text-responsive text-layer-1 leading-relaxed">
                  We respond to all inquiries within 24 hours. Your project deserves our immediate attention.
              </p>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="contact-info floating-panel-dark">
            <h3 className="font-[font2] heading-responsive-md uppercase text-[#D3FD50] mb-6 sm:mb-8 lg:mb-10 text-layer-2 text-glow">
                Quick Inquiry
            </h3>

            <form className="space-y-6 sm:space-y-8">
              <div className="form-grid form-grid-2 gap-4 sm:gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full input-inset text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full input-inset text-white placeholder-gray-400"
                  />
              </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full input-inset text-white placeholder-gray-400"
                />

                <input
                  type="date"
                  placeholder="Wedding Date"
                  className="w-full input-inset text-white placeholder-gray-400"
                />

                <textarea
                  placeholder="Tell us about your wedding vision..."
                  rows="3"
                  className="w-full input-inset text-white placeholder-gray-400 resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full btn-pill btn-primary h-12 sm:h-14 font-[font2] text-base sm:text-lg lg:text-xl"
                >
                  Send Inquiry
                </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
