Vercel : https://fe-final-tan.vercel.app/

# Hotel Booking Frontend

Next.js frontend connected to the backend API for:
- user registration
- user/admin login
- hotel listing from backend
- booking create, view, update, delete
- image fallback support for hotels

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

## Notes

- This frontend expects hotel data from the backend.
- If the backend does not return `hotel.image` yet, the UI shows a fallback image.
- Register telephone number format must be `xxx-xxx-xxxx`.
