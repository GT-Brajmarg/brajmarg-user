"use client";

import { useState } from "react";
import BookingHero from "./BookingHero";
import BookingSummary from "./BookingSummary";
import ContactDetails from "./ContactDetails";
import TravelDetails from "./TravelDetails";
import TravellerDetails from "./TravellerDetails";
import ImportantNotice from "./ImportantNotice";
import BookingFooter from "./BookingFooter";
import ReviewPaymentStep from "./ReviewPaymentStep";
import YatraConfirmationStep from "./YatraConfirmationStep";
import { showToast } from "@/lib/toast";
import { restorePageScroll } from "@/lib/payments/razorpay";

interface BookingFlowProps {
  slug: string;
}

export default function BookingFlow({ slug }: BookingFlowProps) {
  const [step, setStep] = useState<"details" | "review" | "confirmed">("details");

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
  const [submitted, setSubmitted] = useState(false);

  const handleProceed = () => {
    setSubmitted(true);

    const isNameValid = !!contactData.name.trim();
    const isPhoneValid = /^\d{10}$/.test(contactData.phone.replace(/\s/g, ""));
    const isEmailValid =
      !contactData.email.trim() ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email.trim());
    const isAadhaarValid = /^\d{12}$/.test(
      contactData.aadhaar.replace(/\s/g, "")
    );
    const isAddressValid = !!contactData.address.trim();
    const isDateValid = !!travelDate;

    // Check all travellers
    const relevantNames = travellerNames.slice(0, travellerCount);
    const areTravellersValid =
      relevantNames.length === travellerCount &&
      relevantNames.every((n) => typeof n === "string" && n.trim().length > 0);

    if (
      !isNameValid ||
      !isPhoneValid ||
      !isEmailValid ||
      !isAadhaarValid ||
      !isAddressValid ||
      !isDateValid ||
      !areTravellersValid
    ) {
      showToast.error("Please fill in all required fields correctly.");
      return;
    }

    setStep("review");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackToDetails = () => {
    setStep("details");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePaymentSuccess = () => {
    restorePageScroll();
    setStep("confirmed");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {step === "details" && (
        <>
          {/* Hero Header for Booking Details */}
          <BookingHero
            title="Book Your Yatra"
            subtitle="Fill in your details to confirm your sacred journey"
          />

          {/* ── Card 1: Booking Summary ── */}
          <div className="overflow-hidden rounded-[20px] border-2 border-[#C37000] bg-[rgba(239,222,199,0.4)] shadow-[0_8px_32px_rgba(195,112,0,0.10)]">
            <BookingSummary />
          </div>

          {/* ── Card 2: Interactive Booking Form ── */}
          <div className="mt-6 mb-12 overflow-hidden rounded-[20px] border-2 border-[#C37000] bg-[rgba(239,222,199,0.4)] shadow-[0_8px_32px_rgba(195,112,0,0.10)]">
            {/* Contact Details */}
            <ContactDetails
              submitted={submitted}
              initialData={contactData}
              onChange={setContactData}
            />

            {/* Travel Details */}
            <TravelDetails
              submitted={submitted}
              initialDate={travelDate}
              travellerCount={travellerCount}
              onChange={(data) => {
                setTravelDate(data.travelDate);
                setTravellerCount(data.travellers);
              }}
            />

            {/* Traveller Details */}
            <TravellerDetails
              submitted={submitted}
              initialNames={travellerNames}
              travellerCount={travellerCount}
              onChange={setTravellerNames}
            />

            {/* Important Notice */}
            <ImportantNotice />

            {/* Footer */}
            <BookingFooter slug={slug} onProceed={handleProceed} />
          </div>
        </>
      )}

      {step === "review" && (
        <>
          {/* Hero Header for Review & Payment */}
          <BookingHero
            title="Review & Make Payment"
            subtitle="Please review your booking details and proceed to payment."
          />

          {/* Review & Make Payment 2-Column Layout */}
          <div className="mt-4">
            <ReviewPaymentStep
              slug={slug}
              contactData={contactData}
              travelDate={travelDate}
              travellerCount={travellerCount}
              travellerNames={travellerNames}
              onBack={handleBackToDetails}
              onEditContact={handleBackToDetails}
              onEditTravel={handleBackToDetails}
              onEditTravellers={handleBackToDetails}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </>
      )}

      {step === "confirmed" && (
        <YatraConfirmationStep
          slug={slug}
          contactData={contactData}
          travelDate={travelDate}
          travellerCount={travellerCount}
          travellerNames={travellerNames}
        />
      )}
    </div>
  );
}
