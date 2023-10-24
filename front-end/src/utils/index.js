export const formatStringToDate = (str, brTime = false) => {
	const date = new Date(str);
	const year = date.getFullYear();
	let month = date.getMonth() + 1; // Month is zero-based, so add 1
	let day = date.getDate();

	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}

	const formattedDate = brTime
		? day + '/' + month + '/' + year
		: year + '/' + month + '/' + day;
	return formattedDate;
};
