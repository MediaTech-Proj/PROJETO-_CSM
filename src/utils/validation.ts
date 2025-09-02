export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('A senha deve ter pelo menos 6 caracteres');
  }
  
  if (password.length > 72) {
    errors.push('A senha não pode ter mais de 72 caracteres');
  }
  
  if (!/[a-zA-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateDisplayName = (name: string): boolean => {
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 50;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};