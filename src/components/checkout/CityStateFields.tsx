"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  INDIAN_STATES,
  lookupCitiesForState,
  lookupPincodeForCity,
  lookupStateForCity,
} from "@/lib/india-cities";

/**
 * Linked State + City + Pincode inputs for the checkout form.
 *
 * Flow:
 *  - State is a `<select>` of all 28 states + 8 UTs. Always enabled. Pick first.
 *  - City starts **disabled** ("Select a state first"). Once a state is
 *    picked, City becomes an autocomplete whose suggestion list is filtered
 *    to the curated cities of that state. Free-text City is allowed (rural
 *    fallback) — never blocked.
 *  - Pincode **auto-fills** from the city's curated default the moment a
 *    city is chosen, and overwrites the previous pincode on any city
 *    change. The user can still edit it manually — what they type is
 *    submitted as-is.
 *  - Changing State clears City (and therefore Pincode).
 *
 * All three fields submit their values via the standard `name` attribute
 * so the existing server action sees them with no changes.
 */
export default function CityStateFields({
  defaultCity = "",
  defaultState = "",
  defaultPincode = "",
  cityName = "city",
  stateName = "state",
  pincodeName = "pincode",
}: {
  defaultCity?: string;
  defaultState?: string;
  defaultPincode?: string;
  cityName?: string;
  stateName?: string;
  pincodeName?: string;
}) {
  const cityListId = useId();

  // If the profile pre-fills a city but not the state, derive state from
  // city so returning users land on a consistent pair.
  const initialState =
    defaultState || lookupStateForCity(defaultCity) || "";

  const [state, setStateValue] = useState(initialState);
  const [city, setCity] = useState(defaultCity);
  // Pincode prefers the saved profile value; if missing, fall back to the
  // curated default for the city (or empty).
  const [pincode, setPincode] = useState(
    () => defaultPincode || lookupPincodeForCity(defaultCity) || "",
  );

  const cityDisabled = state.trim().length === 0;
  const cityOptions = lookupCitiesForState(state);

  // PaymentOptions watches the pincode <input> via the native `input` event
  // to drive its pincode-serviceability check. React doesn't dispatch a
  // native `input` event for programmatic value changes, so when we
  // auto-fill the pincode from a city pick the watcher would miss it. We
  // bubble a synthetic event so the serviceability check fires correctly.
  const pincodeRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const el = pincodeRef.current;
    if (!el) return;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, [pincode]);

  function handleStateChange(next: string) {
    setStateValue(next);
    if (next) {
      const matched = lookupStateForCity(city);
      // If the previously-typed city doesn't belong to the new state,
      // clear city AND its derived pincode so we don't carry stale data.
      if (matched !== next) {
        setCity("");
        setPincode("");
      }
    } else {
      // State cleared → city + pincode must clear too.
      setCity("");
      setPincode("");
    }
  }

  function handleCityChange(next: string) {
    setCity(next);
    // Overwrite the pincode with the new city's default. If the city
    // isn't in our curated map, clear pincode so the user types it
    // (avoids carrying a stale pincode from a previous city).
    const pin = lookupPincodeForCity(next);
    setPincode(pin ?? "");
  }

  return (
    <>
      <div>
        <label className="block text-xs font-semibold mb-1">
          State <span className="text-brand-red">*</span>
        </label>
        <select
          name={stateName}
          required
          value={state}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
        >
          <option value="">Select state</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1">
          City <span className="text-brand-red">*</span>
        </label>
        <input
          name={cityName}
          type="text"
          required
          autoComplete="address-level2"
          list={cityListId}
          disabled={cityDisabled}
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          placeholder={
            cityDisabled ? "Select a state first" : "Start typing your city"
          }
          aria-disabled={cityDisabled}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
        />
        <datalist id={cityListId}>
          {cityOptions.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {!cityDisabled && cityOptions.length === 0 && (
          <p className="mt-1 text-[11px] text-gray-500">
            No suggestions for this state — type your city.
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1">
          Pincode <span className="text-brand-red">*</span>
        </label>
        <input
          ref={pincodeRef}
          name={pincodeName}
          type="text"
          inputMode="numeric"
          required
          autoComplete="postal-code"
          maxLength={6}
          value={pincode}
          onChange={(e) =>
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="6-digit pincode"
          pattern="\d{6}"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
        />
      </div>
    </>
  );
}
