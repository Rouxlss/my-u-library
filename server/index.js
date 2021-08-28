const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const port = 3001;
const mdb_connect = "mongodb+srv://newuser:password12345@crud.e7whf.mongodb.net/food?retryWrites=true&w=majority";
const FoodModel = require('./models/Food');

app.use(express.json());
app.use(cors());

mongoose.connect(
    mdb_connect, 
    {
        useNewUrlParser: true,
    }
);

app.post('/insert', async (req, res) => {

    const foodName = req.body.foodName;
    const days = req.body.days;

    const food = new FoodModel({
        foodName: foodName, daysSinceIAte: days
    });

    
    try {
        res.send('DataInserted');
        await food.save();
    } catch (error) {
        console.error(error)
    }
})

app.get('/read', async(req, res) => {
    FoodModel.find({}, (err, result) => {
        if(err) {
            res.send(err)
        }

        res.send(result);
    })
})

app.post('/update', async(req, res) => {
    
    const newFoodName = req.body.foodName;
    const newDays = req.body.days;
    const id = req.body.id;
    
    try {
        res.send('DataUpdated');
        FoodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName
            updatedFood.daysSinceIAte = newDays
            updatedFood.save()
        })
    } catch (error) {
        console.error(error)
    }
})

app.delete('/delete/:id', async(req, res) => {
    
    const id = req.params.id;

    await FoodModel.findByIdAndRemove(id).exec();
    res.send('DataDeleted');

})


app.listen( port, ()=>{
    console.log('Server running on port ' + port)
});

