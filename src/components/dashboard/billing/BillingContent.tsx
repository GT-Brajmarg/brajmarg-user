"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  Calendar,
  Plus,
  Download,
  CheckCircle2,
  Receipt,
} from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { showToast } from "@/lib/toast";
import AddPaymentModal, { PaymentMethodItem } from "./AddPaymentModal";
import EditPaymentModal from "./EditPaymentModal";
import RemovePaymentModal from "./RemovePaymentModal";

interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending" | "Refunded";
  invoiceNumber: string;
}

const INITIAL_METHODS: PaymentMethodItem[] = [];

const INITIAL_BILLING_HISTORY: BillingRecord[] = [
  {
    id: "bill_1",
    date: "Oct 15, 2024",
    description: "Monthly Pro Subscription",
    amount: "₹999.00",
    status: "Paid",
    invoiceNumber: "INV-2024-1015",
  },
  {
    id: "bill_2",
    date: "Oct 10, 2024",
    description: "Monthly Pro Subscription",
    amount: "₹999.00",
    status: "Paid",
    invoiceNumber: "INV-2024-1010",
  },
  {
    id: "bill_3",
    date: "Oct 7, 2024",
    description: "Monthly Pro Subscription",
    amount: "₹2,900.00",
    status: "Paid",
    invoiceNumber: "INV-2024-1007",
  },
  {
    id: "bill_4",
    date: "Sep 28, 2024",
    description: "Shri Radha Raman Sandhya Aarti Seva",
    amount: "₹1,100.00",
    status: "Paid",
    invoiceNumber: "INV-2024-0928",
  },
  {
    id: "bill_5",
    date: "Sep 15, 2024",
    description: "Bankey Bihari Holy Chappan Bhog Prasad",
    amount: "₹501.00",
    status: "Paid",
    invoiceNumber: "INV-2024-0915",
  },
];

