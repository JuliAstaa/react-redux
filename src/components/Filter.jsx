import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrSort } from "react-icons/gr";
import {
  sortProductBy,
  filterProduct,
  filters,
  selectSort,
} from "../features/productlist/productListSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSorts, setSelectedSorts] = useState("");
  const filter = useSelector(filters);
  const sort = useSelector(selectSort);

  const sorts = [
    { text: "A - Z", id: "asc" },
    { text: "Z - A", id: "desc" },
    { text: "Cheapest to Most Expensive", id: "cheapToExpensive" },
    { text: "Most Expensive to Cheapest", id: "expesiveToCheap" },
    { text: "Top Rated", id: "topRated" },
  ];

  let selectedSort = "Unsorted";
  if (sort === "") {
    selectedSort = "Unsorted";
  } else if (sort === "asc") {
    selectedSort = "A - Z";
  } else if (sort === "desc") {
    selectedSort = "Z - A";
  } else if (sort === "cheapToExpensive") {
    selectedSort = "Cheapest to Most Expensive";
  } else if (sort === "expesiveToCheap") {
    selectedSort = "Most Expensive to Cheap";
  } else {
    selectedSort = "Top Rated";
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const respone = await fetch(
          `${import.meta.env.VITE_BASE_URL_API}/categories`
        );
        const data = await respone.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleClickCategory = (e) => {
    setSelectedCategory(e.target.id);
    dispatch(filterProduct(e.target.id));
  };

  const handleClickSort = (e) => {
    setSelectedSorts(e.target.id);
    dispatch(sortProductBy(e.target.id));
  };

  return (
    <div className="flex h-full justify-between">
      <div className="flex gap-4 mb-4">
        <div className="px-4 py-1 flex justify-center items-center text-white bg-[#495E57] rounded-sm capitalize">
          {filter === "" ? "All Categories" : filter}
        </div>
        <div className="px-4 py-1 flex justify-center items-center text-white bg-[#495E57] rounded-sm">
          {selectedSort}
        </div>
      </div>
      <div className="relative">
        <div
          className="cursor-pointer px-4 flex gap-1 h-8 justify-center items-center text-white bg-[#495E57] p-1 rounded-md hover:bg-[#3F5049]"
          onClick={() => setOpen((curr) => !curr)}
        >
          <GrSort className="" /> <span className="">Filter</span>
        </div>
        <div
          className={`absolute z-20 right-0 border rounded-lg top-10 w-[20rem] lg:w-[30rem] h-[30rem] lg:h-[20rem] bg-white p-4 duration-300 ease-in-out transition-all origin-top-right ${
            open ? "scale-100" : "scale-0"
          }`}
        >
          <div className="flex flex-col">
            <div>
              <h1 className="font-semibold">Category</h1>
            </div>
            <div className="category flex flex-wrap gap-1 mt-4 cursor-pointer">
              <div
                id={""}
                className={`border min-w-[8rem] lg:min-w-[9rem] rounded-sm p-1 flex justify-center items-center capitalize text-black ${
                  "" === selectedCategory ? "bg-[#495E57] text-white" : null
                }`}
                onClick={handleClickCategory}
              >
                All Categories
              </div>
              {categories.map((category, index) => {
                return (
                  <div
                    key={index}
                    id={category}
                    className={`border min-w-[8rem] lg:min-w-[9rem] rounded-sm relative p-1 flex justify-center items-center capitalize text-black ${
                      category === selectedCategory
                        ? "bg-[#495E57] text-white border-2"
                        : null
                    }`}
                    onClick={handleClickCategory}
                  >
                    {category}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div>
              <h1 className="font-semibold">Sort By</h1>
            </div>
            <div className="flex flex-wrap gap-1 mt-4 cursor-pointer">
              <div
                id={""}
                className={`min-w-[8rem] lg:min-w-[9rem] p-1 flex justify-center items-center capitalize ${
                  "" === selectedSorts
                    ? "bg-[#495E57] text-white border-2"
                    : null
                }`}
                onClick={handleClickSort}
              >
                Unsorted
              </div>
              {sorts.map((sort, index) => {
                return (
                  <div
                    key={index}
                    id={sort.id}
                    className={`border min-w-[8rem] lg:min-w-[9rem] rounded-sm p-1 flex justify-center items-center capitalize ${
                      sort.id === selectedSorts
                        ? "bg-[#495E57] text-white border-2"
                        : null
                    }`}
                    onClick={handleClickSort}
                  >
                    {sort.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
