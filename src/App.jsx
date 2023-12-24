import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ProductList from "./features/productlist/ProductList";
import CartModal from "./features/cart/CartModal";
import Footer from "./components/Footer";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen">
      {isOpen ? <CartModal handleClose={handleClose} /> : null}
      <Header handleOpen={handleOpen} />
      <main className="max-w-7xl mx-auto p-4 min-h-screen">
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
