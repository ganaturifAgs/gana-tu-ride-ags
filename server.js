const express = require('express');
const { dirname } = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3333
const publicIp = require("public-ip")

console.log(publicIp)

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'/public'));



app.use('/', require('./router/rutas')); 



app.use(express.json());
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist!');
});
// Start the server and listen on the specified port
publicIp.publicIpv4().then(ip => {
  console.log("your public ip address", ip);
  app.listen(port, () => {
    console.log(`Express app listening at http://${ip}:${port}`);
  });
});
