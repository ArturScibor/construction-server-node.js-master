const express = require("express");
const router = express.Router();
const pool = require("../../dataBase.js");
const fs = require('fs')

router.post('/', async(req,res,next)=>{
    try {
        const {id} = req.query;
        const image_path = await pool.query(`SELECT path FROM zdjecia WHERE id='${id}'`)
        fs.rmSync(image_path.rows[0].path, {
            recursive: true,
            force: true,
          });
      await pool.query(`DELETE FROM zdjecia WHERE id = '${id}'`)
    } catch (error) {
        res.status(400).send({ error: "Błąd podczas pobrania galerii!" });
    }
    res.status(200).send({succes:'Poprawnie usnięto zdjęcie!'})
})

module.exports = router;