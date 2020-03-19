var appid = 'wx6aa74ef446457fe1'; // 小程序的appid
var appsecret = '80e36c79580a24965685614a706fabb0'; // 小程序的appSecret
var mchid = '1579193701'; // 微信商户号
var mchkey = 'MyBarreewx6aa74ef446457fe1Mybarr'; // 微信商户的key 32位
var wxurl = 'https://api.mybarree.com/pay/success'; //通知地址

var request = require('request');
var xmlreader = require("xmlreader");
var wxpay = require('./utils.js');
const axios = require("axios");
module.exports = function(app, middleware, db, underscore, responseController) {

	app.post('/pay', middleware.requireAuthentication, function(req, res) {

		//首先拿到前端传过来的参数
		let orderCode = req.body.orderCode;
		let money = req.body.money;
		let openid = req.user.open_id;

		console.log('APP传过来的参数是', orderCode + '----' + money + '------' +
			'----' + appid + '-----' + appsecret + '-----' + mchid + '-----' +
			mchkey);

		//首先生成签名sign
		// appid
		let mch_id = mchid;
		let nonce_str = wxpay.createNonceStr();
		let timestamp = wxpay.createTimeStamp();
		let body = '测试微信支付';
		let out_trade_no = orderCode;
		let total_fee = wxpay.getmoney(money);
		let spbill_create_ip = req.connection.remoteAddress; // 支持IPV4和IPV6两种格式的IP地址。调用微信支付API的机器IP
		let notify_url = wxurl;
		let trade_type = 'JSAPI'; // 'APP';公众号：'JSAPI'或'NATIVE'

		let sign = wxpay.paysignjsapi(appid, body, mch_id, nonce_str, notify_url,
			openid, out_trade_no, spbill_create_ip, total_fee, trade_type, mchkey);

		console.log('sign==', sign);

		//组装xml数据
		var formData = "<xml>";
		formData += "<appid>" + appid + "</appid>"; //appid
		formData += "<body><![CDATA[" + "测试微信支付" + "]]></body>";
		formData += "<mch_id>" + mch_id + "</mch_id>"; //商户号
		formData += "<nonce_str>" + nonce_str + "</nonce_str>"; //随机字符串，不长于32位。
		formData += "<notify_url>" + notify_url + "</notify_url>";
		formData += "<openid>" + openid + "</openid>";
		formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>";
		formData += "<spbill_create_ip>" + spbill_create_ip +
			"</spbill_create_ip>";
		formData += "<total_fee>" + total_fee + "</total_fee>";
		formData += "<trade_type>" + trade_type + "</trade_type>";
		formData += "<sign>" + sign + "</sign>";
		formData += "</xml>";

		console.log('formData===', formData);

		var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

		request({
			url: url,
			method: 'POST',
			body: formData
		}, function(err, response, body) {
			if (!err && response.statusCode == 200) {
				console.log(body);

				xmlreader.read(body.toString("utf-8"), function(errors, response) {
					if (null !== errors) {
						console.log(errors)
						return;
					}

					console.log();
					console.log();
					console.log();
					console.log("WECHAT REPONSE");
					const code = response.xml.return_code.text();
					if (code === "FAIL") {
						res.status(401).json({
							message: response.xml.return_msg.text()
						})
						return;
					}

					console.log("return_code => ", response.xml.return_code.text());
					console.log("return_msg => ", response.xml.return_msg.text());
					// console.log("err_code => ", response.xml.err_code.text());
					// console.log("err_code_des => ", response.xml.err_code_des.text());
					// console.log("result_code => ", response.xml.result_code.text());
					console.log();
					console.log();
					// console.log('长度===', response.xml.prepay_id.text().length);
					var prepay_id = response.xml.prepay_id.text() || '';
					console.log('解析后的prepay_id==', prepay_id);


					//将预支付订单和其他信息一起签名后返回给前端
					let package = "prepay_id=" + prepay_id;
					let signType = "MD5";
					let minisign = wxpay.paysignjsapimini(appid, nonce_str, package,
						signType, timestamp, mchkey);
					res.end(JSON.stringify({
						status: '200',
						data: {
							'appId': appid,
							'partnerId': mchid,
							'prepayId': prepay_id,
							'nonceStr': nonce_str,
							'timeStamp': timestamp,
							'package': 'Sign=WXPay',
							'paySign': minisign
						}
					}));

				});
			}
		});
	});

};
