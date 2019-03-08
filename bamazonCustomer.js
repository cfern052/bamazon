var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon. The worlds leading fake amazon site!")
    listProducts();
});

function listProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("~~~~~~~~~~~~~~~~~~~");
        console.log("Accessing Database");
        console.log("~~~~~~~~~~~~~~~~~~~");
        console.log(res);
        search();
    });

    function search() {
        inquirer
            .prompt({
                type: "input",
                message: "Enter the ID of the product you would like to purchase:",
                name: 'id'
            },
                {
                    type: "input",
                    message: "Enter the amount you would like to purchase:",
                    name: "quantity"

                }
            )
            .then(function (answer) {
                connection.query('SELECT * FROM products WHERE product_name = ' + answer.id, function(err, result){
                    console.log(err)
     
                    if(result[0].stock_quantity > parseInt(answer.quantity)){
     
                        var newQuantity = parseInt(result[0].stock_quantity) - parseInt(answer.quantity);
                        con.query("UPDATE products SET stock_quantity = " + newQuantity +" WHERE product_name = " + answer.id, function(err, res){
                            console.log("Order Successful");
                            listProducts()
                        })
                    }else {
                        console.log("insufficient quantity")
                        search()
                    }
                })


            })
    }
}

