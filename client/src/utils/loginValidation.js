export const loginValidation = (email, name, phone, companyName) => {
  if (name.trim() === "") {
    return { success: false, error: "Name is required" };
  }
  if (companyName.trim() === "") {
    return { success: false, error: "Company Name is required" };
  }

  if (email.trim() != "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return { success: false, error: "Email must be valid" };
    }
  }
  if (phone.trim() === "") {
    return { success: false, error: "Phone number is required" };
  }

  if (phone.length < 10) {
    return { success: false, error: "Phone number must be at least 10 digits" };
  }

  return { success: true, error: null };
};
