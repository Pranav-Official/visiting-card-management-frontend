function validateEmail(email: string): boolean {
  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

const isValidWebsiteUrl = (url: string): boolean => {
  // Regular expression to check website validity
  const websiteUrlRegex =
    /^((https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?)$/;

  return websiteUrlRegex.test(url);
};

const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Regular expression to check if the input contains only numbers
  const phoneRegex = /^(\+)?\d+(\s?\d+)*$/;

  return phoneRegex.test(phoneNumber);
};

export { validateEmail, isValidWebsiteUrl, isValidPhoneNumber };
