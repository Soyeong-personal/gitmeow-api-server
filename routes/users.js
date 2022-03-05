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
                    num += 1;
                }
            });

            return res.status(200).json({
                nCommits: num,
            })
        });
})

router.post('/login', (req, res) => {
    console.log("login reqeust has come...!");
    const { username, password } = req.body;
    console.log(username, password);

    if(username == "kimsoyeong"){
        res.status(200).json({
            message: "로그인 성공"
        })
    } else {
        res.status(403).json({
            message: "로그인 실패"
        })
    }
})

module.exports = router;