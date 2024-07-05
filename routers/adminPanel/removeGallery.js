const express = require("express");
const router = express.Router();
const pool = require("../../dataBase.js");
const fs = require("fs");

router.post("/", async (req, res, next) => {
  try {
    const { name_category } = req.query;
    fs.rmSync("./images/" + name_category, {
      recursive: true,
      force: true,
    });
    await pool.query(`DELETE FROM category WHERE nazwa='${name_category}'`);
    await pool.query(
      `DELETE FROM zdjecia WHERE nazwa_folderu='${name_category}'`
    );

    res.status(200).send({ succes: "Poprawnie usunięto galerie, zdjęcia!" });
  } catch (error) {
    res.status(400).send({ error: "Błąd podczas usuwania Galerii" });
  }
});

module.exports = router;
