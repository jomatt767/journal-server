const Sequelize = require('sequelize');
const sequelize = new Sequelize('journal-walkthrough',
'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function()  {
        console.log('connected to journal-walkthrough postgres database');
    },
    function(err) {
        console.log(err);
    }
);
module.exports = sequelize;
