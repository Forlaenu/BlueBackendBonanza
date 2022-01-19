const wiki = require('wikijs').default;

function getSummary(name) {
    return wiki()
        .page('Toni Morrison')
        .then(page => page.summary())
        .then(summary => {
            let trimmed = summary.substring(0, 1000) + "...";
            return {
                summary: trimmed,
                name: name
            }

        });
}

module.exports = {
    getSummary
}
