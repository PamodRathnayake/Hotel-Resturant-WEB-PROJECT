import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstView from './Pages/FirstView';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import { UserProvider } from './components/UserContext';
import Dashboard from './Pages/Dashboard';
import Hotel from './Pages/Hotel';
import Halls from './Pages/Halls';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Hall from './Pages/Hall';
import Service from './Pages/service';
import Gallery from './Pages/Gallery';
import Rest from './Pages/Rest';
import BuyFoods from './Pages/BuyFoods';
import Food from './Pages/Food';
import Alogin from './components/admin/Alogin';
import Admin from './Pages/Admin';

function App() {

  return (
    <UserProvider>

      <div className='root'>
        <Router>
          
          <Routes>

            <Route exact path="/" element={<FirstView/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/profile" element={<Dashboard/>}/>
            <Route exact path="/hotel" element={<Hotel/>} />
            <Route exact path="/halls" element={<Halls/>} />
            <Route exact path="/services" element={<Services/>} />
            <Route exact path="/contact" element={<Contact/>} />
            <Route exact path="/hall/:hallId" element={<Hall/>} />
            <Route exact path="/service/:serviceName" element={<Service/>} />
            <Route exact path="/food/:name" element={<Food/>} />
            <Route exact path="/gallery" element={<Gallery/>} />
            <Route exact path="/resturant" element={<Rest/>} />
            <Route exact path="/BuyFoods/:data1/:data2" element={<BuyFoods/>} />
            <Route exact path="/admin" element={<Alogin/>} />
            <Route exact path="/admin/:username" element={<Admin/>} />

          </Routes>
          
        </Router> 
      </div>

    </UserProvider>
  )
}

export default App
