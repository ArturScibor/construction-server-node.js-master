const express = require("express");
const router = express.Router();
const pool = require("../../dataBase.js");

router.post('/', async(req,res,next)=>{
    const {name_gallery} = req.query
    try {
        const item_images = await pool.query(`SELECT * FROM zdjecia WHERE nazwa_folderu = '${name_gallery}'`)
        res.status(200).send(item_images.rows)
    } catch (error) {
        res.status(400).send({ error: "Błąd podczas pobrania galerii!" });
    }
})

module.exports = router;