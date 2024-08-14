import { Hono } from "hono";
import { getCurrencies, getLatestRates } from "./utils";

const app = new Hono();
const port = 6565;

app.get("/", (c) => {
  return c.text("Hello To Open Exchange API! and go /rates for api endpoint");
});

app.get("/rates", async (ctx) => {
  try {
    const queryCurrency = ctx.req.query("currency");
    const [currencies, rates] = await Promise.all([
      getCurrencies(),
      getLatestRates(),
    ]);

    if (!currencies || !rates) {
      return ctx.json({ error: "Service Unavailable" }, 503);
    }

    let result = [];

    if (queryCurrency) {
      if (currencies[queryCurrency] && rates[queryCurrency] !== undefined) {
        result.push({
          symbol: queryCurrency,
          name: currencies[queryCurrency],
          rate: Number(rates[queryCurrency]),
        });
      } else {
        return ctx.json({ error: "Currency not found" }, 404);
      }
    } else {
      for (const [symbol, name] of Object.entries(currencies)) {
        const rate = rates[symbol];
        result.push({
          symbol,
          name,
          rate: rate !== undefined ? Number(rate) : null,
        });
      }
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
