import { Hono } from "hono";

const app = new Hono();
const port = 6565;

app.get("/", (c) => {
  return c.text("Hello To Open Exchange API!");
});


export default {
  port,
  fetch: app.fetch,
};
