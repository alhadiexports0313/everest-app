"use client";

import { useMemo, useState } from "react";
import { ContactFields } from "@/components/contact/ContactFields";
import { ContactTextarea } from "@/components/contact/ContactTextarea";
import { ContactSubmitButton } from "@/components/contact/ContactSubmitButton";

type ContactFormProps = {
  isUrdu: boolean;
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

export const ContactForm = ({ isUrdu }: ContactFormProps) => {
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

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof ContactFormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    const body = [
      `Full Name: ${formValues.fullName.trim()}`,
      `Email: ${emailValue}`,
      `Phone: ${formValues.phone.trim() || "N/A"}`,
      `Order ID: ${formValues.orderId.trim() || "N/A"}`,
      `Subject: ${formValues.subject}`,
      "Message:",
      formValues.message.trim(),
    ].join("\n");
    const mailto = `mailto:everestorganicshilajet@gmail.com?subject=${encodeURIComponent(
      formValues.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
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
      <ContactSubmitButton isUrdu={isUrdu} />
    </form>
  );
};
