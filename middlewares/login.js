const DeGiro = require('degiro-api').default;

module.exports = async (req, res, next) => {
    let degiro = DeGiro.create({
        username: req.username || process.env.DEGIRO_USERNAME,
        pwd: req.password || process.env.DEGIRO_PASSWORD,
        jsessionId: req.headers.jsessionid
    });

    if (!await degiro.isLogin({ secure: true })) {
        degiro.login().then(() => {
            res.set('jsessionid', degiro.getJSESSIONID());
            req.degiroInstance = degiro;
            next();
        }, error => {
            if(error === "badCredentials")
                return res.status(401).json({ 'message': 'Bad credentials.' });

            // jsessionid probably expired
            degiro = DeGiro.create({
                username: req.username || process.env.DEGIRO_USERNAME,
                pwd: req.password || process.env.DEGIRO_PASSWORD
            });

            degiro.login().then(() => {
                res.set('jsessionid', degiro.getJSESSIONID());
                req.degiroInstance = degiro;
                next();
            }, error => {
                return res.status(500).json(error);
            });
        })
    }
}
