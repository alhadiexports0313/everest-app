export const formatLocalPhone = (code: string, digits: string) => {
  if (code === "+92" && digits.length >= 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  }
  if ((code === "+971" || code === "+966") && digits.length >= 9) {
    return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  }
  if (code === "+44" && digits.length >= 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  }
  if (code === "+1" && digits.length >= 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return digits;
};

export const formatFullPhone = (code: string, digits: string) =>
  `${code} ${formatLocalPhone(code, digits)}`;
