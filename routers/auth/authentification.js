const express = require("express");
const router = express.Router();
const pool = require("../../dataBase.js");
const bcrypt = require("bcrypt");
const { jwtToken } = require("../../JWT/jwt-helper.js");

router.post("/", async (req, res, next) => {
  try {
    const { login, password } = req.query;
    const user = await pool.query(
      `select * from urzytkownicy where login='${login}'`
    );
    if (user.rows.length === 0) {
      return res.status(400).send({ error: "Login nieprawidłowy!" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!validPassword) {
      return res.status(400).send({ error: "Hasło nieprawidłowy!" });
    }

    const tokens = jwtToken({
      user_id: user.rows[0].id,
      user_login: user.rows[0].login,
    });
    res.status(200).send(tokens);
  } catch (error) {
    res.status(400).send({ error: "Błąd podczas zapytania logowania!" });
  }
});

module.exports = router;
