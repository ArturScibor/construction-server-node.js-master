const express = require('express');
const http = require('http');
const port = ;
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const dotenv = require('dotenv')

dotenv.config() 
app.use(cors());
app.use(express.json());
app.use(express.static('public')); 
app.use('', express.static('images'));


const authentificationTokens = require('./JWT/authorizationTokens.js')
const authentification = require('./routers/auth/authentification.js')
const addGalery = require('./routers/adminPanel/addGalery.js')
const getGaleryImages = require('./routers/adminPanel/getGalleryImages.js');
const loadGallery = require('./routers/adminPanel/loadGalery.js');
const removeGallery = require('./routers/adminPanel/removeGallery.js')
const removeImage = require('./routers/adminPanel/removeImage.js');

//request authentification
app.use('/authentification',authentification);

//request addGalery
app.use('', authentificationTokens, addGalery);
app.use('', getGaleryImages);
app.use('', loadGallery)
app.use('', authentificationTokens, removeGallery)
app.use('', authentificationTokens, removeImage)

server.listen(port, (err) => {
    try {
      console.log("Server wystartował!");
    } catch (e) {
      console.log("Error: " + e);
    }
  });