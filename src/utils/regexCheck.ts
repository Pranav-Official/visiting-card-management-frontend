function validateEmail(email: string): boolean {
  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

const isValidWebsiteUrl = (url: string): boolean => {
  // Regular expression for website validation
  const websiteUrlRegex =
    /^((https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?)$/;

  return websiteUrlRegex.test(url);
};

const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Regular expression for phone number validation
  const phoneRegex = /^(\+)?\d+$/;

  return phoneRegex.test(phoneNumber);
};

export { validateEmail, isValidWebsiteUrl, isValidPhoneNumber };
