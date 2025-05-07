const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config/database");

//middleware
app.use(cors());
app.use(express.json());

//routes
//create data
app.post("/insert", async (req, res) => {
  try {
    const { name } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    const newData = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    res.json("New data has been successfully added : " + name);
  } catch (error) {
    console.error(error.message);
  }
});

//get all datas
app.get("/gets", async (req, res) => {
  try {
    const datas = await pool.query("SELECT * FROM users");
    res.json(datas.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a data
app.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const datas = await pool.query("SELECT * FROM users WHERE id = $1 ", [id]);
    res.json(datas.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update data
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { email } = req.body;

    const datas = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 ",
      [name, email, id]
    );
    res.json("Data has been successfully updated : " + name);
  } catch (error) {
    console.error(error.message);
  }
});

//delete data
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const datas = await pool.query("DELETE FROM users WHERE id = $1 ", [id]);
    res.json("Data has been successfully deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
