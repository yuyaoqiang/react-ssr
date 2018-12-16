const axios = require("axios");
const path = require("path");
const webpack = require("webpack");
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
const mfs = new MemoryFs;
let serverBundle;
serverCompiler.outputFileSystem = mfs;
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:8000/public/index.html")
      .then(res => {
        resolve(res.data);
      })
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
  const bundle = mfs.readFileSync(bundlePath,"utf-8");
  const m =  new Module();
  m._compile(bundle,"serverEntry.js");
  serverBundle = m.exports.default;
});
module.exports = function(app) {
    app.use("/public",proxy({
        target:"http://localhost:8000"
    }));
    app.get("*",(req,res)=>{
        getTemplate().then(template=>{
            const content = ReactDomServer.renderToString(serverBundle);
            res.send(template.replace("<!--app-->",content))
        })
    })
};
