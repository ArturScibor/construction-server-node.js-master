const express = require("express");
const router = express.Router();
const pool = require("../../dataBase.js");

router.get('/', async(req,res,next)=>{
    try {
        const galery = await pool.query('SELECT * FROM category')
        res.status(200).send(galery.rows)
    } catch (error) {
        res.status(400).send({ error: "Błąd podczas pobrania galerii!" });
    }
})

module.exports = router;