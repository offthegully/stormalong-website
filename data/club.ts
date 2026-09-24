/* ====================================================================
   Rare Apple Club — membership terms, word for word from the live
   stormalong.com/cider-club page.

   Every price, benefit and subscription rule below is the live copy,
   including the 15% member discount and info@stormalong.com as the
   opt-out address. Nothing here is invented, so nothing here is
   marked provisional.

   ONE OPEN QUESTION, and it is the important one: there is no join
   mechanism. The current site's "Join our Rare Apple Club" button is
   a styled <button> with no href and no handler — it has never gone
   anywhere. This redesign will not draw a signup form over a checkout
   that does not exist, so the call to action opens an email to
   info@stormalong.com, which is the address the membership copy
   already gives for opting out and updating details. Point
   `joinUrl` at the real thing when there is one and the page will
   use it instead.
   ==================================================================== */

/** Set this to a real signup or checkout URL to replace the email fallback. */
export const joinUrl: string | null = null;

export const clubIntro = [
  "From orchard to press to tank to can and then to your doorstep.",
  "Twice a year, we ship a variety of small batch ciders that include limited releases, special collaborations and limited amounts of our vintage ciders to our club members. Showcasing rare, heirloom apple varieties, some that have been around since the country was founded, these ciders are released first, and sometimes exclusively, to club members.",
  "We hope you'll join us and make it a celebration.",
];

export const clubHeadlines: { label: string; value: string }[] = [
  { label: "Shipments", value: "2 a year" },
  { label: "Per shipment", value: "$45 to $75" },
  { label: "Member discount", value: "15% off" },
];

/*
   The photograph on each benefit card. Chosen for what the benefit
   says, not at random: blossom for the Spring shipment, the current
   lineup for first access to a release, the Kingston Black bottle —
   the rarest thing Stormalong makes — for the exclusive tier, and a
   poured glass for the discount that runs all year.

   These are the same editorial shots the cider detail pages use, so
   nothing new had to be shot or cropped for this page.
*/
export const clubBenefits: { title: string; copy: string; photo: string }[] = [
  {
    // "Twice a year" to match the paragraph directly above this list on
    // /cider-club, which already says it that way.
    title: "Twice a year",
    copy: "Typically Spring and Fall, we ship you a variety of small batch ciders. The cost of each shipment will range between $45 and $75 depending upon what is included in the release.",
    photo: "/images/cider-details-images/bittersweet-symphonie-3.jpg",
  },
  {
    title: "First access",
    copy: "To new product releases and limited small batch ciders. As a club member you will get first dibs on these ciders before we release them to the public.",
    photo: "/images/landing-page/lineup-2025.jpg",
  },
  {
    title: "Exclusive access",
    copy: "To ultra limited small batch cider offerings, occasional surprises, special offers and invitations to special events.",
    photo: "/images/cider-details-images/kingston-black-2.jpg",
  },
  {
    title: "A permanent 15% discount",
    copy: "On all cider orders online throughout the year.",
    photo: "/images/cider-details-images/lady-legendary-1.jpg",
  },
];

export const clubTerms: string[] = [
  "We will keep your payment information on file and you can opt out anytime (email info@stormalong.com). You won't be billed until the shipment goes out.",
  "Members will receive an email before each shipment in case you wish to opt out or need to update any information.",
  // The live site's version of this line shifts person mid-sentence —
  // "Members can ... to your front door". The rest of these terms are
  // addressed to "you", so this one is too.
  "You can have cider shipped to your front door (in approved states), or collect it at one of our seasonal regional farmers market locations throughout the year.",
  "You must be 21 years of age or older. Adult signature is required for all shipments.",
];
