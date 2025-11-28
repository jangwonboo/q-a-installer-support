'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-auto">
            <Image
              src="/adt_logo.jpg"
              alt="ADT 캡스"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

