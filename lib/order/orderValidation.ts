import type { CartItem } from "@/types";
import { phoneCountries } from "@/lib/config/phoneCountries";

export const getCheckoutValidation = ({
  customerName,
  countryCode,
  customerPhone,
  customerCity,
  customerEmail,
  quantity,
}: {
  customerName: string;
  countryCode: string;
  customerPhone: string;
  customerCity: string;
  customerEmail: string;
  quantity: number;
}) => {
  const nameMissing = customerName.trim().length === 0;
  const normalizedPhone = customerPhone.replace(/\D/g, "");
  const selectedCountry = phoneCountries.find(
    (country) => country.code === countryCode
  );
  const phoneMissing = normalizedPhone.length === 0;
  const countryMissing = countryCode.length === 0;
  const phoneInvalid =
    !countryMissing &&
    !phoneMissing &&
    (!selectedCountry || !selectedCountry.pattern.test(normalizedPhone));
  const cityMissing = customerCity.trim().length === 0;
  const emailMissing = customerEmail.trim().length === 0;
  const emailInvalid =
    !emailMissing && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim());
  const quantityInvalid = Number.isNaN(quantity) || quantity < 1 || quantity > 500;
  const isCheckoutValid =
    !nameMissing &&
    !phoneMissing &&
    !countryMissing &&
    !phoneInvalid &&
    !cityMissing &&
    !emailMissing &&
    !emailInvalid &&
    !quantityInvalid;
  return {
    nameMissing,
    normalizedPhone,
    selectedCountry,
    phoneMissing,
    countryMissing,
    phoneInvalid,
    cityMissing,
    emailMissing,
    emailInvalid,
    quantityInvalid,
    isCheckoutValid,
  };
};

export const getPhoneExample = (countryCode: string) => {
  const selectedCountry = phoneCountries.find(
    (country) => country.code === countryCode
  );
  return selectedCountry
    ? `${selectedCountry.code} ${selectedCountry.placeholder}`
    : "+92 300 1234567";
};

export const getPhoneCountry = (countryCode: string) =>
  phoneCountries.find((country) => country.code === countryCode) || null;

export const getCountryList = () => phoneCountries;
