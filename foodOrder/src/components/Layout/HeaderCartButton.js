
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css"
import { useContext ,useEffect,useState} from "react";
import CartContext from "../../Store/cart.context";

const HeaderCartButton=(props)=>{
  const[btnIsHighlighted,setBtnIsHighlighted]=useState(false);

const cardCtx=useContext(CartContext);
const numberOfCartItems=cardCtx.items.reduce((curNumber,item)=>{
     return curNumber+item.amount;
},0)

const {items}=cardCtx;

const btnClasses=`${classes.button}  ${btnIsHighlighted ? classes.bump:''} `;

useEffect(()=>{
  if(cardCtx.items.length===0){
    return;
  }
  setBtnIsHighlighted(true)
  
  const timer=setTimeout(()=>setBtnIsHighlighted(false),300);
  return ()=>{
    clearTimeout(timer);
  }
},[items])

return(
  <button className={!btnIsHighlighted? classes.button:btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
    <CartIcon />
    </span>
    <span>
    Your Cart
    </span>
    <span className={classes.badge}>
    {numberOfCartItems}
    </span>
  </button>
    )
}

export default HeaderCartButton;