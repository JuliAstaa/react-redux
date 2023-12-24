import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectedTotalCartItem } from "../features/cart/cartSlice";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { searchProductBy } from "../features/productlist/productListSlice";

const Header = ({ handleOpen }) => {
  const cartTotalItems = useSelector(selectedTotalCartItem);
  const dispatch = useDispatch();

  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row h-10 justify-between lg:items-center ">
          <div className="logo text-black font-bold text-xl flex justify-start lg:justify-center items-center gap-1">
            Astacumalaka's
            <span className=" text-[#495E57]">Waroeng</span>
          </div>
          <div className="nav-menu flex justify-between lg:justify-end items-center gap-4 w-full lg:w-1/2">
            <div className="search relative w-full lg:w-3/4 border-2 border-[#495E57] rounded-md ">
              <input
                type="text"
                name="search"
                placeholder="search..."
                className="outline-none p-1 w-full rounded-lg"
                onChange={(e) => dispatch(searchProductBy(e.target.value))}
              />

              <button
                name="search"
                aria-label="search"
                id="search"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <FaSearch className="" />
              </button>
            </div>
            <div>
              <button
                onClick={handleOpen}
                aria-label="cart"
                id="cart"
                name="cart"
                className="relative flex justify-center items-center w-8 h-8 rounded-full text-white bg-[#495E57] p-1 hover:bg-[#3F5049] hover:text-white"
              >
                <IoCartOutline className="text-xl" />
                {cartTotalItems ? (
                  <span className="absolute flex justify-center items-center -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-xs">
                    {cartTotalItems}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
