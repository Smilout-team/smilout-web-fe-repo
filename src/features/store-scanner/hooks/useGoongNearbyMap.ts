import { useEffect, useRef, useState } from 'react';
import type { NearbyStore } from '../types';

type UserLocation = {
  latitude: number;
  longitude: number;
};

type UseGoongNearbyMapParams = {
  mapKey?: string;
  routeApiKey?: string;
  selectedStore: NearbyStore | null;
  userLocation: UserLocation | null;
};

type GoongMap = {
  loaded: () => boolean;
  resize: () => void;
  flyTo: (options: { center: [number, number]; zoom: number }) => void;
  on: (event: string, callback: () => void) => void;
  once: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
  getSource: (id: string) => GoongSource | undefined;
  addSource: (id: string, source: GoongSourceConfig) => void;
  addLayer: (layer: GoongLayer) => void;
  remove: () => void;
  isStyleLoaded: () => boolean;
};

type GoongMarker = {
  setLngLat: (lngLat: [number, number]) => GoongMarker;
  addTo: (map: GoongMap) => GoongMarker;
  setPopup: (popup: GoongPopup) => GoongMarker;
  togglePopup: () => GoongMarker;
  remove: () => void;
};

type GoongPopup = {
  setHTML: (html: string) => GoongPopup;
  remove: () => void;
};

type GoongSource = {
  setData: (data: unknown) => void;
};

type GoongSourceConfig = {
  type: string;
  data: unknown;
};

type GoongLayer = {
  id: string;
  type: string;
  source: string;
  layout?: Record<string, unknown>;
  paint?: Record<string, unknown>;
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goongjs: any;
  }
}

function decodePolyline(encoded: string): Array<[number, number]> {
  const points: Array<[number, number]> = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dLat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dLat;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dLng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dLng;

    points.push([lng * 1e-5, lat * 1e-5]);
  }

  return points;
}

