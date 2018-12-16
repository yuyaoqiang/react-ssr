const express = require("express");
const ReactSSR = require("react-dom/server");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session")
const devStatic= require("./utils/dev-static")
const isDev = process.env.NODE_ENV === "development"
const app = express();

app.use(bodyParser.json()); // 转换body中参数到 req.body中
app.use(bodyParser.urlencoded({extended:false})) // 转换body中参数到 req.body中
app.use(session({
  maxAge:10*60*1000,
  name:"tid",
  resave:false,
  saveUninitialized:false,
  secret:"my love is jingjing"
}))
app.use("/api/user",require("./utils/handleLogin"))
app.use("/api",require("./utils/proxy"))

if(!isDev){
    const serverEntry = require("../../dist/server.js").default;
    const template = fs.readFileSync(path.join(__dirname,"../../dist/index.html"),"utf-8");
    app.use("/public",express.static(path.join(__dirname,"../../dist/")));
    app.get("*",(req,res)=>{
        const app = ReactSSR.renderToString(serverEntry)
        res.send( template.replace("<!--app-->",app));
    })
}else{
    devStatic(app);
}


app.listen(8080,()=>{
    console.log("启动成功")
})
