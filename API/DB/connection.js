
const Sequelize = require("sequelize");
const credentials = require("./credentials.json")

const sequelize = new Sequelize(
    credentials.database,
    credentials.user,
    credentials.password,
    {
        host: credentials.host,
        dialect: 'mysql',
    }
);

sequelize.sync({ force: false })
.then(() => {
})
.catch((error) => {
    console.error("Failed to synchronize database:", error);
});

module.exports = sequelize;