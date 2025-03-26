import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { ContactInfo } from "@/components/contact-info";
import { Faq } from "@/components/faq";
import { DecorativeFooter } from "@/components/decorative-footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <PageHeader
        title="Contact Us"
        backgroundImage="/images/cider-details-images/blue-skies-1.jpg"
        subtitle="We'd love to hear from you. Reach out with any questions about our ciders, events, or distribution."
      />

      {/* Main Content */}
      <div className="py-12 md:py-20 bg-white">
        <div className="stormalong-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-oswald text-brand-navy uppercase mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Have a question about our ciders, interested in distribution, or
                want to schedule a tour? Fill out the form below and we'll get
                back to you as soon as possible.
              </p>

              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <ContactInfo />
            </div>
          </div>

          {/* Map Section */}
          {/* <div className="mt-20">
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2956.1023067243026!2d-71.37749492346143!3d42.2368014433028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e4819c1e7b6ecd%3A0x5f5e7c8c1c3f0f1b!2s130%20Oak%20St%2C%20Sherborn%2C%20MA%2001770!5e0!3m2!1sen!2sus!4v1710615123456!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Stormalong Cider Location"
                className="w-full"
              ></iframe>
            </div>
          </div> */}

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-oswald text-brand-navy uppercase mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <Faq />
          </div>
        </div>
      </div>

      {/* Decorative Footer */}
      {/* <DecorativeFooter /> */}
    </div>
  );
}
