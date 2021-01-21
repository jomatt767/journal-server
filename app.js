require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let user = require('./controllers/usercontroller');

let journal = require('./controllers/journalcontroller');

sequelize.sync();
// sequelize.sync({force: true});

app.use(require('./middleware/headers'));
app.use(express.json());

/*******************
 * Exposed route*
 *******************/
app.use('/user', user );

/*********************
 * protected route*
 *********************/


app.use('/journal', journal);


app.listen(3000, function(){
    console.log('app is listening on port 3000');
});