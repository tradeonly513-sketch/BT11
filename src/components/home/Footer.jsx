import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="py-8 text-center section-dark text-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="font-[font1]">© {year} Your Studio. All rights reserved.</p>
          <div className="flex items-center justify-center space-x-4">
            <a href="#" aria-label="Instagram" className="underline">Instagram</a>
            <a href="#" aria-label="YouTube" className="underline">YouTube</a>
            <a href="#" aria-label="Contact" className="underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
