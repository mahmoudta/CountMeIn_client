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

export function getTimeDifference(from, until) {
	var diff = new Date(new Date(until) - new Date(from));
	return Number(diff.getUTCHours() + '.' + diff.getUTCMinutes());
}

export function getWorkDay(days, day) {
	for (let Nday in days) {
		if (days[Nday].day === day) {
			return days[Nday];
		}
	}
	return {};
}
