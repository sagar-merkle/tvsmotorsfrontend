# TVS Motor – Homepage template

Static homepage template (HTML, CSS and vanilla JavaScript) with a banner slideshow, a personalised view driven by a mock API, and the chat widget screens. No build step, no dependencies, no backend.

## Run it

**Option 1 – open the file**

Double-click `index.html` (or drag it into Chrome / Edge / Firefox). Everything works from `file://`.

**Option 2 – local web server** (closer to production)

From this folder, run one of:

```powershell
python -m http.server 8080
# or
npx.cmd serve -l 8080 .
```

Then open http://localhost:8080.

## Try the personalised view

1. Wait about 1.5 s for the **"Hey! A personalised view is available for you."** nudge (bottom-left) and click it.
2. Enter a test number below, or pick one from the **Demo: pick a test customer** dropdown.
3. The hero, journey tracker, "Discover Your Ride", dealer section, header and chatbot greeting update for that customer.
4. Click **"Not &lt;name&gt;? Exit personalised view"** to go back to the default page.

The choice is kept in `sessionStorage`, so it survives a refresh but not closing the tab.

| Phone | Name | Vehicle | Journey stage |
|---|---|---|---|
| 9999999999 | Aarav | TVS iQube | Test ride scheduled |
| 9999999998 | Priya | TVS Orbiter | Exploring |
| 9999999997 | Rohan | TVS Jupiter | Quote shared |
| 9999999996 | Kabir | Apache RTR 310 | Test ride completed |
| 9999999995 | Ananya | Apache RTX | Booked |
| 9999999994 | Vikram | Apache RR 310 | Owner |
| 9999999993 | Arjun | Apache RTR Series | Exploring |
| 9999999992 | Meera | TVS Ronin | Test ride scheduled |
| 9999999991 | Ishaan | TVS Raider | Quote shared |
| 9999999990 | Sanjay | New Radeon | Test ride completed |
| 9999999989 | Pooja | Radeon | Booked |
| 9999999988 | Ramesh | TVS Sport | Owner |
| 9999999987 | Aditya | Ntorq 150 | Exploring |
| 9999999986 | Neha | Ntorq 125 | Test ride scheduled |
| 9999999985 | Kavya | Jupiter 125 | Quote shared |
| 9999999984 | Diya | Zest 110 | Test ride completed |
| 9999999983 | Rahul | TVS X | Booked |
| 9999999982 | Suresh | TVS XL100 | Owner |
| 9999999981 | Manoj | King Deluxe | Exploring |
| 9999999980 | Imran | King Duramax Plus | Test ride scheduled |
| 9999999979 | Gopal | King EV Max | Quote shared |
| 9999999978 | Harish | King Kargo | Test ride completed |
| 9999999977 | Farhan | King Kargo HD EV | Booked |
| 9999999976 | Prakash | King Kargo HD CNG | Owner |

Any other valid 10-digit number shows a "not found" message. Dates (test ride, delivery, service) are generated relative to today.

## Project structure

```
index.html                 Page markup
css/style.css              Base layout and sections
css/personalise.css        Nudge, phone dialog, personalised hero, journey tracker
css/chatbot.css            Chat launcher and chat window
js/hero.js                 Banner slideshow (autoplay, arrows, dots, swipe)
js/data/catalogue.js       Images and copy for all 24 vehicles
js/mock/customers.js       Mock customer data (the test numbers above)
js/api.js                  API client + backend contract
js/personalise.js          Nudge, dialog, and applying the personalised view
js/chatbot.js              Chat widget UI (screens only)
assets/img/                Images; banners/ holds desktop + mobile hero banners
```

## Connecting the real backend

1. Implement the contract documented at the top of `js/api.js`:
   - `POST {apiBaseUrl}/personalisation/lookup` with body `{ "phone": "9999999999" }` → customer, vehicle of interest, journey stage, dealer (`404` when not found).
   - `GET {apiBaseUrl}/personalisation/demo-customers` (demo dropdown only).
2. Set `TVS.config.apiBaseUrl` in `js/api.js` (e.g. `"https://api.example.com/v1"`). When empty, the in-browser mock is used.
3. `interest.vehicleId` must match a key in `js/data/catalogue.js`; `journey.stage` must be one of `EXPLORING`, `TEST_RIDE_SCHEDULED`, `TEST_RIDE_COMPLETED`, `QUOTE_SHARED`, `BOOKED`, `OWNER`.
4. Before go-live, remove the demo dropdown (`.p-demo` in `index.html`) and the `<script src="js/mock/customers.js">` tag.

## Notes

- The chatbot is UI only: launcher, WhatsApp/chat buttons, chat window and a personalised greeting. Sending messages is not wired up yet.
- Product links, prices and specs are sample content; all links point to `#`.
- To add or change a vehicle's personalised content, edit its entry in `js/data/catalogue.js` and add a matching `data-vehicle` card in `index.html`.
