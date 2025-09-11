import Link from 'next/link'
import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: "Contact Field Health Systems | Professional Field Testing & Consultation",
  description: "Contact our field testing experts for professional GMAX testing, maintenance consultation, and artificial turf safety assessments. Get expert help for your athletic fields.",
  keywords: "contact field health systems, field testing consultation, GMAX testing services, artificial turf experts, athletic field assessment contact",
  alternates: {
    canonical: "https://www.fieldhealthsystems.com/contact"
  }
}

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    details: "andrew@fieldhealthsystems.com",
    link: "mailto:andrew@fieldhealthsystems.com"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    details: "(555) 123-4567",
    link: "tel:+15551234567"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Service Area",
    details: "Nationwide",
    link: null
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Response Time",
    details: "24-48 hours",
    link: null
  }
]

export default function ContactPage() {

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-green-600 hover:text-green-700">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">Contact</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Contact Our Field Testing Experts
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Get professional consultation for your artificial turf fields. From GMAX testing to maintenance 
            planning, our experts are ready to help ensure your fields are safe, compliant, and performing at their best.
          </p>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <div className="text-green-600">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-gray-600 hover:text-green-600 transition-colors"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/schedule-assessment"
                  className="block w-full bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Schedule Field Assessment
                </Link>
                <Link 
                  href="/resources"
                  className="block w-full border-2 border-green-600 text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-center"
                >
                  Browse Resources
                </Link>
                <a 
                  href="mailto:andrew@fieldhealthsystems.com?subject=Emergency Field Issue"
                  className="block w-full bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-center"
                >
                  Emergency Support
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">How quickly can you schedule field testing?</h3>
              <p className="text-gray-600 text-sm">
                Standard testing can typically be scheduled within 1-2 weeks. Emergency assessments 
                can often be arranged within 24-48 hours depending on location and availability.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">What areas do you serve?</h3>
              <p className="text-gray-600 text-sm">
                We provide field testing services nationwide. Travel costs may apply for locations 
                outside our primary service areas. Contact us for specific availability in your area.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Do you provide consultation services?</h3>
              <p className="text-gray-600 text-sm">
                Yes, we offer comprehensive consultation services including maintenance planning, 
                cost analysis, compliance guidance, and staff training programs.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">What testing certifications do you hold?</h3>
              <p className="text-gray-600 text-sm">
                Our testing professionals are certified in ASTM testing procedures and maintain 
                current certifications for all major testing equipment and methodologies.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}