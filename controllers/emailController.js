const nodemailer = require("nodemailer");

const adminHtml = '<body>' +
	'	<style>' +
	'		label{' +
	'			font-family: \'Verdana\';' +
	'		}' +
	'		b{' +
	'			color: #0F253B;' +
	'		}' +
	'	</style>' +
	'	<div class=\'main\'>' +
	'		<img src="https://uploads.wework.cn/dfdb0a41-b833-44e5-b765-09d361bcb124" style="width : 70px;">' +
	'		<label style="width : 100vw ; float : left ; margin-top : 20px ; margin-bottom : 20px">You have been made admin for Ladies Who Tech. Please refer to credentials below to login to admin dashboard</label>' +
	'		<div >' +
	'			<label><b>Email : </b></label>' +
	'			<label>%email</label>' +
	'		</div>' +
	'		<div style=\'margin-top : 4px;\'>' +
	'			<label><b>Password : </b></label>' +
	'			<label>%pwd</label>' +
	'		</div>' +
	'		<div style=\'margin-top : 4px; margin-bottom : 20px\'>' +
	'			<label><b>Dash Url : </b></label>' +
	'			<label>https://admin.ladieswhotech.com</label>' +
	'		</div>' +
	'		<label style=\'width: :100%; float: left; margin-top : 20px;\'>Please keep these credentials safe and DO NOT share with anyone else. In case of any problems , please contact us at : <b>admin@ladieswhotech.com</b></label' +
	'	</div>' +
	'</body>';

const emailVerificationHtml = '<body>' +
	'	<style>' +
	'' +
	'		.main{' +
	'			display: flex;' +
	'			flex-direction: column;' +
	'		}' +
	'		label{' +
	'			font-family: \'Verdana\';' +
	'		}' +
	'		b{' +
	'			color: #0F253B;' +
	'		}' +
	'' +
	'		.copyright{' +
	'			margin-top: 20px;' +
	'			font-size: 16px;' +
	'			font-weight: 600;' +
	'			color: #0F253B;' +
	'			font-family: monospace;' +
	'		}' +
	'	</style>' +
	'	<div class=\'main\' >' +
	'		<img src="https://uploads.wework.cn/dfdb0a41-b833-44e5-b765-09d361bcb124" style="width : 70px;">' +
	'		<label style="width : 100vw ; float : left ; margin-top : 20px ; margin-bottom : 20px">Thank you for being part of the <b>Ladies Who Tech</b> community. Please use the OTP code below to verify your email address</label>' +
	'		<div >' +
	'			<label><b>OTP : </b></label>' +
	'			<label>%otp</label>' +
	'		</div>' +
	'		<label style=\'width: :100vw; float: left; margin-top : 20px;\'>In case of any issues , please feel free to contact us at : <b>help@ladieswhotech.com</b></label>' +
	'' +
	'		<label class="copyright"> © 2020 Ladies Who Tech. All rights reserved</b></label>' +
	'' +
	'	</div>' +
	'</body>';



const corpOtpHtml = '<body>' +
	'	<style>' +
	'' +
	'		.main{' +
	'			display: flex;' +
	'			flex-direction: column;' +
	'		}' +
	'		label{' +
	'			font-family: \'Verdana\';' +
	'		}' +
	'		b{' +
	'			color: #0F253B;' +
	'		}' +
	'' +
	'		.copyright{' +
	'			margin-top: 20px;' +
	'			font-size: 16px;' +
	'			font-weight: 600;' +
	'			color: #0F253B;' +
	'			font-family: monospace;' +
	'		}' +
	'	</style>' +
	'	<div class=\'main\' >' +
	'		<img src="https://uploads.wework.cn/dfdb0a41-b833-44e5-b765-09d361bcb124" style="width : 70px;">' +
	'		<label style="width : 100vw ; float : left ; margin-top : 20px ; margin-bottom : 20px">Welcome to Ladies Who Tech community. Please use the code below to verify your email</label>' +
	'		<div >' +
	'			<label><b>OTP : </b></label>' +
	'			<label>%otp</label>' +
	'		</div>' +
	'		<label style=\'width: :100vw; float: left; margin-top : 20px;\'>In case of any issues , please feel free to contact us at : <b>help@ladieswhotech.com</b></label>' +
	'' +
	'		<label class="copyright"> © 2020 Ladies Who Tech. All rights reserved</b></label>' +
	'' +
	'	</div>' +
	'</body>';


