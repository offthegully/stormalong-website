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

export const clubBenefits: { title: string; copy: string }[] = [
  {
    title: "Two times a year",
    copy: "Typically Spring and Fall, we ship you a variety of small batch ciders. The cost of each shipment will range between $45 to $75 (+shipping) depending upon what is included in the release.",
  },
  {
    title: "First access",
    copy: "To new product releases and limited small batch ciders. As a club member you will get first dibs on these ciders before we release them to the public.",
  },
  {
    title: "Exclusive access",
    copy: "To ultra limited small batch cider offerings, occasional surprises, special offers and invitations to special events.",
  },
  {
    title: "A permanent 15% discount",
    copy: "On all cider orders online throughout the year.",
  },
];

export const clubTerms: string[] = [
  "We will keep your payment information on file and you can opt out anytime (email info@stormalong.com). You won't be billed until the shipment goes out.",
  "Members will receive an email before each shipment in case you wish to opt out or need to update any information.",
  "Members can either have cider shipped to your front door (in approved states) or we also offer pick-up at our seasonal, regional farmers market locations throughout the year.",
  "You must be 21 years of age or older. Adult signature is required for all shipments.",
];
