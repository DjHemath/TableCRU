const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ragav:ragav@cluster0-bxkq8.mongodb.net/invoice-app-testing?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
