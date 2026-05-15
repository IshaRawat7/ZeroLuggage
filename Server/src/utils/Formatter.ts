export const formatIndianPhone = (
  phone: string
) => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("91")) {
    return cleaned;
  }

  return `91${cleaned}`;
};