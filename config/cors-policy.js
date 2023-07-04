const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:4201"],
  optionsSuccessStatus: 200, // for some legacy browsers
};


exports.corsPolicy = cors(corsOptions)