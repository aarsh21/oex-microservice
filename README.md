# backend assignment

- [x] Using a backend framework/language of your choice, create a simple microservice that exposes a single GET endpoint /rates which returns a response for the exchange rate of 1 USD to a list of all available currencies:

```json
{
    "rates": [
        {
            "symbol": "AED",
            "name": "United Arab Emirates Dirham",
            "rate":  3.672538
        },
        {
            "symbol": "AFN",
            "name": "Afghan Afghani",
            "rate": 66.809999
        },
        {
            "symbol": "ALL",
            "name": "Albanian Lek",
            "rate": 125.716501
        }
        ...
    ]
}
```

- [x] Query all supported currency names and symbols using the appropriate endpoint.
- [x] Query the latest exchange rates for all supported currencies using the relevant endpoint.
- [x] Generate a combined response that includes both currency names, symbols, and their corresponding latest exchange rates.
- [x] Ensure that if a supported currency does not have a latest rate, it returns a `null` value for the rate.
- [x] Handle API errors by returning a `503 Service Unavailable` response if the Open Exchange Rates API is unavailable or experiences an error.
- [ ] Introduce a GET parameter to this GET endpoint (eg: /rates?currency=AED) to filter just the queried currency in the response. If the queried currency is not supported, your endpoint should return a 404 Not Found response.

```json
{
  "rates": [
    {
      "symbol": "AED",
      "name": "United Arab Emirates Dirham",
      "rate": 3.672538
    }
  ]
}
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

open <http://localhost:3000>
