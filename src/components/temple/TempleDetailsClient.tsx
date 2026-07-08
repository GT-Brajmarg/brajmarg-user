// // // "use client";

// // // import { useEffect } from "react";
// // // import { useParams } from "next/navigation";

// // // import Image from "next/image";

// // // import TempleHero from "@/components/temple/TempleHero";
// // // import DarshanTimings from "@/components/temple/DarshanTimings";
// // // import TempleSevas from "@/components/temple/TempleSevas";
// // // import TemplePrasad from "@/components/temple/TemplePrasad";
// // // import TempleOfferings from "@/components/temple/TempleOfferings";
// // // import TempleGallery from "@/components/temple/TempleGallery";
// // // import TempleLocation from "@/components/temple/TempleLocation";
// // // import RelatedTemples from "@/components/temple/RelatedTemples";

// // // import { fetchLiveDarshan } from "@/store/slices/heroSlice";
// // // import { getTempleDetails } from "@/store/slices/templeDetailsSlice";
// // // import { useAppDispatch, useAppSelector } from "@/store/hooks";

// // // export default function TempleDetailsClient() {
// // //   const { slug } = useParams<{ slug: string }>();

// // //   const dispatch = useAppDispatch();

// // //   const { temple, loading } = useAppSelector((state) => state.templeDetails);

// // //   useEffect(() => {
// // //     if (slug) {
// // //       dispatch(getTempleDetails(slug));
// // //     }
// // //   }, [dispatch, slug]);

// // //   useEffect(() => {
// // //     dispatch(fetchLiveDarshan());
// // //   }, [dispatch]);

// // //   if (loading) {
// // //     return (
// // //       <main className="flex min-h-screen items-center justify-center bg-[#F8F2E8]">
// // //         <p className="font-serif text-xl text-[#6B3E1E]">Loading temple...</p>
// // //       </main>
// // //     );
// // //   }

// // //   if (!temple) {
// // //     return (
// // //       <main className="flex min-h-screen items-center justify-center bg-[#F8F2E8]">
// // //         <p className="font-serif text-xl text-[#6B3E1E]">Temple not found</p>
// // //       </main>
// // //     );
// // //   }

// // //   return (
// // //     <main className="relative overflow-hidden bg-[#F8F2E8]">
// // //       {/* Background */}
// // //       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
// // //         <Image
// // //           src="/images/temple-paper-texture.png"
// // //           alt=""
// // //           fill
// // //           priority
// // //           sizes="100vw"
// // //           className="object-cover opacity-[0.24]"
// // //         />

// // //         <Image
// // //           src="/images/mandala_bg_1.png"
// // //           alt=""
// // //           width={1050}
// // //           height={1050}
// // //           className="absolute top-[360px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
// // //         />

// // //         <Image
// // //           src="/images/mandala_bg_1.png"
// // //           alt=""
// // //           width={1050}
// // //           height={1050}
// // //           className="absolute top-[1450px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
// // //         />

// // //         <Image
// // //           src="/images/mandala_bg_1.png"
// // //           alt=""
// // //           width={900}
// // //           height={900}
// // //           className="absolute top-[2550px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
// // //         />
// // //       </div>

// // //       {/* Content */}
// // //       <div className="relative z-10 mx-auto w-full max-w-[1200px]">
// // //         <TempleHero temple={temple} />

// // //         <DarshanTimings templeId={temple.id} />

// // //         <div className="mt-[90px] lg:mt-[30px]">
// // //           <TempleSevas templeId={temple.id} templeSlug={slug} />
// // //         </div>

// // //         <div className="mt-[90px] lg:mt-[40px]">
// // //           <TemplePrasad templeId={temple.id} templeSlug={slug} />
// // //         </div>

// // //         <div className="mt-[90px] lg:mt-[10px]">
// // //           <TempleOfferings templeId={temple.id} templeSlug={slug} />
// // //         </div>

// // //         <div className="mt-[90px] lg:mt-[30px]">
// // //           <TempleGallery templeId={temple.id} />
// // //         </div>

