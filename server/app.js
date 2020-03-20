const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const Data = require("./app.model");
const cors = require("cors");

require("./db");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const data = await Data.find({});
  return res.json({ status: true, data });
});

app.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const Datum = new Data(data);
    await Datum.save();
    return res.json({ status: true });
  } catch (err) {
    res.json({ status: false });
  }
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let result = {};
  await Data.findOneAndUpdate({ id }, { $set: data }, { new: true }, function(
    err,
    docs
  ) {
    if (err) {
      result = {
        status: false,
        message: "Something wrong with server!",
        statusCode: 500
      };
    }

    if (docs === null) {
      result = {
        status: false,
        message: "No customer data is found with this ID!",
        statusCode: 404
      };
    } else if (docs) {
      result = {
        status: true,
        message: "Customer data updated successfully!",
        statusCode: 200
      };
    }
  });
  return res.json(result);
});

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));
