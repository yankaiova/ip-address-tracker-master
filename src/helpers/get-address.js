export async function getAddress(ip) {
  const data = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
  );
  return await data.json();
}
