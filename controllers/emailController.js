const nodemailer = require("nodemailer");



var videoSubmissionEmailBody = '<html>' +
	'' +
	' <style>' +
	'     ' +
	'     .main{' +
	'         width: 100vw;' +
	'         height: 100vh;' +
	'         background: white;' +
	'         font-size: 14px;' +
	'         color: black;' +
	'         display: flex;' +
	'         flex-direction: column;' +
	'     }' +
	'     ' +
	'     .lrview{' +
	'         width: 100%;' +
	'         min-height: 30px;' +
	'         height: auto;' +
	'         display: flex;' +
	'         flex-direction: row;' +
	'         margin-bottom: 4px;' +
	'     }' +
	'     ' +
	'     .lrview .l{' +
	'         line-height: 30px;' +
	'         font-size: 12px;' +
	'         color: black;' +
	'         font-weight: 600;' +
	'     }' +
	'     ' +
	'     .lrview .r{' +
	'         line-height: 30px;' +
	'         font-size: 14px;' +
	'         color: black;' +
	'         margin-left: 10px;' +
	'     }' +
	'     ' +
	'    ' +
	' </style>' +
	'    ' +
	'    ' +
	' <body>' +
	'     ' +
	'     <div class="main">' +
	'        ' +
	'         <span>Dear <b>%user</b>,</span></br>' +
	'         ' +
	'         Your deadline for uploading your training videos to MYBarre is appproaching soon. Please upload your training videos from the Wechat MiniProgram as soon as possible. If you fail to upload your training videos before the deadline, your membership may be terminated permanently. Please check the details below :' +
	'        s' +
	'         <div class="lrview" style="margin-top : 10px">' +
	'             <div class="l">Membership ID : </div>' +
	'             <div class="r">%membershipId </div>' +
	'         </div> ' +
	'     ' +
	'        <div class="lrview">' +
	'             <div class="l">Video Submission Deadline : </div>' +
	'             <div class="r">%deadline </div>' +
	'         </div> ' +
	'     ' +
	'        <div class="lrview">' +
	'             <div class="l">Membership Start Date : </div>' +
	'             <div class="r">%startDate </div>' +
	'         </div>' +
	'        ' +
	'        <div class="lrview" style="margin-bottom : 6px">' +
	'             <div class="l">Membership End Date : </div>' +
	'             <div class="r">%endDate </div>' +
	'         </div>' +
	'         ' +
	'        <span>We urge you to upload the videos as soon as possible. If you have any questions , please reach out to us on <b>info@mybarrefitness.com</b></span>' +
	'        ' +
	'     ' +
	'     </div>' +
	'    ' +
	' </body>    ' +
	'</html>';


let transporter = nodemailer.createTransport({
	host: "smtp.sendgrid.net",
	port: 465,
	secure: true,
	auth: {
		user: "apikey",
		pass: "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"
	}
});

async function sendVideoSubmissionEmail(membership) {
	console.log("Sending email in email controller");
	new Promise(async function(resolve, reject) {
		var body = videoSubmissionEmailBody;
		const user = membership.user;
		body = body.replace("%user", user.name);
		body = body.replace("%deadline", membership.video_submission_date);
		body = body.replace("%membershipId", membership.id);
		body = body.replace("%startDate", membership.start);
		body = body.replace("%endDate", membership.end);
		var to = user.email;
		console.log("Emails = ,", to);
		let info = await transporter.sendMail({
			from: '"MYBarre " <info@mybarrefitness.com>', // sender address
			to: to, // list of receivers
			subject: "Video submission deadline", // Subject line
			html: body // html body
		});

		console.log("Message sent: %s", info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		resolve()
	});
};

module.exports.sendVideoSubmissionEmail = sendVideoSubmissionEmail;