export default function BillingContent() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodItem[]>(INITIAL_METHODS);
  const [billingHistory] = useState<BillingRecord[]>(INITIAL_BILLING_HISTORY);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PaymentMethodItem | null>(null);
  const [removingItem, setRemovingItem] = useState<PaymentMethodItem | null>(null);

  // Load saved payment methods from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("brajmarg_payment_methods");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out old mock items if any
          const userCreated = parsed.filter(
            (p: PaymentMethodItem) => p.id !== "pm_1" && p.id !== "pm_2"
          );
          setPaymentMethods(userCreated);
        }
      }
    } catch {
      // Fallback to empty
    }
  }, []);

  const saveToStorage = (items: PaymentMethodItem[]) => {
    setPaymentMethods(items);
    try {
      localStorage.setItem("brajmarg_payment_methods", JSON.stringify(items));
    } catch {
      // Ignore
    }
  };

  const handleAddMethod = (item: PaymentMethodItem) => {
    let updated = [...paymentMethods];
    if (item.isDefault) {
      updated = updated.map((m) => ({ ...m, isDefault: false }));
    }
    updated.push(item);
    saveToStorage(updated);
  };

  const handleUpdateMethod = (updatedItem: PaymentMethodItem) => {
    let updated = paymentMethods.map((m) => {
      if (m.id === updatedItem.id) {
        return updatedItem;
      }
      if (updatedItem.isDefault) {
        return { ...m, isDefault: false };
      }
      return m;
    });
    saveToStorage(updated);
  };

  const handleConfirmRemove = () => {
    if (!removingItem) return;
    const updated = paymentMethods.filter((m) => m.id !== removingItem.id);
    saveToStorage(updated);
    showToast.success("Payment method removed successfully");
    setRemovingItem(null);
  };

  const handleDownloadInvoice = (bill: BillingRecord) => {
    showToast.success(`Downloading invoice ${bill.invoiceNumber} (${bill.amount})...`);
  };

  return (
    <div className="space-y-6">
      {/* ══ Page Title & Description ══ */}
      <div>
        <h1
          className={`${cormorantInfant.className} text-[28px] sm:text-[34px] font-bold text-[#0F5C66]`}
        >
          Payments & Billing
        </h1>
        <p
          className={`${cormorantInfant.className} text-[16px] sm:text-[18px] text-[#634E3E] font-medium`}
        >
          Manage your saved payment methods and review your sacred seva and billing history.
        </p>
      </div>

      <div className="space-y-6">
        {/* ══ 1. PAYMENT METHODS CARD ══ */}
        <div className="rounded-[20px] sm:rounded-[22px] border border-[#C37000]/40 p-5 sm:p-6 shadow-sm space-y-4">
          {/* Card Header with Credit Card Icon */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#C37000]/20">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F5C66]/10 text-[#0F5C66]">
              <CreditCard size={20} strokeWidth={2} />
            </div>
            <h2
              className={`${cormorantInfant.className} text-[20px] sm:text-[22px] font-bold text-[#2D241E]`}
            >
              Payment Methods
            </h2>
          </div>

          {/* Payment Methods List */}
          <div className="space-y-3">
            {paymentMethods.length === 0 ? (
              <div className="py-7 px-4 text-center rounded-xl border border-dashed border-[#C37000]/30 bg-[#FAF3E7]/30 space-y-1.5">
                <p className={`${cormorantInfant.className} text-[18px] font-bold text-[#2D241E]`}>
                  No saved payment methods yet
                </p>
                <p className={`${cormorantInfant.className} text-[15px] text-[#7A6A5C] max-w-sm mx-auto`}>
                  Add a credit/debit card or UPI ID for seamless 1-click seva &amp; prasad offerings.
                </p>
              </div>
            ) : (
              paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 rounded-xl border border-[#C37000]/25 bg-[#FAF3E7]/40 p-3.5 sm:p-4 transition hover:border-[#C37000]/50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Method Icon / Logo Badge */}
                    <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg border border-[#C37000]/30 bg-[#FFFDF9] shadow-2xs font-bold text-xs uppercase tracking-wider">
                      {pm.brand === "Visa" ? (
                        <span className="font-extrabold italic text-[#1A1F71] tracking-normal text-sm">
                          VISA
                        </span>
                      ) : pm.brand === "Mastercard" ? (
                        <div className="flex -space-x-2">
                          <span className="h-4 w-4 rounded-full bg-[#EB001B] opacity-90 inline-block" />
                          <span className="h-4 w-4 rounded-full bg-[#F79E1B] opacity-90 inline-block" />
                        </div>
                      ) : pm.brand === "PayPal" ? (
                        <span className="font-bold text-[#003087] text-xs">
                          Pay<span className="text-[#0079C1]">Pal</span>
                        </span>
                      ) : pm.brand === "RuPay" ? (
                        <span className="font-bold text-[#008938] text-xs">
                          RuPay
                        </span>
                      ) : (
                        <CreditCard size={18} className="text-[#0F5C66]" />
                      )}
                    </div>

                    {/* Method Details */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`${cormorantInfant.className} text-[17px] sm:text-[18px] font-bold text-[#2D241E] truncate`}
                        >
                          {pm.identifier}
                        </h3>
                        {pm.isDefault && (
                          <span
                            className={`${cormorantInfant.className} inline-flex items-center gap-1 rounded-full bg-[#0F5C66]/10 px-2.5 py-0.5 text-xs font-bold text-[#0F5C66]`}
                          >
                            <CheckCircle2 size={11} />
                            <span>Default</span>
                          </span>
                        )}
                      </div>

                      {pm.expiry && (
                        <p
                          className={`${cormorantInfant.className} text-[14px] text-[#7A6A5C] font-medium`}
                        >
                          Expire date: {pm.expiry}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions: Edit & Remove */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingItem(pm)}
                      className={`rounded-lg border border-[#C37000]/30 bg-[#FFFDF9]/80 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#5F4B38] hover:border-[#C37000] hover:bg-[#FAF3E7] hover:text-[#0F5C66] transition cursor-pointer ${cormorantInfant.className}`}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => setRemovingItem(pm)}
                      className={`rounded-lg border border-[#DC2626]/30 bg-[#FFFDF9]/80 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#DC2626] hover:bg-[#FEECEC] transition cursor-pointer ${cormorantInfant.className}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add New Payment Method Button (styled like in image) */}
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className={`w-full flex items-center justify-center gap-2 rounded-xl border border-[#C37000]/30 bg-[#FAF3E7]/40 hover:bg-[#FAF3E7] hover:border-[#C37000] py-3 px-4 text-[#0F5C66] font-semibold text-[16px] sm:text-[17px] transition cursor-pointer shadow-2xs ${cormorantInfant.className}`}
          >
            <Plus size={18} strokeWidth={2.2} />
            <span>Add New Payment Method</span>
          </button>
        </div>

        {/* ══ 2. BILLING HISTORY CARD ══ */}
        <div className="rounded-[20px] sm:rounded-[22px] border border-[#C37000]/40 p-5 sm:p-6 shadow-sm space-y-4">
          {/* Card Header with Calendar Icon */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#C37000]/20">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F5C66]/10 text-[#0F5C66]">
              <Calendar size={20} strokeWidth={2} />
            </div>
            <h2
              className={`${cormorantInfant.className} text-[20px] sm:text-[22px] font-bold text-[#2D241E]`}
            >
              Billing History
            </h2>
          </div>

          {/* Table for Tablet and Desktop (sm:block) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C37000]/20 text-[14px] uppercase tracking-wider text-[#735A47]">
                  <th className="pb-3 px-2 font-bold">Date</th>
                  <th className="pb-3 px-2 font-bold">Description</th>
                  <th className="pb-3 px-2 font-bold">Amount</th>
                  <th className="pb-3 px-2 font-bold text-center">Status</th>
                  {/* <th className="pb-3 px-2 font-bold text-right">Invoice</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C37000]/15">
                {billingHistory.map((bill) => (
                  <tr
                    key={bill.id}
                    className="hover:bg-[#FAF3E7]/35 transition-colors group"
                  >
                    {/* Date */}
                    <td
                      className={`${cormorantInfant.className} py-3.5 px-2 text-[16px] font-bold text-[#2D241E] whitespace-nowrap`}
                    >
                      {bill.date}
                    </td>

                    {/* Description */}
                    <td
                      className={`${cormorantInfant.className} py-3.5 px-2 text-[16px] font-semibold text-[#4A3E31]`}
                    >
                      {bill.description}
                    </td>

                    {/* Amount */}
                    <td
                      className={`${cormorantInfant.className} py-3.5 px-2 text-[17px] font-bold text-[#0F5C66] whitespace-nowrap`}
                    >
                      {bill.amount}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      <span
                        className={`${cormorantInfant.className} inline-flex items-center gap-1 rounded-full bg-[#E6F4EA] px-2.5 py-0.5 text-[14px] font-bold text-[#137333] border border-[#137333]/20`}
                      >
                        {bill.status}
                      </span>
                    </td>

                    {/* Invoice Download */}
                    {/* <td className="py-3.5 px-2 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleDownloadInvoice(bill)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border border-[#C37000]/30 bg-[#FAF3E7]/40 px-2.5 py-1 text-xs font-semibold text-[#0F5C66] hover:bg-[#FAF3E7] hover:border-[#C37000] transition cursor-pointer ${cormorantInfant.className}`}
                        title="Download Invoice PDF"
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Stack (<640px) */}
          <div className="sm:hidden space-y-3">
            {billingHistory.map((bill) => (
              <div
                key={bill.id}
                className="rounded-xl border border-[#C37000]/25 bg-[#FAF3E7]/40 p-3.5 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`${cormorantInfant.className} text-[15px] font-bold text-[#2D241E]`}
                  >
                    {bill.date}
                  </span>
                  <span
                    className={`${cormorantInfant.className} inline-flex items-center gap-1 rounded-full bg-[#E6F4EA] px-2.5 py-0.5 text-xs font-bold text-[#137333] border border-[#137333]/20`}
                  >
                    {bill.status}
                  </span>
                </div>

                <p
                  className={`${cormorantInfant.className} text-[15px] font-semibold text-[#4A3E31] leading-snug`}
                >
                  {bill.description}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-[#C37000]/15">
                  <span
                    className={`${cormorantInfant.className} text-[17px] font-bold text-[#0F5C66]`}
                  >
                    {bill.amount}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDownloadInvoice(bill)}
                    className={`inline-flex items-center gap-1 rounded-lg border border-[#C37000]/30 bg-[#FFFDF9] px-2.5 py-1 text-xs font-semibold text-[#0F5C66] hover:bg-[#FAF3E7] transition cursor-pointer ${cormorantInfant.className}`}
                  >
                    <Receipt size={13} />
                    <span>Invoice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Modals ══ */}
      <AddPaymentModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddMethod}
      />

      <EditPaymentModal
        isOpen={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onUpdate={handleUpdateMethod}
      />

      <RemovePaymentModal
        isOpen={!!removingItem}
        item={removingItem}
        onClose={() => setRemovingItem(null)}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}
