export function getSelectedDeliveryAddress(
  option: {
    label: string;
    address: string;
    fullAddress?: string;
    source: 'COORDINATE' | 'PROFILE' | 'GOONG';
  } | null
): string | undefined {
  if (!option) {
    return undefined;
  }

  if (option.fullAddress?.trim()) {
    return option.fullAddress.trim();
  }

  // Goong autocomplete often splits house/street into label and the rest in address.
  // Join both parts to persist a complete delivery address.
  if (option.source === 'GOONG') {
    const merged = `${option.label}, ${option.address}`.trim();
    return merged.replace(/,\s*,/g, ',').replace(/,$/, '').trim();
  }

  return option.address?.trim() || undefined;
}
