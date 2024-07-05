const express = require("express");
const router = express.Router();
const pool = require("../../dataBase.js");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(`./images/${req.body.folder_image}`)) {
        fs.mkdirSync(`./images/${req.body.folder_image}`);
      }
    } catch (error) {
      console.log("errror: " + error);
    }
    cb(null, `./images/${req.body.folder_image}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({ storage: storage });

router.post("/", uploader.array("images"), async (req, res, next) => {
  try {
    const { name_category } = req.query;
    const checkCategory = await pool.query(
      `SELECT id FROM category WHERE nazwa = '${name_category}'`
    );

    if (checkCategory.rows.length === 0) {
      await pool.query(
        `INSERT INTO category(nazwa) VALUES('${name_category}')`
      );

      const id_category = await pool.query(
        `SELECT id FROM category WHERE nazwa = '${name_category}'`
      );

      for (const key of req.files) {
        await pool.query(
          `INSERT INTO zdjecia(path, id_category, nazwa, nazwa_folderu) VALUES('${key.path}', '${id_category.rows[0].id}', '${key.originalname}', '${name_category}')`
        );
      }
    } else {
      const id_category = await pool.query(
        `SELECT id FROM category WHERE nazwa = '${name_category}'`
      );

      for (const key of req.files) {
        await pool.query(
          `INSERT INTO zdjecia(path, id_category, nazwa, nazwa_folderu) VALUES('${key.path}', '${id_category.rows[0].id}', '${key.originalname}', '${name_category}')`
        );
      }
    }
    res.status(200).send({ succes: "Dodano poprawnie kategorie i zdjęcia!" });
  } catch (error) {
    res.status(400).send({ error: "Błąd podczas dodawania galerii!" });
  }
});

module.exports = router;
