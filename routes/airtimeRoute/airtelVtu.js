const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fetch = require("node-fetch");
const Airtel = require("../../models/airtimeModel/AirtelVtu");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    auth,
    [
      check("request_id", "request_id is required").not().isEmpty(),
      check("serviceID", "serviceID is required").not().isEmpty(),
      check("amount", "request_id is required").isNumeric(),
      check("phone", "phone is required").isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { request_id, serviceID, amount, phone } = req.body;

    try {
      const airtel = {
        request_id,
        serviceID,
        amount,
        phone,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(airtel),
        headers: {
          "Content-Type": "application/json",
          authorization: "Basic c2FuZGJveEB2dHBhc3MuY29tOnNhbmRib3g=",
        },
      };

      fetch("https://sandbox.vtpass.com/api/pay", options)
        .then((res) => res.json())
        .then((airtel) => console.log(airtel));

      const newAirtel = new Airtel(airtel);
      await newAirtel.save();

      let requestID = await Airtel.findOne({ request_id });

      if (requestID) {
        res
          .status(400)
          .send("RequestID already exist, Make another transaction");
      } else {
        if (newAirtel) {
          res.status(200).send("Transaction successful");
        } else {
          res.status(400).send("Transaction not successful");
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
