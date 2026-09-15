import { FindACan } from "@/components/press-house/find-a-can";
import { FrontPage } from "@/components/press-house/home/front-page";
import { Fleet } from "@/components/press-house/home/fleet";
import { TrophyCase } from "@/components/press-house/home/trophy-case";
import { RareAppleBand } from "@/components/press-house/rare-apple-band";
import { SweetnessGuide } from "@/components/press-house/sweetness-guide";

/**
 * Direction D, "Press House". The order is the argument: what is new,
 * what the brand has won, what it makes, how dry each one is, and then
 * the only question a distribution-led business actually needs to
 * answer — where can I buy it.
 */
export default function Home() {
  return (
    <>
      <FrontPage />
      <TrophyCase />
      <Fleet />
      <SweetnessGuide />
      <FindACan />
      <RareAppleBand />
    </>
  );
}
