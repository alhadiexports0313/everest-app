import en from "@/messages/en.json";
import ur from "@/messages/ur.json";

export const messages = { en, ur } as const;

export type Locale = keyof typeof messages;

export const defaultLocale: Locale = "en";

export function getMessage(locale: Locale, key: string) {
  const parts = key.split(".");
  let value: any = messages[locale];
  for (const part of parts) {
    value = value?.[part];
  }
  return value;
}

export function translate(locale: Locale, key: string) {
  const value = getMessage(locale, key);
  return typeof value === "string" ? value : key;
}
