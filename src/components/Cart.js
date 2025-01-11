import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

const Cart = ({ cart, setIsOpenCart, removeFromCart }) => (
  <div className="absolute z-20 p-8 h-screen w-full sm:w-1/3 top-0 right-0 bg-white">
    <div className="flex text-black justify-between items-center">
      <span className="sm:text-2xl text-lg font-bold">Your Cart</span>
      <span
        onClick={() => setIsOpenCart(false)}
        className="text-red-500 cursor-pointer"
      >
        <FontAwesomeIcon size="2x" icon={faClose} />
      </span>
    </div>

    {/* Make this part scrollable */}
    <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
      {cart?.length === 0 ? (
        <span className="py-4 flex text-black justify-center">
          Your cart is empty.
        </span>
      ) : (
        cart?.map((item, index) => (
          <div
            key={index}
            className="flex py-4 my-4 text-black border-b-2 border-black justify-between items-start"
          >
            <div className="grid grid-cols-5 h-full w-full items-center gap-2">
              <div className=" col-span-1 flex h-full border w-auto">
                <img
                  src={item?.products?.image_url} // Properti relasi dari Supabase
                  alt={item?.products?.name}
                  className="w-full flex h-full"
                />
              </div>
              <div className="flex col-span-4 w-full h-full flex-col">
                <div className="flex font-bold text-2xl flex-wrap">
                  {item?.products?.name}
                </div>
                <div className="text-xs pt-3 text-slate-500">
                  Price: Rp {item?.products?.price}
                </div>
                <div className="text-xs py-1 text-slate-500">
                  Qty: {item.quantity} Pcs
                  {/* Menggunakan quantity dari tabel cart_items */}
                </div>
                <div className="text-xs text-slate-500">
                  Total Price: Rp {item?.products?.price * item.quantity}
                </div>
              </div>
            </div>
            <div
              onClick={() => removeFromCart(item.products?.id)} // Menggunakan item.id dari tabel cart_items
              className="text-xs cursor-pointer underline text-slate-500"
            >
              Remove
            </div>
          </div>
        ))
      )}
    </div>

    {cart?.length !== 0 ? (
      <div className="flex justify-center pt-2">
        <Button
          size="medium"
          color="default"
          className="rounded-md"
          label="Continue"
        />
      </div>
    ) : null}
  </div>
);

export default Cart;
