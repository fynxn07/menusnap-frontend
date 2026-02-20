import ContactPage from "./pages/ContactPage"
import LandingPage from "./pages/LandingPage"
import { Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import Step1Details from "./pages/Step1Details"
import Step4Finish from "./pages/Step4Finish"
import Step3Tables from "./pages/Step3Tables"
import Step2Branding from "./pages/Step2Branding"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import GoogleCallback from "./pages/GoogleCallback"
import MenuPage from "./pages/MenuPage"
import AddCategory from "./pages/AddCategories"
import AddItem from "./pages/AddItems"
import ViewItem from "./pages/ViewItems"
import EditItem from "./pages/EditItems"
import Profile from "./pages/ProfilePage"
import Kitchen from "./pages/KitchenPage"
import Waiter from "./pages/WaiterPage"
import CustomerMenu from "./pages/CustomerMenu"
import CustomerCart from "./pages/CustomerCart"
import OrderTracking from "./pages/OrderTracking"
import AdminOrders from "./pages/AdminOrders"
import AdminOrderDetails from "./pages/AdminOrderDetails"
import VerifyOTP from "./pages/VerifyOTP"
import ResetPassword from "./pages/ResetPassword"
import RequestOTP from "./pages/RequestOTP"



function App() {


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/auth/google/callback" element={<GoogleCallback />}/>

      <Route path="/forgot-password" element={<RequestOTP/>}/>  
      <Route path="/verify-otp" element={<VerifyOTP/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>

      <Route path="/onboarding/details" element={<Step1Details />} />
      <Route path="onboarding/branding" element={<Step2Branding />} />
      <Route path="/onboarding/tables" element={<Step3Tables />} />
      <Route path="/onboarding/finish" element={<Step4Finish />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/menu" element={<MenuPage />}/>
      <Route path="/add_categories" element={<AddCategory/>}/> 
      <Route path="/add_items" element={<AddItem/>}/> 
      <Route path="/view_items/:id" element={<ViewItem/>}/>
      <Route path="/edit_items/:id" element={<EditItem/>}/>
      
      <Route path="/profile" element={<Profile/>}/>

      <Route path="/kitchen" element={<Kitchen/>}/>
      <Route path="/waiter" element={<Waiter/>}/>
      <Route path="/menu/:restaurantId/:tableId" element={<CustomerMenu/>}/>
      <Route path="/cart/:tableId" element={<CustomerCart />} />
      <Route path="/track/:orderId" element={<OrderTracking/>}/>
      <Route path="/admin_orders" element={<AdminOrders/>}/>
      <Route path="/admin_orders/:id" element={<AdminOrderDetails/>}/>

    </Routes>


  )
}

export default App
