import React from 'react'

const Projects = () => {
  const projects = [
    { id: 1, title: 'Cinematic Wedding - Sharma', category: 'Film' },
    { id: 2, title: 'Highlight Reel - Kapoor', category: 'Highlights' },
    { id: 3, title: 'Pre-wedding - Mehra', category: 'Pre-wedding' }
  ]

  return (
    <div className="min-h-screen section-light section-transition">
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin">
          <h1 className="font-[font2] heading-responsive-xl uppercase mb-4">Our Portfolio</h1>
          <p className="font-[font1] max-w-2xl mx-auto">A selection of recent projects — click any item to view details.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {projects.map((p) => (
            <article key={p.id} className="floating-panel p-4 rounded-2xl">
              <h3 className="font-[font2] text-lg mb-1">{p.title}</h3>
              <p className="text-sm font-[font1]">{p.category}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
