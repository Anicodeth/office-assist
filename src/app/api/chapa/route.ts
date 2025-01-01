import { NextApiRequest, NextApiResponse } from "next";
import request from "request";

export default function POST(req: NextApiRequest, res: NextApiResponse) {

  const { amount, email, phone_number, tx_ref, callback_url } = req.body;
  const options = {
    method: "POST",
    url: "https://api.chapa.co/v1/transaction/initialize",
    headers: {
      Authorization: "Bearer CHASECK_TEST-kJLPb9m8lB8zDlVStvhxdKDT6bUHXjxS",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: `${amount}`,
      currency: "ETB",
      email: `${email}`,
      phone_number: `${phone_number}`,
      tx_ref: `${tx_ref}`,
      callback_url: `${callback_url}`,
      return_url: "http://localhost:3000/buy",
    }),
  };

  try {
    request(options, function (error: any, response: any) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to initialize payment" });
      }

      console.log(response.body);
      res.status(200).json({ result: response.body });
    });
  } catch (error) {
    console.error(error);
  }
}

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer CHASECK-xxxxxxxxxxxxxxxx");
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({
//     amount: "10",
//     currency: "ETB",
//     email: "abebech_bekele@gmail.com",
//     first_name: "Bilen",
//     last_name: "Gizachew",
//     phone_number: "0912345678",
//     tx_ref: "chewatatest-6669",
//     callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
//     return_url: "https://www.google.com/",
//     "customization[title]": "Payment for my favourite merchant",
//     "customization[description]": "I love online payments",
//     "meta[hide_receipt]": "true",
//   });

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// };
