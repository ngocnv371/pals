# get updated pals.json from Palworld

This `pals.json` is not really from Palworld, not directly but rather from [https://www.palpedia.net/]. Go there and grab it.

# get updated combinations.json

Do it the same.

# generate new card

- Install Text generation web UI
- Run with API: `./start_windows.bat --api --listen --cors-allow-origins http://localhost:5173`
- Goto `/monster-factory`
- The factory is running with the default url: `http://localhost:5000`
- Remember to set the environment variable at `.env`: `VITE_OOBA_URL=`
