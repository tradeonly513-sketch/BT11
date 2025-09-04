import VideoGrid from '../components/projects/VideoGrid'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import PageWrapper from '../components/common/PageWrapper'
import { useOptimizedGSAP, createOptimizedScrollTrigger } from '../hooks/useOptimizedGSAP'

/**
 * Projects component - Now displays YouTube videos in a responsive grid
 * 
 * Key changes from original:
 * - Replaced image URLs with YouTube video IDs
 * - Updated layout to support 3-4 videos per row on desktop, 2 on tablet, 1 on mobile
 * - Removed "Voir le projet" overlay (not needed for videos)
 * - Added proper spacing and responsive design for video content
 * - Structured to easily support 31+ videos without layout issues
 */
const Projects = () => {

  // Teasers section - 11 videos for quick previews
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

  // Highlights section - 20 videos for detailed showcases
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

  gsap.registerPlugin(ScrollTrigger)

  useOptimizedGSAP(function () {
    // Smooth animation for video containers entering viewport - no reverse fade
    createOptimizedScrollTrigger('.video-container', {
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo('.video-container', 
          {
            opacity: 0,
            scale: 0.95,
            y: 30,
            force3D: true
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: {
              amount: 0.4
            },
            force3D: true
          }
        )
      }
    })

    createOptimizedScrollTrigger('.section-title', {
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo('.section-title',
          {
            opacity: 0,
            y: 20,
            force3D: true
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            force3D: true
          }
        )
      }
    })
  }, [], { enableScrollTrigger: true, enableGPUAcceleration: true })

  // Fallback for elements already in view
  useOptimizedGSAP(() => {
    const videoContainers = document.querySelectorAll('.video-container')
    const sectionTitles = document.querySelectorAll('.section-title')
    
    if (videoContainers.length && videoContainers[0].getBoundingClientRect().top < window.innerHeight) {
      gsap.to('.video-container', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        force3D: true,
        overwrite: true
      })
    }
    
    if (sectionTitles.length && sectionTitles[0].getBoundingClientRect().top < window.innerHeight) {
      gsap.to('.section-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        force3D: true,
        overwrite: true
      })
    }
  }, [], { enableScrollTrigger: false })

  return (
    <PageWrapper className='section-dark'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding mb-[30vh] sm:mb-[40vh] lg:mb-[50vh]'>
      {/* Page Header */}
      <div className='pt-[25vh] sm:pt-[30vh] lg:pt-[35vh] component-margin text-center'>
        <h1 className='font-[font2] heading-responsive-xl uppercase text-white text-layer-3 text-glow'>
          Projets
        </h1>
      </div>

      <div className='projects-content space-y-16 sm:space-y-24 lg:space-y-32'>
        {/* Teasers Section */}
        <section className='floating-panel-dark space-y-8 sm:space-y-10 lg:space-y-12'>
          <h2 className='section-title font-[font2] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase text-center text-layer-2 text-glow'>
            Teasers
          </h2>
          <VideoGrid 
            videos={teasers} 
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            aspectRatio="aspect-video"
          />
        </section>

        {/* Highlights Section */}
        <section className='floating-panel-dark space-y-8 sm:space-y-10 lg:space-y-12'>
          <h2 className='section-title font-[font2] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase text-center text-layer-2 text-glow'>
            Highlights
          </h2>
          <VideoGrid 
            videos={highlights} 
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aspectRatio="aspect-video"
          />
        </section>
      </div>
      </div>
    </PageWrapper>
  )
}

export default Projects

        }
      }
    )

    // Smooth section title animations - no reverse fade
    gsap.fromTo('.section-title',
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  return (
    <PageWrapper className='section-dark'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding mb-[30vh] sm:mb-[40vh] lg:mb-[50vh]'>
      {/* Page Header */}
      <div className='pt-[25vh] sm:pt-[30vh] lg:pt-[35vh] component-margin text-center'>
        <h1 className='font-[font2] heading-responsive-xl uppercase text-white text-layer-3 text-glow'>
          Projets
        </h1>
      </div>

      <div className='projects-content space-y-16 sm:space-y-24 lg:space-y-32'>
        {/* Teasers Section */}
        <section className='floating-panel-dark space-y-8 sm:space-y-10 lg:space-y-12'>
          <h2 className='section-title font-[font2] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase text-center text-layer-2 text-glow'>
            Teasers
          </h2>
          <VideoGrid 
            videos={teasers} 
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            aspectRatio="aspect-video"
          />
        </section>

        {/* Highlights Section */}
        <section className='floating-panel-dark space-y-8 sm:space-y-10 lg:space-y-12'>
          <h2 className='section-title font-[font2] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase text-center text-layer-2 text-glow'>
            Highlights
          </h2>
          <VideoGrid 
            videos={highlights} 
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aspectRatio="aspect-video"
          />
        </section>
      </div>
      </div>
    </PageWrapper>
  )
}

export default Projects