const { green } = require("chalk");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koaBody = require("koa-body");
const logger = require("koa-logger");
const xmlParser = require("koa-xml-body");
require("dotenv").config();

// API
const exemploAPI = require("./exemploAPI");

const app = new Koa();

app.use(
  koaBody({
    strict: false
  })
);
app.use(
  xmlParser({
    key: "xmlBody", // lib will check ctx.request.xmlBody & set parsed data to it.
    onerror: (err, ctx) => {
      ctx.throw(err.status, err.message);
    }
  })
);
app.use(
  bodyParser({
    enableTypes: ["json"],
    jsonLimit: "2mb",
    strict: true,
    onerror(err, ctx) {
      ctx.throw("TESTE body parse error", 422);
    }
  })
);

// Rotas
app.use(logger());
app.use(exemploAPI.routes());

const portMocker = process.env.PORTMOCKER;

app.listen(portMocker, () =>
  console.log(`${green("[  MOCKER ]")} Running on port ${portMocker}`)
); /* eslint-disable-line no-console */