export function useGoongNearbyMap({
  mapKey,
  routeApiKey,
  selectedStore,
  userLocation,
}: UseGoongNearbyMapParams) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<GoongMap | null>(null);
  const markerRef = useRef<GoongMarker | null>(null);
  const userMarkerRef = useRef<GoongMarker | null>(null);
  const popupRef = useRef<GoongPopup | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!selectedStore || !mapContainerRef.current || !mapKey) {
      return;
    }

    if (typeof window === 'undefined' || !window.goongjs) {
      return;
    }

    if (!mapInstanceRef.current) {
      window.goongjs.accessToken = mapKey;
      const map = new window.goongjs.Map({
        container: mapContainerRef.current,
        style: `https://tiles.goong.io/assets/goong_map_web.json?api_key=${mapKey}`,
        center: [selectedStore.longitude, selectedStore.latitude],
        zoom: 15,
      });
      mapInstanceRef.current = map;
      map.on('load', () => {
        map.resize();
        setIsMapReady(true);
      });
    } else {
      mapInstanceRef.current.resize();
      mapInstanceRef.current.flyTo({
        center: [selectedStore.longitude, selectedStore.latitude],
        zoom: 15,
      });
    }

    requestAnimationFrame(() => {
      mapInstanceRef.current?.resize();
    });

    if (markerRef.current) {
      markerRef.current.remove();
    }
    if (popupRef.current) {
      popupRef.current.remove();
    }

    const markerEl = document.createElement('div');
    markerEl.style.width = '40px';
    markerEl.style.height = '40px';
    markerEl.style.display = 'grid';
    markerEl.style.placeItems = 'center';
    markerEl.style.borderRadius = '999px';
    markerEl.style.background = 'white';
    markerEl.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.25)';
    markerEl.style.border = '2px solid #ef4444';
    markerEl.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C12 22 4 14.8 4 9.5C4 5.35786 7.58172 2 12 2C16.4183 2 20 5.35786 20 9.5C20 14.8 12 22 12 22Z" fill="#ef4444"/><circle cx="12" cy="9.5" r="2.5" fill="white"/></svg>';

    const popupHtml = `
      <div style="min-width: 200px; max-width: 240px; padding: 10px 12px; border-radius: 10px; font-family: inherit;">
        <p style="margin: 0; font-size: 13px; font-weight: 700; color: #0f172a;">${selectedStore.storeName}</p>
        <p style="margin: 6px 0 0; font-size: 12px; color: #475569; line-height: 1.4;">${selectedStore.address}</p>
        <p style="margin: 8px 0 0; font-size: 12px; font-weight: 600; color: #2563eb;">${selectedStore.distance.toFixed(1)} km từ vị trí của bạn</p>
      </div>
    `;

    const popup = new window.goongjs.Popup({
      offset: 28,
      closeButton: false,
      maxWidth: '280px',
    }).setHTML(popupHtml);

    const marker = new window.goongjs.Marker({
      element: markerEl,
      anchor: 'center',
    })
      .setLngLat([selectedStore.longitude, selectedStore.latitude])
      .setPopup(popup)
      .addTo(mapInstanceRef.current);

    markerRef.current = marker;
    popupRef.current = popup;
    marker.togglePopup();
  }, [mapKey, selectedStore]);

  useEffect(() => {
    if (
      !selectedStore ||
      !userLocation ||
      !mapInstanceRef.current ||
      !mapKey ||
      !isMapReady
    ) {
      return;
    }

    let cancelled = false;

    const routeSourceId = 'consumer-to-store-route';
    const routeLayerId = 'consumer-to-store-route-layer';

    const userLngLat: [number, number] = [
      userLocation.longitude,
      userLocation.latitude,
    ];

    if (!userMarkerRef.current) {
      const userMarkerEl = document.createElement('div');
      userMarkerEl.style.width = '18px';
      userMarkerEl.style.height = '18px';
      userMarkerEl.style.borderRadius = '999px';
      userMarkerEl.style.background = '#2563eb';
      userMarkerEl.style.border = '3px solid #dbeafe';
      userMarkerEl.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.2)';

      userMarkerRef.current = new window.goongjs.Marker({
        element: userMarkerEl,
        anchor: 'center',
      })
        .setLngLat(userLngLat)
        .addTo(mapInstanceRef.current);
    } else {
      userMarkerRef.current.setLngLat(userLngLat);
    }

    const fallbackCoordinates: Array<[number, number]> = [
      userLngLat,
      [selectedStore.longitude, selectedStore.latitude],
    ];

    const initialRouteData = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: fallbackCoordinates,
      },
      properties: {},
    };

    const existingSource = mapInstanceRef.current.getSource(routeSourceId);
    if (existingSource) {
      existingSource.setData(initialRouteData);
    } else {
      mapInstanceRef.current.addSource(routeSourceId, {
        type: 'geojson',
        data: initialRouteData,
      });

      mapInstanceRef.current.addLayer({
        id: routeLayerId,
        type: 'line',
        source: routeSourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#2563eb',
          'line-width': 4,
          'line-opacity': 0.85,
        },
      });
    }

    const drawRoute = async () => {
      let routeCoordinates = fallbackCoordinates;
      const activeRouteApiKey = routeApiKey || mapKey;

      if (activeRouteApiKey) {
        try {
          const origin = `${userLocation.latitude},${userLocation.longitude}`;
          const destination = `${selectedStore.latitude},${selectedStore.longitude}`;

          const tryVehicles = ['bike', 'car'];
          for (const vehicle of tryVehicles) {
            const directionUrl =
              `https://rsapi.goong.io/direction?origin=${encodeURIComponent(origin)}` +
              `&destination=${encodeURIComponent(destination)}` +
              `&vehicle=${vehicle}&api_key=${activeRouteApiKey}`;

            const response = await fetch(directionUrl);
            if (!response.ok) {
              continue;
            }

            const data = (await response.json()) as {
              routes?: Array<{
                overview_polyline?: { points?: string };
              }>;
            };

            const encoded = data.routes?.[0]?.overview_polyline?.points;
            if (encoded) {
              const decoded = decodePolyline(encoded);
              if (decoded.length > 1) {
                routeCoordinates = decoded;
                break;
              }
            }
          }
        } catch {
          routeCoordinates = fallbackCoordinates;
        }
      }

      if (cancelled || !mapInstanceRef.current) {
        return;
      }

      const routeData = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: routeCoordinates,
        },
        properties: {},
      };

      const source = mapInstanceRef.current.getSource(routeSourceId);
      if (source) {
        source.setData(routeData);
      }
    };

    void drawRoute();

    return () => {
      cancelled = true;
    };
  }, [mapKey, routeApiKey, selectedStore, userLocation, isMapReady]);

  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      if (popupRef.current) {
        popupRef.current.remove();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  return {
    mapContainerRef,
  };
}
