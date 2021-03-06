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
    }),




    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/41oQvhIWahL._SY346_.jpg',
        title: "Harry Potter",
        description: "Nesto 7 nesto nestso nesto nesto",
        writer: "J. K. Rowling",
        year: 1997,
        price: 46
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Fantastic_beasts.JPG',
        title: "Fantastic Beasts and Where to Find Them",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "J. K. Rowling",
        year: 2010,
        price: 57
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/1/14/Andrzej_Sapkowski_-_The_Last_Wish.jpg',
        title: "The Last Wish",
        description: "Nesto 9 nesto nestso nesto nesto",
        writer: "Andrzej Sapkowski",
        year: 1993,
        price: 37
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Sword_of_Destiny_UK.jpg',
        title: "Sword of Destiny",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Andrzej Sapkowski",
        year: 1992,
        price: 67
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/6/61/Blood_of_Elves_UK.jpg',
        title: "Blood of Elves",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Andrzej Sapkowski",
        year: 1994,
        price: 27
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif',
        title: "The Lord of the Rings",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "J. R. R. Tolkien",
        year: 1954,
        price: 97
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Silmarillion%2C_Just_under_the_Cover.jpg',
        title: "The Silmarillion",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "J. R. R. Tolkien",
        year: 1977,
        price: 37
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/sr/1/1e/Hobit_knjiga.jpg',
        title: "The Hobbit",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "J. R. R. Tolkien",
        year: 1937,
        price: 31
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/6/67/A_Journey_to_the_Centre_of_the_Earth-1874.jpg',
        title: "Journey to the Center of the Earth",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Jules Verne",
        year: 1864,
        price: 32
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Houghton_FC8_V5946_869ve_-_Verne%2C_frontispiece.jpg',
        title: "Twenty Thousand Leagues Under the Seas",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Jules Verne",
        year: 1870,
        price: 55
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Verne_Tour_du_Monde.jpg',
        title: "Around the World in Eighty Days",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Jules Verne",
        year: 1872,
        price: 62
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Ile_Mysterieuse_02.jpg',
        title: "The Mysterious Island",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Jules Verne",
        year: 1872,
        price: 32
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Louis_Fran%C3%A7ais-Dant%C3%A8s_sur_son_rocher.jpg',
        title: "The Count of Monte Cristo",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Alexandre Dumas",
        year: 1844,
        price: 76
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Tarzan_of_the_Apes_in_color.jpg',
        title: "Tarzan of the Apes",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Edgar Rice Burroughs",
        year: 1914,
        price: 86
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Jekyll_and_Hyde_Title.jpg',
        title: "Strange Case of Dr Jekyll and Mr Hyde",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Robert Louis Stevenson",
        year: 1886,
        price: 75
    }),

    new Product({
        imagePath: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1631057329l/2932._SY475_.jpg',
        title: "Tarzan of the Apes",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Robinson Crusoe",
        year: 1719,
        price: 70
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Tales_serial.jpg',
        title: "A Tale of Two Cities",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Charles Dickens",
        year: 1859,
        price: 90
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG',
        title: "The Little Prince",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Antoine de Saint-Exup??ry",
        year: 1943,
        price: 20
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg',
        title: "The Da Vinci Code",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Dan Brown",
        year: 2003,
        price: 12
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Inferno-cover.jpg',
        title: "Inferno",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Dan Brown",
        year: 2013,
        price: 15
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/8/86/TheLionWitchWardrobe%281stEd%29.jpg',
        title: "The Lion, the Witch and the Wardrobe",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "C. S. Lewis",
        year: 1950,
        price: 35
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/d/dc/TheEagleHasLanded.jpg',
        title: "The Eagle Has Landed",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Jack Higgins",
        year: 1975,
        price: 57
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/d/dc/The_Hunger_Games.jpg',
        title: "The Hunger Games",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Suzanne Collinsn",
        year: 2008,
        price: 877
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Godfather-Novel-Cover.png',
        title: "The Godfather",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Mario Puzo",
        year: 1975,
        price: 54
    }),

    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/d/de/Dune-Frank_Herbert_%281965%29_First_edition.jpg',
        title: "Dune",
        description: "Nesto 8 nesto nestso nesto nesto",
        writer: "Frank Herbert",
        year: 1969,
        price: 21
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