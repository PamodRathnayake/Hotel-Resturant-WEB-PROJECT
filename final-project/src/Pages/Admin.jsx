import React, { useEffect, useState } from 'react'
import '../components/css/admin.css'
import Anav from '../components/admin/Anav'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Admin() {
  
  const {username} = useParams();
  const [activeTab,setActiveTab] = useState('Dashboard');
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  //                                             now users part
  const [users,SetUsers] = useState([]);
  const [selectedUser,setSelected] = useState({
    Id:'',
    name:'',
    email:'',
    mobile:'',
    points:'',
  });
  const getUserData = () => {
      axios.post('http://localhost:5000/admin-usersData')
          .then(response => SetUsers(response.data))
          .catch(error => console.error('Fetching data error: ', error));
  };
  const handleRowClick = (user) => {
    setSelected(user);
  };
  const delUser = () =>{
    if (selectedUser.Id) {
        const confirmDelete = window.confirm("Are you sure want to delete this user ? ");
        if(confirmDelete){
          axios.delete(`http://localhost:5000/admin-usersData/${selectedUser.Id}`)
            .then(() => {
              setSelected({
                  Id: '',
                  name: '',
                  email: '',
                  mobile: '',
                  points: ''
              });
              getUserData();
            })
            .catch(error => console.error('Delete error: ', error));
        } 
    }
  };



//                                                now orders part
  const [orders,SetOrders] = useState([]);
  const [selectedOrder ,SetSelectedOrder] = useState({
    Id:'',
    name:'',
    price:'',
    date:'',
  });
  const handleOderRowClick = (order) => {
    SetSelectedOrder(order);
  }
  const getOrderData = () => {
      axios.post('http://localhost:5000/admin-ordersData')
          .then(response => SetOrders(response.data))
          .catch(error => console.error('Fetching data error: ', error));
  };
  const delOder = () =>{
    if(selectedOrder.Id){
      const confirmDelete = window.confirm("Are you sure want to delete this order ? ");
      if(confirmDelete){
        axios.delete(`http://localhost:5000/admin-ordersData/${selectedOrder.Id}`)
          .then(()=>{
            SetSelectedOrder({
              Id:'',
              name:'',
              price:'',
              date:'',
            });
            getOrderData();
          }).catch(error => console.error('delete error : ',error));
      }
    }
  }



//                                                now rating part
const [rating,Setrating] = useState([]);
const [selectedRate,setSelectedRate] = useState({
  id:'',
  p_name:'',
  name:'',
  rate:'',
  comment	:'',
  date:'',
  category:'',
});
const handleRateRowClick = (rate) => {
  setSelectedRate(rate);
};
const delRate = () => {
  if(selectedRate.id){
    const confirmDelete = window.confirm("Are you sure want to delete this comment ? ");
    if(confirmDelete){
      axios.delete(`http://localhost:5000/admin-ratingData/${selectedRate.id}`)
        .then(()=>{
          setSelectedRate({
            id:'',
            p_name:'',
            name:'',
            rate:'',
            comment	:'',
            date:'',
            category:'',
          });
          getRateData();
        }).catch(error => console.error('delete error : ',error));
    }
  }
} 
const getRateData = () => {
    axios.get('http://localhost:5000/admin-ratingData')
        .then(response => Setrating(response.data))
        .catch(error => console.error('Fetching data error: ', error));
};



//                                                now foods part
const [foods,SetFoods] = useState([]);
const [selectedFood,setSelectedFood] = useState({
  id:'',
  name:'',
  description:'',
  price:'',
  category	:'',
});
const [newFood,setNewFood] = useState({
  id:'',
  name:'',
  description:'',
  price:'',
  category	:'',
});
const handleFoodRowClick = (food) => {
  setSelectedFood(food);
};
const delFood = () => {
  if(selectedFood.id){
    const confirmDelete = window.confirm("Are you sure want to delete this food ? ");
    if(confirmDelete){
      axios.delete(`http://localhost:5000/admin-foodsData/${selectedFood.id}`)
        .then(()=>{
          setSelectedFood({
            id:'',
            name:'',
            description:'',
            price:'',
            category	:'',
          });
          getFoodData();
        }).catch(error => console.error('delete error : ',error));
    }
  }
} 
const getFoodData = () => {
    axios.get('http://localhost:5000/admin-foodsData')
        .then(response => SetFoods(response.data))
        .catch(error => console.error('Fetching data error: ', error));
};
const updateFood = () => {
  if(selectedFood.id){
    axios.put(`http://localhost:5000/admin-foodsData/${selectedFood.id}`,selectedFood)
      .then(() => {
        getFoodData();
      })
      .catch(error => console.error('Update error : ',error));
  }
};
const addFood = () => {
  axios.post(`http://localhost:5000/admin-foodsData`,selectedFood)
    .then(response => {
      setSelectedFood({
        id:'',
        name:'',
        description:'',
        price:'',
        category	:'',
      });
      getFoodData();
    }).catch(error=> console.error('Add food error : ',error));
}



//                                                now hall data part
const [hall,setHall] = useState([]);
const getHallData = () => {
    axios.post('http://localhost:5000/admin-hallsData')
        .then(response => setHall(response.data))
        .catch(error => console.error('Fetching data error: ', error));
};
const [selectedHall,setSelectedHall] = useState({
  Id :'',
  des1:'',
  des2:'',
  location:'',
  area:''
});
const updateHallData = () => {
  // alert(selectedHall.Id)
  if(selectedHall.Id !== ''){
    axios.put(`http://localhost:5000/admin-hallsData/${selectedHall.Id}`,selectedHall)
      .then(() =>{
        getHallData();
        setSelectedHall({
          Id :'',
          des1:'',
          des2:'',
          location:'',
          area:''
        });
      }).catch( error => {
        console.error('Update error : ',error);
      })
  }
};



//                                                now hall booking part
const [booking,SetBooking] = useState([]);
const getBookingData = () => {
    axios.get('http://localhost:5000/admin-hallsBooking')
        .then(response => SetBooking(response.data))
        .catch(error => console.error('Fetching data error: ', error));
};
const [selectedBook,setSelectedBook] = useState({
  email:'',
  phone:'',
  title:'',
  fullName:'',
  message:'',
  banquetHall:'',
  date:'',
});
const [repMail ,SetRepMail] = useState('');
const sendMail = () => {
  if (repMail !== '') {
    const requestData = {
      repMail: repMail,
      selectedBook: selectedBook
    };

    axios.post('http://localhost:5000/admin-hallsBooking', requestData)
      .then(response => {
        alert("Email sent");
        setSelectedBook({
          email: '',
          phone: '',
          title: '',
          fullName: '',
          message: '',
          banquetHall: '',
          date: ''
        });
        SetRepMail('');
      })
      .catch(error => {
        console.error("Error sending email: ", error);
        // alert("Error sending email");
      });
  } else {
    alert("Please fill in the email message");
  }
};




//                                                now ask for details part
const [askFor,SetAskFor] = useState([]);
const getAskData = () => {
    axios.get('http://localhost:5000/admin-askForData')
        .then(response => SetAskFor(response.data))
        .catch(error => console.error('Fetching data error: ', error));
};
const [selectedPeople,setSelectedPeople] = useState({
  Id:'',
  fname:'',
  lname:'',
  phone:'',
  email:'',
  city:'',
  subject:'',
  message:'',
  title:'',
});
const [repMailB ,SetRepMailB] = useState('');
const sendMail2 = () => {
  if (repMailB !== '') {
    const requestData = {
      repMail: repMailB,
      selectedBook: selectedPeople
    };

    axios.post('http://localhost:5000/admin-askForData', requestData)
      .then(response => {
        alert("Email sent");
        setSelectedPeople({
          Id:'',
          fname:'',
          lname:'',
          phone:'',
          email:'',
          city:'',
          subject:'',
          message:'',
          title:'',
        });
        SetRepMailB('');
      })
      .catch(error => {
        console.error("Error sending email: ", error);
        // alert("Error sending email");
      });
  } else {
    alert("Please fill in the email message");
  }
};


//                                               now dashboard part
const [dashRowData, setDashRowData] = useState({
  user: 0,
  sales: 0,
  foods: 0,
  orders: 0,
});
const getDashData = () => {
  axios.get('http://localhost:5000/admin-RowDashData')
    .then(response => setDashRowData(response.data))
    .catch(error => console.error('Fetching data error: ', error));
};
const [currentDate, setCurrentDate] = useState(new Date());
useEffect(() => {
  getDashData();
  const intervalId = setInterval(() => {
    setCurrentDate(new Date());
  }, 1000);
  return () => {
    clearInterval(intervalId);
  };
}, []);

  return (
    <div>
      <Anav name={username} />
      <div className="admin-container">
        <div className="admin-sidebar">
          <ul>
            <li onClick={() => {handleTabClick('Dashboard')
                                getDashData();  
            }}>Dashboard</li>
            <li onClick={() => {handleTabClick('Users');
                                getUserData();
            }}>Users</li>
            <li onClick={() => {handleTabClick('Orders')
                                getOrderData();
            }}>Orders</li>
            <li onClick={() => {handleTabClick('Ratings');
                                getRateData();
            }}>Ratings</li>
            <li onClick={() => {handleTabClick('Foods');
                                getFoodData();
            }}>Foods</li>
            <li onClick={() => {handleTabClick('Halldata');
                                getHallData();
            }}>Halldata</li>
            <li onClick={() => {handleTabClick('HallBooking');
                                getBookingData();
            }}>Hall Booking</li>
            <li onClick={() => {handleTabClick('AskForDetails');
                                getAskData();
            }}>Ask For Details</li>
          </ul>
        </div>
        <div className="admin-content">
          <div className="admin-c">
            <div className={`admin-hero-${activeTab}`}>
              <h1>{activeTab}</h1>
              {activeTab === 'Dashboard' && (
                <div className='admin-dash-container'>
                  <div className="admin-dash-row adr1">
                    <p>{currentDate.toLocaleString()}</p>
                    <button onClick={getDashData}>Refresh</button>
                  </div>
                  <div className="admin-dash-row adr2">
                    <div className="admin-dash-crd">
                      <h3>Users Count</h3>
                      <div className="admin-dash-crd-c">
                        {dashRowData.user}
                        <img src="/admin/user.png" alt="" />
                      </div>
                    </div>
                    <div className="admin-dash-crd">
                      <h3>Total Sales</h3>
                      <div className="admin-dash-crd-c">
                        Rs : {dashRowData.sales}
                        <img src="/admin/income.png" alt="" />
                      </div>
                    </div>
                    <div className="admin-dash-crd">
                      <h3>Food Items Count</h3>
                      <div className="admin-dash-crd-c">
                        {dashRowData.foods} Foods
                        <img src="/admin/food.png" alt="" />
                      </div>
                    </div>
                    <div className="admin-dash-crd">
                      <h3>Succesfull Orders</h3>
                      <div className="admin-dash-crd-c">
                        {dashRowData.orders} Orders
                        <img src="/admin/order.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="admin-dash-row relative">
                    <div className="admin-dash-bg-con">
                      WELCOME TO PEELLAKANDA ADMIN PANEL
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'Users' && (
                <div className='a-user-c'>
                  {users.length !== 0 ? (
                    <div>
                        <div className="table-con">
                          <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>MOBILE</th>
                                    <th>POINTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.Id} onClick={()=> handleRowClick(user)}>

                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.points}</td>
                                    
                                    </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        
                      <div className="edite-data">
                        <div className="edite-data-data">
                              <div className="edite-row">
                                Name
                                <input type="text" value={selectedUser.name}/>
                              </div>
                              <div className="edite-row">
                                Email
                                <input type="text" value={selectedUser.email}/>
                              </div>
                              <div className="edite-row">
                                MOBILE
                                <input type="text" value={selectedUser.mobile}/>
                              </div>
                              <div className="edite-row">
                                POINTS
                                <input type="text" value={selectedUser.points}/>
                              </div>
                        </div>
                        <div className="edite-data-btns">
                              <button onClick={(e)=>{
                                setSelected({
                                  id:'',
                                  name:'',
                                  email:'',
                                  mobile:'',
                                  points:''
                                });
                              }}>CLEAR</button>
                              <button onClick={()=>{delUser()}}>DELETE</button>
                        </div>  
                      </div>
                    </div>

                  ):(
                    <div className="ad-err">
                      No users found
                    </div>
                  )}
                  
                </div>
              )}
              {activeTab === 'Orders' && (
                  <div className='a-user-c'>
                    {orders.length !== 0 ? (
                      <div>
                      <div className="table-con">
                      <table>
                        <thead>
                            <tr className='head-tb'>
                                <th>Name</th>
                                <th>PRICE</th>
                                <th>DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} onClick={()=> handleOderRowClick(order)}>

                                    <td>{order.name}</td>
                                    <td>{order.price}</td>
                                    <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(order.date))}</td>
                                
                                </tr>
                            ))}
                        </tbody>
                      </table>
                      </div>
                      <div className="edite-data">
                        <div className="edite-data-data">
                              <div className="edite-row">
                                Name
                                <input type="text" value={selectedOrder.name}/>
                              </div>
                              <div className="edite-row">
                                Price
                                <input type="text" value={selectedOrder.price}/>
                              </div>
                              <div className="edite-row">
                                Date
                                <input type="text" value={selectedOrder.date}/>
                              </div>
                        </div>
                        <div className="edite-data-btns">
                              <button onClick={(e)=>{
                                SetSelectedOrder({
                                  name:'',
                                  price:'',
                                  date:''
                                });
                              }}>CLEAR</button>
                              <button onClick={()=>{delOder()}}>DELETE</button>
                        </div>  
                      </div>
                      </div>
                    ):(
                      <div className="ad-err">
                        No orders found
                      </div>
                    )}
                    
                  </div>
              )}
              {activeTab === 'Ratings' && (
                <div className='a-user-c'>
                {rating.length !== 0 ? (
                  <div>
                  <div className="table-con">
                  <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>User Name</th>
                            <th>Rate</th>
                            <th>Comment</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rating.map(rate => (
                            <tr key={rate.id} onClick={() => { handleRateRowClick(rate) }} >

                                <td>{rate.p_name}</td>
                                <td>{rate.name}</td>
                                <td>{rate.rate}</td>
                                <td>{rate.comment}</td>
                                <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(rate.date))}</td>
                            
                            </tr>
                        ))}
                    </tbody>
                  </table>
                  </div>
                  <div className="edite-data">
                        <div className="edite-data-data">
                              <div className="edite-row">
                              Product Name
                                <input type="text" value={selectedRate.p_name}/>
                              </div>
                              <div className="edite-row">
                              User Name
                                <input type="text" value={selectedRate.name}/>
                              </div>
                              <div className="edite-row">
                              Comment
                                <input type="text" value={selectedRate.comment}/>
                              </div>
                        </div>
                        <div className="edite-data-btns">
                              <button onClick={(e)=>{
                                setSelectedRate({
                                  id:'',
                                  p_name:'',
                                  name:'',
                                  rate:'',
                                  comment	:'',
                                  date:'',
                                  category:'',
                                });
                              }}>CLEAR</button>
                              <button onClick={()=>{delRate()}}>DELETE</button>
                        </div>  
                      </div>
                  </div>
                ):(
                  <div className="ad-err">
                    No ratings found
                  </div>
                )}
                
              </div>
              )}
              {activeTab === 'Foods' && ( 
                  <div className='a-user-c'>
                  {foods.length !== 0 ? (
                    <div>
                    <div className="table-con">
                    <table>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Food Name</th>
                              <th>DESCRIPTION</th>
                              <th>Price (Rs)</th>
                              <th>Category</th>
                          </tr>
                      </thead>
                      <tbody>
                          {foods.map(food => (
                              <tr key={food.id} onClick={() => { handleFoodRowClick(food) }}>
  
                                  <td>{food.id}</td>
                                  <td>{food.name}</td>
                                  <td>{food.description}</td>
                                  <td>{food.price}</td>
                                  <td>{food.category}</td>
                              
                              </tr>
                          ))}
                      </tbody>
                    </table>
                    </div>
                    <div className="edite-data">
                        <div className="edite-data-data">
                              <div className="edite-row">
                                Product Name
                                <input type="text" required value={selectedFood.name} onChange={
                                  e => setSelectedFood({...selectedFood,name:e.target.value})
                                }/>
                              </div>
                              <div className="edite-row">
                                Description
                                <textarea  
                                  cols="36" 
                                  rows="6" required
                                  style={{padding:'.5rem'}} 
                                  type="text" 
                                  value={selectedFood.description}
                                  onChange={e => {setSelectedFood({...selectedFood,description:e.target.value});
                                // setNewFood({...newFood,description:e.target.value});
                              }}
                                />
                              </div>
                              <div className="edite-row">
                                Category
                                <input type="text" required value={selectedFood.category} onChange={
                                  e => setSelectedFood({...selectedFood,category:e.target.value})
                                }/>
                              </div>
                              <div className="edite-row">
                                Price (Rs)
                                <input 
                                  type="text" required
                                  value={selectedFood.price}
                                  onChange={e => {setSelectedFood({...selectedFood,price:e.target.value});
                                  // setNewFood({ ...newFood, price: e.target.value });
                                  }}
                                />
                              </div>
                        </div>
                        <div className="edite-data-btns">
                              <button onClick={(e)=>{
                                setSelectedFood({
                                  id:'',
                                  name:'',
                                  description:'',
                                  price:'',
                                  category	:'',
                                });
                              }}>CLEAR</button>
                              <button onClick={()=>{delFood()}}>DELETE</button>
                              <button onClick={updateFood}>UPDATE</button>
                              <button onClick={addFood}>ADD NEW</button>
                        </div>  
                      </div>
                    </div>
                  ):(
                    <div className="ad-err">
                      No Foods found
                    </div>
                  )}
                  
                </div>
              )}
              {activeTab === 'Halldata' && ( 
                  <div className='a-user-c'>
                  {hall.length !== 0 ? (
                    <div>
                    <div className="table-con">
                    <table>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Description_1</th>
                              <th>Description_2</th>
                              <th>Location</th>
                              <th>Area</th>
                          </tr>
                      </thead>
                      <tbody>
                          {hall.map(h => (
                              <tr key={h.id} onClick={()=> setSelectedHall(h)}>
  
                                  <td>{h.Id}</td>
                                  <td>{h.des1}</td>
                                  <td>{h.des2}</td>
                                  <td>{h.location}</td>
                                  <td>{h.area}</td>
                              
                              </tr>
                          ))}
                      </tbody>
                    </table>
                    </div>
                    <div className="edite-data">
                        <div className="edite-data-data">
                              <div className="edite-row">
                                ID
                                <input type="text" required value={selectedHall.Id} />
                              </div>
                              <div className="edite-row">
                                Description_1
                                <textarea  
                                  cols="40" 
                                  rows="10" required
                                  style={{padding:'.5rem',margin:'1rem'}} 
                                  type="text" 
                                  value={selectedHall.des1}
                                  onChange={e => {setSelectedHall({...selectedHall,des1:e.target.value});
                                  }}
                                />
                              </div>
                              <div className="edite-row">
                                Description_1
                                <textarea  
                                  cols="40" 
                                  rows="10" required
                                  style={{padding:'.5rem',margin:'1rem'}} 
                                  type="text" 
                                  value={selectedHall.des2}
                                  onChange={e => {setSelectedHall({...selectedHall,des2:e.target.value});
                                  }}
                                />
                              </div>

                        </div>
                        <div className="edite-data-btns">
                              <button onClick={(e)=>{
                                setSelectedHall({
                                  Id :'',
                                  des1:'',
                                  des2:'',
                                  location:'',
                                  area:''
                                });
                              }}>CLEAR</button>
                              <button onClick={updateHallData}>UPDATE</button>

                        </div>  
                      </div>
                    </div>
                  ):(
                    <div className="ad-err">
                      No ratings found
                    </div>
                  )}
                  
                </div>
              )}
              {activeTab === 'HallBooking' && ( 
                  <div className='a-user-c'>
                  { booking.length !== 0 ? (
                    <div>
                    <div className="table-con">
                    <table>
                      <thead>
                          <tr>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Title</th>
                              <th>Full Name</th>
                              <th>Message</th>
                              <th>Hall</th>
                              <th>Date</th>
                          </tr>
                      </thead>
                      <tbody>
                          {booking.map(book => (
                              <tr key={book.id} onClick={() => { setSelectedBook(book) }}>
  
                                  <td>{book.email}</td>
                                  <td>{book.phone}</td>
                                  <td>{book.title}</td>
                                  <td>{book.fullName}</td>
                                  <td>{book.message}</td>
                                  <td>{book.banquetHall}</td>
                                  <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(book.date))}</td>
                              
                              </tr>
                          ))}
                      </tbody>
                    </table>
                    </div>
                    <div className="edite-data">
                        <div className="edite-data-data">
                              <div className="edite-row">
                                Email
                                <input type="text" value={selectedBook.email} />
                              </div>
                              <div className="edite-row">
                                Phone
                                <input type="text" value={selectedBook.phone} />
                              </div>
                              <div className="edite-row">
                                Full Name
                                <input type="text" value={selectedBook.fullName} />
                              </div>
                              <div className="edite-row">
                                Message
                                <textarea  
                                    cols="36" 
                                    rows="6" required
                                    style={{padding:'.5rem'}} 
                                    type="text" 
                                    value={selectedBook.message}
                                />
                              </div>
                              <div className="edite-row">
                                Hall
                                <input type="text" value={selectedBook.banquetHall} />
                              </div>
                              <div className="edite-row">
                                Date
                                <input type="text" value={selectedBook.date} />
                              </div>
                              <div className="edite-row">
                                Send Email
                                <textarea type="text" cols="36" 
                                    rows="6" required style={{padding:'.5rem'}}  value={repMail} onChange={(e)=> {SetRepMail(e.target.value)}} />
                              </div>
                        </div>
                        <div className="edite-data-btns">
                              <button onClick={(e)=>{
                                setSelectedBook({
                                  email:'',
                                  phone:'',
                                  title:'',
                                  fullName:'',
                                  message:'',
                                  banquetHall:'',
                                  date:'',
                                });
                              }}>CLEAR</button>
                              <button onClick={sendMail}>SEND REPLY</button>
                        </div>  
                      </div>        


                    </div>
                  ):(
                    <div className="ad-err">
                      No booking found
                    </div>
                  )}
                  
                </div>
              )}
              {activeTab === 'AskForDetails' && ( 
                  <div className='a-user-c'>
                  {askFor.length !== 0 ? (
                    <div>
                    <div className="table-con">
                    <table>
                      <thead>
                          <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>City</th>
                              <th>Subject</th>
                              <th>Message</th>
                              <th>Title</th>
                          </tr>
                      </thead>
                      <tbody>
                          {askFor.map( ask => (
                              <tr key={ask.id} onClick={()=> setSelectedPeople(ask) }>
  
                                  <td>{ask.fname}</td>
                                  <td>{ask.lname}</td>
                                  <td>{ask.phone}</td>
                                  <td>{ask.email}</td>
                                  <td>{ask.city}</td>
                                  <td>{ask.subject}</td>
                                  <td>{ask.message}</td>
                                  <td>{ask.title}</td>
                              
                              </tr>
                          ))}
                      </tbody>
                    </table>
                    </div>
                    <div className="edite-data">
                        <div className="edite-data-data">
                              <div className="edite-row">
                                First Name
                                <input type="text" value={selectedPeople.fname} />
                              </div>
                              <div className="edite-row">
                                phone
                                <input type="text" value={selectedPeople.phone} />
                              </div>
                              <div className="edite-row">
                                Email
                                <input type="text" value={selectedPeople.email} />
                              </div>
                              <div className="edite-row">
                                City
                                <input type="text" value={selectedPeople.city} />
                              </div>
                              <div className="edite-row">
                                Subject
                                <input type="text" value={selectedPeople.subject} />
                              </div>
                              <div className="edite-row">
                                Message
                                <textarea  
                                    cols="36" 
                                    rows="6" required
                                    style={{padding:'.5rem'}} 
                                    type="text" 
                                    value={selectedPeople.message}
                                />
                              </div>
                              <div className="edite-row">
                                Email Body
                                <textarea type="text" cols="36" 
                                    rows="6" required style={{padding:'.5rem'}}  value={repMailB} onChange={(e)=> {SetRepMailB(e.target.value)}} />
                              </div>
                        </div>
                        <div className="edite-data-btns">
                              <button onClick={(e)=>{
                                setSelectedPeople({
                                  Id:'',
                                  fname:'',
                                  lname:'',
                                  phone:'',
                                  email:'',
                                  city:'',
                                  subject:'',
                                  message:'',
                                  title:'',
                                });
                              }}>CLEAR</button>
                              <button onClick={sendMail2}>SEND REPLY</button>
                        </div>  
                      </div> 
                    </div>
                  ):(
                    <div className="ad-err">
                      No peoples found
                    </div>
                  )}
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
