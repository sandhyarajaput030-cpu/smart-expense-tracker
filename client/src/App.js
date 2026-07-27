import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GuestLayout from './components/guestLayout/GuestLayout';
import Home from './components/guestLayout/Home';
import About from './components/guestLayout/About';
import Login from './components/guestLayout/Login';
import Register from './components/guestLayout/Register';

import AdminLayout from "./components/adminLayout/AdminLayout";
import AdminDashboard from "./components/adminLayout/AdminDashboard";
import AdminExpenses from "./components/adminLayout/AdminExpenses";
import AdminProfile from "./components/adminLayout/AdminProfile";
import AdminTips from "./components/adminLayout/AdminTips";

import UserLayout from "./components/userLayout/UserLayout";
import UserDashboard from "./components/userLayout/UserDashboard";
import Profile from "./components/userLayout/Profile";
import Category from "./components/userLayout/Category";
import FinancialTips from "./components/userLayout/FinancialTips";

import AddTransaction from "./components/userLayout/AddTransaction";
import ViewTransaction from "./components/userLayout/ViewTransaction";
import UploadStatement from "./components/userLayout/UploadStatement";
import SetBudget from "./components/userLayout/SetBudget";
import ViewBudget from "./components/userLayout/ViewBudget";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GuestLayout />}>

          {/* DEFAULT HOME */}
          <Route index element={<Home />} />

          {/* OTHER PAGES */}
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

        </Route>

         {/* 🔐 ADMIN ROUTE */}
       <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="expenses" element={<AdminExpenses />} />
  <Route path="profile" element={<AdminProfile />} />
  <Route path="/admin/tips" element={<AdminTips />} />
</Route>

        {/* 👤 USER ROUTE */}
        <Route path="/user" element={<UserLayout />}>
  <Route index element={<UserDashboard />} />
  <Route path="profile" element={<Profile />} />
  <Route path="categories" element={<Category />} />
  <Route path="/user/tips" element={<FinancialTips />} />

    {/* TRANSACTIONS */}
          <Route path="add-transaction" element={<AddTransaction />} />
          <Route path="view-transaction" element={<ViewTransaction />} />
          <Route path="upload" element={<UploadStatement />} />

          {/* BUDGET */}
          <Route path="set-budget" element={<SetBudget />} />
          <Route path="view-budget" element={<ViewBudget />} />
          
        </Route>
        <Route path="/profile" element={<Navigate to="/user/profile" />} />
      </Routes>
    </div>
  );
}

export default App;