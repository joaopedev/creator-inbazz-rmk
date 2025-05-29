import { useState, useCallback } from "react";

export const useInputFocus = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return { isFocused, handleFocus, handleBlur };
};
