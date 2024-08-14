import { Hono } from "hono";
import { getCurrencies, getLatestRates } from "./utils";

const app = new Hono();
const port = 6565;

app.get("/", (c) => {
  return c.text("Hello To Open Exchange API!");
});

// TODO: add paramerterized query route for currency.

app.get("/rates", async (ctx) => {
  try {
    const [currencies, rates] = await Promise.all([
      getCurrencies(),
      getLatestRates(),
    ]);

    if (!currencies || !rates) {
      return ctx.json({ error: "Service Unavailable" }, 503);
    }

    const result = [];
    for (const [symbol, name] of Object.entries(currencies)) {
      const rate = rates[symbol];
      result.push({
        symbol,
        name,
        rate: rate ?? null,
      });
    }
    return ctx.json({ rates: result });
  } catch (err) {
    console.error("Error processing request", err);
    return ctx.json({ error: "Service Unavailable" }, 503);
  }
});

app.onError((err, c) => {
  console.error("Application error:", err);
  return c.json({ error: "Internal Server Error" }, 500);
});

export default {
  port,
  fetch: app.fetch,
};
