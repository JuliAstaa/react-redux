import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedProduct,
  increaseQtyProduct,
  decreaseQtyProduct,
  totalPrice,
} from "./productListSlice";
import { IoClose } from "react-icons/io5";
import { FaStar, FaCartPlus, FaMinus, FaPlus } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { addToCart } from "../cart/cartSlice";

const DetailProduct = ({ setClickSelectedProduct }) => {
  const product = useSelector(selectedProduct);
  const price = useSelector(totalPrice);
  const dispatch = useDispatch();

  const handleWhatApps = () => {
    const orderDetail = product
      .map((item, index) => {
        const numItem = index + 1;
        return `${numItem}. ${item.title}(${item.quantity}) - price: $${item.totalPrice} \nimages: ${item.image}`;
      })
      .join("\n");

    const whatsappMsg = `Hi👋, I would like to order this\n\n${orderDetail}\n\nTotal price: $${price}`;
    const whatsappUrl = `https://wa.me/6285161917705?text=${encodeURIComponent(
      whatsappMsg
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const stars = Array.from({ length: 5 });

  const handelClick = (e) => {
    if (e.target.id === "bg-modal") {
      setClickSelectedProduct((current) => !current);
    }
  };
  return (
    <div
      id="bg-modal"
      className="fixed z-50 w-full h-screen top-0 left-0 backdrop-blur-sm flex justify-center items-center"
      onClick={handelClick}
    >
      <div className="w-full lg:w-1/2 h-auto mx-auto border rounded-md bg-white">
        {product.map((product, index) => {
          return (
            <div key={index} className="">
              <div className="flex justify-end">
                <button
                  className="bg-red-500"
                  aria-label="closeModal"
                  onClick={() => setClickSelectedProduct((current) => !current)}
                >
                  <div className="w-16 h-8  text-white p-1  flex justify-center items-center">
                    <IoClose className="text-xl" />
                  </div>
                </button>
              </div>
              <div className="flex items-start w-full h-auto p-4 gap-2">
                <div className="img w-1/4 flex justify-start items-start border rounded-md p-1">
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text w-3/4">
                  <div className="title">
                    <h1 className="font-semibold text-lg">{product.title}</h1>
                  </div>
                  <div className="desc mt-2">
                    <p className="text-sm text-slate-700">
                      {product.description}
                    </p>
                  </div>
                  <div className="category mt-4 bg-[#495E57] w-fit px-8 py-1 rounded-sm">
                    <p className="text-white capitalize">{product.category}</p>
                  </div>
                  <div className="rating flex items-center">
                    <div className="star flex items-center">
                      {stars.map((_, index) => {
                        return (
                          <span
                            key={index}
                            className={`${
                              index + 1 < Math.floor(product.rating.rate + 1)
                                ? "text-[#FFB534]"
                                : "text-gray-500"
                            }`}
                          >
                            <FaStar />
                          </span>
                        );
                      })}
                      <span>{`(${product.rating.rate})`}</span>
                    </div>
                  </div>
                  <div className="price">
                    <p>Price: ${product.price}</p>
                  </div>
                </div>
              </div>
              <div className="footer pt-2 flex justify-between lg:justify-end items-center gap-2 border-t-2">
                <div className="qty flex gap-2 justify-center items-center border">
                  <button
                    onClick={() => dispatch(decreaseQtyProduct())}
                    className="w-6 h-6 flex justify-center items-center border-r cursor-pointer"
                    aria-label="decrease"
                    disabled={product.quantity === 1 ? true : false}
                  >
                    <FaMinus />
                  </button>
                  <span className="w-6 h-6 flex justify-center items-center">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(increaseQtyProduct())}
                    aria-label="increase"
                    className="border-l w-6 h-6 flex justify-center items-center cursor-pointer"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="price-footer">
                  <p>Total : ${product.totalPrice.toFixed(2)}</p>
                </div>
                <div className="buy flex">
                  <div className="addToCart">
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      aria-label="addToCart"
                      className=" bg-[#495E57] hover:bg-[#3F5049] text-white flex justify-center items-center w-20 lg:w-32 h-full py-2"
                    >
                      <FaCartPlus className="text-2xl" />
                    </button>
                  </div>
                  <div className="whatsApp">
                    <button
                      onClick={handleWhatApps}
                      aria-label="checkoutWhatsapp"
                      className="bg-[#25D366] text-white flex justify-center items-center w-20 lg:w-32 h-full py-2 rounded-br-md"
                    >
                      <FaWhatsapp className="text-2xl" />{" "}
                      <span className="hidden lg:block">Checkout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailProduct;
