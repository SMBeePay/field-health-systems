import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, Clock, MapPin, Phone, FileText, AlertTriangle, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: "Professional GMAX Testing Services | ASTM F355 Certified | Field Health Systems",
  description: "Professional GMAX testing services for artificial turf fields. ASTM F355 certified testing with 24-48 hour reporting. Ensure player safety and regulatory compliance nationwide.",
  keywords: "GMAX testing, artificial turf testing, ASTM F355, synthetic turf safety, field impact testing, sports surface testing, turf compliance testing",
  alternates: {
    canonical: "https://www.fieldhealthsystems.com/services/gmax-testing"
  }
}

const gmaxBenefits = [
  {
    icon: <Shield className="w-6 h-6 text-green-600" />,
    title: "Player Safety Assurance",
    description: "Verify your field meets safety standards to prevent serious injuries from excessive surface hardness."
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    title: "Regulatory Compliance",
    description: "Meet ASTM F355 requirements and avoid liability issues with professionally certified testing."
  },
  {
    icon: <Clock className="w-6 h-6 text-purple-600" />,
    title: "Fast 24-48 Hour Reports",
    description: "Get detailed test results and recommendations quickly to keep your season on track."
  },
  {
    icon: <Target className="w-6 h-6 text-red-600" />,
    title: "Precise Testing Protocol",
    description: "Professional-grade calibrated equipment following exact ASTM F355 testing procedures."
  }
]

const testingProcess = [
  {
    step: "1",
    title: "Site Assessment",
    description: "Comprehensive field evaluation and testing point identification"
  },
  {
    step: "2", 
    title: "GMAX Testing",
    description: "Precise impact testing using calibrated ASTM F355 equipment"
  },
  {
    step: "3",
    title: "Data Analysis", 
    description: "Professional analysis of test results against safety standards"
  },
  {
    step: "4",
    title: "Detailed Report",
    description: "Comprehensive report with recommendations and compliance status"
  }
]

const faqs = [
  {
    question: "What is GMAX testing and why is it required?",
    answer: "GMAX testing measures the shock attenuation (impact absorption) of artificial turf surfaces. It's required by safety standards to ensure fields don't become dangerously hard, which can cause serious player injuries. Testing verifies your field meets ASTM F355 requirements."
  },
  {
    question: "How often should GMAX testing be performed?",
    answer: "Most facilities require annual GMAX testing for compliance. However, high-use fields or those showing signs of hardening may need testing twice per year. We recommend testing before each season and after any major maintenance."
  },
  {
    question: "What GMAX values are considered safe?",
    answer: "ASTM F355 requires GMAX values not to exceed 165 g's for player safety. Values approaching 150+ g's indicate the field is becoming unsafe and requires immediate maintenance attention."
  },
  {
    question: "How long does GMAX testing take?",
    answer: "Typical field testing takes 2-4 hours depending on field size and condition. We provide same-day preliminary results and detailed reports within 24-48 hours."
  }
]

export default function GMAXTestingPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-green-600 hover:text-green-700">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href="/services" className="text-green-600 hover:text-green-700">Services</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">GMAX Testing</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Professional GMAX Testing Services
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
            Ensure player safety and regulatory compliance with professional ASTM F355 GMAX testing. 
            Our certified technicians provide accurate impact testing and detailed reporting for artificial turf fields nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/schedule-assessment"
              className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Schedule GMAX Testing
            </Link>
            <a 
              href="tel:+15551234567"
              className="border-2 border-green-600 text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              Call for Urgent Testing
            </a>
          </div>
        </header>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Professional GMAX Testing Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gmaxBenefits.map((benefit, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testing Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our GMAX Testing Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {testingProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Professional GMAX Testing Today</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Don&apos;t risk player safety or compliance violations. Our ASTM F355 certified testing ensures 
            your artificial turf meets all safety requirements with fast, accurate results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin className="w-5 h-5" />
              <span>Nationwide Service</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span>24-48 Hour Reports</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Phone className="w-5 h-5" />
              <span>Emergency Testing Available</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FileText className="w-5 h-5 text-green-600 mr-2" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Notice */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Emergency Field Testing</h3>
              <p className="text-yellow-800 text-sm">
                If you suspect your field has become dangerously hard or have had recent injuries, 
                contact us immediately for emergency GMAX testing. Player safety cannot wait.
              </p>
              <a 
                href="tel:+15551234567"
                className="inline-block mt-3 bg-yellow-600 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
              >
                Emergency Testing: (555) 123-4567
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}