module.exports = function(app, db) {

    app.post('/memtest', (req, res) => {
        const newGame = new db.gameModel(req.body);
        newGame.save(function(err) {
                if(err) {
                    console.log('Error saving : ' + err);
                    res.status(400).send('unable to add to database');
                } else {
                    console.log('Game saved.')
                    res.send('Success!');
                }
        });
    });

    app.get('/memtest', (req, res) => {
        db.gameModel.find({}, function(err, games) {
            if(err) {
                console.log('Error sending : ' + err);
                res.status(400).send('unable to access database');
            } else {
                console.log('got games');
                res.send(games);
            }
        });
    });

    app.post('/memtest-user', (req, res) => {
        const newUser = new db.userModel(req.body);
        newUser.save(function(err) {
                if(err) {
                    console.log('Error saving : ' + err);
                    res.status(400).send('unable to add to database');
                } else {
                    console.log('User saved.')
                    res.send('Success!');
                }
        });
    });

    app.get('/memtest-user', (req, res) => {
        db.userModel.find({}, function(err, users) {
            if(err) {
                console.log('Error sending : ' + err);
                res.status(400).send('unable to access database');
            } else {
                console.log('got users');
                res.send(users);
            }
        });
    });
};
