const axios = require("axios");
const path = require("path");
const serialize =require("serialize-javascript")
const artTemplate = require("art-template");
const webpack = require("webpack");
const asyncBootstrap = require("react-async-bootstrapper");
const MemoryFs = require("memory-fs");
const proxy = require("http-proxy-middleware");
const ReactDomServer = require("react-dom/server");
/**
 * 服务端开发环境实时更新配置
 * 1.读取内存中内容
 * 2.通过webpack-watch监听
 * 3.通过模板渲染返回到客户端constructor
 */

const _serverConfig = require("../../../config/webpack.server");
const serverCompiler = webpack(_serverConfig);
const Module = module.constructor;
const mfs = new MemoryFs();
let serverBundle, createStoreMap;
serverCompiler.outputFileSystem = mfs;
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8000/public/server.html").then(res => {
      resolve(res.data);
    });
  });
};
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(warn => console.warn(warn));
  const bundlePath = path.join(
    _serverConfig.output.path,
    _serverConfig.output.filename
  );
  const bundle = mfs.readFileSync(bundlePath, "utf-8");
  const m = new Module();
  m._compile(bundle, "serverEntry.js");
  serverBundle = m.exports.default;
  createStoreMap = m.exports.createStoreMap;
});
module.exports = function(app)  {
  app.use(
    "/public",
    proxy({
      target: "http://localhost:8000"
    })
  );
  app.get("*", (req, res) => {
    getTemplate().then(template => {
      const routerContext = {};
      const store = createStoreMap();
      const app = serverBundle(store, routerContext, req.url);
      asyncBootstrap(app).then(() => {
        if (routerContext.url) {
          res.status(302).setHeader("Location", routerContext.url);
          res.end();
          return;
        }
        const content = ReactDomServer.renderToString(app);
        const html = artTemplate.render(template, {
          appString: content,
          initialState:serialize(store)
        });
        res.send(html);
      });
    });
  });
};
