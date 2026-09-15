import type { Metadata } from "next";
import { CiderShelf } from "@/components/press-house/cider-shelf";
import { LocatorBand } from "@/components/press-house/locator-band";
import { PageHeader } from "@/components/press-house/page-header";
import { RareAppleBand } from "@/components/press-house/rare-apple-band";
import { SweetnessGuide } from "@/components/press-house/sweetness-guide";
import { shelf } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Our Ciders",
  description:
    "Every cider Stormalong makes, in three groups: the core line-up, the seasonals and the Rare Apple Series. Apples, strength and where each one sits on the dry to sweet scale.",
};

export default function CidersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Award winning craft cider"
        title="Our ciders"
        intro="Every cider we make, in the three groups you already sort them into. Each one shows its apples, its strength and where it sits on the dry to sweet scale."
      />
      <CiderShelf ciders={shelf} />
      <SweetnessGuide />
      <RareAppleBand />
      <LocatorBand />
    </>
  );
}
