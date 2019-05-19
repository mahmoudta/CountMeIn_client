const days = [ 'sunday', 'monday', 'tuesday', 'wedensday', 'thursday', 'friday', 'satarday' ];

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
		if (day > -1 && day < 7) return days[day];
		return '';
	}
}

export function convertToUtcTime(date) {
	console.log(date);
	let splitter = date.split('-');
	return new Date(Date.UTC(splitter[2], splitter[1], splitter[0], 0, 0, 0));
}

export function getTime(date) {
	if (date) {
		const Ndate = new Date(date);
		return {
			hour: Number(Ndate.getUTCHours()) + 3,
			minute: Number(Ndate.getUTCMinutes()) < 10 ? `0${Ndate.getUTCMinutes()}` : Ndate.getUTCMinutes()
		};
	}
}

export function getAppointmentTime(start, end) {
	const start_hour = Number(start._hour) < 10 ? `0${start._hour}` : start._hour;
	const start_minute = Number(start._minute) < 10 ? `0${start._minute}` : start._minute;

	const end_hour = Number(end._hour) < 10 ? `0${end._hour}` : end._hour;
	const end_minute = Number(end._minute) < 10 ? `0${end._minute}` : end._minute;

	return `${start_hour}:${start_minute} - ${end_hour}:${end_minute}`;
}

/* retuern true if the time(string) until bigger than time(string(19:00) from) */
export function isTimeBigger(s_from, s_until) {
	let from = s_from.split(':');
	let until = s_until.split(':');
	if (Number(until[0] > Number(from[0]))) return true;

	if (Number(until[0]) < Number(from[0])) return false;

	return Number(until[1]) > Number(until[0]);
}
export function getTimeDifference(from, until) {
	var diff = new Date(new Date(until) - new Date(from));
	return Number(diff.getUTCHours() + '.' + diff.getUTCMinutes());
}

export function appointmentTimeDiffrence(from, until) {
	/* from and until are objects from appointment*/
	const hours = Number(until._hour) - Number(from._hour);
	const minutes = Number(until._minute) - Number(from._minute);
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
