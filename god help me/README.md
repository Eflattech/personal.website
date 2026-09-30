# Eflat Store

Eflat is a vanilla HTML/CSS/JavaScript storefront with a small Node.js backend.

## Run locally

```bash
npm start
```

Open:

- Customer storefront: http://localhost:8000/
- Admin dashboard: http://localhost:8000/admin.html
- Dashboard API: http://localhost:8000/api/dashboard

The backend stores products, orders, and service bookings in `data/store.json`.

## API

- `GET /api/products`
- `POST /api/products`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/bookings`
- `POST /api/bookings`
- `GET /api/dashboard`

This local backend is suitable for development. Before production, add authentication, authorization, a real database, HTTPS, input validation, rate limiting, and a payment provider.
