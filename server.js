const express = require("express");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

function isValidUrl(url) {
  const regex = /^(http:\/\/|https:\/\/|www\.)/i;
  return regex.test(url);
}

app.get("/", (req, res) => {
  res.render("index", { error: null });
});

app.post("/generate", (req, res) => {
  const url = req.body.url;

  if (!isValidUrl(url)) {
    return res.render("index", {
      error: "Please enter a valid URL.",
    });
  }

  QRCode.toDataURL(url, (err, src) => {
    if (err) res.send("Error occured.!");
    res.render("generate", { src });
  });
});

app.listen(3000, () => {
  console.log("server started on http://localhost:3000");
});
