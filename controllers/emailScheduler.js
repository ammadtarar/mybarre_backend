function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}


const schedule = require('node-schedule');
const emailController = require('./emailController.js');

module.exports = async function(db) {
	console.log("Setting up schdeuler");

	async function getMemberships() {
		return new Promise(function(resolve, reject) {
			console.log();
			console.log('GETTING video_emails_notifications_days_in_advance');
			db.configs.findOne({
					where: {
						id: 1
					}
				})
				.then(function(config) {
					const video_emails_notifications_days_in_advance = config.video_emails_notifications_days_in_advance ||
						30;
					console.log("video_emails_notifications_days_in_advance = ",
						video_emails_notifications_days_in_advance);
					const today = new Date();
					const nextMonth = new Date(today.getFullYear(), today.getMonth(),
						today.getDate() +
						video_emails_notifications_days_in_advance);

					db.membership.findAll({
							where: {
								status: 'instructor-in-training',
								video_submission_date: {
									[db.Op.between]: [today, nextMonth]
								}
							},
							attributes: ['id', 'video_submission_date',
								'last_notification_date'
							],
							include: [{
								model: db.user,
								as: 'user',
								attributes: ['id', 'name', 'gender', 'email']
							}]
						})
						.then(function(membership) {
							resolve(membership)
						})
				})


		});
	};

	async function sendEmailAndUpdateDB(membership) {
		await emailController.sendVideoSubmissionEmail(membership);
		db.membership.update({
				last_notification_date: new Date()
			}, {
				where: {
					id: membership.id
				}
			})
			.then(function(updateResponse) {
				console.log("Updated last notification date for membership with ID = ",
					membership.id);
			})
	};


	const rule = new schedule.RecurrenceRule();
	rule.dayOfWeek = [0, new schedule.Range(0, 6)]; // EVERYDAY
	rule.hour = 10; // AT 10 AM
	rule.minute = 0;
	rule.second = 0;

	schedule.scheduleJob(rule, async function() {
		console.log();
		console.log();
		console.log();
		console.log("====================================");
		console.log("===== INVOKING EMAIL SCHEDULER =====");
		console.log("====================================");
		const memberships = await getMemberships();
		const today = new Date();
		db.configs.findOne({
				where: {
					id: 1
				}
			})
			.then(function(config) {
				const video_emails_notifications_frequency_days = config.video_emails_notifications_frequency_days ||
					5;
				console.log("video_emails_notifications_frequency_days = ",
					video_emails_notifications_frequency_days);
				const today = new Date();
				const lastFiveDays = new Date(today.getFullYear(), today.getMonth(),
					today.getDate() - video_emails_notifications_frequency_days);

				memberships.forEach(function(membership) {
					const lastNotificationDate = new Date(membership.last_notification_date);
					if (!(lastFiveDays < lastNotificationDate && lastNotificationDate <
							today)) {
						console.log("Not In range");
						sendEmailAndUpdateDB(membership);
					}
				});
			})
		console.log("====================================");
		console.log("== FINISHED SENDING NOTIFICATIONS ==");
		console.log("====================================");
		console.log();
		console.log();
		console.log();

	});

};
