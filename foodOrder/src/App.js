import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import {React,useState} from 'react';
import Cart from "./components/Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App() {

  const[cartIsShown,setCartIsShown]=useState(false);

  const hideCardHandler=()=>{
     setCartIsShown();
  }

  const showCardHandler=()=>{
    setCartIsShown(true);
 }
  
  return (
    <CartProvider>
     {cartIsShown && <Cart onHideCart={hideCardHandler}/>}
      <Header onShowCart={showCardHandler}/>
      <main>
      <Meals/>
      </main>
      </CartProvider>
  );
}

export default App;
