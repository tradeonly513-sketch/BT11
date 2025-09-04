import React, { useState } from 'react'

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Replace with your real submit logic (API call / email service)
    console.log('Contact form submitted:', form)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="min-h-screen section-light section-transition">
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin">
          <h2 className="font-[font2] heading-responsive-xl uppercase mb-4">Get in touch</h2>
          <p className="font-[font1] text-responsive leading-relaxed max-w-2xl mx-auto">
            Have questions or want to book? Send us a message and we’ll get back within 48 hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-8">
          <form onSubmit={handleSubmit} className="floating-panel p-6 rounded-2xl space-y-4">
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                {sent ? 'Message sent' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
