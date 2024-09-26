'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Twitter, Linkedin, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Get in Touch</h1>
      <p className="text-center text-lg mb-12 text-gray-600 dark:text-gray-300">
        Have a question or want to collaborate? Feel free to reach out!
      </p>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message here..."
              rows={5}
            />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>

        <div className="mt-12 flex justify-center space-x-6">
          <Link href="https://www.instagram.com/rithend_21/" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
          </Link>
          <Link href="https://x.com/rithend21" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
          </Link>
          <Link href="https://www.linkedin.com/in/rithend-sushanth-40430b248/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
          </Link>
          <Link href="https://portfolio-ten-xi-83.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Briefcase className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  )
}