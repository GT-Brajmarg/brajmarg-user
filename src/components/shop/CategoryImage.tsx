"use client";

import { useState } from "react";
import Image from "next/image";

export function CategoryImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover transition duration-500 group-hover:scale-110"
      onError={() => setImgSrc("/images2/default.png")}
    />
  );
}
