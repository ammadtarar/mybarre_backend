const moment = require('moment');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('membership', {
		start: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				return moment(this.getDataValue('start')).format('YYYY/MM/DD');
			}
		},
		end: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				return moment(this.getDataValue('end')).format('YYYY/MM/DD');
			}
		},
		price: {
			type: DataTypes.NUMBER,
			allowNull: false,
			defaultValue: 0.00
		},
		out_trade_no: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM,
			values: [
				'pre-instructor', // MEANS USER PAIDED AND SIGNED UP
				'pre-instructor-tbc', //USER DID NOT ATTEND TRAINING CLASSES
				'instructor-in-training', // USER ATTENDED THE TRAINING CLASSES
				'training-videos-submitted', // USER SUBMITTED TRAINING VIDEOS AFTER TRAINING CLASSES
				'exam-passed', // SUBMITTED TRAINING VIDEOS PASSED
				'exam-failed', // SUBMITTED TRAINING VIDEOS FAILED
				'licensed-instructor' // USER PASSED THE EXAM AND PAID THE LICENSE FEE
			],
			defaultValue: 'pre-instructor'
		},
		license_out_trade_no: {
			type: DataTypes.STRING,
			allowNull: true
		},
		certificate_url: {
			type: DataTypes.STRING
		},
		video_submission_date: {
			type: DataTypes.DATE,
			allowNull: true,
			get() {
				const ori = this.getDataValue('video_submission_date') || null;
				if (ori === null) {
					console.log(JSON.stringify(this.getDataValue('course')));
					const course = this.getDataValue('course') || undefined;
					if (course === undefined) {
						return ""
					}
					const start = course.end;
					const endDate = new Date(course.end);
					var newDate = endDate.setMonth(endDate.getMonth() + 3)
					return moment(newDate).format('YYYY/MM/DD');
				} else {
					return moment(ori).format('YYYY/MM/DD');
				}


			}
		},
	});
};
