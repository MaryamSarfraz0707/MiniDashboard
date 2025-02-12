import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { Button } from "primereact/button";

const CategoryTable = ({ categories, onDelete }) => {
  const navigate = useNavigate(); // Initialize navigation

  // Cover Image Column
  const imageBodyTemplate = (category) => (
    <img
      src={category.coverImage}
      alt={category.name}
      className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded-md shadow-md"
    />
  );

  // Description Column with Validation
  const descriptionBodyTemplate = (category) =>
    category.description.length >= 15 ? category.description : "Description too short!";

  // Handle Edit Click
  const handleEdit = (category) => {
    navigate("/dashboard/create-category", { state: { category } });
  };

  // Actions Column (Edit & Delete Buttons)
  const actionBodyTemplate = (category) => (
    <div className="flex space-x-2">
      <Button
        label="Edit"
        icon="pi pi-pencil"
        className="p-button-text p-button-sm text-green-800" // Changed color to green
        onClick={() => handleEdit(category)}
		  />
		  <span>/</span>
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-text p-button-sm text-red-500"
        onClick={() => onDelete(category.id)}
      />
    </div>
  );

  return (
    <div className="card shadow-lg p-4 sm:p-6  m-4 sm:m-6 lg:m-10 shadow-blue-500 overflow-x-auto rounded-lg">
      {/* Add Category Button */}
      <div className="flex flex-col sm:flex-row justify-between  items-center mb-6">
        <h2 className="text-2xl  sm:text-3xl font-bold text-[#126ea0]">Product Categories</h2>
        <ButtonWithIcon
          text="Add Category"
          to="/dashboard/create-category"
          className="bg-[#17A5EF] hover:bg-[#126ea0] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-md transition duration-300 mt-3 sm:mt-0 sm:mr-6"
        />
      </div>

      <DataTable
        value={categories}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
        emptyMessage="No categories available."
        className="w-full min-w-[30rem] sm:min-w-[40rem] lg:min-w-[50rem]"
        rowHover
        stripedRows
      >
        <Column header="Cover Image" body={imageBodyTemplate}></Column>
        <Column field="name" header="Category Name"></Column>
        <Column field="description" header="Description" body={descriptionBodyTemplate}></Column>
        <Column header="Actions" body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default CategoryTable;
