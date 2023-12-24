import { useSelector, useDispatch } from "react-redux";
import {
  displayProduct,
  setSelectedProduct,
} from "../features/productlist/productListSlice";
import { FaStar } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const Carousel = ({ setClickSelectedProduct }) => {
  const products = useSelector(displayProduct);
  const dispatch = useDispatch();

  const stars = Array.from({ length: 5 });

  const handleClick = (id) => {
    dispatch(setSelectedProduct(id));
    setClickSelectedProduct((curr) => !curr);
  };

  const topRatedProducts = products
    .map((product) => product)
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);
  return (
    <div className="h-80">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={"auto"}
        rewind={true}
        direction="horizontal"
        autoplay={{ delay: 5000 }}
        scrollbar={{ draggable: true }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
          clickable: true,
        }}
        className="w-full  overflow-x-hidden h-72 lg:h-80 rounded-md group"
      >
        {topRatedProducts.map((product, index) => {
          return (
            <SwiperSlide
              key={index}
              className="rounded-md h-60 lg:h-72 bg-white border relative"
            >
              <div className="flex gap-8 h-full justify-between items-center cursor-pointer">
                <div className="left h-full w-3/4 flex flex-col justify-between ">
                  <div>
                    <div className="p-4">
                      <div className="title mb-2">
                        <h1 className="font-semibold text-md">
                          {product.title}
                        </h1>
                      </div>
                      <div className="desc hidden lg:block text-sm">
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="footer flex flex-col">
                    <div className="category bg-[#495E57] w-fit pl-4 pr-14 py-1 relative">
                      <p className="capitalize text-white font-semibold">
                        {product.category}
                      </p>
                      <div className="absolute w-8 h-8 rotate-45 bg-white -right-5 top-0"></div>
                    </div>
                    <div className="rating pl-4 pb-4 flex gap-2 items-center">
                      <div className="rating-star flex items-center">
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
                        <div className="rating-rate">
                          {`(${product.rating.rate})`}
                        </div>
                      </div>
                      <div>
                        <span>|</span>
                      </div>
                      <div className="rating-count">
                        <span>{`(${product.rating.count} reviews)`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right p-4 w-1/4 h-full">
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="prev-next bg-transparent w-full h-full  absolute top-0 left-0 justify-between items-center group-hover:flex">
                <button
                  aria-label="prev"
                  className="swiper-button-prev text-2xl h-full p-4  hover:bg-[rgba(0,0,0,0.2)]"
                >
                  <GrPrevious />
                </button>
                <div
                  className="w-full h-full cursor-pointer"
                  onClick={() => handleClick(product.id)}
                ></div>
                <button
                  aria-label="next"
                  className="swiper-button-next text-2xl h-full p-4  hover:bg-[rgba(0,0,0,0.3)]"
                >
                  <GrNext />
                </button>
              </div>
            </SwiperSlide>
          );
        })}

        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default Carousel;
