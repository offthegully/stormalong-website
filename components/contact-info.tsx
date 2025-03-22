import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-oswald text-brand-navy uppercase mb-6">
        Get In Touch
      </h2>

      <div className="bg-brand-navy text-white rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Image
              src="/images/stormalong-logo.png"
              alt="Stormalong Cider"
              width={70}
              height={70}
              className="w-auto h-16"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Visit Us</h3>
                  <address className="not-italic text-white/80">
                    Stormalong Cider
                    <br />
                    130 Oak Street
                    <br />
                    Sherborn, MA 01770
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-brand-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Call Us</h3>
                  <p className="text-white/80">
                    <a
                      href="tel:+15085555555"
                      className="hover:text-brand-gold transition-colors"
                    >
                      (508) 555-5555
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-brand-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Email Us</h3>
                  <p className="text-white/80">
                    <a
                      href="mailto:info@stormalong.com"
                      className="hover:text-brand-gold transition-colors"
                    >
                      info@stormalong.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-brand-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Taproom Hours</h3>
                  <div className="text-white/80 space-y-1">
                    <p>Thursday: 4pm - 8pm</p>
                    <p>Friday: 4pm - 9pm</p>
                    <p>Saturday: 12pm - 9pm</p>
                    <p>Sunday: 12pm - 6pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-6">
          <h3 className="font-medium mb-3">Connect With Us</h3>
          <div className="flex space-x-4">
            <Link
              href="https://www.instagram.com/stormalongcider/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-gold transition-colors"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://www.facebook.com/stormalongcider/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-gold transition-colors"
            >
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://twitter.com/stormalongcider"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-gold transition-colors"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://www.linkedin.com/company/stormalong-cider"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-gold transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
        <h3 className="font-oswald text-xl text-brand-navy uppercase mb-3">
          Distribution Inquiries
        </h3>
        <p className="text-gray-700 mb-4">
          Interested in carrying Stormalong Cider at your establishment? We'd
          love to hear from you!
        </p>
        <p className="text-gray-700">
          Please contact our distribution team at{" "}
          <a
            href="mailto:distribution@stormalong.com"
            className="text-brand-navy font-medium hover:text-brand-gold transition-colors"
          >
            distribution@stormalong.com
          </a>
        </p>
      </div>
    </div>
  );
}
