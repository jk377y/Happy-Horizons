module.exports = {
	// Formats date as MM/DD/YYYY (e.g. 01/01/2021) for display on the created dates
	format_date: date => {
		return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
	},
	// checks if a word (comment) exists 0 or more than 1 times
	// and adds an 's' to the end of the word if it does
	// if the word exists 1 time, it returns the word without an 's' 
	format_plural: (word, amount) => {
		if (amount !== 1) {
			return `${word}s`;
		}
		return word;
	}
};
