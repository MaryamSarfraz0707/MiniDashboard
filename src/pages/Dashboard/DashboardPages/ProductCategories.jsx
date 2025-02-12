import { useData } from "../../../context/DataContext";
import CategoryTable from "../../../components/ProductCategoryComponents/CategoryTable";


const ProductCategories = () => {
	const { categories, deleteCategory } = useData();

	return (
		<div className="p-6">
			{/* Categories Table */}
			<CategoryTable categories={categories} onDelete={deleteCategory} />
		</div>
	);
};

export default ProductCategories;
