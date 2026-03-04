import { cookies } from "next/headers";
import { defaultLocale, getMessage, Locale, messages, translate } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("locale")?.value;
  if (cookieValue === "en" || cookieValue === "ur") {
    return cookieValue;
  }
  return defaultLocale;
}

export async function getServerMessages(locale?: Locale) {
  const resolvedLocale = locale ?? (await getLocale());
  return messages[resolvedLocale];
}

export async function tServer(locale?: Locale) {
  const resolvedLocale = locale ?? (await getLocale());
  return (key: string) => translate(resolvedLocale, key);
}

export async function getServerMessage<T = unknown>(key: string, locale?: Locale) {
  const resolvedLocale = locale ?? (await getLocale());
  return getMessage(resolvedLocale, key) as T;
}

export function getServerMessagesSync(locale: Locale = defaultLocale) {
  return messages[locale];
}

export function tServerSync(locale: Locale = defaultLocale) {
  return (key: string) => translate(locale, key);
}
