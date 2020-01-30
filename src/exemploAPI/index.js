const Router = require("koa-router");
const router = new Router();

const getExemploAPI = async ctx => {
  ctx.status = 200;
  ctx.body = { mensagem: "Hello, World!" };
};

router.get("/exemploAPI", getExemploAPI);

module.exports = router;
