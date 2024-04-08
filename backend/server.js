
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const { Connection } = require('mysql2/typings/mysql/lib/Connection');
// const bcrypt = require('bcrypt');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from the backend!' };
  res.json(data);
});

// Add middleware to parse incoming JSON data
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MySQL connection pool
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'peellakanda'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
  }
});

// API endpoint for user signup
app.post('/signup', (req, res) => {
  const sql = "INSERT INTO users (`name`, `email`, `password`, `mobile`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.mobile
  ]
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("An error occurred");
    }
    return res.json(data);
  })
})

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ? ";
  db.query(sql, [req.body.email,req.body.password], (err, data) => {
    if (err) {
      return res.json("An error occurred");
    }
    if(data.length > 0 ){
      const user = data[0]; // Assuming the first row contains the user's data
      return res.json({ success: true, username: user.name });
    } else {
      return res.json("Faile");
    }
  })
})

app.get('/userdata', (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Name parameter is missing' });
  }
  const sql = 'SELECT email, mobile, password, points FROM users WHERE name = ?';
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Error retrieving data' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(result[0]); // Assuming "name" is unique; if not, loop through the result array
      }
    }
  });
});

app.put('/resetPass', (req, res) => {
  const { username , newPassword} = req.body;
  db.query('UPDATE users SET password=? WHERE name = ?', [newPassword,username], (err, result) => {
    if (err) {
      console.error('Error updating password:', err);
      res.status(500).send('Error updating password');
    } else {
      console.log('Password updated successfully');
      res.send('Password updated successfully');
    }
  });
});


app.post('/contact', (req, res) => {

  const sql = 'INSERT INTO userswantdata (`fname`,`lname`,`phone`,`email`,`city`,`subject`,`message`,`title`) VALUES (?) ';
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.phone,
    req.body.email,
    req.body.city,
    req.body.subject,
    req.body.message,
    req.body.title
  ];


  const recipient = req.body.email;
  const subject = "Pellakanda reception halls details";
  const message = ` Thanks For getting in touch with us , \n We are an emerging and recognizes hotel in the whole Narammala area \n speciallizing in supplying a special venue for your special event . In our premises We have three seperate halls .\n That the customers can chose from to hold their event \n thanks for taking the time to visit our site \n if you want to know more about our venue contact us via this number +(94)37 7200343` ;

  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'hotelpeellakanda@gmail.com', 
      pass: 'ecohbcxokepvpskm', 
    },
  });
  const mailOptions = {
    from: 'sadaruwan0427@gmail.com',
    to: recipient,
    subject: subject,
    text: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      db.query(sql, [values], (err, result) => {
        if (err) {
          console.error('email sent , Error inserting form data:', err);
          res.status(500).json({ success: false, error: 'email sent , Failed to insert form data' });
        } else {
          console.log('Form data inserted successfully !  email sent ');
          res.status(200).json({ success: true, message: 'Form data inserted successfully & Email sent succesfully!' });
        }
      });
    }
  });

});
  ////////////////////////////////////////////////  hall data

  // API endpoint to fetch data from the database using POST request
  app.post('/halldata', (req, res) => {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Name parameter is missing' });
    }
    const query = 'SELECT * FROM halldeta where id = ? '; // Replace "your_table_name" with your actual table name

    db.query(query, [id] , (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Error fetching data from the database' });
      }else {
        if (result.length === 0) {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.json(result[0]); // Assuming "name" is unique; if not, loop through the result array
        }
      }
    });
  });




  app.post('/inquereHall', (req, res) => {
    const formData = req.body;
    const values = [
      req.body.email,
      req.body.phone,
      req.body.title,
      req.body.fullName,
      req.body.message,
      req.body.banquetHall,
      req.body.date
    ];
    const checkQuery = 'SELECT * FROM hallinquere WHERE banquetHall = ? AND date = ?';
    db.query(checkQuery, [formData.banquetHall, formData.date], (checkError, checkResults) => {
      if (checkError) {
        console.error('Error checking data:', checkError);
        res.status(500).json({ message: 'Error checking data' });
      } else {
        if (checkResults.length > 0) {
          // Combination already exists, handle accordingly
          res.status(400).json({ already: true , message: 'Hall and date combination already exists' });
        } else {
          // Combination doesn't exist, proceed with insertion

          const recipient = req.body.email;
          const subject = "Inquery accepted";
          const message = `At the moment this hall is not booked \n So its avaliable for booking . You have to confirm the booking By visiting the hotel ` ;
        
          const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'hotelpeellakanda@gmail.com', 
              pass: 'ecohbcxokepvpskm', 
            },
          });
          const mailOptions = {
            from: 'sadaruwan0427@gmail.com',
            to: recipient,
            subject: subject,
            text: message,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              res.status(500).json({ error: 'Error sending email' });
            } else {

              const query = 'INSERT INTO hallinquere VALUES (?)';
              db.query(query, [values], (err, result) => {
                if (err) {
                  console.error('email sent , Error inserting form data:', err);
                  res.status(500).json({ success: false, error: 'email sent , Failed to insert form data' });
                } else {
                  console.log('Form data inserted successfully !  email sent ');
                  res.status(200).json({ success: true, message: 'Form data inserted successfully & Email sent succesfully!' });
                }
              });

              
            }
          });


        }
      }
    });

    // Insert formData into MySQL database

  });

  // Serve static files (CSS, images)
