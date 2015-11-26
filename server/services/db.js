var Sequelize = require("sequelize");

//Unsure if we need password, come back to this
var db;
// Set db depending on deployment or local testing
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

  db = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: false,
    dialectOptions: {
      ssl: true
    }
  });
} else {
  // the application is executed on the local machine ... use mysql
  db = new Sequelize("tablesurfer", "admin", "admin", {
    dialect: "postgres", // or 'sqlite', mysql', 'mariadb'
    port: 5432 //(for postgres)
  });
}

var Users = db.define("Users", {
  //here we will have to figure out the data from facebook on authentication
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  facebookId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true
  },
  profilePicture: {
    type: Sequelize.STRING,
    allowNull: false
  },
  friends: {
    type: Sequelize.JSON,
    allowNull: false
  }

});

var Meals = db.define("Meals", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//create Users Users foreign key for meal
Users.hasOne(Meals);
Meals.belongsTo(Users);


var Restaurants = db.define("Restaurants", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yelpData: {
    type: Sequelize.JSON,
    allowNull: false
  }

});

//this creates restaurant foreign key for meal
Restaurants.hasOne(Meals);
Meals.belongsTo(Restaurants);


var Attendees = db.define("Attendees", {
});

Users.belongsToMany(Meals, {through: 'Attendees'});
Meals.belongsToMany(Users, {through: 'Attendees'});


db.sync();

exports.Meals = Meals;
exports.Users = Users;
exports.Restaurants = Restaurants;
exports.Attendees = Attendees;
