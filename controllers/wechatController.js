const axios = require("axios");
const mp_app_id = "wx6aa74ef446457fe1";
const mp_app_secret = "80e36c79580a24965685614a706fabb0";

module.exports = {
  jscode2session: async function(jscode) {
    return new Promise(function(resolve, reject) {
      var url = "https://api.weixin.qq.com/sns/jscode2session?appid=" +
        mp_app_id + "&secret=" + mp_app_secret + "&js_code=" + jscode +
        "&grant_type=authorization_code";
      axios.get(url)
        .then(function(wx) {
          const data = wx.data;
          if (data.hasOwnProperty("errcode")) {
            reject(data);
          } else {
            resolve(data);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

};
