const wiki = require('wikijs').default;

wiki()
	.page('Toni Morrison')
	.then(page => page.summary())
	.then(summary => {
		let trimmed = summary.substring(0, 500) + "...";
		console.log(trimmed)
	}); 