app.use(express.static('public'));

// API endpoint to fetch images
app.get('/gallery', (req, res) => {
  db.query('SELECT * FROM images', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});







// restorent LOL
// hotel is end
// letsgo mf


// app.get('/foods/:category', (req, res) => {
//   const category = req.params.category;
//   const query = 'SELECT * FROM foods WHERE category = ?';

//   db.query(query, [category], (err, results) => {
//     if (err) {
//       res.status(500).send('Error retrieving data');
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });

app.get('/foods', (req, res) => {
  const query = 'SELECT * FROM foods';
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/add-to-cart', async (req, res) => {
  try {
    const { productId, userId , price } = req.body;

    const [existingCartItem] = await db.promise().query(
      'SELECT * FROM cart WHERE name = ? AND product_name = ?',
      [userId, productId]
    );

    if (existingCartItem.length > 0) {
      await db.promise().query(
        'UPDATE cart SET quantity = quantity + 1 WHERE name = ? AND product_name = ?',
        [userId, productId]
      );
    } else {
      await db.promise().query(
        'INSERT INTO cart (name, product_name,quantity,price) VALUES (?, ?, 1, ?)',
        [userId, productId ,price]
      );
    }
    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/update-cart', async (req, res) => {
  try {
    const { productId, userId , quentity } = req.body;

      await db.promise().query(
        'UPDATE cart SET quantity = ? WHERE name = ? AND product_name = ?',
        [quentity,userId, productId]
      );
    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

// In your cart.js route (backend)
app.get('/cart/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await db.promise().query(
      'SELECT * FROM cart WHERE name = ?',
      [userId]
    );
    res.status(200).json(cartItems[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove an item from the cart
app.delete('/cart/:username/:product_name', async (req, res) => {
  try {
    const username = req.params.username;
    const product_name = req.params.product_name;

    // Delete the item from the cart for the specific user and product
    await db.promise().query(
      'DELETE FROM cart WHERE name = ? AND product_name = ?',
      [username, product_name]
    );

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/addresses/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const {   city, address, telephone } = req.body;
    await db.promise().query(
      'INSERT INTO addresses ( name , city, address, telephone) VALUES ( ?, ?, ?, ?)',
      [name , city, address, telephone]
    );
    res.status(200).json({ message: 'Your Address updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting data' });
  }
});

app.get('/userAdd/:name', (req, res) => {
  const name = req.params.name;
  const query = 'SELECT * FROM addresses WHERE name = ?'; // Change this query according to your table structure
  db.query(query, [name], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching address data' });
    }else{
      if (result.length > 0) {
        res.json(result[0]); // Send the user's address data
      } else {
        res.json({message:"empty"}); // Send an empty object if no address found
      }
    }
  });
});

app.post('/update-address/:name', (req, res) => {
  const name = req.params.name; 
  const addressData = req.body;
  const fname = addressData.fullName ;
  const city = addressData.city ;
  const address = addressData.address ;
  const telephone = addressData.telephone ;

  // Update the 'address' table with the new address data
  const query = 'UPDATE addresses SET city = ? , address = ? , telephone = ? WHERE name = ?';
  db.query(query, [fname,city,address,telephone, name], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error updating address' });
    } else {
      res.json({ message: 'Address updated successfully' });
    }
  });
});

// app.post('/orders', async (req, res) => {
//   try {

//     const { orderData , foodlist } = req.body;

//     // Format the foodlist data into an array of arrays
//     const formattedFoodlist = foodlist.map(food => [food.product_name, food.quantity]);

//     // Insert the order into the 'orders' table
//     const insertOrderQuery = 'INSERT INTO orders (name, price) VALUES (?, ?)';
//     const insertOrderValues = [orderData.name, orderData.price];
//     const [orderResult] = await db.promise().query(insertOrderQuery, insertOrderValues);
//     const orderId = orderResult.insertId;

//     // Insert the foodlist data into the 'order_details' table
//     const insertFoodlistQuery = 'INSERT INTO order_details (order_id, product_name, quantity) VALUES ?';
//     const insertFoodlistValues = formattedFoodlist.map(row => [orderId, ...row]);
//     await db.promise().query(insertFoodlistQuery, [insertFoodlistValues]);

//     const getUserAddressQuery = 'SELECT address FROM addresses WHERE name = ?';
//     const [userAddressRows] = await db.promise().query(getUserAddressQuery, [orderData.name]);
//     const address = userAddressRows.length > 0 ? userAddressRows[0].address : 'Address not found';

//     const recipient = "karunarathnechathu001@gmail.com";
//     const subject = `order from ${orderData.name}`;
//     const message = ` address ${address} , name ${orderData.name} , ${insertFoodlistValues} `;
  
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: 'sadaruwan0427@gmail.com', 
//         pass: 'sxsvdaybaaquxfhw', 
//       },
//     });
//     const mailOptions = {
//       from: 'sadaruwan0427@gmail.com',
//       to: recipient,
//       subject: subject,
//       text: message,
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Error sending email' });
//       } else {
//             console.log('Form data inserted successfully !  email sent ');   
//             res.status(200).json({ message: 'Form data inserted successfully & Email sent succesfully!' });
//       }
//     });    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error inserting data' });
//   }
// });

app.post('/orders', async (req, res) => {
  try {
    const { orderData, foodlist } = req.body;

    // Format the foodlist data into an array of arrays
    const formattedFoodlist = foodlist.map(food => [orderData.name,food.product_name, food.quantity]);

    // Insert the order into the 'orders' table
    const insertOrderQuery = 'INSERT INTO orders (name, price) VALUES (?, ?)';
    const insertOrderValues = [orderData.name, orderData.price];
    const [orderResult] = await db.promise().query(insertOrderQuery, insertOrderValues);
    const orderId = orderResult.insertId;

    // Insert the foodlist data into the 'order_details' table
    const insertFoodlistQuery = 'INSERT INTO order_details (order_id, username, product_name, quantity) VALUES ?';
    const insertFoodlistValues = formattedFoodlist.map(row => [orderId, ...row]);
    await db.promise().query(insertFoodlistQuery, [insertFoodlistValues]);

    const getUserAddressQuery = 'SELECT address FROM addresses WHERE name = ?';
    const [userAddressRows] = await db.promise().query(getUserAddressQuery, [orderData.name]);
    const address = userAddressRows.length > 0 ? userAddressRows[0].address : 'Address not found';

    const recipient = "restaurantpellakanda@gmail.com";
    const subject = `Order from ${orderData.name}`;
    
    // Create a formatted string for the foodlist
    const foodListString = formattedFoodlist.map(row => `${row[0]} - ${row[1]} qty`).join('\n');

    const message = `Address: ${address}\nName: ${orderData.name}\nFood List:\n${foodListString}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'hotelpeellakanda@gmail.com', 
        pass: 'ecohbcxokepvpskm', 
      },
    });
    const mailOptions = {
      from: 'sadaruwan0427@gmail.com',
      to: recipient,
      subject: subject,
      text: message,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Form data inserted successfully! Email sent.');
        res.status(200).json({ message: 'Form data inserted successfully & Email sent successfully!' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting data' });
  }
});

app.post('/clearCart', async (req, res) => {
  try {
    const { name } = req.body;
    await db.promise().query(
      'DELETE FROM cart WHERE name = ? ',
      [name]
    );
    res.status(200).json({ message: 'Your Cart was cleard ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting data ' });
  }
});

app.get('/userOrders/:name', (req, res) => {
  const name = req.params.name;
  const query = 'SELECT * FROM orders WHERE name = ? ORDER BY id DESC LIMIT 10;';

  db.query(query, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user orders' });
    } else {
      if (result.length > 0) {
        // const query2 = 'SELECT p_name FROM res_user_rating WHERE name = ?';
        // db.query(query2, [name], (err2, results2) => {
          // if (err2) {
            // console.error(err2);
            // return res.status(500).json({ message: 'Error fetching rating' });
          // } else {
            res.json(result); // Send as an object
          // }
        // });
      } else {
        res.json({ message: "empty" });
      }
    }
  });
});


app.post('/update-star', async (req, res) => {
  try {
    const { bonus, name } = req.body;
    console.log(bonus);
    const selectQuery = 'SELECT points FROM users WHERE name = ?';
    const [rows] = await db.promise().query(selectQuery, [name]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const currentPoints = rows[0].points;
    const updatedPoints = currentPoints + bonus;

    // Update the points for the user
    const updateQuery = 'UPDATE users SET points = ? WHERE name = ?';
    await db.promise().query(updateQuery, [updatedPoints, name]);

    res.status(200).json({ message: 'Star amount was updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//search in restorent

app.post('/search', (req, res) => {
  const { name } = req.body;
  const sql = `SELECT name FROM foods WHERE name LIKE '${name}%' `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });

});

app.post('/food', (req, res) => {
  const { name } = req.body;

  if (!name) {
      return res.status(400).json({ error: 'Name is required' });
  }

  const query = 'SELECT * FROM foods WHERE name = ?';

  db.query(query, [name], (err, results) => {
      if (err) {
          console.error('Error fetching food data:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'Food not found' });
      }

      const food = results[0];
      res.json(food);
  });
});

app.post('/selectRelatedFoods', (req, res) => {
  const { category } = req.body;

  // SQL query to select related foods
  const sql = 'SELECT * FROM foods WHERE category = ?';

  db.query(sql, [category], (error, results) => {
    if (error) {
      console.error('Error fetching related foods:', error);
      return res.status(500).json({ message: 'Error fetching related foods' });
    }
    
    // Send the related foods data as JSON response
    res.json(results);
  });
});

app.get('/selectFoods/:name', (req, res) => {
  const name = req.params.name;
  db.query(
    'SELECT product_name , quantity FROM cart WHERE name = ?',
    [name],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching cart data' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Cart not found' });
        } else {
          res.json(results);
        }
      }
    }
  );
});

app.get('/averageRating/:name', (req, res) => {
  const name = req.params.name;

  const query = 'SELECT rate,comment,date,p_name,category FROM res_user_rating WHERE name = ? ';
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching rating' });
    }else {
      if (results.length === 0) {
        res.status(404).json({ message: 'reviews not found' });
      } else {
        res.json(results);
      }
    }
  });
});

app.get('/getNonReview/:name', (req, res) => {
  const name = req.params.name;

  const query = 'SELECT product_name FROM order_details WHERE username = ? ';
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: ' fetching rating' });
    }else {
      
      if (results.length === 0) {
        res.status(404).json({ message: 'No orders found ' });
      } else {
        const query2 = 'SELECT p_name FROM res_user_rating WHERE name = ? ';
        db.query(query2,[name],(err2,results2) =>{
          if(err2){
            console.error(err2);
            return res.status(500).json({ message: 'Error fetching rating' });
          }else{
            const filteredResults = results.filter((result) => {
              const existsInResults2 = results2.some(
                (result2) => result2.p_name === result.product_name
              );
              return !existsInResults2;
            });

            res.json(filteredResults);
          }
        })
      }
    }
  });
});

app.post('/AddReview', async (req, res) => {
  try {
    const { product_name, username, rating, review_text } = req.body;

    // Use the 'execute' function to execute the SQL query
    const [result] = await db.execute(
      'INSERT INTO res_user_rating (p_name, name, rate, comment) VALUES (?, ?, ?, ?)',
      [product_name, username, rating, review_text]
    );

    res.status(200).json({ message: 'Data inserted successfully', insertedId: result.insertId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/getReviews', (req, res) => {
  const { name } = req.body;

  if (name.trim() !== '') {
    const query = 'SELECT * FROM res_user_rating WHERE p_name = ?';
    db.query(query, [name], (err, results) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ error: 'Error fetching reviews' });
      } else {
        res.json(results);
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid product name' });
  }
});



// app.get('/')
app.post('/admin-usersData', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
      if (err) {
          console.error('Something went wrong: ', err);
          res.status(500).send('Database query error');
      } else {
          res.status(200).json(results);
      }
  });
});
app.delete('/admin-usersData/:Id', (req, res) => {
  const userId = req.params.Id;
  db.query('DELETE FROM users WHERE id = ?', userId, (err, result) => {
      if (err) {
          console.error('Delete error: ', err);
          res.status(500).send('Delete error');
      } else {
          console.log(`User with ID ${userId} deleted successfully`);
          res.status(200).send('User deleted');
      }
  });
});



app.post('/admin-ordersData', (req, res) => {

  db.query('SELECT * FROM orders', (err, results) => {
      if (err) {
          console.error('Something went wrong: ', err);
          res.status(500).send('Database query error');
      } else {
          // Respond with a JSON representation of the query results
          res.status(200).json(results);
      }
  });
});
app.delete('/admin-ordersData/:Id', (req, res) => {
  const orderId = req.params.Id;
  db.beginTransaction(err => {
      if (err) {
          console.error('Begin transaction error: ', err);
          res.status(500).send('Transaction error');
          return;
      }
      db.query('DELETE FROM order_details WHERE order_id = ?', orderId, (err, result) => {
          if (err) {
              console.error('Delete from order_details error: ', err);
              db.rollback(() => {
                  res.status(500).send('Delete error');
              });
          } else {
              db.query('DELETE FROM orders WHERE Id = ?', orderId, (err, result) => {
                  if (err) {
                      console.error('Delete from orders error: ', err);
                      db.rollback(() => {
                          res.status(500).send('Delete error');
                      });
                  } else {
                      db.commit(err => {
                          if (err) {
                              console.error('Commit error: ', err);
                              db.rollback(() => {
                                  res.status(500).send('Commit error');
                              });
                          } else {
                              console.log(`Order with ID ${orderId} deleted successfully`);
                              res.status(200).send('Order deleted');
                          }
                      });
                  }
              });
          }
      });
  });
});



app.get('/admin-ratingData', (req, res) => {
  db.query('SELECT * FROM res_user_rating', (err, results) => {
      if (err) {
          console.error('Something went wrong: ', err);
          res.status(500).send('Database query error');
      } else {
          // Respond with a JSON representation of the query results
          res.status(200).json(results);
          // console.log(results);
      }
  });
});
app.delete('/admin-ratingData/:id', (req, res) => {
  const rateId = req.params.id;
  db.query('DELETE FROM res_user_rating WHERE id = ?', rateId, (err, result) => {
      if (err) {
          console.error('Delete error: ', err);
          res.status(500).send('Delete error');
      } else {
          console.log(`User with ID ${rateId} deleted successfully`);
          res.status(200).send('User deleted');
      }
  });
});



app.get('/admin-foodsData', (req, res) => {
  // Changing to a POST request to retrieve data (Consider whether this is appropriate)
  
  // Execute a query to select all records from the "users" table
  db.query('SELECT * FROM foods', (err, results) => {
      if (err) {
          console.error('Something went wrong: ', err);
          res.status(500).send('Database query error');
      } else {
          // Respond with a JSON representation of the query results
          res.status(200).json(results);
      }
  });
});
app.delete('/admin-foodsData/:id', (req, res) => {
  const rateId = req.params.id;
  db.query('DELETE FROM foods WHERE id = ?', rateId, (err, result) => {
      if (err) {
          console.error('Delete error: ', err);
          res.status(500).send('Delete error');
      } else {
          console.log(`User with ID ${rateId} deleted successfully`);
          res.status(200).send('User deleted');
      }
  });
});
app.put('/admin-foodsData/:id', (req, res) => {
  const foodId = req.params.id;
  const updatedFood = req.body;
  db.query('UPDATE foods set description = ? , price = ? WHERE id = ?', [ updatedFood.description ,updatedFood.price , foodId], (err, result) => {
      if (err) {
          console.error('Delete error: ', err);
          res.status(500).send('update error');
      } else {
          console.log(`food with ID ${foodId} updated successfully`);
          res.status(200).send('user deleted');
      }
  });
});
app.post('/admin-foodsData', (req, res) => {
  const newFood = req.body ;
  db.query('INSERT INTO foods (name, description, price, category) VALUES (?,?,?,?) ', [ newFood.name ,newFood.description , newFood.price , newFood.category ], (err, result) => {
      if (err) {
          console.error('add food error: ', err);
          res.status(500).send('add food error');
      } else {
          console.log(`Food item added successfully with ID: ${result.insertId}`);
          res.status(200).send('food item added');
      }
  });
});



app.post('/admin-hallsData', (req, res) => {
  db.query('SELECT * FROM halldeta', (err, results) => {
      if (err) {
          console.error('Something went wrong: ', err);
          res.status(500).send('Database query error');
      } else {
          // Respond with a JSON representation of the query results
          res.status(200).json(results);
      }
  });
});
app.put('/admin-hallsData/:id',(req,res) => {
  const hallId = req.params.id;
  const updatedHall = req.body ;
  db.query('UPDATE halldeta set des1 = ? , des2 = ? WHERE Id = ? ',[updatedHall.des1 , updatedHall.des2 , hallId] , (err,result) => {
    if (err) {
      console.error('Update error: ', err);
      res.status(500).send('update error');
    } else {
        console.log(`hall with ID ${hallId} updated successfully`);
        res.status(200).send('hall updated');
    }
  });
});



app.get('/admin-hallsBooking', (req, res) => {
  db.query('SELECT * FROM hallinquere', (err, results) => {
      if (err) {
          console.error('Something went wrong: ', err);
          res.status(500).send('Database query error');
      } else {
          // Respond with a JSON representation of the query results
          res.status(200).json(results);
      }
  });
});
app.post('/admin-hallsBooking', (req, res) => {
  const requestData = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'hotelpeellakanda@gmail.com', 
      pass: 'ecohbcxokepvpskm', 
    },
  });
  const mailOptions = {
    from: 'hotelpeellakanda@gmail.com',
    to: requestData.selectedBook.email,
    subject: 'Hall Booking Confirmation',
    text: `
      Dear ${requestData.selectedBook.fullName},
      
      Your hall booking for ${requestData.selectedBook.banquetHall} on ${requestData.selectedBook.date} has been confirmed.

      Thank you for choosing our services!

      ${requestData.repMail}
      
      Best regards,
      peellakanda hotel
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent');
    }
  });
});




