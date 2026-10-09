"use client";

import { useEffect, useState } from "react";
import { MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createAddress,
  deleteAddress,
  fetchAddresses,
  selectAddress,
  updateAddress,
} from "@/store/slices/addressSlice";
import type { Address, AddressPayload } from "@/types/address.types";

const EMPTY_FORM = {
  label: "Home" as Address["label"],
  fullName: "",
  mobile: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  saveForFuture: true,
};

export default function DeliveryDetails() {
  const dispatch = useAppDispatch();

  const {
    addresses: savedAddresses,
    selectedAddressId,
    loading,
    saving,
    deletingId,
    error,
  } = useAppSelector((state) => state.addresses);

  const [hasLoadedAddresses, setHasLoadedAddresses] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const addresses = await dispatch(fetchAddresses()).unwrap();

        // Existing saved address → show address cards.
        // No saved address → show the address form.
        setShowAddressForm(addresses.length === 0);
      } catch {
        // If fetching fails, keep form hidden and show Redux error.
        setShowAddressForm(false);
      } finally {
        setHasLoadedAddresses(true);
      }
    };

    loadAddresses();
  }, [dispatch]);

  const input =
    "h-[42px] w-full rounded-lg border border-[#C37000] bg-[#C37000]/04 px-4 text-[13px] text-[#4D443B] placeholder:text-[#B59D79] outline-none transition focus:border-[#0B6670]";

  const updateForm = (
    field: keyof typeof EMPTY_FORM,
    value: string | boolean,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setEditingAddressId(null);
    setForm(EMPTY_FORM);
  };

  const openNewAddressForm = () => {
    resetForm();
    setShowAddressForm(true);
  };

  const openEditAddressForm = (address: Address) => {
    setEditingAddressId(address.id);

    setForm({
      label: address.label,
      fullName: address.fullName,
      mobile: address.mobile,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 ?? "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      saveForFuture: true,
    });

    setShowAddressForm(true);
  };

  const [formError, setFormError] = useState("");

  const handleSaveAddress = async () => {
    setFormError("");

    if (!form.fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    if (form.mobile.length !== 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!form.addressLine1.trim()) {
      setFormError("Please enter address line 1.");
      return;
    }

    if (!form.city.trim()) {
      setFormError("Please enter your city.");
      return;
    }

    if (!form.state.trim()) {
      setFormError("Please select your state.");
      return;
    }

    if (form.pincode.length !== 6) {
      setFormError("Please enter a valid 6-digit pincode.");
      return;
    }

    const payload: AddressPayload = {
      label: form.label,
      fullName: form.fullName.trim(),
      mobile: form.mobile,
      addressLine1: form.addressLine1.trim(),
      addressLine2: form.addressLine2.trim(),
      city: form.city.trim(),
      state: form.state,
      pincode: form.pincode,
      isDefault: savedAddresses.length === 0,
    };

    try {
      if (editingAddressId) {
        await dispatch(
          updateAddress({
            addressId: editingAddressId,
            payload,
          }),
        ).unwrap();
      } else {
        await dispatch(createAddress(payload)).unwrap();
      }

      setShowAddressForm(false);
      resetForm();
    } catch (error) {
      setFormError(
        typeof error === "string"
          ? error
          : "Unable to save address. Please try again.",
      );
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await dispatch(deleteAddress(addressId)).unwrap();

      if (savedAddresses.length === 1) {
        openNewAddressForm();
      }
    } catch {
      // Error message is available in Redux: state.addresses.error
    }
  };

  if (!hasLoadedAddresses) {
    return (
      <section className="min-h-[580px] rounded-2xl border border-[#D59A33] p-6">
        {" "}
        <p className="font-cormorant text-[18px] text-[#0B6670]">
          Loading saved addresses...{" "}
        </p>{" "}
      </section>
    );
  }

  return (
    <section className="min-h-[580px] overflow-hidden rounded-2xl border border-[#C37000] bg-[#C37000]/4 p-4 sm:p-6">
      <div
        className="flex items-center gap-2 border-b border-[#F1DFC1] pb-3"
        style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
      >
        {" "}
        <MapPin size={18} className="ml-1 text-[#C67A00]" />
        <h2 className="font-cormorant text-[23px] font-semibold text-[#0B6670] sm:text-[25px]">
          Delivery Details
        </h2>
      </div>

      {error && (
        <div className="mx-[10px] mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
          {error}
        </div>
      )}

      {showAddressForm ? (
        <>
          <div
            className="mt-4 flex items-center justify-between gap-3"
            style={{ marginLeft: "10px" }}
          >
            <p className="text-xs font-medium text-[#3D352F]">
              All fields are required *
            </p>

            {savedAddresses.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setShowAddressForm(false);
                  resetForm();
                }}
                className="font-cormorant cursor-pointer text-[14px] font-semibold text-[#0B6670] underline underline-offset-4 disabled:cursor-not-allowed"
                style={{ marginRight: "10px" }}
              >
                View Saved Addresses
              </button>
            )}
          </div>

          <div
            className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
            style={{ marginLeft: "10px", marginTop: "10px" }}
          >
            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#3D352F]">
                Full Name
              </label>

              <input
                value={form.fullName}
                onChange={(event) => updateForm("fullName", event.target.value)}
                placeholder="Enter your Full Name"
                className={input}
              />
            </div>

            <div>
              <label
                className="mb-2 block text-[13px] font-bold text-[#3D352F]"
                style={{ marginTop: "2px" }}
              >
                Mobile Number
              </label>

              <div
                className="flex h-[42px] overflow-hidden rounded-lg border border-[#E8C78D] bg-transparent"
                style={{ marginTop: "4px", marginRight: "10px" }}
              >
                <div className="flex h-full w-[70px] items-center justify-center border-r border-[#E8C78D] text-[13px] text-[#4D443B]">
                  🇮🇳 +91
                </div>

                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(event) =>
                    updateForm(
                      "mobile",
                      event.target.value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                  placeholder="Enter Mobile Number"
                  className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] text-[#4D443B] outline-none placeholder:text-[#B59D79]"
                />
              </div>
            </div>
          </div>

          <div
            className="mt-4"
            style={{ marginLeft: "10px", marginTop: "10px" }}
          >
            <label className="mb-2 block text-[13px] font-bold text-[#3D352F]">
              Address Type
            </label>

            <div className="flex flex-wrap gap-2" style={{ marginTop: "10px" }}>
              {(["Home", "Office", "Other"] as Address["label"][]).map(
                (label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => updateForm("label", label)}
                    className={`font-cormorant rounded-md border px-4 py-1.5 text-[14px] font-semibold transition ${
                      form.label === label
                        ? "border-[#0B6670] bg-[#0F5C66]/[0.08] text-[#0B6670]"
                        : "border-[#E8C78D] text-[#5E4A35]"
                    }`}
                  >
                    <span style={{ marginRight: "5px", marginLeft: "5px" }}>
                      {" "}
                      {label}
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>

          <div
            className="mt-4"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <label
              className="mb-2 block text-[13px] font-bold text-[#3D352F]"
              style={{ marginTop: "10px" }}
            >
              Address Line 1
            </label>

            <input
              value={form.addressLine1}
              onChange={(event) =>
                updateForm("addressLine1", event.target.value)
              }
              placeholder="House / Building / Street / Area"
              className={input}
            />
          </div>

          <div
            className="mt-4"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <label
              className="mb-2 block text-[13px] font-bold text-[#3D352F]"
              style={{ marginTop: "10px" }}
            >
              Address Line 2 <span className="font-normal">(Optional)</span>
            </label>

            <input
              value={form.addressLine2}
              onChange={(event) =>
                updateForm("addressLine2", event.target.value)
              }
              placeholder="Landmark / Apartment / Floor"
              className={input}
            />
          </div>

          <div
            className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <div>
              <label
                className="mb-2 block text-[13px] font-bold text-[#3D352F]"
                style={{ marginTop: "10px" }}
              >
                City
              </label>

              <input
                value={form.city}
                onChange={(event) => updateForm("city", event.target.value)}
                placeholder="Enter City"
                className={input}
              />
            </div>

            <div>
              <label
                className="mb-2 block text-[13px] font-bold text-[#3D352F]"
                style={{ marginTop: "10px" }}
              >
                State
              </label>

              <select
                value={form.state}
                onChange={(event) => updateForm("state", event.target.value)}
                className={input}
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujat</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
          </div>

          <div
            className="mt-4"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <label
              className="mb-2 block text-[13px] font-bold text-[#3D352F]"
              style={{ marginTop: "10px" }}
            >
              Pincode
            </label>

            <input
              value={form.pincode}
              onChange={(event) =>
                updateForm(
                  "pincode",
                  event.target.value.replace(/\D/g, "").slice(0, 6),
                )
              }
              placeholder="Enter Pincode"
              className={input}
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={form.saveForFuture}
              onChange={(event) =>
                updateForm("saveForFuture", event.target.checked)
              }
              className="mt-0.5 h-4 w-4 rounded border-[#D59A33] accent-[#0B6670]"
              style={{ marginLeft: "10px", marginTop: "30px" }}
            />

            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <h3 className="font-cormorant text-[17px] font-semibold text-[#0B6670]">
                Save this address for future orders
              </h3>

              <p className="mt-0.5 text-[12px] text-[#3D352F]">
                Easily place orders faster next time.
              </p>
            </div>
          </label>

          <div
            className="mt-5 flex justify-end gap-3"
            style={{ marginTop: "-50px", marginRight: "10px" }}
          >
            {formError && (
              <div className="mx-[10px] mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
                {formError}
              </div>
            )}
            {savedAddresses.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setShowAddressForm(false);
                  resetForm();
                }}
                disabled={saving}
                className="font-cormorant h-[34px] cursor-pointer rounded-lg border border-[#0B6670] px-3 text-[14px] font-semibold text-[#0B6670] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveAddress}
              disabled={saving}
              className="font-cormorant h-[34px] cursor-pointer rounded-lg bg-[#0B6670] px-5 py-1 text-[16px] font-semibold text-white transition hover:bg-[#084E56] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span style={{ marginRight: "5px", marginLeft: "5px" }}>
                {saving
                  ? "Saving..."
                  : editingAddressId
                    ? "Update Address"
                    : "Save & Use Address"}
              </span>
            </button>
          </div>
        </>
      ) : (
        <div className="mt-3">
          <p
            className="mb-2 text-[12px] font-medium text-[#3D352F]"
            style={{ marginLeft: "20px" }}
          >
            Saved Addresses
          </p>

          <div
            className="space-y-2"
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            {savedAddresses.map((address) => {
              const isSelected = selectedAddressId === address.id;

              return (
                <div
                  key={address.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => dispatch(selectAddress(address.id))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      dispatch(selectAddress(address.id));
                    }
                  }}
                  className={`flex w-full cursor-pointer items-start rounded-[10px] border px-3 py-2 text-left transition ${
                    isSelected
                      ? "border-[#0B6670] bg-[#0F5C66]/[0.05]"
                      : "border-[#E8C78D] bg-transparent hover:border-[#0B6670]"
                  }`}
                  style={{ marginTop: "10px" }}
                >
                  <span
                    className={`mt-1 flex h-[18px] w-[18px] shrink-0 rounded-full border ${
                      isSelected
                        ? "border-[#0B6670] bg-[#0B6670] shadow-[inset_0_0_0_3px_#FFF9F0]"
                        : "border-[#D79A43]"
                    }`}
                    style={{
                      marginTop: "10px",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  />

                  <div className="ml-2 min-w-0 flex-1">
                    <p
                      className="font-cormorant text-[14px] font-semibold text-[#0B6670]"
                      style={{ marginTop: "5px" }}
                    >
                      {address.label}
                    </p>

                    <p className="text-[12px] text-[#3D352F]">
                      {address.fullName} | +91 {address.mobile}
                    </p>

                    <p
                      className="mt-1 text-[10px] leading-tight text-[#5E4A35]"
                      style={{ marginTop: "5px", marginBottom: "10px" }}
                    >
                      {address.addressLine1}
                      {address.addressLine2 ? `, ${address.addressLine2}` : ""}
                      <br />
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                  </div>

                  <div className="ml-2 flex shrink-0 items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        openEditAddressForm(address);
                      }}
                      className="flex items-center gap-1 text-[12px] text-[#0B6670]"
                      style={{ marginTop: "10px" }}
                    >
                      <Pencil size={12} />
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={deletingId === address.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteAddress(address.id);
                      }}
                      className="flex items-center gap-1 text-[12px] text-[#B84B3A] disabled:opacity-50"
                      style={{ marginTop: "10px", marginRight: "20px" }}
                    >
                      <Trash2 size={12} />
                      {deletingId === address.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="px-5"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            <button
              type="button"
              onClick={openNewAddressForm}
              className="font-cormorant mt-2 flex h-[36px] w-full items-center justify-center gap-2 rounded-[8px] border border-dashed border-[#D79A43] text-[15px] font-semibold text-[#0B6670] transition hover:bg-[#0F5C66]/[0.05]"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <Plus size={17} />
              Add New Address
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
