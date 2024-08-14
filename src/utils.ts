import { config } from "dotenv";

config();

const OPEN_EXCHANGE_KEY = process.env.OPEN_EXCHANGE_KEY;
const BASE_URL = "https://openexchangerates.org/api/";

export async function getCurrencies() {
  try {
    const response = await fetch(`${BASE_URL}/currencies.json`);
    const data = await response.json();
    return response.ok ? data : null;
  } catch (err) {
    console.error("Error fetching currencies:", err);
    return null;
  }
}
export async function getLatestRates() {
  try {
    const response = await fetch(
      `${BASE_URL}/latest.json?app_id=${OPEN_EXCHANGE_KEY}`,
    );
    const data = await response.json();
    return response.ok ? data : null;
  } catch (err) {
    console.error("Error fetching rates:", err);
  }
}
