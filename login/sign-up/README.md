Login / Signup Demo

This is a simple static demo implementing a client-side login/sign-up flow using `localStorage`. It's intended for UI prototyping and should NOT be used as real authentication in production.

Files added:
- [index.html](index.html)
- [styles.css](styles.css)
- [app.js](app.js)

How to run

- Open `index.html` directly in a browser (double-click) for basic testing.
- Or run a local HTTP server from the project folder (recommended):

  ```bash
  # Python 3
  python -m http.server 8000

  # then open http://localhost:8000 in your browser
  ```

Notes

- Credentials are stored in your browser's `localStorage` under `demo_users_v1` (passwords are stored plainly for the demo).
- If you want a server-backed implementation (Node/Express, database, password hashing), tell me which stack you prefer and I can scaffold it.
