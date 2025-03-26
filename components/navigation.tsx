"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ANIMATION_CONFIG } from "@/lib/animation-config";
import { ChevronDown } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isShopActive =
    pathname?.startsWith("/shop") || pathname?.startsWith("/store");

  const menuItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.duration.fast,
        ease: ANIMATION_CONFIG.ease.smooth,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: ANIMATION_CONFIG.duration.fast,
        ease: ANIMATION_CONFIG.ease.easeIn,
      },
    },
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-brand-navy text-white"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: ANIMATION_CONFIG.duration.medium,
        ease: ANIMATION_CONFIG.ease.easeOut,
      }}
    >
      <div className="stormalong-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/images/stormalong-logo.png"
              alt="Stormalong Cider"
              width={120}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Link
            href="/our-story"
            className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none ${
              pathname === "/our-story"
                ? "bg-brand-navy/30 text-brand-gold"
                : ""
            }`}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              About
            </motion.span>
          </Link>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none ${
                pathname?.startsWith("/ciders")
                  ? "bg-brand-navy/30 text-brand-gold"
                  : ""
              }`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Ciders
              </motion.span>
              <ChevronDown className="ml-1 h-3 w-3" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[400px] rounded-md bg-brand-navy p-4 shadow-lg border border-brand-gold/30"
                sideOffset={5}
                align="center"
              >
                <motion.div
                  className="grid gap-3 md:grid-cols-2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  <motion.div
                    className="col-span-2"
                    variants={menuItemVariants}
                  >
                    <Link
                      href="/ciders"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brand-navy/50 to-brand-navy p-6 no-underline outline-none focus:shadow-md hover:bg-brand-gold/30"
                    >
                      <div className="mb-2 mt-4 text-lg font-oswald uppercase text-white">
                        Our Ciders
                      </div>
                      <p className="text-sm leading-tight text-white/70">
                        Explore our full range of craft hard ciders made with
                        fresh-pressed apples.
                      </p>
                    </Link>
                  </motion.div>
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/ciders/legendary-dry"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/30 hover:text-white"
                    >
                      <div className="text-sm font-oswald uppercase leading-none text-white">
                        Legendary Dry
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-white/70">
                        Crisp, Dry & Champagne-Like
                      </p>
                    </Link>
                  </motion.div>
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/ciders/mass-appeal"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/30 hover:text-white"
                    >
                      <div className="text-sm font-oswald uppercase leading-none text-white">
                        Mass Appeal
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-white/70">
                        Juicy & Semi-Sweet
                      </p>
                    </Link>
                  </motion.div>
                </motion.div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none ${
                isShopActive ? "bg-brand-navy/30 text-brand-gold" : ""
              }`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Shop
              </motion.span>
              <ChevronDown className="ml-1 h-3 w-3" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[200px] rounded-md bg-brand-navy p-4 shadow-lg border border-brand-gold/30"
                sideOffset={5}
                align="center"
              >
                <motion.div
                  className="grid gap-3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/shop"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/30 hover:text-white"
                    >
                      <div className="text-sm font-oswald uppercase leading-none text-white">
                        Ciders
                      </div>
                    </Link>
                  </motion.div>
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/store2"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/30 hover:text-white"
                    >
                      <div className="text-sm font-oswald uppercase leading-none text-white">
                        Merch
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Link
            href="/locator"
            className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none ${
              pathname === "/locator" ? "bg-brand-navy/30 text-brand-gold" : ""
            }`}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Find Us
            </motion.span>
          </Link>

          <Link
            href="/cider-club"
            className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none ${
              pathname === "/cider-club"
                ? "bg-brand-navy/30 text-brand-gold"
                : ""
            }`}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Cider Club
            </motion.span>
          </Link>

          <Link
            href="/contact"
            className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none ${
              pathname === "/contact" ? "bg-brand-navy/30 text-brand-gold" : ""
            }`}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.span>
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden text-white" aria-label="Menu">
            <motion.div
              className="space-y-1.5 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </motion.div>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-brand-navy text-white border-l border-brand-gold pt-8 px-6"
          >
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription className="text-white/70">
              Browse our website sections
            </SheetDescription>
            <motion.div
              className="flex flex-col space-y-6 mt-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.07,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/our-story"
                  className="uppercase font-oswald tracking-wider text-lg hover:text-brand-gold hover:bg-brand-navy/30 transition-colors px-2 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/ciders"
                  className="uppercase font-oswald tracking-wider text-lg hover:text-brand-gold hover:bg-brand-navy/30 transition-colors px-2 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Ciders
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="space-y-3 pl-4"
              >
                <h3 className="uppercase font-oswald tracking-wider text-lg text-brand-gold mb-2">
                  Shop
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/shop"
                    className="block uppercase font-oswald tracking-wider text-base hover:text-brand-gold hover:bg-brand-navy/30 transition-colors px-2 py-1 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Ciders
                  </Link>
                  <Link
                    href="/store2"
                    className="block uppercase font-oswald tracking-wider text-base hover:text-brand-gold hover:bg-brand-navy/30 transition-colors px-2 py-1 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Merch
                  </Link>
                </div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/locator"
                  className="uppercase font-oswald tracking-wider text-lg hover:text-brand-gold hover:bg-brand-navy/30 transition-colors px-2 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Find Us
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/cider-club"
                  className="uppercase font-oswald tracking-wider text-lg hover:text-brand-gold hover:bg-brand-navy/30 transition-colors px-2 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Cider Club
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="uppercase font-oswald tracking-wider text-lg hover:text-brand-gold hover:bg-brand-navy/30 transition-colors px-2 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
