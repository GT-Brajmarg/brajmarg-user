// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/supabase/server";
// import type { CartItem, ItemType, Profile } from "@/types/database";
// import { formatInr, parseNumeric } from "@/lib/format";
// import { placeOrder } from "./actions";

// type ItemMeta = {
//   id: string;
//   name: string;
//   price: number | string;
//   image_url: string | null;
//   temples: { name: string } | null;
// };

// export default async function CheckoutPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ error?: string }>;
// }) {
//   const { error } = await searchParams;
//   const supabase = await createClient();

//   // Require auth
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) {
//     redirect("/login?next=/checkout");
//   }

//   // Load cart
//   const { data: cartRows } = await supabase
//     .from("cart_items")
//     .select("*")
//     .order("created_at", { ascending: true });

//   const cart = (cartRows ?? []) as CartItem[];

//   if (cart.length === 0) {
//     redirect("/cart");
//   }

//   // Pre-fill profile
//   const { data: profileRow } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", user.id)
//     .maybeSingle();
//   const profile = (profileRow ?? {}) as Partial<Profile>;

//   // Enrich cart for the order summary panel
//   const byType: Record<ItemType, string[]> = {
//     prasad: [],
//     seva: [],
//     frame: [],
//     cloth: [],
//   };
//   for (const r of cart) byType[r.item_type].push(r.item_id);

//   const [prasadRes, sevaRes, frameRes, clothRes] = await Promise.all([
//     byType.prasad.length
//       ? supabase
//           .from("prasad_items")
//           .select("id, name, price, image_url, temples(name)")
//           .in("id", byType.prasad)
//       : Promise.resolve({ data: [] as ItemMeta[] }),
//     byType.seva.length
//       ? supabase
//           .from("seva_items")
//           .select("id, name, price, image_url, temples(name)")
//           .in("id", byType.seva)
//       : Promise.resolve({ data: [] as ItemMeta[] }),
//     byType.frame.length
//       ? supabase
//           .from("frame_items")
//           .select("id, name, price, image_url, temples(name)")
//           .in("id", byType.frame)
//       : Promise.resolve({ data: [] as ItemMeta[] }),
//     byType.cloth.length
//       ? supabase
//           .from("cloth_items")
//           .select("id, name, price, image_url, temples(name)")
//           .in("id", byType.cloth)
//       : Promise.resolve({ data: [] as ItemMeta[] }),
//   ]);

//   const map = new Map<string, ItemMeta>();
//   for (const r of (prasadRes.data ?? []) as ItemMeta[]) map.set(`prasad:${r.id}`, r);
//   for (const r of (sevaRes.data ?? []) as ItemMeta[]) map.set(`seva:${r.id}`, r);
//   for (const r of (frameRes.data ?? []) as ItemMeta[]) map.set(`frame:${r.id}`, r);
//   for (const r of (clothRes.data ?? []) as ItemMeta[]) map.set(`cloth:${r.id}`, r);

//   const enriched = cart
//     .map((row) => {
//       const meta = map.get(`${row.item_type}:${row.item_id}`);
//       if (!meta) return null;
//       return {
//         row,
//         meta,
//         line_total: parseNumeric(meta.price) * row.quantity,
//       };
//     })
//     .filter((x): x is NonNullable<typeof x> => x !== null);

//   const subtotal = enriched.reduce((s, e) => s + e.line_total, 0);

//   return (
//     <main className="flex-1">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
//           <Link
//             href="/cart"
//             className="text-sm font-semibold text-brand-red hover:underline"
//           >
//             ← Back to cart
//           </Link>
//         </div>

//         {error && (
//           <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* ===== Form ===== */}
//           <form action={placeOrder} className="lg:col-span-2 space-y-6">
//             <section className="rounded-xl border border-gray-200 bg-card-bg p-5 space-y-4">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Contact details
//               </h2>
//               <Field
//                 label="Full name"
//                 name="full_name"
//                 required
//                 defaultValue={profile.full_name ?? ""}
//                 placeholder="As written on government ID"
//               />
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <Field
//                   label="Mobile number"
//                   name="customer_phone"
//                   type="tel"
//                   required
//                   defaultValue={profile.phone ?? user.phone ?? ""}
//                   placeholder="+91 9876543210"
//                 />
//                 <Field
//                   label="Email"
//                   name="customer_email"
//                   type="email"
//                   defaultValue={profile.email ?? user.email ?? ""}
//                   placeholder="you@example.com"
//                 />
//               </div>
//             </section>

//             <section className="rounded-xl border border-gray-200 bg-card-bg p-5 space-y-4">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Shipping address
//               </h2>
//               <Field
//                 label="Address line 1"
//                 name="address_line1"
//                 required
//                 defaultValue={profile.address_line1 ?? ""}
//                 placeholder="House / flat number, building, street"
//               />
//               <Field
//                 label="Address line 2"
//                 name="address_line2"
//                 defaultValue={profile.address_line2 ?? ""}
//                 placeholder="Area, landmark (optional)"
//               />
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <Field
//                   label="City"
//                   name="city"
//                   required
//                   defaultValue={profile.city ?? ""}
//                 />
//                 <Field
//                   label="State"
//                   name="state"
//                   required
//                   defaultValue={profile.state ?? ""}
//                 />
//                 <Field
//                   label="Pincode"
//                   name="pincode"
//                   required
//                   pattern="\d{6}"
//                   inputMode="numeric"
//                   maxLength={6}
//                   defaultValue={profile.pincode ?? ""}
//                   placeholder="6 digits"
//                 />
//               </div>
//             </section>

//             <section className="rounded-xl border border-gray-200 bg-card-bg p-5 space-y-4">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Notes (optional)
//               </h2>
//               <textarea
//                 name="notes"
//                 rows={3}
//                 placeholder="Any special instructions for the temple…"
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 resize-none"
//               />
//             </section>

//             <button
//               type="submit"
//               className="w-full rounded-lg bg-brand-red text-white text-sm font-semibold px-5 py-3.5 shadow-sm hover:bg-brand-red-dark active:scale-[0.99] transition-all"
//             >
//               Place order ({formatInr(subtotal)})
//             </button>
//           </form>

//           {/* ===== Order summary ===== */}
//           <aside className="lg:col-span-1">
//             <div className="sticky top-20 space-y-4">
//               <div className="rounded-xl border border-gray-200 bg-card-bg p-5">
//                 <h2 className="text-lg font-bold text-gray-900 mb-3">
//                   Order summary
//                 </h2>
//                 <ul className="space-y-3">
//                   {enriched.map((e) => (
//                     <li key={e.row.id} className="flex gap-3">
//                       <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
//                         {e.meta.image_url ? (
//                           // eslint-disable-next-line @next/next/no-img-element
//                           <img
//                             src={e.meta.image_url}
//                             alt=""
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <div className="h-full w-full bg-gray-200" />
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-900 truncate">
//                           {e.meta.name}
//                         </p>
//                         {e.meta.temples?.name && (
//                           <p className="text-xs text-brand-red truncate">
//                             {e.meta.temples.name}
//                           </p>
//                         )}
//                         <p className="text-xs text-gray-500">
//                           Qty {e.row.quantity}
//                         </p>
//                       </div>
//                       <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
//                         {formatInr(e.line_total)}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5">
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>Subtotal</span>
//                     <span className="font-semibold text-gray-900">
//                       {formatInr(subtotal)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>Delivery</span>
//                     <span className="font-semibold text-emerald-600">FREE</span>
//                   </div>
//                   <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
//                     <span>Total</span>
//                     <span>{formatInr(subtotal)}</span>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-500 leading-relaxed px-1">
//                 Payment is collected on delivery. By placing this order you
//                 consent to receive order updates via SMS and email.
//               </p>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// }

// function Field({
//   label,
//   name,
//   type = "text",
//   required = false,
//   defaultValue = "",
//   placeholder,
//   pattern,
//   maxLength,
//   inputMode,
// }: {
//   label: string;
//   name: string;
//   type?: string;
//   required?: boolean;
//   defaultValue?: string;
//   placeholder?: string;
//   pattern?: string;
//   maxLength?: number;
//   inputMode?: "tel" | "email" | "numeric" | "text";
// }) {
//   return (
//     <div>
//       <label
//         htmlFor={name}
//         className="block text-xs font-semibold text-gray-700 mb-1"
//       >
//         {label} {required && <span className="text-brand-red">*</span>}
//       </label>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         required={required}
//         defaultValue={defaultValue}
//         placeholder={placeholder}
//         pattern={pattern}
//         maxLength={maxLength}
//         inputMode={inputMode}
//         className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
//       />
//     </div>
//   );
// }
import Link from "next/link";
import { redirect } from "next/navigation";
import Script from "next/script";
import { createClient } from "@/utils/supabase/server";
import type { CartItem, ItemType, Profile } from "@/types/database";
import { formatInr, parseNumeric } from "@/lib/format";
import { placeOrder } from "./actions";
import { aggregatePaymentOptions } from "@/lib/payment";
import PaymentOptions from "./payment-options";
import PhoneInput from "@/components/input/PhoneInput";

type ItemMeta = {
  id: string;
  name: string;
  price: number | string;
  image_url: string | null;
  temples:
    | { name: string }
    | { name: string }[]
    | null;
  allow_direct_payment?: boolean | null;
  allow_cod?: boolean | null;
};

function getTempleName(
  temples: ItemMeta["temples"]
): string | null {
  if (!temples) return null;

  if (Array.isArray(temples)) {
    return temples[0]?.name ?? null;
  }

  return temples.name ?? null;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/checkout");

  const { data: cartRows } = await supabase
    .from("cart_items")
    .select("*")
    .order("created_at", { ascending: true });

  const cart = (cartRows ?? []) as CartItem[];

  if (cart.length === 0) redirect("/cart");

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const profile = (profileRow ?? {}) as Partial<Profile>;

  const byType: Record<ItemType, string[]> = {
    prasad: [],
    seva: [],
    frame: [],
    cloth: [],
    yatra: [], // yatra is booked directly, never via the cart
  };

  for (const item of cart) {
    byType[item.item_type].push(item.item_id);
  }

  const [prasadRes, sevaRes, frameRes, clothRes] =
    await Promise.all([
      byType.prasad.length
        ? supabase
            .from("prasad_items")
            .select(
              "id,name,price,image_url,temples(name),allow_direct_payment,allow_cod"
            )
            .in("id", byType.prasad)
        : Promise.resolve({ data: [] }),

      byType.seva.length
        ? supabase
            .from("seva_items")
            .select(
              "id,name,price,image_url,temples(name),allow_direct_payment,allow_cod"
            )
            .in("id", byType.seva)
        : Promise.resolve({ data: [] }),

      byType.frame.length
        ? supabase
            .from("frame_items")
            .select(
              "id,name,price,image_url,temples(name),allow_direct_payment,allow_cod"
            )
            .in("id", byType.frame)
        : Promise.resolve({ data: [] }),

      byType.cloth.length
        ? supabase
            .from("cloth_items")
            .select(
              "id,name,price,image_url,temples(name),allow_direct_payment,allow_cod"
            )
            .in("id", byType.cloth)
        : Promise.resolve({ data: [] }),
    ]);

  const map = new Map<string, ItemMeta>();

  for (const row of (prasadRes.data ??
    []) as ItemMeta[]) {
    map.set(`prasad:${row.id}`, row);
  }

  for (const row of (sevaRes.data ??
    []) as ItemMeta[]) {
    map.set(`seva:${row.id}`, row);
  }

  for (const row of (frameRes.data ??
    []) as ItemMeta[]) {
    map.set(`frame:${row.id}`, row);
  }

  for (const row of (clothRes.data ??
    []) as ItemMeta[]) {
    map.set(`cloth:${row.id}`, row);
  }

  const enriched = cart
    .map((row) => {
      const meta = map.get(
        `${row.item_type}:${row.item_id}`
      );

      if (!meta) return null;

      return {
        row,
        meta,
        templeName: getTempleName(meta.temples),
        lineTotal:
          parseNumeric(meta.price) *
          row.quantity,
      };
    })
    .filter(
      (
        item
      ): item is {
        row: CartItem;
        meta: ItemMeta;
        templeName: string | null;
        lineTotal: number;
      } => item !== null
    );

  const subtotal = enriched.reduce(
    (sum, item) => sum + item.lineTotal,
    0
  );

  // Cart-level payment capability (strictest wins across all items).
  const { allowOnline, allowCod } = aggregatePaymentOptions(
    enriched.map((e) => e.meta)
  );

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Checkout
            </h1>

            <Link
              href="/cart"
              className="text-sm font-semibold text-brand-red hover:underline"
            >
              ← Back to cart
            </Link>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              <form
                action={placeOrder}
                id="checkout-form"
                className="space-y-6"
              >
                <section className="rounded-xl border border-gray-200 bg-card-bg p-5 space-y-4">
                  <h2 className="text-lg font-bold">
                    Contact details
                  </h2>

                  <Field
                    label="Full name"
                    name="full_name"
                    required
                    defaultValue={
                      profile.full_name ?? ""
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Mobile number
                      </label>
                      <PhoneInput
                        name="customer_phone"
                        required
                        defaultValue={
                          profile.phone ??
                          user.phone ??
                          ""
                        }
                      />
                    </div>

                    <Field
                      label="Email"
                      name="customer_email"
                      type="email"
                      defaultValue={
                        profile.email ??
                        user.email ??
                        ""
                      }
                    />
                  </div>
                </section>

                <section className="rounded-xl border border-gray-200 bg-card-bg p-5 space-y-4">
                  <h2 className="text-lg font-bold">
                    Shipping address
                  </h2>

                  <Field
                    label="Address line 1"
                    name="address_line1"
                    required
                    defaultValue={
                      profile.address_line1 ?? ""
                    }
                  />

                  <Field
                    label="Address line 2"
                    name="address_line2"
                    defaultValue={
                      profile.address_line2 ?? ""
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field
                      label="City"
                      name="city"
                      required
                      defaultValue={
                        profile.city ?? ""
                      }
                    />

                    <Field
                      label="State"
                      name="state"
                      required
                      defaultValue={
                        profile.state ?? ""
                      }
                    />

                    <Field
                      label="Pincode"
                      name="pincode"
                      required
                      maxLength={6}
                      defaultValue={
                        profile.pincode ?? ""
                      }
                    />
                  </div>
                </section>

                <section className="rounded-xl border border-gray-200 bg-card-bg p-5">
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Special instructions..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                  />
                </section>

              </form>

              {/* Payment buttons: COD is gated on live per-pincode
                  serviceability in addition to the item-level flags. The
                  COD button lives here (outside the form) but submits it
                  via form="checkout-form". */}
              <PaymentOptions
                subtotal={subtotal}
                allowCod={allowCod}
                allowOnline={allowOnline}
              />
            </div>

            {/* RIGHT */}
            <aside>
              <div className="rounded-xl border border-gray-200 bg-card-bg p-5">
                <h2 className="text-lg font-bold mb-4">
                  Order summary
                </h2>

                <div className="space-y-3">
                  {enriched.map((item) => (
                    <div
                      key={item.row.id}
                      className="flex justify-between gap-3"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {item.meta.name}
                        </p>

                        {item.templeName && (
                          <p className="text-xs text-brand-red">
                            {item.templeName}
                          </p>
                        )}

                        <p className="text-xs text-gray-500">
                          Qty{" "}
                          {
                            item.row
                              .quantity
                          }
                        </p>
                      </div>

                      <div className="text-sm font-semibold">
                        {formatInr(
                          item.lineTotal
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    {formatInr(subtotal)}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue = "",
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1">
        {label}
      </label>

      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        maxLength={maxLength}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
      />
    </div>
  );
}