import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pb-4">
      <div className="h-1 bg-brand-gold/20 w-full mb-8 md:mb-12"></div>
      <div className="stormalong-container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="mb-6 md:mb-0">
              <Image
                src="/images/respect-the-apple.png"
                alt="Respect the Apple"
                width={160}
                height={200}
                className="w-auto h-auto max-h-40"
              />
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-5 flex justify-center">
            <div className="mb-6 md:mb-0 w-full max-w-md">
              <h3 className="text-lg font-oswald mb-4 text-center md:text-left">
                Stay Connected
              </h3>
              <form className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Sign Up For Our Newsletter!"
                  required
                  className="bg-white text-gray-800 border-none h-12 w-full"
                />
                <Button
                  type="submit"
                  className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-oswald h-12 px-6 w-full sm:w-auto"
                >
                  SUBMIT
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex justify-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-oswald mb-4 text-center md:text-left">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/our-story"
                  className="text-white hover:text-brand-gold transition-colors text-center md:text-left"
                >
                  About
                </Link>
                <Link
                  href="/press"
                  className="text-white hover:text-brand-gold transition-colors text-center md:text-left"
                >
                  Press
                </Link>
                <Link
                  href="/locator"
                  className="text-white hover:text-brand-gold transition-colors text-center md:text-left"
                >
                  Locations
                </Link>
                <Link
                  href="/blog"
                  className="text-white hover:text-brand-gold transition-colors text-center md:text-left"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-white hover:text-brand-gold transition-colors text-center md:text-left"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="md:col-span-2 flex justify-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-oswald mb-4 text-center md:text-left">
                Follow Us
              </h3>
              <div className="flex justify-center md:justify-start space-x-6">
                <Link
                  href="https://www.instagram.com/stormalongcider/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://www.facebook.com/stormalongcider/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://twitter.com/stormalongcider"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/stormalong-cider"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} Stormalong
        </div>
      </div>
    </footer>
  );
}
