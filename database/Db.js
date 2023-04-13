const mongoose = require("mongoose");

require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(`Error in Db Coonection:${error}`);
  });
 