import { Hono } from "hono";
import { getCurrencies, getLatestRates } from "./utils";

const app = new Hono();
const port = 6565;

app.get("/", (c) => {
  return c.text("Hello To Open Exchange API!");
});

app.get("/rates", async (ctx) => {
  try {
    const [currencies, rates] = await Promise.all([
      getCurrencies(),
      getLatestRates(),
    ]);

    // TODO: better error handling as mentioned by assignment.

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
  }
});

export default {
  port,
  fetch: app.fetch,
};
