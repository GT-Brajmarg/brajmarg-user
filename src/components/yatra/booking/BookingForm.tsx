"use client";

import { useState } from "react";
import ContactDetails from "./ContactDetails";
import TravelDetails from "./TravelDetails";
import TravellerDetails from "./TravellerDetails";
import ImportantNotice from "./ImportantNotice";
import BookingFooter from "./BookingFooter";
import { showToast } from "@/lib/toast";

interface BookingFormProps {
  slug: string;
}

export default function BookingForm({ slug }: BookingFormProps) {
  const [travellerCount, setTravellerCount] = useState(2);
  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
    aadhaar: "",
    address: "",
  });
  const [travelDate, setTravelDate] = useState("");
  const [travellerNames, setTravellerNames] = useState<string[]>(["", ""]);

  // submitted flag — flipped to true when user clicks "Proceed to Payment"
  // so all child forms reveal their inline errors
  const [submitted, setSubmitted] = useState(false);

  const handleProceed = () => {
    setSubmitted(true);
  };

  return (
    <>
      {/* ── Contact Details ── */}
      <ContactDetails submitted={submitted} onChange={setContactData} />

      {/* ── Travel Details (updates travellerCount) ── */}
      <TravelDetails
        submitted={submitted}
        travellerCount={travellerCount}
        onChange={(data) => {
          setTravelDate(data.travelDate);
          setTravellerCount(data.travellers);
        }}
      />

      {/* ── Traveller Details (rendered based on travellerCount) ── */}
      <TravellerDetails
        submitted={submitted}
        travellerCount={travellerCount}
        onChange={setTravellerNames}
      />

      {/* ── Important Notice + Secure Booking ── */}
      <ImportantNotice />

      {/* ── Footer: Back + Proceed to Payment ── */}
      <BookingFooter slug={slug} onProceed={handleProceed} />
    </>
  );
}
