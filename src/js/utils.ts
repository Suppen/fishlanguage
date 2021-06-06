const convertToHex = (text: string) => {
	// Make a hexstring out of it

	const hexstring = text
		.split('')
		.map((c) => c.charCodeAt(0))
		.map((num) => num.toString(16))
		.map((num) => num.padStart(2, '0'))
		.join('');

	// Split it into two and two characters
	const bytelist = [];
	for (let i = 0; i < hexstring.length; i += 2) {
		bytelist.push(hexstring.slice(i, i + 2));
	}

	// Split those again into chunks of 16
	const bytelistlist = [];
	for (let i = 0; i < bytelist.length; i += 16) {
		bytelistlist.push(bytelist.slice(i, i + 16));
	}

	// Join the inner lists with spaces and the outer with newlines
	return bytelistlist
		.map((bytelist) => bytelist.join(' '))
		.join('\n');
};

export {
	convertToHex,
};
