import { describe, expect, it } from "bun:test";
import app from "./index";

describe("Exchange Rates API", () => {
  it("should return all rates when no currency is specified", async () => {
    const req = new Request("http://localhost/rates");
    const res = await app.fetch(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("rates");
    expect(Array.isArray(body.rates)).toBe(true);
    expect(body.rates.length).toBeGreaterThan(0);
  });

  it("should return a specific rate when a currency is specified", async () => {
    const req = new Request("http://localhost/rates?currency=USD");
    const res = await app.fetch(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("rates");
    expect(body.rates).toHaveLength(1);
    expect(body.rates[0]).toHaveProperty("symbol", "USD");
  });

  it("should return 404 when an invalid currency is specified", async () => {
    const req = new Request("http://localhost/rates?currency=INVALID");
    const res = await app.fetch(req);
    expect(res.status).toBe(404);
  });
});
