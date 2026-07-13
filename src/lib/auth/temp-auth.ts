export function normalizeIndianPhone(phone: string) {
  return phone.replace(/\D/g, "").replace(/^91/, "");
}

export function validateTempLogin(phone: string, password: string) {
  const allowedPhone = process.env.TEMP_LOGIN_PHONE;
  const allowedPassword = process.env.TEMP_LOGIN_PASSWORD;

  if (!allowedPhone || !allowedPassword) {
    throw new Error("Temporary login environment variables are missing.");
  }

  const normalizedPhone = normalizeIndianPhone(phone);

  return (
    normalizedPhone === normalizeIndianPhone(allowedPhone) &&
    password === allowedPassword
  );
}
