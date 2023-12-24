import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import { selectedCartItem, totapPrice } from "./cartSlice";
import { IoMdClose } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { incrementQty, decrementQty, deleteAItem } from "./cartSlice";
import { useDispatch } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const CartModal = ({ handleClose }) => {
  const cartItems = useSelector(selectedCartItem);
  const totalPrice = useSelector(totapPrice);
  const dispatch = useDispatch();

  const handleWhatApps = () => {
    const orderDetail = cartItems
      .map((item, index) => {
        const numItem = index + 1;
        return `${numItem}. ${item.title}(${item.quantity}) - price: $${item.totalPrice} \nimages: ${item.image}`;
      })
      .join("\n");

    const whatsappMsg = `Hi👋, I would like to order this\n\n${orderDetail}\n\nTotal price: $${totalPrice}`;
    const whatsappUrl = `https://wa.me/6285161917705?text=${encodeURIComponent(
      whatsappMsg
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleIncrementQty = (item) => {
    dispatch(incrementQty(item));
  };

  const handleDecrementQty = (item) => {
    dispatch(decrementQty(item));
  };
  const handleDeleteAItem = (item) => {
    dispatch(deleteAItem(item));
  };

  return (
    <Modal>
      <div className="flex flex-col h-full relative">
        <div className="sticky z-10 top-0 left-0 p-2 bg-[rgba(255,255,255,0.2)] backdrop-blur-sm">
          <button
            className="close bg-slate-200 rounded-full p-2 w-fit hover:bg-red-600 hover:text-white duration-200 "
            onClick={handleClose}
          >
            <IoMdClose />
          </button>
        </div>
        {cartItems.length !== 0 ? (
          <div className="item flex-col flex gap-4  p-4 ">
            {cartItems.map((item) => {
              return (
                <div key={item.id} className="flex w-full py-4 gap-4 border-b">
                  <div className="w-full">
                    <div className="image w-full h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="w-3/4 lg:w-[90%]">
                    <h1 className="font-bold text-black text-lg">
                      {item.title}
                    </h1>
                    <p className="whitespace-nowrap text-ellipsis overflow-x-hidden">
                      {item.description}
                    </p>

                    <span className="price text-base text-black">
                      ${item.totalPrice}{" "}
                    </span>
                    <div className="qty">
                      <p>qty.</p>
                      <div className="flex gap-2 items-center">
                        {item.quantity <= 1 ? (
                          <button
                            className="border p-1 group hover:bg-slate-300"
                            onClick={() => handleDeleteAItem(item)}
                          >
                            <FaMinus className="font-bold " />
                          </button>
                        ) : (
                          <button
                            className="border p-1 group hover:bg-slate-300"
                            onClick={() => handleDecrementQty(item)}
                          >
                            <FaMinus className="font-bold " />
                          </button>
                        )}

                        <span className="font-bold">{item.quantity}</span>
                        <button
                          className="border p-1 group hover:bg-slate-300"
                          onClick={() => handleIncrementQty(item)}
                        >
                          <FaPlus className="font-bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
            <span className="text-9xl font-bold text-slate-300 -rotate-12">
              <IoCartOutline />
            </span>
            <p className="text-black  text-lg">Your cart is empty:(</p>
            <button
              onClick={handleClose}
              className="p-1 border-indigo-700 hover:border-indigo-400 border-2 rounded-md text-indigo-700 hover:text-indigo-400 font-semibold mt-4 hover:bg-slate-100 duration-300 "
            >
              Buy now
            </button>
          </div>
        )}
      </div>
      <div className=" flex justify-between items-center z-10 bottom-0 left-0 p-2 bg-[rgba(255,255,255,0.2)] backdrop-blur-sm">
        <div>
          <h1>Total: ${totalPrice.toFixed(2)}</h1>
        </div>
        <button
          onClick={handleWhatApps}
          className="whatsapp flex justify-center items-center gap-2  bg-green-600 rounded-full p-2 w-fit hover:bg-red-600 hover:text-white duration-200 "
        >
          <FaWhatsapp className="text-white text-2xl" />{" "}
          <p className="text-white font-semibold">Checkout</p>
        </button>
      </div>
    </Modal>
  );
};

export default CartModal;
