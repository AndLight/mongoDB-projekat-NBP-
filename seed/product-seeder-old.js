var Product = require('../models/product');
var mongoose = require('mongoose');
var createError = require('http-errors');

mongoose.connect('mongodb://localhost/shopingdb')
        .then(console.log('MongoDB is connected'))
        .catch(err => console.log('MongoDB error: '+err));

const db = mongoose.connection;

let products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/7/78/It_%28Stephen_King_novel_-_cover_art%29.jpg',
        title: "IT",
        description: "Nesto nesto nestso nesto nesto",
        writer: "Stephen King",
        year: 1986,
        price: 20
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/The_Stand_cover.jpg/220px-The_Stand_cover.jpg',
        title: "The Stand",
        description: "Nesto 2 nesto 2 nestso 2 nesto 2 nesto 2",
        writer: "Stephen King",
        year: 1978,
        price: 12
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Shiningnovel.jpg/220px-Shiningnovel.jpg',
        title: "The Shining",
        description: "Nesto 3 nesto 3 nestso 3 nesto 3 nesto 3",
        writer: "Stephen King",
        year: 1987,
        price: 18
    }),


    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Hamlet_1996_poster.jpg/220px-Hamlet_1996_poster.jpg',
        title: "Hamlet",
        description: "Nesto 4 nesto nestso nesto nesto",
        writer: "William Shakespeare",
        year: 1603,
        price: 30
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Macbeth_2015_poster.jpg/220px-Macbeth_2015_poster.jpg',
        title: "Macbeth",
        description: "Nesto 5 nesto nestso nesto nesto",
        writer: "William Shakespeare",
        year: 1987,
        price: 5
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Romeo_and_juliet_brown.jpg/220px-Romeo_and_juliet_brown.jpg',
        title: "Romeo and Juliet",
        description: "Nesto 6 nesto nestso nesto nesto",
        writer: "William Shakespeare",
        year: 1597,
        price: 5
    }),


    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Murder_on_the_Orient_Express_First_Edition_Cover_1934.jpg/220px-Murder_on_the_Orient_Express_First_Edition_Cover_1934.jpg',
        title: "Murder on the Orient Express",
        description: "Nesto 7 nesto nestso nesto nesto",
        writer: "Agatha Christie",
        year: 1934,
        price: 16
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Mysterious_affair_at_styles.jpg',
        title: "The Mysterious Affair at Styles",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Agatha Christie",
        year: 1920,
        price: 17
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/57/The_Murder_of_Roger_Ackroyd_First_Edition_Cover_1926.jpg',
        title: "The Murder of Roger Ackroyd",
        description: "Nesto 9 nesto nestso nesto nesto",
        writer: "Agatha Christie",
        year: 1926,
        price: 37
    })
    
];

let counter=0;

for(let i=0; i<products.length; i++){
    products[i].save(function(err, res){
        counter++;
        if(counter === products.length){
            exit();
        }
    })
}
function exit(){
    db.close();
}