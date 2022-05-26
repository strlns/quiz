import { useState } from "react";

export const useSimpleErrorMessage: (
  str?: string
) => [string, (str?: string) => void, () => void] = (
  defaultMessage = "An error occurred."
) => {
  const [error, setError] = useState("");
  const addError = (msg = defaultMessage) => setError(msg);
  const clearError = () => setError("");
  return [error, addError, clearError];
};
