import Image from "next/image";

/**
 * The photography band that sits directly beneath a cider's hero.
 *
 * Not three equal panes: one shot leads at twice the size and the
 * others stack beside it, which reads as a composed spread rather than
 * a row of thumbnails. Hairline gutters and square corners, the same
 * grid the shelf tiles use.
 *
 * Every photograph here is decorative. They are editorial shots whose
 * subject differs per cider, and describing them accurately needs
 * someone who has seen them; until then the surrounding copy carries
 * the meaning and a wrong description would be worse than none.
 *
 * Below `sm` the grid unwinds to one column and each pane takes its
 * own aspect ratio — a fixed-height row split two or three ways on a
 * phone crops every shot to a letterbox it was not composed for.
 */
export function PhotoSpread({ photos }: { photos: string[] }) {
  const [lead, ...rest] = photos;
  if (!lead) return null;

  // Three is what almost every cider has; two and one are handled so a
  // thin set degrades to a full band rather than to a hole in the grid.
  const others = rest.slice(0, 2);

  if (others.length === 0) {
    return (
      <div className="relative aspect-[16/9] sm:aspect-auto sm:h-[420px]">
        <Image src={lead} alt="" fill sizes="100vw" className="object-cover" />
      </div>
    );
  }

  if (others.length === 1) {
    return (
      <ul className="grid gap-px bg-ink/15 sm:h-[420px] sm:grid-cols-2">
        {[lead, others[0]].map((photo) => (
          <li key={photo} className="relative aspect-[4/3] sm:aspect-auto">
            <Image
              src={photo}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid gap-px bg-ink/15 sm:h-[420px] sm:grid-cols-3 sm:grid-rows-2">
      {/* 4:3 on a phone, not a wider ratio — in one column a letterbox
          would render the lead *shorter* than the two panes under it,
          which is the opposite of what it is for. */}
      <li className="relative aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto">
        <Image
          src={lead}
          alt=""
          fill
          sizes="(min-width: 640px) 67vw, 100vw"
          className="object-cover"
        />
      </li>
      {others.map((photo) => (
        <li key={photo} className="relative aspect-[4/3] sm:aspect-auto">
          <Image
            src={photo}
            alt=""
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