// // //         <div className="mt-[90px] lg:mt-[30px]">
// // //           <TempleLocation templeId={temple.id} />
// // //         </div>

// // //         <div className="mt-[90px] mb-[90px] lg:mt-[60px] lg:mb-[60px]">
// // //           <RelatedTemples currentTempleId={temple.id} />
// // //         </div>
// // //       </div>
// // //     </main>
// // //   );
// // // }
// // "use client";

// // import { useEffect } from "react";
// // import { useParams } from "next/navigation";
// // import Image from "next/image";

// // import TempleHero from "@/components/temple/TempleHero";
// // import DarshanTimings from "@/components/temple/DarshanTimings";
// // import TempleSevas from "@/components/temple/TempleSevas";
// // import TemplePrasad from "@/components/temple/TemplePrasad";
// // import TempleOfferings from "@/components/temple/TempleOfferings";
// // import TempleGallery from "@/components/temple/TempleGallery";
// // import TempleLocation from "@/components/temple/TempleLocation";
// // import RelatedTemples from "@/components/temple/RelatedTemples";
// // import TempleDetailsLoader from "@/components/temple/TempleDetailsLoader";

// // import { fetchLiveDarshan } from "@/store/slices/heroSlice";
// // import { getTempleDetails } from "@/store/slices/templeDetailsSlice";
// // import { useAppDispatch, useAppSelector } from "@/store/hooks";

// // export default function TempleDetailsClient() {
// //   const { slug } = useParams<{ slug: string }>();

// //   const dispatch = useAppDispatch();

// //   const { temple, loading } = useAppSelector((state) => state.templeDetails);

// //   const heroLoading = useAppSelector((state) => state.hero.loading);
// //   const darshan = useAppSelector((state) => state.hero.darshan);

// //   const hasTempleData = Boolean(temple?.id);
// //   const hasDarshanData = Boolean(darshan?.templeName);

// //   const { slug } = useParams<{ slug: string }>();
// //   const dispatch = useAppDispatch();

// //   const { temple, loading, currentSlug } = useAppSelector(
// //     (state) => state.templeDetails,
// //   );

// //   const hasCorrectTemple = Boolean(temple?.id && currentSlug === slug);

// //   useEffect(() => {
// //     if (!slug) return;

// //     if (!hasCorrectTemple && !loading) {
// //       dispatch(getTempleDetails(slug));
// //     }
// //   }, [dispatch, slug, hasCorrectTemple, loading]);

// //   if (!hasCorrectTemple || loading) {
// //     return <TempleDetailsLoader />;
// //   }

// //   if (!temple) {
// //     return (
// //       <main className="flex min-h-screen items-center justify-center bg-[#F8F2E8]">
// //         <p className="font-cormorant text-2xl font-semibold text-[#6B3E1E]">
// //           Temple not found
// //         </p>
// //       </main>
// //     );
// //   }

// //   return (
// //     <main className="relative overflow-hidden bg-[#F8F2E8]">
// //       {/* Background */}
// //       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
// //         <Image
// //           src="/images/temple-paper-texture.png"
// //           alt=""
// //           fill
// //           priority
// //           sizes="100vw"
// //           className="object-cover opacity-[0.24]"
// //         />

// //         <Image
// //           src="/images/mandala_bg_1.png"
// //           alt=""
// //           width={1050}
// //           height={1050}
// //           className="absolute top-[360px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
// //         />

// //         <Image
// //           src="/images/mandala_bg_1.png"
// //           alt=""
// //           width={1050}
// //           height={1050}
// //           className="absolute top-[1450px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
// //         />

// //         <Image
// //           src="/images/mandala_bg_1.png"
// //           alt=""
// //           width={900}
// //           height={900}
// //           className="absolute top-[2550px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
// //         />
// //       </div>

// //       <div className="relative z-10 mx-auto w-full max-w-[1200px]">
// //         <TempleHero temple={temple} />

// //         <DarshanTimings templeId={temple.id} />

// //         <div className="mt-[90px] lg:mt-[30px]">
// //           <TempleSevas templeId={temple.id} templeSlug={slug} />
// //         </div>