const corpInviteHtml = '<body>' +
	'	<style>' +
	'' +
	'		.main{' +
	'			display: flex;' +
	'			flex-direction: column;' +
	'		}' +
	'		label{' +
	'			font-family: \'Verdana\';' +
	'		}' +
	'		b{' +
	'			color: #0F253B;' +
	'		}' +
	'' +
	'		.copyright{' +
	'			margin-top: 20px;' +
	'			font-size: 16px;' +
	'			font-weight: 600;' +
	'			color: #0F253B;' +
	'			font-family: monospace;' +
	'		}' +
	'	</style>' +
	'	<div class=\'main\' >' +
	'		<img src="https://uploads.wework.cn/dfdb0a41-b833-44e5-b765-09d361bcb124" style="width : 70px;">' +
	'		<label style="width : 100vw ; float : left ; margin-top : 20px ; margin-bottom : 20px">%inviter has invited you to use Ladies Who Tech platform. Please click the link below to create an account.</label>' +
	'		<div >' +
	'			<label><b>Invitation Link : </b></label>' +
	'			<label>%link</label>' +
	'		</div>' +
	'		<label style=\'width: :100vw; float: left; margin-top : 20px;\'>In case of any issues , please feel free to contact us at : <b>help@ladieswhotech.com</b></label>' +
	'' +
	'		<label class="copyright"> © 2020 Ladies Who Tech. All rights reserved</b></label>' +
	'' +
	'	</div>' +
	'</body>';

let transporter = nodemailer.createTransport({
	host: "smtp.163.com",
	port: 25,
	secure: false,
	auth: {
		user: "15240240441@163.com",
		pass: "abcd1234"
	}
});


async function sendOTPEmail(otp, to) {
	var body = emailVerificationHtml;
	body = body.replace("%otp", otp)
	let info = await transporter.sendMail({
		from: '"Ladies Who Tech" <15240240441@163.com>',
		to: to,
		subject: "Email Verification OTP",
		html: body
	});
	new Promise(function(resolve, reject) {
		const msgId = info.messageId || -1;
		console.log("inside");
		console.log(msgId);
		if (msgId === -1) {
			reject(info);
		} else {
			resolve()
		}
	});
};

async function sendAdminCreationEmail(admin) {
	var body = adminHtml;
	body = body.replace("%email", admin.email);
	body = body.replace("%pwd", admin.password);
	let info = transporter.sendMail({
		from: '"Ladies Who Tech" <15240240441@163.com>',
		to: admin.email,
		subject: "Your LWT admin credentials ",
		html: body
	});
	const msgId = info.messageId || -1;
	new Promise(function(resolve, reject) {
		if (msgId === -1) {
			reject(info);
		} else {
			resolve();
		}
	});
};

async function sendCorpOTPEmail(otp, to) {
	var body = corpOtpHtml;
	body = body.replace("%otp", otp)
	let info = await transporter.sendMail({
		from: '"Ladies Who Tech" <15240240441@163.com>',
		to: to,
		subject: "Email Verification OTP",
		html: body
	});
	new Promise(function(resolve, reject) {
		const msgId = info.messageId || -1;
		console.log("inside");
		console.log(msgId);
		if (msgId === -1) {
			reject(info);
		} else {
			resolve()
		}
	});
};

async function sendCorpInvite(to, inviter, link) {
	var body = corpInviteHtml;
	body = body.replace("%link", link)
	body = body.replace("%inviter", inviter)
	let info = await transporter.sendMail({
		from: '"Ladies Who Tech" <15240240441@163.com>',
		to: to,
		subject: "Ladies Who Tech Invitation",
		html: body
	});
	new Promise(function(resolve, reject) {
		const msgId = info.messageId || -1;
		console.log("inside");
		console.log(msgId);
		if (msgId === -1) {
			reject(info);
		} else {
			resolve()
		}
	});
};

module.exports.sendOTPEmail = sendOTPEmail;
module.exports.sendAdminCreationEmail = sendAdminCreationEmail;
module.exports.sendCorpOTPEmail = sendCorpOTPEmail;
module.exports.sendCorpInvite = sendCorpInvite;
