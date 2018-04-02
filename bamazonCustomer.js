var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

// connects to sql database and calls userBuy 
connection.connect(function(err) {
    console.log('Connected as id: ' + connection.threadId);
    userBuy();
})
// userBuy runs the app
function userBuy() {
    connection.query('SELECT * FROM products', function(err, res) {
        console.log('Items available for sale: ');
        for(var i = 0; i < res.length; i++) {
            console.log(
                'Item ID: ' +
                  res[i].item_id +
                ' || Product: ' + 
                  res[i].product_name +
                ' || Price: ' + 
                  res[i].price
            );
        }
    inquirer
        .prompt([{
            name: 'id',
            type: 'input',
            message: 'Enter the item ID of the product you are trying to purchase.',
            validate: function(id) {
                if (isNaN(id) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        },{
            name: 'units',
            type: 'input',
            message: 'How many units of this product do you want to buy?',
            validate: function(units) {
                if (isNaN(units) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        }])
        .then(function(input) {
            //console.log(input.id);
            var chosenItem = res[input.id - 1];
           // console.log(chosenItem)
            var oldInv = chosenItem.stock_quantity;

            var updatedInv = oldInv - input.units;
            //console.log(updatedInv);

            // tell customer the price of the of there purchase in if 

            if (updatedInv > -1) {
                connection.query('UPDATE products SET ? WHERE ?', 
                [{stock_quantity: updatedInv}, {item_id: input.id}],);
                var priceToatal = parseFloat(input.units) * parseFloat(chosenItem.price);
                console.log('Your cart total comes out to: $' + priceToatal);
                userBuy();
            }
            else{
                console.log('Sorry, we are out of stock for the chosen product.')
                userBuy();
            }
        })
    });
}

