module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalNumber = oldCart.totalNumber || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id){
        var storedItem = this.items[id];
        //Ako ne postoji napravi novi
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, num: 0, price: 0};
        }
        //Ako postoji povecaj br stanje
        storedItem.num++;
        storedItem.price = storedItem.item.price * storedItem.num;
        this.totalNumber++;
        this.totalPrice += storedItem.item.price;
    }

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};