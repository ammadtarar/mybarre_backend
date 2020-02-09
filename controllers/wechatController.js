const axios = require("axios");
const mp_app_id = "wxcece17f8b61e67ad";
const mp_app_secret = "5c304a0cf4c96d5d582bc5e5d9b5de6d";

module.exports = {
  jscode2session: (jscode) => {
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
