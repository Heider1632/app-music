const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose
  .connect(
    "mongodb://localhost:27017/musica",
    // "mongodb+srv://admin:4S5niBfjsDqjMlHd@cluster0-p5ms0.mongodb.net/appmusic?retryWrites=true",
    // "mongodb+srv://userj:JGAgF23A3ESCYCJz@clusters0-fnnzo.mongodb.net/appmusic?retryWrites=true",
    { 
        useNewUrlParser: true,
        useCreateIndex: true
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch(err => {
    console.log("err", err);
  });