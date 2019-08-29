import isEmpty from 'lodash/isEmpty';
// const days = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];

export function getCurrentDate(separator = '-') {
	let newDate = new Date();
	let date = newDate.getDate();
	let month = newDate.getMonth() + 1;
	let year = newDate.getFullYear();

	return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
}

export function getDay(date) {
	if (date) {
		const Ndate = new Date(date);
		const day = Number(Ndate.getDay());
		return day;
		// if (day > -1 && day < 7) return days[day];
		// return '';
	}
}
export function calculatePercentage(current, past) {
	if (past === 0) return current * 100;
	// if (current == 0) return past * -100;

	return (current / past - 1) * 100;
}
export function convertToUtcTime(date) {
	console.log(date);
	let splitter = date.split('-');
	return new Date(Date.UTC(splitter[2], splitter[1], splitter[0], 0, 0, 0));
}

export function dateToStringTime(date) {
	const Ndate = new Date(date);
	var hours = Ndate.getHours();
	var minutes = Ndate.getMinutes();
	hours = hours > 9 ? hours : `0${hours}`;
	minutes = minutes > 9 ? minutes : `0${minutes}`;

	return `${hours}:${minutes}`;
}

export function objectTimeToString(start, end) {
	const start_hour = Number(start._hour) < 10 ? `0${start._hour}` : start._hour;
	const start_minute = Number(start._minute) < 10 ? `0${start._minute}` : start._minute;
	const end_hour = Number(end._hour) < 10 ? `0${end._hour}` : end._hour;
	const end_minute = Number(end._minute) < 10 ? `0${end._minute}` : end._minute;
	return `${start_hour}:${start_minute} - ${end_hour}:${end_minute}`;
}

export function getTime(date) {
	if (date) {
		const Ndate = new Date(date);
		let hour = Number(Ndate.getUTCHours()) + 3;
		return {
			hour   : hour < 10 ? `0${hour}` : hour,
			minute : Number(Ndate.getUTCMinutes()) < 10 ? `0${Ndate.getUTCMinutes()}:` : Ndate.getUTCMinutes()
		};
	}
}

export function getBusinessTime(working, date) {
	/*
   * this function is taking Business schedule array , selected date(year-month-day) as args
   * and return array of String time => "10:00","11:00"....
   */
	let day = getDay(date);
	if (!isEmpty(working) && day > -1) {
		if (working[day].opened) {
			let from = new Date(working[day].from);
			let start = from.getHours();
			let diff = Math.ceil(Number(getTimeDifference(working[day].from, working[day].until)));
			var times = [];
			for (let i = 0; i <= diff; i++) {
				let time = Number(start) + i;
				// time = time < 10 ? '0' + time : time;
				times.push(time < 10 ? `0${time}:00` : `${time}:00`);
			}
			return times;
		}
	}
	return [];
}

export function getAppointmentTime(start, end) {
	if (!isEmpty(start) && !isEmpty(end)) {
		let date1 = new Date();
		date1.setHours(start._hour, start._minute, 0, 0);

		let date2 = new Date();
		date2.setHours(end._hour, end._minute, 0, 0);

		let diff = new Date(date2 - date1).getTime();
		return diff / 60000;
	}
	return 0;
}

/* retuern true if the time(string) until bigger than time(string(19:00) from) */
export function isTimeBigger(s_from, s_until) {
	let from = s_from.split(':');
	let until = s_until.split(':');
	if (Number(until[0] > Number(from[0]))) return true;

	if (Number(until[0]) < Number(from[0])) return false;

	return Number(until[1]) > Number(from[1]);
}
export function getTimeDifference(from, until) {
	var diff = new Date(new Date(until) - new Date(from));

	return Number(diff.getUTCHours() + '.' + diff.getUTCMinutes());
}

export function appointmentTimeDiffrence(from, until) {
	/* from and until are objects from appointment*/
	const hours = Number(until._hour) - Number(from._hour);
	const minutes = (Number(until._minute) - Number(from._minute)) / 60;
	console.log(minutes);
	return Number(hours + '.' + minutes);
}

export function getWorkDay(days, day) {
	for (let Nday in days) {
		if (days[Nday].day === day) {
			return days[Nday];
		}
	}
	return {};
}
