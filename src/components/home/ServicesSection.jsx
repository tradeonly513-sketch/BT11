import React from 'react'

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Cinematic Films',
      description: 'Full wedding films with storytelling, multiple cameras and cinematic color grading.'
    },
    {
      id: 2,
      title: 'Highlight Reels',
      description: 'Short, emotional highlights for social sharing and quick memories.'
    },
    {
      id: 3,
      title: 'Pre-wedding Shoots',
      description: 'Location scouting and tailored shoots to capture your story before the big day.'
    }
  ]

  return (
    <section id="services" className="min-h-screen section-light section-transition">
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin">
          <h2 className="font-[font2] heading-responsive-xl uppercase mb-4">Our Services</h2>
          <p className="font-[font1] text-responsive leading-relaxed max-w-2xl mx-auto">
            We offer a range of creative services tailored to make your wedding unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
          {services.map((svc) => (
            <div key={svc.id} className="floating-panel glass-hover p-6 rounded-2xl">
              <h3 className="font-[font2] text-xl mb-2">{svc.title}</h3>
              <p className="font-[font1] text-responsive leading-relaxed">{svc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
