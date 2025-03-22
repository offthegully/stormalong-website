"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ANIMATION_CONFIG } from "@/lib/animation-config";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

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
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/our-story" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    About
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-oswald uppercase tracking-wider bg-transparent hover:bg-brand-navy/30 hover:text-brand-gold focus:bg-transparent">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Ciders
                </motion.span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <motion.ul
                  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-brand-navy"
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
                  <motion.li className="row-span-3" variants={menuItemVariants}>
                    <NavigationMenuLink asChild>
                      <motion.a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brand-navy/50 to-brand-navy p-6 no-underline outline-none focus:shadow-md"
                        href="/ciders"
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "rgba(15, 42, 71, 0.8)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="mb-2 mt-4 text-lg font-oswald uppercase text-white">
                          Our Ciders
                        </div>
                        <p className="text-sm leading-tight text-white/70">
                          Explore our full range of craft hard ciders made with
                          fresh-pressed apples.
                        </p>
                      </motion.a>
                    </NavigationMenuLink>
                  </motion.li>
                  <motion.li variants={menuItemVariants}>
                    <NavigationMenuLink asChild>
                      <motion.a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/30 hover:text-white focus:bg-accent focus:text-accent-foreground"
                        href="/ciders/legendary-dry"
                        whileHover={{
                          backgroundColor: "rgba(212, 175, 55, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-sm font-oswald uppercase leading-none text-white">
                          Legendary Dry
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-white/70">
                          Crisp, Dry & Champagne-Like
                        </p>
                      </motion.a>
                    </NavigationMenuLink>
                  </motion.li>
                  <motion.li variants={menuItemVariants}>
                    <NavigationMenuLink asChild>
                      <motion.a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/30 hover:text-white focus:bg-accent focus:text-accent-foreground"
                        href="/ciders/mass-appeal"
                        whileHover={{
                          backgroundColor: "rgba(212, 175, 55, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-sm font-oswald uppercase leading-none text-white">
                          Mass Appeal
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-white/70">
                          Juicy & Semi-Sweet
                        </p>
                      </motion.a>
                    </NavigationMenuLink>
                  </motion.li>
                </motion.ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-oswald uppercase tracking-wider bg-transparent hover:bg-brand-navy/30 hover:text-brand-gold focus:bg-transparent">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Shop
                </motion.span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <motion.ul
                  className="grid w-[200px] gap-3 p-4 bg-brand-navy"
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
                  <motion.li variants={menuItemVariants}>
                    <NavigationMenuLink asChild>
                      <motion.a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/30 hover:text-white focus:bg-accent focus:text-accent-foreground"
                        href="/shop"
                        whileHover={{
                          backgroundColor: "rgba(212, 175, 55, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-sm font-oswald uppercase leading-none text-white">
                          Ciders
                        </div>
                      </motion.a>
                    </NavigationMenuLink>
                  </motion.li>
                  <motion.li variants={menuItemVariants}>
                    <NavigationMenuLink asChild>
                      <motion.a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/30 hover:text-white focus:bg-accent focus:text-accent-foreground"
                        href="/store2"
                        whileHover={{
                          backgroundColor: "rgba(212, 175, 55, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-sm font-oswald uppercase leading-none text-white">
                          Merch
                        </div>
                      </motion.a>
                    </NavigationMenuLink>
                  </motion.li>
                </motion.ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/locator" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Find Us
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/cider-club" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Cider Club
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-oswald uppercase tracking-wider transition-colors hover:text-brand-gold hover:bg-brand-navy/30 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Contact
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
            className="bg-brand-navy text-white border-l border-brand-gold pt-8"
          >
            <motion.div
              className="flex flex-col space-y-6 mt-4"
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
                <h3 className="uppercase font-oswald tracking-wider text-lg text-brand-gold">
                  Shop
                </h3>
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
