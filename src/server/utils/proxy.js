const axios = require("axios");
const qs = require("query-string");
const baseUrl = "http://cnodejs.org/api/v1";
module.exports = function(req, res, next) {
  const path = req.path;
  const user = req.session.user || {};
  const needAccessToken = req.query.needAccessToken;
  if (needAccessToken && user.accessToken) {
    res.status(401).send({
      success: false,
      data: "nedd login"
    });
  }
  const query = Object.assign({}, req.query);
  if (query.needAccessToken) delete query.needAccessToken;

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: qs.stringify(
      Object.assign({}, req.body, {
        accesstoken: user.accessToken
      })
    ),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(resp => {
      if (res.status === 200) {
        res.send(resp.data);
      } else {
        res.status(resp.status).send(resp.data);
      }
    })
    .catch(err => {
      if (err.response) {
        res.status(500).send(err.response.data);
      } else {
        res.status(500).send({
          success: false,
          msg: "服务器未知错误"
        });
      }
    });
};
