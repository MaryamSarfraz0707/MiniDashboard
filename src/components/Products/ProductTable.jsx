/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { useData } from "../../context/DataContext";

const ProductTable = ({ products }) => {
  const { deleteProduct } = useData();
  const navigate = useNavigate();

  // Price Column Formatting
  const priceBodyTemplate = (product) => {
    const price = parseFloat(product.price);
    return isNaN(price) ? "N/A" : `$${price.toFixed(2)}`;
  };

  // Handle Edit Click
  const handleEdit = (product) => {
    navigate("/dashboard/create-product", { state: { product } });
  };

  // Delete Confirmation
  const confirmDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  // Actions Column
  const actionsBodyTemplate = (product) => (
    <div className="flex space-x-2">
      <Button
        label="Edit"
        icon="pi pi-pencil"
        className="p-button-text p-button-sm text-green-800"
        onClick={() => handleEdit(product)}
      />
      <span>/</span>
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-text p-button-sm text-red-500"
        onClick={() => confirmDelete(product.id)}
      />
    </div>
  );

  return (
    <div className="card shadow-lg p-4 sm:p-6 m-4 sm:m-6 lg:m-10 shadow-blue-500 overflow-x-auto rounded-lg">
      {/* Add Product Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#126ea0]">Products</h2>
        <ButtonWithIcon
          text="Add Product"
          to="/dashboard/create-product"
          className="bg-[#17A5EF] hover:bg-[#126ea0] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-md transition duration-300 mt-3 sm:mt-0 sm:mr-6"
        />
      </div>

      <DataTable
        value={products}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20, 30, 50]}
        emptyMessage="No products available."
        className="w-full min-w-[30rem] sm:min-w-[40rem] lg:min-w-[50rem]"
        rowHover
        stripedRows
      >
        <Column field="name" header="Product Name"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="price" header="Price" body={priceBodyTemplate}></Column>
        <Column field="category" header="Category"></Column>
        <Column header="Actions" body={actionsBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default ProductTable;
