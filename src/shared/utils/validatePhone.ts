export async function validatePhoneNumberWithAbstractAPI(
  phoneNumber: string
): Promise<boolean> {
  const apiKey = import.meta.env.VITE_ABSTRACTION_API_KEY;
  const url = `https://phoneintelligence.abstractapi.com/v1/?api_key=${apiKey}&phone=${encodeURIComponent('+84' + phoneNumber)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (
      data.phone_validation.is_valid === true &&
      data.phone_validation.line_status === 'active'
    ) {
      return true;
    }
    return false;
  } catch (_error) {
    return false;
  }
}
