import { redirect } from "next/navigation";

// Flipkart/Amazon style: no separate signup page
// Users are auto-registered on first OTP login
export default function SignupPage() {
  redirect("/login");
}
