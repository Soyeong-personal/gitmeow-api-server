const express = require('express');
const router = express.Router();

function dateToString(date){
    return date.toISOString().split("T")[0];
}

router.post('/get', (req, res) => {
    const { username } = req.body;
    console.log(`Getting commits by ${username}...`);

    const github = require('octokat')({ token: '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' });
    const today = dateToString(new Date());

    return github.fromUrl(`https://api.github.com/users/${username}/events`)
        .fetch()
        .then(events => {
            let num = 0;
            events.items.forEach(event => {
                var createdAt = dateToString(new Date(event.createdAt));
                if((event.type === 'PushEvent') && createdAt === today){
                    num += event.payload.commits.length;
                }
            });

            return res.status(200).json({
                nCommits: num,
            })
        });
})

module.exports = router;