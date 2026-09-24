import type { Metadata } from "next";
import { CiderShelf } from "@/components/press-house/cider-shelf";
import { LocatorBand } from "@/components/press-house/locator-band";
import { PageHeader } from "@/components/press-house/page-header";
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
        eyebrow="Award-winning craft cider"
        title="Our ciders"
        intro="The core line-up, our seasonals and the Rare Apple Series."
      />
      <CiderShelf ciders={shelf} />
      <SweetnessGuide />
      {/* No RareAppleBand here. Its copy is word-for-word the "Rare
          Apple Series" group blurb that CiderShelf has already printed
          further up this same page, so the band made /ciders say the
          same twenty words twice. The band still earns its place on
          every other page, where the vault has not been shown. */}
      <LocatorBand />
    </>
  );
}
