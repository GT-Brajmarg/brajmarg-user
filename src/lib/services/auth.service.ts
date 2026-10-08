import { createClient } from "@/lib/supabase/server";

const DEV_OTP = process.env.DEV_OTP!;

function getIdentifierType(identifier: string) {
  const value = identifier.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  if (emailRegex.test(value)) return "email";
  if (phoneRegex.test(value)) return "phone";

  return null;
}

export async function sendOtpService(identifier: string) {
  const type = getIdentifierType(identifier);

  if (!type) {
    return {
      success: false,
      message: "Please enter a valid email or mobile number.",
    };
  }

  // Phone (Temporary)
  if (type === "phone") {
    console.log("Development OTP:", DEV_OTP);

    return {
      success: true,
      message: "OTP sent successfully.",
    };
  }

  // Email
  // Email
  const supabase = await createClient();

  // Send OTP only for existing users
  const { error } = await supabase.auth.signInWithOtp({
    email: identifier,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "OTP sent successfully.",
  };
}

export async function verifyOtpService(identifier: string, otp: string) {
  const type = getIdentifierType(identifier);

  if (!type) {
    return {
      success: false,
      message: "Invalid email or mobile number.",
    };
  }

  // Phone (Temporary)
  if (type === "phone") {
    if (otp !== DEV_OTP) {
      return {
        success: false,
        message: "Invalid OTP.",
      };
    }

    return {
      success: true,
      message: "Login successful.",
      user: {
        id: "dev-user",
        phone: identifier,
        name: "Development User",
      },
    };
  }

  // Email
  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    email: identifier,
    token: otp,
    type: "email",
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  const user = data.user;

  if (!user) {
    return {
      success: false,
      message: "Unable to verify user.",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  let currentProfile = profile;

  if (!profile) {
    const { data: newProfile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email,
        phone: user.phone,
        full_name: "",
        is_email_verified: true,
        is_phone_verified: !!user.phone,
      })
      .select()
      .single();

    if (profileError) {
      return {
        success: false,
        message: profileError.message,
      };
    }

    currentProfile = newProfile;
  } else {
    await supabase
      .from("profiles")
      .update({
        is_email_verified: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
  }

  return {
    success: true,
    message: "Login successful.",
    user: currentProfile,
  };
}
