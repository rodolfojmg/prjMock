const bluebird = require("bluebird");

const fs = bluebird.promisifyAll(require("fs"));

const buildResponseFromFileXml = async (ctx, fileName) => {
  await fs
    .readFileAsync(fileName)
    .then(content => {
      ctx.response.type = "text/xml";
      ctx.status = 200;
      ctx.body = content;
    })
    .catch(err => {
      throw err;
    });
};

const buildResponseFromFile = async (ctx, fileName, status) => {
  await fs
    .readFileAsync(fileName)
    .then(content => {
      ctx.response.type = "application/json";
      ctx.status = status || 200;
      ctx.body = JSON.parse(content);
    })
    .catch(err => {
      throw err;
    });
};

const buildInternalServerError = (ctx, body) => {
  if (body) {
    ctx.body = body;
  }
  ctx.status = 500;
};

const buildBadRequestResponse = (ctx, body) => {
  ctx.status = 400;
  ctx.body = body;
};

const buildNotFoundResponse = ctx => {
  ctx.status = 404;
};

const buildForbiddenResponse = ctx => {
  ctx.status = 403;
};

const buildNoContentResponse = ctx => {
  ctx.status = 204;
};

module.exports = {
  buildResponseFromFile,
  buildResponseFromFileXml,
  buildNotFoundResponse,
  buildForbiddenResponse,
  buildNoContentResponse,
  buildBadRequestResponse,
  buildInternalServerError
};
