"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { MotionStaggerContainer } from "@/components/animations/motion-stagger-container";
import { MotionStaggerItem } from "@/components/animations/motion-stagger-item";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pb-4">
      <div className="h-1 bg-brand-gold/20 w-full mb-12"></div>
      <div className="stormalong-container px-4 md:px-8">
        <MotionStaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">
            {/* Logo Section */}
            <MotionStaggerItem className="md:col-span-2 flex justify-center md:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="mb-6 md:mb-0"
              >
                <Image
                  src="https://web-assets.same.dev/837813956/3232369280.png"
                  alt="Respect the Apple"
                  width={160}
                  height={200}
                  className="w-auto h-auto max-h-40"
                />
              </motion.div>
            </MotionStaggerItem>

            {/* Newsletter Section */}
            <MotionStaggerItem className="md:col-span-6 flex justify-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-oswald mb-4">Stay Connected</h3>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <Input
                    type="email"
                    placeholder="Sign Up For Our Newsletter!"
                    required
                    className="bg-white text-gray-800 border-none h-12 w-full"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-oswald h-12 px-6"
                    >
                      SUBMIT
                    </Button>
                  </motion.div>
                </form>
              </div>
            </MotionStaggerItem>

            {/* Navigation Links */}
            <MotionStaggerItem className="md:col-span-2 flex justify-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-oswald mb-4">Quick Links</h3>
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/our-story"
                    className="text-white hover:text-brand-gold transition-colors"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      About
                    </motion.span>
                  </Link>
                  <Link
                    href="/press"
                    className="text-white hover:text-brand-gold transition-colors"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Press
                    </motion.span>
                  </Link>
                  <Link
                    href="/locator"
                    className="text-white hover:text-brand-gold transition-colors"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Locations
                    </motion.span>
                  </Link>
                  <Link
                    href="/blog"
                    className="text-white hover:text-brand-gold transition-colors"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Blog
                    </motion.span>
                  </Link>
                  <Link
                    href="/contact"
                    className="text-white hover:text-brand-gold transition-colors"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Contact
                    </motion.span>
                  </Link>
                </div>
              </div>
            </MotionStaggerItem>

            {/* Social Media Icons */}
            <MotionStaggerItem className="md:col-span-2 flex justify-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-oswald mb-4">Follow Us</h3>
                <div className="flex space-x-6">
                  <Link
                    href="https://www.instagram.com/stormalongcider/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold transition-colors"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Instagram className="h-6 w-6" />
                      <span className="sr-only">Instagram</span>
                    </motion.div>
                  </Link>
                  <Link
                    href="https://www.facebook.com/stormalongcider/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold transition-colors"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Facebook className="h-6 w-6" />
                      <span className="sr-only">Facebook</span>
                    </motion.div>
                  </Link>
                  <Link
                    href="https://twitter.com/stormalongcider"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold transition-colors"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Twitter className="h-6 w-6" />
                      <span className="sr-only">Twitter</span>
                    </motion.div>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/stormalong-cider"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold transition-colors"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Linkedin className="h-6 w-6" />
                      <span className="sr-only">LinkedIn</span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </MotionStaggerItem>
          </div>
        </MotionStaggerContainer>

        {/* Copyright */}
        <motion.div
          className="mt-8 text-center text-sm text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Stormalong
        </motion.div>
      </div>
    </footer>
  );
}
