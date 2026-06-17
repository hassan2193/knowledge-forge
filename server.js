require("dotenv").config();

const app = require("./src/app");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 3000;

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("PostgreSQL Connected");
  })
  .catch((err) => {
    console.error("Database Connection Error:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
