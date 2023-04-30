import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Cart } from './components/Cart/Cart'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { SingleCategory } from './components/Home/Categories/SingleCategory'
import Home from './components/Home/Home'
import { SingleProduct } from './components/Home/Products/SingleProduct'
import { Profile } from './components/Profile/Profile'
import { Sidebar } from './components/Sidebar/Sidebar'
import { UserForm } from './components/UserForm/UserForm'
import { getCategories } from './store/categories/categoriesSlice'
import { getProducts } from './store/products/productsSlice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);


  return (
    <div className='app'>
       <Header />
       <UserForm />
       <div className='container'>
          <Sidebar />
          <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/products/:id' element = {<SingleProduct />} />
            <Route path='/profile' element = {<Profile />} />
            <Route path='/categories/:id' element = {<SingleCategory />} />
            <Route path='/cart' element = {<Cart />} />
          </Routes>
        </div>
        
      <Footer /> 
    </div>
  )
}


export default App
