import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productList,
  displayProduct,
  filters,
  keyword,
  selectSort,
  setSelectedProduct,
} from "./productListSlice";
import Loading from "../../components/Loading";
import { FaStar } from "react-icons/fa6";
import Carousel from "../../components/Carousel";
import Filter from "../../components/Filter";
import DetailProduct from "./DetailProduct";

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [clickSelectedProduct, setClickSelectedProduct] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(displayProduct);
  const filter = useSelector(filters);
  const key = useSelector(keyword);
  const sort = useSelector(selectSort);

  const filterProducts = products
    .filter((product) => {
      return (
        (filter === "" || filter === product.category) &&
        (key === "" || product.title.toLowerCase().includes(key.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sort === "") {
        return null;
      } else if (sort === "asc") {
        return a.title.localeCompare(b.title);
      } else if (sort === "desc") {
        return b.title.localeCompare(a.title);
      } else if (sort === "cheapToExpensive") {
        return a.price - b.price;
      } else if (sort === "expesiveToCheap") {
        return b.price - a.price;
      } else {
        return b.rating.rate - a.rating.rate;
      }
    });

  const stars = Array.from({ length: 5 });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const respone = await fetch(`${import.meta.env.VITE_BASE_URL_API}`);
        const data = await respone.json();
        dispatch(productList(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectedProduct = (id) => {
    dispatch(setSelectedProduct(id));
    setClickSelectedProduct((curr) => !curr);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full lg:w-[90%] h-full mx-auto">
          <div className="carousel mb-4">
            <h1 className="text-xl font-bold mb-4 ">SPECIAL FOR YOU!!!</h1>
            <Carousel setClickSelectedProduct={setClickSelectedProduct} />
          </div>
          <div>
            <Filter />
          </div>
          {filterProducts.length !== 0 ? (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filterProducts.map((product) => {
                return (
                  <li
                    onClick={() => handleSelectedProduct(product.id)}
                    key={product.id}
                    className="flex relative flex-col justify-between bg-[#F5F7F8] border p-2 rounded-tr-xl rounded-bl-xl shadow-xl transition-all ease-in-out duration-300 hover:scale-105 cursor-pointer "
                  >
                    <div className="">
                      <div className="h-52 flex justify-center items-center bg-blend-multiply">
                        <img
                          src={product.image}
                          alt=""
                          className="w-full h-full object-contain mix-blend-darken"
                        />
                      </div>
                      <div className="">
                        <h1 className="font-semibold text-sm">
                          {product.title}
                        </h1>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="rating mt-2 text-xs">
                          <div className="stars flex gap-1 items-center">
                            <div className="flex justify-center items-center">
                              <div className="flex  justify-center items-center">
                                {stars.map((star, index) => {
                                  return (
                                    <span
                                      key={index}
                                      className={`${
                                        index + 1 <
                                        Math.floor(product.rating.rate + 1)
                                          ? "text-[#FFB534]"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      <FaStar />
                                    </span>
                                  );
                                })}
                                <span>({product.rating.rate})</span>
                              </div>
                            </div>
                            <span>|</span>
                            <span>({product.rating.count} reviews)</span>
                          </div>
                        </div>
                        <div className="flex h-8 justify-between items-end">
                          <div className="card-footer flex justify-between">
                            <div className="price  text-sm ">
                              <p className="text-slate-900">
                                Price:{" "}
                                <span className="font-semibold">
                                  ${product.price}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="w-full h-full flex justify-center">
              <h1>PRODUCT NOT FOUND{":("}</h1>
            </div>
          )}
        </div>
      )}
      {clickSelectedProduct ? (
        <DetailProduct setClickSelectedProduct={setClickSelectedProduct} />
      ) : null}
    </div>
  );
};

export default ProductList;
