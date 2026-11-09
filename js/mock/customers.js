/* Mock personalisation backend. Replace by setting TVS.config.apiBaseUrl (see api.js). */
window.TVS = window.TVS || {};

(function () {
  var DEALERS = {
    delhi: { name: "Prime TVS, Connaught Place", address: "N-12, Connaught Place, New Delhi 110001", phone: "+91 11 4000 1234" },
    bengaluru: { name: "Garden City TVS, Indiranagar", address: "100 Feet Rd, Indiranagar, Bengaluru 560038", phone: "+91 80 4000 2345" },
    mumbai: { name: "Harbour TVS, Andheri West", address: "SV Rd, Andheri West, Mumbai 400058", phone: "+91 22 4000 3456" },
    chennai: { name: "Marina TVS, T. Nagar", address: "Usman Rd, T. Nagar, Chennai 600017", phone: "+91 44 4000 4567" },
    pune: { name: "Deccan TVS, Shivajinagar", address: "FC Rd, Shivajinagar, Pune 411005", phone: "+91 20 4000 5678" },
    hyderabad: { name: "Pearl TVS, Banjara Hills", address: "Rd No. 1, Banjara Hills, Hyderabad 500034", phone: "+91 40 4000 6789" }
  };

  // phone, firstName, city, vehicleId, stage, variant
  var ROWS = [
    ["9999999999", "Aarav", "delhi", "iqube", "TEST_RIDE_SCHEDULED", "iQube S 4.7 kWh"],
    ["9999999998", "Priya", "bengaluru", "orbiter", "EXPLORING", null],
    ["9999999997", "Rohan", "mumbai", "jupiter", "QUOTE_SHARED", "Jupiter Disc SmartXonnect"],
    ["9999999996", "Kabir", "pune", "apache-rtr-310", "TEST_RIDE_COMPLETED", "RTR 310 BTO"],
    ["9999999995", "Ananya", "bengaluru", "apache-rtx", "BOOKED", null],
    ["9999999994", "Vikram", "chennai", "apache-rr-310", "OWNER", null],
    ["9999999993", "Arjun", "hyderabad", "apache-rtr-series", "EXPLORING", "RTR 160 4V"],
    ["9999999992", "Meera", "delhi", "ronin", "TEST_RIDE_SCHEDULED", "Ronin TD"],
    ["9999999991", "Ishaan", "pune", "raider", "QUOTE_SHARED", "Raider 125 iGO"],
    ["9999999990", "Sanjay", "chennai", "new-radeon", "TEST_RIDE_COMPLETED", null],
    ["9999999989", "Pooja", "mumbai", "radeon", "BOOKED", null],
    ["9999999988", "Ramesh", "hyderabad", "sport", "OWNER", null],
    ["9999999987", "Aditya", "bengaluru", "ntorq-150", "EXPLORING", null],
    ["9999999986", "Neha", "delhi", "ntorq-125", "TEST_RIDE_SCHEDULED", "Ntorq 125 Race Edition"],
    ["9999999985", "Kavya", "chennai", "jupiter-125", "QUOTE_SHARED", "Jupiter 125 Disc"],
    ["9999999984", "Diya", "pune", "zest-110", "TEST_RIDE_COMPLETED", null],
    ["9999999983", "Rahul", "bengaluru", "tvs-x", "BOOKED", null],
    ["9999999982", "Suresh", "hyderabad", "xl100", "OWNER", "XL100 Heavy Duty"],
    ["9999999981", "Manoj", "mumbai", "king-deluxe", "EXPLORING", "King Deluxe CNG"],
    ["9999999980", "Imran", "delhi", "king-duramax-plus", "TEST_RIDE_SCHEDULED", null],
    ["9999999979", "Gopal", "chennai", "king-ev-max", "QUOTE_SHARED", null],
    ["9999999978", "Harish", "pune", "king-kargo", "TEST_RIDE_COMPLETED", "King Kargo CNG"],
    ["9999999977", "Farhan", "hyderabad", "king-kargo-hd-ev", "BOOKED", null],
    ["9999999976", "Prakash", "bengaluru", "king-kargo-hd-cng", "OWNER", null]
  ];

  var QUOTES = {
    "jupiter": 89450, "raider": 101200, "jupiter-125": 98300, "king-ev-max": 389000
  };

  // Dates relative to today so the demo always looks current.
  function daysFromNow(days, hour) {
    var d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hour || 11, 0, 0, 0);
    return d.toISOString();
  }

  function buildProfile(row, index) {
    var phone = row[0], stage = row[4], vehicleId = row[3];
    var journey = { stage: stage, lastInteraction: daysFromNow(-2, 18), testRide: null, quote: null, booking: null, ownership: null };

    if (stage === "TEST_RIDE_SCHEDULED") {
      journey.testRide = { status: "SCHEDULED", scheduledAt: daysFromNow(3, 11) };
    }
    if (stage === "TEST_RIDE_COMPLETED") {
      journey.testRide = { status: "COMPLETED", scheduledAt: daysFromNow(-1, 16) };
    }
    if (stage === "QUOTE_SHARED") {
      journey.quote = { onRoadPrice: QUOTES[vehicleId] || 95000, currency: "INR", validTill: daysFromNow(7, 23) };
    }
    if (stage === "BOOKED") {
      journey.booking = { bookingId: "TVS-BK-" + (240310 + index), bookedOn: daysFromNow(-5, 12), expectedDelivery: daysFromNow(9, 12) };
    }
    if (stage === "OWNER") {
      journey.ownership = { registrationNo: "XX 01 AB " + (1000 + index * 37), purchasedOn: daysFromNow(-340, 12), nextServiceDue: daysFromNow(6, 10) };
    }

    return {
      customer: { id: "CUST-" + (10001 + index), firstName: row[1], phoneLast4: phone.slice(-4), city: row[2], preferredLanguage: "en" },
      interest: { vehicleId: vehicleId, variant: row[5] },
      journey: journey,
      dealer: DEALERS[row[2]]
    };
  }

  TVS.mock = {
    lookup: function (phone) {
      for (var i = 0; i < ROWS.length; i++) {
        if (ROWS[i][0] === phone) return buildProfile(ROWS[i], i);
      }
      return null;
    },
    demoCustomers: function () {
      return ROWS.map(function (r) {
        return { phone: r[0], firstName: r[1], vehicleId: r[3], stage: r[4] };
      });
    }
  };
})();
