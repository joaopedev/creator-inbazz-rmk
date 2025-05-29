import { useState } from 'react';

export const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(true);

    const togglePassword = () => setShowPassword((prev) => !prev)
    const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev)

  return {
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
  };
};