const express = require('express');
const { dirname } = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 8080
const {publicIp,publicIpv4,publicIpv6} = require("public-ip")

let ip = (async ()=>{
   return await publicIpv4()
})


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
ip().then(a=>{console.log(a)
 a="192.168.1.17"
  app.listen(port,a, () => {
    console.log(`Express app listening at http://${a}:${port}`);
  });
});