// //         <div className="mt-[90px] lg:mt-[40px]">
// //           <TemplePrasad templeId={temple.id} templeSlug={slug} />
// //         </div>

// //         <div className="mt-[90px] lg:mt-[10px]">
// //           <TempleOfferings templeId={temple.id} templeSlug={slug} />
// //         </div>

// //         <div className="mt-[90px] lg:mt-[30px]">
// //           <TempleGallery templeId={temple.id} />
// //         </div>

// //         <div className="mt-[90px] lg:mt-[30px]">
// //           <TempleLocation templeId={temple.id} />
// //         </div>

// //         <div className="mt-[90px] mb-[90px] lg:mt-[60px] lg:mb-[60px]">
// //           <RelatedTemples currentTempleId={temple.id} />
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }
// "use client";

// import { useEffect } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";

// import TempleHero from "@/components/temple/TempleHero";
// import DarshanTimings from "@/components/temple/DarshanTimings";
// import TempleSevas from "@/components/temple/TempleSevas";
// import TemplePrasad from "@/components/temple/TemplePrasad";
// import TempleOfferings from "@/components/temple/TempleOfferings";
// import TempleGallery from "@/components/temple/TempleGallery";
// import TempleLocation from "@/components/temple/TempleLocation";
// import RelatedTemples from "@/components/temple/RelatedTemples";
// import TempleDetailsLoader from "@/components/temple/TempleDetailsLoader";

// import { fetchLiveDarshan } from "@/store/slices/heroSlice";
// import { getTempleDetails } from "@/store/slices/templeDetailsSlice";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";

// export default function TempleDetailsClient() {
//   const { slug } = useParams<{ slug: string }>();
//   const dispatch = useAppDispatch();

//   const { temple, loading, currentSlug, error } = useAppSelector(
//     (state) => state.templeDetails,
//   );

//   const heroLoading = useAppSelector((state) => state.hero.loading);
//   const darshan = useAppSelector((state) => state.hero.darshan);

//   const hasDarshanData = Boolean(darshan?.templeName);

//   /*
// currentSlug is the requested URL slug saved in Redux during
// getTempleDetails.pending. This avoids relying on temple.slug,
// which may use a different database slug format.
// */
//   const hasCorrectTemple = Boolean(temple?.id && currentSlug === slug);

//   useEffect(() => {
//     if (!slug) return;

//     if (!hasCorrectTemple && !loading) {
//       dispatch(getTempleDetails(slug));
//     }
//   }, [dispatch, slug, hasCorrectTemple, loading]);

//   useEffect(() => {
//     if (!hasDarshanData && !heroLoading) {
//       dispatch(fetchLiveDarshan());
//     }
//   }, [dispatch, hasDarshanData, heroLoading]);

//   /*
// Show loader only while this route's temple is being requested.
// If API has failed, show the not-found/error state instead of
// keeping the loader visible forever.
// */
//   const shouldShowLoader = !slug || loading || (!hasCorrectTemple && !error);

//   if (shouldShowLoader) {
//     return <TempleDetailsLoader />;
//   }

//   if (!temple || !hasCorrectTemple) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#F8F2E8] px-4">
//         {" "}
//         <p className="font-cormorant text-center text-2xl font-semibold text-[#6B3E1E]">
//           Temple not found{" "}
//         </p>{" "}
//       </main>
//     );
//   }

//   return (
//     <main className="relative overflow-hidden bg-[#F8F2E8]">
//       {/* Background */}{" "}
//       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//         {" "}
//         <Image
//           src="/images/temple-paper-texture.png"
//           alt=""
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover opacity-[0.24]"
//         />
//         ```
//         <Image
//           src="/images/mandala_bg_1.png"
//           alt=""
//           width={1050}
//           height={1050}
//           className="absolute top-[360px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
//         />
//         <Image
//           src="/images/mandala_bg_1.png"
//           alt=""
//           width={1050}
//           height={1050}
//           className="absolute top-[1450px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
//         />
//         <Image
//           src="/images/mandala_bg_1.png"
//           alt=""
//           width={900}
//           height={900}
//           className="absolute top-[2550px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
//         />
//       </div>
//       {/* Page content */}
//       <div className="relative z-10 mx-auto w-full max-w-[1200px]">
//         <TempleHero temple={temple} />

