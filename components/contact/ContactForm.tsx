"use client";

import { useMemo, useState } from "react";
import { ContactFields } from "@/components/contact/ContactFields";
import { ContactTextarea } from "@/components/contact/ContactTextarea";
import { ContactSubmitButton } from "@/components/contact/ContactSubmitButton";

type ContactFormProps = {
  isUrdu: boolean;
  onSuccess?: () => void;
};

type ContactFormValues = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  orderId: string;
};

type ContactFormErrors = {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export const ContactForm = ({ isUrdu, onSuccess }: ContactFormProps) => {
  const subjectOptions = useMemo(
    () => [
      { value: "General Inquiry", label: isUrdu ? "عمومی استفسار" : "General Inquiry" },
      { value: "Order Issue", label: isUrdu ? "آرڈر کا مسئلہ" : "Order Issue" },
      { value: "Feedback", label: isUrdu ? "فیڈبیک" : "Feedback" },
      { value: "Support", label: isUrdu ? "سپورٹ" : "Support" },
    ],
    [isUrdu]
  );
  const [formValues, setFormValues] = useState<ContactFormValues>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    orderId: "",
  });
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof ContactFormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitStatus(null);
    const nextErrors: ContactFormErrors = {};
    if (!formValues.fullName.trim()) {
      nextErrors.fullName = isUrdu ? "براہ کرم اپنا نام درج کریں" : "Please enter your full name";
    }
    const emailValue = formValues.email.trim();
    if (!emailValue) {
      nextErrors.email = isUrdu ? "براہ کرم اپنا ای میل درج کریں" : "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = isUrdu ? "براہ کرم درست ای میل درج کریں" : "Please enter a valid email";
    }
    if (!formValues.subject) {
      nextErrors.subject = isUrdu ? "براہ کرم موضوع منتخب کریں" : "Please select a subject";
    }
    if (!formValues.message.trim()) {
      nextErrors.message = isUrdu ? "براہ کرم پیغام لکھیں" : "Please enter a message";
    }
    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formValues.fullName.trim(),
          email: emailValue,
          subject: formValues.subject,
          message: formValues.message.trim(),
          phone: formValues.phone.trim(),
          orderId: formValues.orderId.trim(),
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to send message");
      }
      setFormValues({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        orderId: "",
      });
      setFormErrors({});
      setSubmitStatus({
        type: "success",
        message: isUrdu
          ? "آپ کا پیغام بھیج دیا گیا ہے۔ ہم جلد رابطہ کریں گے۔"
          : "Your message has been sent. We will get back to you shortly.",
      });
      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send message";
      setSubmitStatus({
        type: "error",
        message: isUrdu
          ? "پیغام بھیجنے میں مسئلہ آیا۔ براہ کرم دوبارہ کوشش کریں۔"
          : message || "We could not send your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-8 rounded-2xl glass-card border border-stone-200/50 shadow-soft space-y-5 ${
        isUrdu ? "text-right" : "text-left"
      }`}
    >
      <ContactFields
        isUrdu={isUrdu}
        values={formValues}
        errors={formErrors}
        onChange={handleChange}
        subjectOptions={subjectOptions}
      />
      <ContactTextarea
        isUrdu={isUrdu}
        value={formValues.message}
        error={formErrors.message}
        onChange={(value) => handleChange("message", value)}
      />
      <ContactSubmitButton isUrdu={isUrdu} isSubmitting={isSubmitting} />
      {submitStatus ? (
        <div
          className={`text-xs ${
            submitStatus.type === "success" ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {submitStatus.message}
        </div>
      ) : null}
    </form>
  );
};
