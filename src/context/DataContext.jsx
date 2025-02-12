import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Load data from localStorage when the user logs in
  useEffect(() => {
    if (user) {
      setCategories(
        JSON.parse(localStorage.getItem(`categories_${user.username}`)) || []
      );
      setProducts(
        JSON.parse(localStorage.getItem(`products_${user.username}`)) || []
      );
    }
  }, [user]);

  // Add a new category
  const addCategory = (category) => {
    if (!user) return;
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories, category];
      localStorage.setItem(
        `categories_${user.username}`,
        JSON.stringify(updatedCategories)
      );
      return updatedCategories;
    });
  };

  // Update an existing category
  const updateCategory = (updatedCategory) => {
    if (!user) return;
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
      localStorage.setItem(
        `categories_${user.username}`,
        JSON.stringify(updatedCategories)
      );
      return updatedCategories;
    });
  };

  // Delete a category
  const deleteCategory = (id) => {
    if (!user) return;
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.filter((cat) => cat.id !== id);
      localStorage.setItem(
        `categories_${user.username}`,
        JSON.stringify(updatedCategories)
      );
      return updatedCategories;
    });
  };

  // Add a new product
  const addProduct = (product) => {
    if (!user) return;
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, product];
      localStorage.setItem(
        `products_${user.username}`,
        JSON.stringify(updatedProducts)
      );
      return updatedProducts;
    });
  };

  // Update an existing product
  const updateProduct = (updatedProduct) => {
    if (!user) return;
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      localStorage.setItem(
        `products_${user.username}`,
        JSON.stringify(updatedProducts)
      );
      return updatedProducts;
    });
  };

  // Delete a product
  const deleteProduct = (id) => {
    if (!user) return;
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((prod) => prod.id !== id);
      localStorage.setItem(
        `products_${user.username}`,
        JSON.stringify(updatedProducts)
      );
      return updatedProducts;
    });
  };

  return (
    <DataContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
