import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './screens/LoginPage.tsx'
import SignUpPage from './screens/SignUpPage.tsx'
import { Toaster } from "react-hot-toast"
import Profile from './screens/Profile.tsx'
import CreateBlog from './screens/CreateBlog.tsx'
import Home from './screens/Home.tsx'
import SingleBlog from './screens/SingleBlog.tsx'
import UserLayout from './screens/UserLayout.tsx'
import RouteProtector from './config/RouteProtector.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <RouteProtector isAuthenticate={false} >
            <LoginPage />
          </RouteProtector>
        } />
        <Route path="/sign-up" element={
          <RouteProtector isAuthenticate={false} >
            <SignUpPage />
          </RouteProtector  >
        } />
        <Route path="/user" element={
          <RouteProtector isAuthenticate={true} >
            <UserLayout />
          </RouteProtector>
        }>
          <Route path="home" element={<Home />} />
          <Route path="home/:blogId" element={<SingleBlog />} />
          <Route path="create-blogs" element={<CreateBlog />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)