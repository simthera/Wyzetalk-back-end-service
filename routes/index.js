const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const cors = require("cors");
const { route } = require("./users");

router.use(cors());
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/get_something", (req, res) => {
  console.log("/get something endpoint called");
  res.json({
    messgae: "here is the response",
  });
});

router.get("/get_artists", async (req, res) => {
  console.log("get artists has been called");

  const url = "https://api.deezer.com/user/882442551/artists";
  const options = {
    method: "GET",
    // body: req.body,
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    // },
  };
  const response = await fetch(url, options)
    .then((res) => res.json())
    .catch((e) => {
      console.log("eerro");
    });
  console.log("Response: ", response);
  res.json(response);
});
// Search for artists endpoint
router.get("/search/", async (req, res) => {
  console.log("/serch endpoint has been hit");
  const requestQuery = req.query;
  const q = requestQuery.q || [];
  const searchurl = `https://api.deezer.com/search/artist?q=${JSON.stringify(
    q
  )}`;
  const options = {
    method: "GET",
  };
  console.log(req.query);
  console.log(requestQuery);
  const response = await fetch(searchurl, options)
    .then((res) => res.json(requestQuery))
    .catch((e) => {
      console.log("error");
    });
  console.log("Response: ", response);
  res.json(response);
  console.log("REQUEST QUERY IS", JSON.stringify(q));

  console.log("url", searchurl);
});

// Get artist albums endpoint
router.get("/get_albums/:id", async (req, res) => {
  console.log("/get albums endpoint has been hit");
  const requestParams = req.params;
  const artistIDtwo = requestParams.id || [];
  const searchurlTwo = `https://api.deezer.com/artist/${artistIDtwo}/albums/`;
  const options = {
    method: "GET",
  };

  const response = await fetch(searchurlTwo, options)
    .then((res) => res.json(requestParams))
    .catch((e) => {
      console.log("error");
    });
  console.log("Response: ", response);
  res.json(response);
});

// Get top tracks for artist endpioint
router.get("/top_tracks/:id", async (req, res) => {
  console.log("/get top tracks endpoint has been hit");
  const requestParam = req.params;
  const artistID = requestParam.id || [];

  const searchurlThree = `https://api.deezer.com/artist/${artistID}/top/`;
  const options = {
    method: "GET",
  };

  const response = await fetch(searchurlThree, options)
    .then((res) => res.json(requestParam))
    .catch((e) => {
      console.log("error");
    });
  console.log("Response: ", response);
  res.json(response);
  console.log("REQUEST Parameter IS", artistID);

  console.log("url", searchurlThree);
});
module.exports = router;
