//Admin get THE database
app.get('/api/admin/data/:email', async (req, res) => {
    try {
        if (req.params.email === 'admin') {
            const data = require('./data');
            res.status(200).send({msg: 'Admin data', data: data});
        } else {
            res.status(500).send({msg: 'User can\'t get this data...'});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});
