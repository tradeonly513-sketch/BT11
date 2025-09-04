import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { performanceOptimizer, optimizeVideoLoading } from '../../utils/performanceOptimizer'

// 🔹 Video data (same as your Projects page)
const teasers = [
  { videoId: 'dQw4w9WgXcQ' },
  { videoId: 'jNQXAC9IVRw' },
  { videoId: 'M7lc1UVf-VE' },
  { videoId: 'ZZ5LpwO-An4' },
  { videoId: 'kJQP7kiw5Fk' },
  { videoId: 'tgbNymZ7vqY' },
  { videoId: 'L_jWHffIx5E' },
  { videoId: 'fJ9rUzIMcZQ' },
  { videoId: 'QH2-TGUlwu4' },
  { videoId: 'nfWlot6h_JM' },
  { videoId: 'hFZFjoX2cGg' }
]

const highlights = [
  { videoId: 'ScMzIvxBSi4' },
  { videoId: 'CevxZvSJLk8' },
  { videoId: 'kffacxfA7G4' },
  { videoId: 'qeMFqkcPYcg' },
  { videoId: 'SQoA_wjmE9w' },
  { videoId: 'ZbZSe6N_BXs' },
  { videoId: 'HEXWRTEbj1I' },
  { videoId: 'U9t-slLl69E' },
  { videoId: 'iik25wqIuFo' },
  { videoId: 'C0DPdy98e4c' },
  { videoId: 'YQHsXMglC9A' },
  { videoId: 'AdUw5RdyZxI' },
  { videoId: 'hTWKbfoikeg' },
  { videoId: 'NUYvbT6vTPs' },
  { videoId: 'RgKAFK5djSk' },
  { videoId: 'uelHwf8o7_U' },
  { videoId: 'EhxJLojIE_o' },
  { videoId: 'KQ6zr6kCPj8' },
  { videoId: 'MtN1YnoL46Q' },
  { videoId: 'sOnqjkJTMaA' }
]

const PortfolioSection = () => {
  const trackRef = useRef(null)
  const allVideos = [...teasers, ...highlights]

  useEffect(() => {
    // Optimized infinite marquee scroll effect
    const marqueeAnimation = gsap.to(trackRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 45, // Slightly slower for smoother feel
      ease: "none", // Linear for consistent speed
      force3D: true
    })

    // Optimize video iframes for performance
    const videoIframes = trackRef.current?.querySelectorAll('iframe')
    videoIframes?.forEach(iframe => {
      iframe.loading = 'lazy'
      iframe.style.willChange = 'transform'
    })

    return () => {
      marqueeAnimation.kill()
    }
  }, [])

  // Optimize video loading on mount
  useEffect(() => {
    const videos = document.querySelectorAll('.portfolio-showcase video')
    videos.forEach(optimizeVideoLoading)
  }, [])

  return (
    <section
      id="portfolio"
      className="min-h-screen section-dark-alt text-white relative depth-3 overflow-hidden section-transition"
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow">
            Our Portfolio
          </h2>
          <div className="floating-panel-dark max-width-content">
            <p className="font-[font1] text-responsive leading-relaxed text-layer-2">
              Découvrez notre collection de films de mariage cinématographiques
            </p>
          </div>
        </div>

        <div className="portfolio-showcase space-y-12 sm:space-y-16 lg:space-y-20">
          
          {/* Moving Video Track */}
          <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-pattern-dots">
            <div
              ref={trackRef}
              className="flex gap-4 sm:gap-6 lg:gap-8 xl:gap-12 w-[200%] py-4 sm:py-6 lg:py-8" // doubled width for seamless loop
            >
              {[...allVideos, ...allVideos].map((video, index) => (
                <div 
                  key={index}
                  className="video-card flex-shrink-0 w-64 sm:w-72 lg:w-80 xl:w-96 video-glass gpu-accelerated"
                >
                  <div className="relative aspect-video bg-black rounded-lg sm:rounded-xl overflow-hidden">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0`}
                      title={`Portfolio video ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Button */}
          <div className="text-center">
            <Link 
              to="/projects"
              className="btn-pill btn-primary h-12 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 inline-flex items-center justify-center group"
            >
              <span className="font-[font2] text-base sm:text-xl lg:text-2xl">
                View Our Portfolio
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
