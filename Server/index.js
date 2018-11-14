const express = require('express');
const bodyParser = require('body-parser');
const cC = require('./controller/controller')
const app = express();
app.use(bodyParser.json());
let value = [100, 200, 300, 400, 500, 600, 700, 800, 900]

app.get('/api/pokemon_power_value', (req, res) => {
    res.status(200).json(value);
})


app.get('/api/get_all_pokemon',cC.read);
app.post('/api/add_pokemon',cC.create); 
app.put('/api/train_pokemon/:id', cC.update);
app.delete('/api/remove_pokemon/:id', cC.delete);
app.listen(4000, ()=> console.log('server running on port 4000'));
