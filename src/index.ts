import { Hono } from "hono";
import { getCurrencies, getLatestRates } from "./utils";

const app = new Hono();
const port = 6565;

app.get("/", (c) => {
  return c.text("Hello To Open Exchange API!");
});

getCurrencies();
getLatestRates();

// TODO: create endpoint called /rates.

export default {
  port,
  fetch: app.fetch,
};