//         <DarshanTimings templeId={temple.id} />

//         <div className="mt-[90px] lg:mt-[30px]">
//           <TempleSevas templeId={temple.id} templeSlug={slug} />
//         </div>

//         <div className="mt-[90px] lg:mt-[40px]">
//           <TemplePrasad templeId={temple.id} templeSlug={slug} />
//         </div>

//         <div className="mt-[90px] lg:mt-[10px]">
//           <TempleOfferings templeId={temple.id} templeSlug={slug} />
//         </div>

//         <div className="mt-[90px] lg:mt-[30px]">
//           <TempleGallery templeId={temple.id} />
//         </div>

//         <div className="mt-[90px] lg:mt-[30px]">
//           <TempleLocation templeId={temple.id} />
//         </div>

//         <div className="mt-[90px] mb-[90px] lg:mt-[60px] lg:mb-[60px]">
//           <RelatedTemples currentTempleId={temple.id} />
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import TempleHero from "@/components/temple/TempleHero";
import DarshanTimings from "@/components/temple/DarshanTimings";
import TempleSevas from "@/components/temple/TempleSevas";
import TemplePrasad from "@/components/temple/TemplePrasad";
import TempleOfferings from "@/components/temple/TempleOfferings";
import TempleGallery from "@/components/temple/TempleGallery";
import TempleLocation from "@/components/temple/TempleLocation";
import RelatedTemples from "@/components/temple/RelatedTemples";
import TempleDetailsLoader from "@/components/temple/TempleDetailsLoader";

import { fetchLiveDarshan } from "@/store/slices/heroSlice";
import { getTempleDetails } from "@/store/slices/templeDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function TempleDetailsClient() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();

  const { temple, loading, error, currentSlug } = useAppSelector(
    (state) => state.templeDetails,
  );

  const heroLoading = useAppSelector((state) => state.hero.loading);
  const darshan = useAppSelector((state) => state.hero.darshan);

  useEffect(() => {
    if (!slug) return;

    // Fetch only once per URL slug.
    if (currentSlug !== slug) {
      dispatch(getTempleDetails(slug));
    }
  }, [dispatch, slug, currentSlug]);

  useEffect(() => {
    if (!darshan?.templeName && !heroLoading) {
      dispatch(fetchLiveDarshan());
    }
  }, [dispatch, darshan?.templeName, heroLoading]);

  const isCurrentTemple = currentSlug === slug;

  if (!slug || !isCurrentTemple || loading) {
    return <TempleDetailsLoader />;
  }

  if (error || !temple) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F2E8] px-4">
        <p className="font-cormorant text-center text-2xl font-semibold text-[#6B3E1E]">
          Temple not found
        </p>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden bg-[#F8F2E8]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.24]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[360px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[1450px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute top-[2550px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <TempleHero temple={temple} />

        <DarshanTimings templeId={temple.id} />

        <div className="mt-[90px] lg:mt-[30px]">
          <TempleSevas templeId={temple.id} templeSlug={slug} />
        </div>

        <div className="mt-[90px] lg:mt-[40px]">
          <TemplePrasad templeId={temple.id} templeSlug={slug} />
        </div>

        <div className="mt-[90px] lg:mt-[10px]">
          <TempleOfferings templeId={temple.id} templeSlug={slug} />
        </div>

        <div className="mt-[90px] lg:mt-[30px]">
          <TempleGallery templeId={temple.id} />
        </div>

        <div className="mt-[90px] lg:mt-[30px]">
          <TempleLocation templeId={temple.id} />
        </div>

        <div className="mt-[90px] mb-[90px] lg:mt-[60px] lg:mb-[60px]">
          <RelatedTemples currentTempleId={temple.id} />
        </div>
      </div>
    </main>
  );
}
