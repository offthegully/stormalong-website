"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    // Clear any previous errors when user starts typing
    if (formError) setFormError(null)
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subject: value }))
    // Clear any previous errors when user makes a selection
    if (formError) setFormError(null)
  }

  const validateForm = (): boolean => {
    // Basic validation
    if (!formState.name.trim()) {
      setFormError("Please enter your name")
      return false
    }

    if (!formState.email.trim()) {
      setFormError("Please enter your email address")
      return false
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setFormError("Please enter a valid email address")
      return false
    }

    if (!formState.subject) {
      setFormError("Please select a subject")
      return false
    }

    if (!formState.message.trim()) {
      setFormError("Please enter your message")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (!validateForm()) return

    setIsSubmitting(true)
    setFormError(null)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form and show success message
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      setIsSubmitting(false)
      setFormError("There was an error submitting your form. Please try again.")
      console.error("Form submission error:", error)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-gray-600 max-w-md">
            Thank you for reaching out. We've received your message and will get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {formError && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{formError}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full"
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full"
                aria-required="true"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-gray-700">
              Subject <span className="text-red-500">*</span>
            </label>
            <Select value={formState.subject} onValueChange={handleSelectChange} required>
              <SelectTrigger className="w-full" id="subject" aria-required="true">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="distribution">Distribution</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="tours">Taproom Tours</SelectItem>
                <SelectItem value="feedback">Product Feedback</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              required
              className="min-h-[150px] w-full"
              aria-required="true"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-oswald uppercase tracking-wider"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
    </div>
  )
}

