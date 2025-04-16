export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    return {
      isValid: password.length >= 8,
      message: password.length < 8 ? 'Şifre en az 8 karakter olmalıdır.' : ''
    };
  };
  
  export const validateForm = (values) => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Email zorunludur';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Geçerli bir email adresi giriniz';
    }
  
    if (!values.password) {
      errors.password = 'Şifre zorunludur';
    } else {
      const passwordCheck = validatePassword(values.password);
      if (!passwordCheck.isValid) {
        errors.password = passwordCheck.message;
      }
    }
  
    return errors;
  };