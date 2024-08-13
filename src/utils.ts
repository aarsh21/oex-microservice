export async function getCurrencies() {
  try {
    const response = await fetch(
      "https://openexchangerates.org/api/currencies.json",
    );
    const data = await response.json();
    console.table(data);
    return response.ok ? data : null;
  } catch (err) {
    console.error("Error fetching currencies:", err);
    return null;
  }
}

// TODO:fetch latest exchange rates.
