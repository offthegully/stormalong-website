import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CiderClubBenefits } from "@/components/cider-club-benefits";
import { CiderClubFAQ } from "@/components/cider-club-faq";
import { DecorativeFooter } from "@/components/decorative-footer";
import { SimplePageHeader } from "@/components/simple-page-header";
import { PatternedSection } from "@/components/patterned-section";

export default function CiderClubPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <SimplePageHeader
        title="Rare Apple Club"
        subtitle="Join our exclusive membership for cider enthusiasts"
      />

      {/* Main Content */}
      <div className="py-12 md:py-20 bg-white">
        <div className="stormalong-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-brand-gold/20 rounded-lg blur-md"></div>
                <Image
                  src="/images/cider-club/rare-apple-club.png"
                  alt="Rare Apple Club"
                  width={500}
                  height={300}
                  className="relative w-full h-auto rounded-lg"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/images/cider-club/3-drinks-rare-apple.jpg"
                  alt="Stormalong Cider Club"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-oswald uppercase text-brand-navy mb-6">
                  Member Offerings
                </h2>
                <p className="text-gray-700 mb-6">
                  From orchard to press to tank to can and then to your
                  doorstep. Twice a year, we ship a variety of small batch
                  ciders that include limited releases, special collaborations
                  and limited amounts of our vintage ciders to our club members.
                  Showcasing rare, heirloom apple varieties, some that have been
                  around since the country was founded, these ciders are
                  released first — and sometimes exclusively — to club members.
                </p>
                <p className="text-gray-700 mb-6">
                  We hope you&apos;ll join us and make it a celebration.
                </p>
              </div>

              <CiderClubBenefits />

              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-brand-navy hover:bg-brand-navy/90 text-white uppercase font-oswald tracking-wider"
                >
                  JOIN OUR RARE APPLE CLUB
                </Button>
              </div>
            </div>
          </div>

          {/* Membership Details */}
          <div className="mt-20 bg-slate-50 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-oswald uppercase text-brand-navy mb-8 text-center">
              Membership Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-oswald uppercase text-brand-navy">
                  Subscription Information
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2 font-bold">•</span>
                    <span>
                      We will keep your payment information on file and you can
                      opt out anytime. You won&apos;t be billed until the
                      shipment goes out.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2 font-bold">•</span>
                    <span>
                      Members will receive an email before each shipment in case
                      you wish to opt out or add to your order using your club
                      discount.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2 font-bold">•</span>
                    <span>
                      Members can either have cider shipped to your front door
                      (in approved states) or we also offer pick-up at our
                      seasonal, regional farmers market locations throughout the
                      year.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2 font-bold">•</span>
                    <span>
                      You must be 21 years of age or older. Adult signature is
                      required for all shipments.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-oswald uppercase text-brand-navy">
                  Shipment Information
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2 font-bold">•</span>
                    <span>
                      <strong>Two times a year</strong> (Spring and Fall) we
                      ship you a variety of small batch ciders.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2 font-bold">•</span>
                    <span>
                      The cost of each shipment will range between $45 to $75
                      (+shipping) depending upon what is included in the
                      release.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2 font-bold">•</span>
                    <span>
                      Each shipment typically includes 4-6 ciders, with detailed
                      tasting notes and information about the apple varieties
                      used.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2 font-bold">•</span>
                    <span>
                      Shipping is available to most states, but regulations
                      vary. Contact us for specific shipping information.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {/* <div className="mt-20">
            <h2 className="text-3xl font-oswald uppercase text-brand-navy mb-8 text-center">
              Club Exclusive Ciders
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="https://web-assets.same.dev/5e5354d3337309c67af994c1/6657aa9eab5431d808a27d9f_3Y9A8830.jpg"
                  alt="Cider image"
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="https://web-assets.same.dev/5e5354d3337309c67af994c1/5e98f21dd0f2ebf168083886_(2)%20DSC_3732%20copy.jpg"
                  alt="Cider image"
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="https://web-assets.same.dev/5e5354d3337309c67af994c1/5e9dc6e9e6a5a8cbb593caf3_(2)%20IMG_2059.jpg"
                  alt="Cider image"
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="https://web-assets.same.dev/5e5354d3337309c67af994c1/5e9dc763a5db4323b1b95f2a_(2)%20Calville%20Blanc%204%20copy.jpg"
                  alt="Cider image"
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="https://web-assets.same.dev/5e5354d3337309c67af994c1/5e9a2b8c9aae7e6ea1adb5ce_(2)%20IMG_0052.jpg"
                  alt="Cider image"
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="https://web-assets.same.dev/5e5354d3337309c67af994c1/5e9dade78a5e0b259f6651a9_(2)%20IMG_9982.jpg"
                  alt="Cider image"
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
            </div>
          </div> */}

          {/* Testimonials */}
          {/* <div className="mt-20">
            <h2 className="text-3xl font-oswald uppercase text-brand-navy mb-8 text-center">What Our Members Say</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  &quot;The Rare Apple Club has introduced me to cider varieties I never would have discovered
                  otherwise. Each shipment feels like a special gift!&quot;
                </p>
                <p className="font-semibold">— Sarah T., Member since 2020</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  &quot;The 15% discount on all orders has more than paid for my membership. Plus, the exclusive small
                  batch releases are incredible!&quot;
                </p>
                <p className="font-semibold">— Michael R., Member since 2021</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  &quot;I love learning about the different apple varieties and the history behind each cider. It&apos;s
                  like a delicious education in a glass!&quot;
                </p>
                <p className="font-semibold">— Jessica L., Member since 2019</p>
              </div>
            </div>
          </div> */}

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-oswald uppercase text-brand-navy mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <CiderClubFAQ />
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <div className="rounded-2xl shadow-xl overflow-hidden">
              <PatternedSection className="py-20 text-center">
                <div className="relative z-10 px-4 stormalong-container">
                  <h2 className="text-4xl font-oswald uppercase text-white mb-6">
                    Ready to Join?
                  </h2>
                  <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
                    Become a member today and start enjoying exclusive access to
                    our limited small batch ciders, special offers, and more.
                  </p>
                  <Button
                    size="lg"
                    className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy uppercase font-oswald tracking-wider px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    JOIN OUR RARE APPLE CLUB
                  </Button>
                </div>
              </PatternedSection>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Footer */}
      <DecorativeFooter />
    </div>
  );
}
