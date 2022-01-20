const wiki = require('wikijs').default;

function getSummary(name) {
    return wiki()
        .page('Fernando A. Flores')
        .then(page => page.summary())
        .then(summary => {
            let trimmed = summary.substring(0, 2000) + "...";
            return {
                summary: trimmed,
                name: name
            }

        });
}

module.exports = {
    getSummary
}
