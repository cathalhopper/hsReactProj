const express = require('express');
const app = express();
const axios =require('axios');

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${process.env.apiKey}`
}
const client = axios.create({
baseURL: "https://api.hubapi.com"
})

app.get("/api/getcontacts", (req, res) => {
  client.get("/crm/v3/objects/contacts", {headers: headers})
  .then((response) => {
    res.json(response.data);
  })
  .catch(function (error) {
    if (error.response) {
      console.log("this is error data " + error.response.data);
      console.log("this is error status " + error.response.status);
      console.log("this is error headers " + error.response.headers);
    } else if (error.request) {
      console.log("this is error request " + error.request);
    } else {
      console.log('Error ', error.message);
    }
    console.log("error config " + error.config);
  });
});

app.get("/api/getdeals", (req, res) => {
  client.get("/crm/v3/objects/deals", {headers: headers})
  .then((response) => {
    res.json(response.data);
  })
  .catch(function (error) {
    if (error.response) {
      console.log("this is error data " + error.response.data);
      console.log("this is error status " + error.response.status);
      console.log("this is error headers " + error.response.headers);
    } else if (error.request) {
      console.log("this is error request " + error.request);
    } else {
      console.log('Error ', error.message);
    }
    console.log("error config " + error.config);
  });
});

app.get("/api/getdealproperties", (req, res) => {
  client.get("/crm/v3/properties/deals", {headers: headers})
  .then((response) => {
    res.json(response.data);
  })
  .catch(function (error) {
    if (error.response) {
      console.log("this is error data " + error.response.data);
      console.log("this is error status " + error.response.status);
      console.log("this is error headers " + error.response.headers);
    } else if (error.request) {
      console.log("this is error request " + error.request);
    } else {
      console.log('Error ', error.message);
    }
    console.log("error config " + error.config);
  });
});

app.get("/api/getquotes", (req, res) => {
  
  const fullResults = [];
  client.get(`/crm/v4/objects/deals/${req.query.dealId}/associations/quotes`, {headers: headers})
  .then((response) => {

    const { results } = response.data;
    console.log("ok we got the associated quotes " + results);
    for (const i in results) {
      client.get(`/crm/v3/objects/quotes/${results[i].id}`, {headers: headers})
      .then((response) => {
        fullResults.push(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("this is error data " + error.response.data);
          console.log("this is error status " + error.response.status);
          console.log("this is error headers " + error.response.headers);
        } else if (error.request) {
          console.log("this is error request " + error.request);
        } else {
          console.log('Error ', error.message);
        }
        console.log("error config " + error.config);
      });
    }
    res.json(fullResults);
  })
  .catch(function (error) {
    if (error.response) {
      console.log("this is error data " + error.response.data);
      console.log("this is error status " + error.response.status);
      console.log("this is error headers " + error.response.headers);
    } else if (error.request) {
      console.log("this is error request " + error.request);
    } else {
      console.log('Error ', error.message);
    }
    console.log("error config " + error.config);
  });
});

app.listen(8080, () => {
    console.log('server listening on port 8080')
    
  
})