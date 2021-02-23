const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: Date.now, index: { expires: "2m" } },
});

const Doc = mongoose.model("Doc", docSchema);

const run = async function () {
  // make document
  const doc1 = await Doc.create({});

  debugger;
  // While paused:
  // 1. run db.docs.getIndexes() in mongo shell and there will be a second object with "key":{ "expireAt":1}
  // 2. then run db.docs.drop() to drop the documents
  // 3. unpause script

  // make 2nd document
  const doc2 = await Doc.create({});
  debugger; // run db.docs.getIndexes() in mongo shell and if you dropped in step #2 when script was pause at line 14, there will be no second object with "key":{ "expireAt":1}
};
mongoose
  .connect("mongodb://localhost/expireDocument", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Successfully connect to MongoDB.\n"))
  .catch((err) => console.error("Connection error", err));

run();
