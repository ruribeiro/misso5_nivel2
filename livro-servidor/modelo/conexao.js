const mongoose = require('mongoose');

const options = {
    dbName: 'livraria',
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect('mongodb://localhost:27017/livros', options)

.then(() => {
    console.log("Conectado ao MongoDB!");
})
.catch((err) => console.log(err));
module.exports = mongoose;