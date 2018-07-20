const express = require('express');
const path = require('path');
const pug = require('pug');
const sassMiddleware = require('node-sass-middleware');
const { findIntersections } = require('./intersection');


const app = express();
app.use(
  sassMiddleware({
    src: __dirname + '/sass',
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
  })
);
app.use(express.static(__dirname + '/public'));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.get('/', async (req, res) => {
  res.render("home", {
    data: await checkingIfParamsProvided(req),
    reqQuery: req.query,
  });

});
async function checkingIfParamsProvided(req) {
  if (req.query.platform1) {
    try {
      return await findIntersections(req.query.platform1, req.query.platform2, req.query.diff)
    } catch (error) {
      console.error(error)
    }
  }
}

app.listen(3000, () => {
  console.log(`Listening on 3000!`);
})