app.get('/admin-askForData', (req, res) => {
  db.query('SELECT * FROM userswantdata', (err, results) => {
      if (err) {
          console.error('Something went wrong: ', err);
          res.status(500).send('Database query error');
      } else {
          // Respond with a JSON representation of the query results
          res.status(200).json(results);

      }
  });
});
app.post('/admin-askForData', (req, res) => {
  const requestData = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'hotelpeellakanda@gmail.com', 
      pass: 'ecohbcxokepvpskm', 
    },
  });
  const mailOptions = {
    from: 'hotelpeellakanda@gmail.com',
    to: requestData.selectedBook.email,
    subject: 'MORE DETAILS ABOUT PEELLAKANDA',
    text: `
      Dear ${requestData.selectedBook.fname},
      
      ${requestData.repMail}
      
      Best regards,
      peellakanda hotel
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent');
    }
  });
});


app.get('/admin-RowDashData', (req, res) => {
  const dashRowData = {
    user: 0,
    sales: 0,
    foods: 0,
    orders: 0,
  };
  db.query('SELECT COUNT(Id) AS userCount FROM users', (err, results) => {
    if (err) {
      console.error('Something went wrong: ', err);
      res.status(500).send('Database query error');
    } else {
      dashRowData.user = results[0].userCount; // Update user count

      db.query('SELECT SUM(price) AS total_price FROM orders', (err1, results1) => {
        if (err1) {
          console.error('Something went wrong: ', err1);
          res.status(500).send('Database query error');
        } else {
          dashRowData.sales = results1[0].total_price || 0; // Update total sales

          db.query('SELECT COUNT(id) AS foodsCount FROM foods', (err2, results2) => {
            if (err2) {
              console.error('Something went wrong: ', err2);
              res.status(500).send('Database query error');
            } else {
              dashRowData.foods = results2[0].foodsCount; // Update foods count

              db.query('SELECT COUNT(id) AS ordersCount FROM orders', (err3, results3) => {
                if (err3) {
                  console.error('Something went wrong: ', err3);
                  res.status(500).send('Database query error');
                } else {
                  dashRowData.orders = results3[0].ordersCount; // Update orders count

                  res.status(200).json(dashRowData);
                }
              });
            }
          });
        }
      });
    }
  });
});



// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});