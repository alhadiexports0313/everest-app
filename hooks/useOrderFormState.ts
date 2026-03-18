import { useEffect, useMemo, useState } from "react";
import { getOrderNoteSuggestions } from "@/lib/config/orderConfig";
import { splitNoteLines } from "@/lib/utils/text";

export const useOrderFormState = ({
  isUrdu,
  noteDropdownRef,
}: {
  isUrdu: boolean;
  noteDropdownRef: React.RefObject<HTMLDivElement>;
}) => {
  const [customerName, setCustomerName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [noteDropdownOpen, setNoteDropdownOpen] = useState(false);

  const noteSuggestions = useMemo(
    () => getOrderNoteSuggestions(isUrdu),
    [isUrdu]
  );

  useEffect(() => {
    if (!noteDropdownOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!noteDropdownRef.current) return;
      if (!noteDropdownRef.current.contains(event.target as Node)) {
        setNoteDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [noteDropdownOpen, noteDropdownRef]);

  const syncSelectedNotes = (value: string) => {
    const lines = splitNoteLines(value);
    const nextSelected = noteSuggestions.filter((note) => lines.includes(note));
    setSelectedNotes(nextSelected);
  };

  const toggleNote = (note: string) => {
    const lines = splitNoteLines(customerNote);
    if (lines.includes(note)) {
      const nextLines = lines.filter((line) => line !== note);
      const nextValue = nextLines.join("\n");
      setCustomerNote(nextValue);
      setSelectedNotes((prev) => prev.filter((item) => item !== note));
      return;
    }
    const nextLines = [...lines, note];
    const nextValue = nextLines.join("\n");
    setCustomerNote(nextValue);
    setSelectedNotes((prev) => [...prev, note]);
  };

  return {
    customerName,
    setCustomerName,
    countryCode,
    setCountryCode,
    customerPhone,
    setCustomerPhone,
    countryDropdownOpen,
    setCountryDropdownOpen,
    countrySearch,
    setCountrySearch,
    customerCity,
    setCustomerCity,
    customerEmail,
    setCustomerEmail,
    customerNote,
    setCustomerNote,
    selectedNotes,
    setSelectedNotes,
    noteDropdownOpen,
    setNoteDropdownOpen,
    noteSuggestions,
    syncSelectedNotes,
    toggleNote,
  };
};
