import { GeocodeResult } from "./geocoding-types";

export async function geocodeAddress(
  address: string
): Promise<GeocodeResult | null> {
  if (!address || address.trim() === "") {
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(address.trim());
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1&addressdetails=1`,
      {
        headers: {
          "User-Agent": "Borali-Web-App/1.0",
        },
      }
    );

    if (!response.ok) {
      console.error("Erro na resposta da API de geocodificação:", response.status);
      return null;
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const result = data[0];
      const lat = parseFloat(result.lat);
      const lon = parseFloat(result.lon);

      if (
        !isNaN(lat) &&
        !isNaN(lon) &&
        lat >= -90 &&
        lat <= 90 &&
        lon >= -180 &&
        lon <= 180
      ) {
        return {
          latitude: lat,
          longitude: lon,
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Erro ao geocodificar endereço:", error);
    return null;
  }
}

