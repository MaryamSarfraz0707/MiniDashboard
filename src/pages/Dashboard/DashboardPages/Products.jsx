import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import ProductTable from "../../../components/Products/ProductTable";

const Products = () => {
  const { products } = useContext(DataContext);

  return (
    <div className="p-6">
      <ProductTable products={products} />
    </div>
  );
};

export default Products;
