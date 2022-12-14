import React from 'react';
import CartContext from './cart.context';
import { useReducer } from 'react';

const defaultCartState={
    items:[],
    totalAmount:0,
}

const cartReducer=(state,action)=>{
    if(action.type==='Add-action'){

        const updatedTotalAmount= state.totalAmount + action.item.amount*action.item.price;
       
        const existingCartItemIndex= state.items.findIndex(
            (item)=>item.id===action.item.id
            );
        

        const existingCartItem=state.items[existingCartItemIndex];
        let updatedItems

        if(existingCartItem){
            let updatedCartItem={
                ...existingCartItem,
                amount: existingCartItem.amount+action.item.amount,
            }
          
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedCartItem;

        }
        else{

            updatedItems=state.items.concat(action.item)
        }

        
      
        console.log(updatedTotalAmount);

        return {
            items: updatedItems,
            totalAmount:updatedTotalAmount,
        }
    }
    else if(action.type==='Remove-action'){
        const existingCartItemIndex= state.items.findIndex(
            (item)=>item.id===action.id
            );

        const existingCartItem=state.items[existingCartItemIndex];
        const updatedTotalAmount= state.totalAmount - existingCartItem.price;
        let updatedItems

        if(existingCartItem.amount===1){
            updatedItems=state.items.filter(item=>item.id!=action.id);
        }
        else{

            let updatedItem={...existingCartItem,amount:existingCartItem.amount-1}

            updatedItems=[...state.items]
            updatedItems[existingCartItemIndex]=updatedItem;

        }
        return {
            items: updatedItems,
            totalAmount:updatedTotalAmount,
        }
    }

 return defaultCartState;
}
const CartProvider=(props)=>{

    const[cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler=(item)=>{
        dispatchCartAction({
         type:'Add-action',
         item:item,
        })
    }

    const removeItemFromCartHandler=(id)=>{
        dispatchCartAction({
            type:'Remove-action',
            id:id,
           })
    }

    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler ,
        removeItem: removeItemFromCartHandler,
    }
return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
)
}

export default CartProvider;