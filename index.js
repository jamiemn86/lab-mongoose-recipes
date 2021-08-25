const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const query = { title: 'Rigatoni alla Genovese' };

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.createCollection().then(function (collection) {
      console.log('Collection is created!');
    });
  })
  .then(() => {
    return Recipe.create({
      title: 'test title',
      level: 'Easy Peasy',
      ingredients: ['salt', 'pepper'],
      cuisine: 'french',
      dishType: 'breakfast',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 1,
      creator: 'test',
      created: 1519129755973
    });
  })
  .then((recipe) => {
    console.log(recipe.title);
  })
  .then(() => {
    return Recipe.insertMany(data, function (error, docs) {});
  })
  .then(() => {
    console.log('Recipe was updated');
    return Recipe.findOneAndUpdate(query, { $set: { duration: 100 } });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
