function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}


const schedule = require('node-schedule');

module.exports = async function(db) {
	console.log("Setting up schdeuler");

	async function getMemberships() {
		return new Promise(function(resolve, reject) {
			var today = new Date();
			var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() +
				7);

			db.membership.findAll({
					where: {
						status: 'instructor-in-training',
						video_submission_date: {
							[db.Op.between]: [today, nextweek]
						}
					},
					attributes: ['id', 'video_submission_date'],
					include: [{
						model: db.user,
						as: 'user',
						attributes: ['id', 'name', 'gender', 'email']
					}]
				})
				.then(function(membership) {
					resolve(membership)
				})
		});
	};

	const memberships = await getMemberships();
	console.log(JSON.parse(JSON.stringify(memberships)));

	var rule = new schedule.RecurrenceRule();
	// rule.dayOfWeek = [0, new schedule.Range(0, 6)]; // EVERYDAY
	// rule.hour = 10; // AT 10 AM
	// rule.minute = 0;
	rule.second = 1;


	var j = schedule.scheduleJob(rule, function() {
		console.log();
		console.log();
		console.log();
		console.log("====================================");
		console.log("===== INVOKING EMAIL SCHEDULER =====");
		console.log("====================================");



		console.log(new Date());
	});

};
