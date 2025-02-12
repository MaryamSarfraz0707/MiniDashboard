import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import AddButton from "../../../components/Buttons/AddButton";

const CreateProduct = () => {
  const { user } = useAuth();
  const { addProduct, updateProduct } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const existingProduct = location.state?.product || null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const categories = JSON.parse(localStorage.getItem(`categories_${user?.username}`)) || [];

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setDescription(existingProduct.description);
      setPrice(existingProduct.price);
      setCategory(existingProduct.category);
      setImage(existingProduct.image);
    }
  }, [existingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categories.length === 0) {
      alert("Please create a category before adding a product.");
      return;
    }
    if (!name || !description || !price || !category || !image) {
      alert("All fields are required!");
      return;
    }
    if (description.length < 15) {
      alert("Description must be at least 15 characters long.");
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    const productData = {
      id: existingProduct ? existingProduct.id : Date.now(),
      name,
      description,
      price,
      category,
      image,
    };

    if (existingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }

    navigate("/dashboard/products");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPEG and PNG formats are allowed.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg shadow-blue-500 w-full max-w-md">
        <h2 className="text-[#126ea0] text-4xl font-monsterrat font-bold text-center mb-6">
          {existingProduct ? "Edit Product" : "Create Product"}
        </h2>
      
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              placeholder="Minimum 15 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Image (JPEG/PNG)</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          {image && (
            <div className="mt-4 flex justify-center">
              <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded-md shadow-md" />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Category</option>
              {categories.length > 0 ? categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              )) : <option disabled>No categories available</option>}
            </select>
          </div>
          <AddButton text={existingProduct ? "Update Product" : "Add Product"} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
