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
