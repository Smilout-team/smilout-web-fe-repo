export async function validateEmailWithAbstractAPI(
  email: string
): Promise<boolean> {
  const apiKey = import.meta.env.VITE_ABSTRACTION_API_EMAIL_KEY;
  const url = `https://emailreputation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (
      data.email_deliverability.status === 'deliverable' &&
      data.email_deliverability.status_detail === 'valid_email' &&
      data.email_deliverability.is_smtp_valid === true &&
      data.email_risk.address_risk_status !== 'high'
    ) {
      return true;
    }
    return false;
  } catch (_error) {
    return false;
  }
}
