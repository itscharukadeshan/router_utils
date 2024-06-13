/** @format */

const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to forward the POST request

app.get("/status", (req, res) => {
  res.status(200).json({ message: "Server is running and reachable" });
});

app.get("/hutch_reboot", async (req, res) => {
  const data = `isTest=false&goformId=REBOOT_DEVICE`;
  const url = "http://192.168.1.1/goform/goform_set_cmd_process";

  try {
    const response_1 = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    await delay(1000);

    const response_02 = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error) {
    // Log the error
    console.error("Error forwarding request:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    res
      .status(200)
      .send("Request forwarded successfully, but encountered an error");
  }
});

app.get("/dialog_reboot", async (req, res) => {
  const data = `isTest=false&goformId=REBOOT_DEVICE`;
  const url = "http://192.168.8.1/goform/goform_set_cmd_process";

  try {
    const response_1 = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    await delay(1000);

    const response_02 = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error) {
    // Log the error
    console.error("Error forwarding request:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    res
      .status(200)
      .send("Request forwarded successfully, but encountered an error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
