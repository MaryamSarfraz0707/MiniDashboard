const AddButton = ({ text, onClick, type = "button" }) => {
    return (
      <button
        type={type}
        className="border-2 border-[#126ea0] hover:bg-[#126ea0] hover:text-white text-[#173f55] text-lg font-semibold px-5 py-3 rounded-lg w-full shadow-md transition duration-300"
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
  
  export default AddButton;
  