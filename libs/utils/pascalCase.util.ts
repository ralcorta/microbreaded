export const toPascalCase = (word: string) => {
	return word
		.match(/[a-z]+/gi)
		.map(function(word) {
			return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
		})
		.join('');
};
