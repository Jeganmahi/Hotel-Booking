import logo from './logo.svg';
import './App.css';
import Home from './customer/home';
import Login from './customer/components/Login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from './customer/components/Sign-up';
import Dashboard from './customer/Dashboard';
import HomePage from './customer/HomePage';
import HotelViewPage from './customer/HotelViewPage';
import BookingCard from './customer/components/BookingCard';
import BookingSuccess from './customer/components/BookingSuccess';
import HDashboard from './hotelOwner/HDashboard';
import { AuthProvider } from './AuthContext';
import About from './About';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
       <Home/>
      

      <Router>
      <Routes>
        
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/sign-in" element={<SignUp/>}/>
        <Route exact path='/Dashboard' element={<Dashboard/>}/>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/hotelPage' element={<HotelViewPage/>}/>
        <Route exact path='/bookingPage' element={<BookingCard/>}/>
        <Route exact path='/bookingSuccess' element={<BookingSuccess/>}/>
        <Route exact path='/HDashboard' element={<HDashboard/>}/>
        <Route exact path='/About' element={<About/>}/>

      </Routes>
     
    </Router>
      
   
    </div>
  );
}

export default App;
