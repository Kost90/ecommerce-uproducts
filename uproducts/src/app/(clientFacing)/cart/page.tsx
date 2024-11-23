import React from 'react';
import { UseDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '@/lib/redux/selectors/cartSelectors';

function Cartpage() {
  // const cartItems = useSelector(selectCartItems);

  // console.log(cartItems);
  return <div>Cart</div>;
}

export default Cartpage;
