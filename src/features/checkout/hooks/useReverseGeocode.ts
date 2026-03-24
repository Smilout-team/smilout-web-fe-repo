import { useEffect, useState } from 'react';

const GOONG_API_KEY = import.meta.env.VITE_GOONG_API_KEY as string | undefined;

export function useReverseGeocode(
  latitude: number | undefined,
  longitude: number | undefined
): string | null | undefined {
  const [address, setAddress] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) {
      return;
    }

    const apiKey = GOONG_API_KEY;
    if (!apiKey) {
      Promise.resolve().then(() => setAddress(undefined));
      return;
    }

    let cancelled = false;

    const fetchAddress = async () => {
      setAddress(null);

      try {
        const url = `https://rsapi.goong.io/Geocode?latlng=${latitude},${longitude}&api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          if (!cancelled) setAddress(undefined);
          return;
        }

        const data = (await response.json()) as {
          results?: Array<{ formatted_address?: string }>;
        };

        const formatted = data.results?.[0]?.formatted_address ?? undefined;
        if (!cancelled) setAddress(formatted);
      } catch {
        if (!cancelled) setAddress(undefined);
      }
    };

    void fetchAddress();

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude]);

  return address;
}
