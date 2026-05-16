export const formatIndianPhone = (phone: string) => {
  let cleaned = phone.replace(/\D/g, "");

  // remove leading 0
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.slice(1);
  }

  // remove existing country code duplication
  if (cleaned.startsWith("91") && cleaned.length > 10) {
    return cleaned;
  }

  return `91${cleaned}`;
};