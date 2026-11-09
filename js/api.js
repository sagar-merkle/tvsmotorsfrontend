/* Personalisation API client.
 *
 * Contract (to be implemented by the backend):
 *
 *   POST {apiBaseUrl}/personalisation/lookup
 *   Body: { "phone": "9999999999" }            // 10-digit Indian mobile, no +91
 *   200:  {
 *     "customer": { "id", "firstName", "phoneLast4", "city", "preferredLanguage" },
 *     "interest": { "vehicleId": "<key in TVS.catalogue>", "variant": string|null },
 *     "journey": {
 *       "stage": "EXPLORING" | "TEST_RIDE_SCHEDULED" | "TEST_RIDE_COMPLETED" |
 *                "QUOTE_SHARED" | "BOOKED" | "OWNER",
 *       "lastInteraction": ISO-8601,
 *       "testRide":  { "status", "scheduledAt" } | null,
 *       "quote":     { "onRoadPrice", "currency", "validTill" } | null,
 *       "booking":   { "bookingId", "bookedOn", "expectedDelivery" } | null,
 *       "ownership": { "registrationNo", "purchasedOn", "nextServiceDue" } | null
 *     },
 *     "dealer": { "name", "address", "phone" }
 *   }
 *   404:  no profile for this number
 *
 *   GET {apiBaseUrl}/personalisation/demo-customers   (demo switcher only; remove later)
 *   200:  [ { "phone", "firstName", "vehicleId", "stage" } ]
 */
window.TVS = window.TVS || {};

TVS.config = {
  // Leave empty to use the in-browser mock (js/mock/customers.js).
  apiBaseUrl: "",
  mockLatencyMs: 700
};

TVS.api = (function () {
  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function request(path, options) {
    return fetch(TVS.config.apiBaseUrl.replace(/\/$/, "") + path, Object.assign({
      headers: { "Accept": "application/json", "Content-Type": "application/json" }
    }, options));
  }

  return {
    getPersonalisation: function (phone) {
      if (!TVS.config.apiBaseUrl) {
        return wait(TVS.config.mockLatencyMs).then(function () { return TVS.mock.lookup(phone); });
      }
      // Phone goes in the body, not the URL, so it doesn't end up in access logs.
      return request("/personalisation/lookup", { method: "POST", body: JSON.stringify({ phone: phone }) })
        .then(function (res) {
          if (res.status === 404) return null;
          if (!res.ok) throw new Error("Personalisation lookup failed (" + res.status + ")");
          return res.json();
        });
    },

    listDemoCustomers: function () {
      if (!TVS.config.apiBaseUrl) return Promise.resolve(TVS.mock.demoCustomers());
      return request("/personalisation/demo-customers").then(function (res) {
        if (!res.ok) throw new Error("Demo customer list failed (" + res.status + ")");
        return res.json();
      });
    }
  };
})();
