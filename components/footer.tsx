"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { MotionStaggerContainer } from "@/components/animations/motion-stagger-container";
import { MotionStaggerItem } from "@/components/animations/motion-stagger-item";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pb-12">
      <div className="h-1 bg-brand-gold/20 w-full mb-8"></div>
      <div className="stormalong-container">
        <MotionStaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo Section */}
            <MotionStaggerItem className="md:col-span-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
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
            <MotionStaggerItem className="md:col-span-6">
              <form className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Sign Up For Our Newsletter!"
                  required
                  className="bg-white text-gray-800 border-none"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    type="submit"
                    className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-oswald"
                  >
                    SUBMIT
                  </Button>
                </motion.div>
              </form>
            </MotionStaggerItem>

            {/* Navigation Links */}
            <MotionStaggerItem className="md:col-span-2">
              <div className="flex flex-col space-y-2">
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
            </MotionStaggerItem>

            {/* Social Media Icons */}
            <MotionStaggerItem className="md:col-span-2">
              <div className="flex space-x-4">
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
              </div>
            </MotionStaggerItem>
          </div>
        </MotionStaggerContainer>

        {/* Copyright */}
        <motion.div
          className="mt-10 text-center text-sm"
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
