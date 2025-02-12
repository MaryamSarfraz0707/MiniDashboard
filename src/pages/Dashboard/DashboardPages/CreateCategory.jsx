import { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";
import AddButton from "../../../components/Buttons/AddButton";
import { useNavigate, useLocation } from "react-router-dom";

const CreateCategory = () => {
  const { addCategory, updateCategory } = useData(); // Assuming updateCategory exists
  const navigate = useNavigate();
  const location = useLocation(); // Get passed category data

  // Check if we're editing
  const editingCategory = location.state?.category || null;

  // State
  const [name, setName] = useState(editingCategory?.name || "");
  const [description, setDescription] = useState(editingCategory?.description || "");
  const [coverImage, setCoverImage] = useState(editingCategory?.coverImage || null);

  // Handle Submit (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (name.trim() === "" || description.length < 15) {
      return alert("Please provide a valid category name and a description of at least 15 characters.");
    }
    if (!coverImage) {
      return alert("Please upload a cover image (JPEG or PNG).");
    }

    if (editingCategory) {
      // If editing, update the category
      const updatedCategory = { ...editingCategory, name, description, coverImage };
      updateCategory(updatedCategory);
    } else {
      // If adding new, create a new category object
      const newCategory = { id: Date.now(), name, description, coverImage };
      addCategory(newCategory);
    }

    navigate("/dashboard/categories");
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return alert("Only JPEG and PNG formats are allowed.");
    }

    const reader = new FileReader();
    reader.onload = () => setCoverImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-xl shadow-lg shadow-blue-500 w-full max-w-md">
        {/* Page Heading */}
        <h2 className="text-[#126ea0] text-4xl font-monsterrat font-bold text-center mb-6">
          {editingCategory ? "Edit Category" : "Create Category"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Category Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Description */}
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

          {/* Cover Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Cover Image (JPEG/PNG)</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Image Preview */}
          {coverImage && (
            <div className="mt-4 flex justify-center">
              <img src={coverImage} alt="Preview" className="w-32 h-32 object-cover rounded-md shadow-md" />
            </div>
          )}

          {/* Submit Button (Dynamic Text) */}
          <AddButton text={editingCategory ? "Update Category" : "Add Category"} type="submit" />

        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
