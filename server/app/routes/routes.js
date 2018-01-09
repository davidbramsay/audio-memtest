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
                res.send(games);
            }
        });
    });
};
