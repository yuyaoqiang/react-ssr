const express = require("express");
const ReactSSR = require("react-dom/server");
const fs = require("fs");
const path = require("path");
const devStatic= require("./utils/dev-static")
const isDev = process.env.NODE_ENV === "development"
const app = express();
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
