import { useState } from "react";
import axios from "axios";
import "./AddProductPage.css"
const AddProductPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [product, setProduct] = useState({
    name: '',
    para: '',
    price: '',
    category: '',
    location: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image file.");
      return;
    }

    const formData = new FormData();

    // Append text fields
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    // Append file image
    formData.append("image", imageFile);

    try {
      await axios.post("http://localhost:5050/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      alert("Product added!");
    } catch (err) {
      alert("Failed to add product");
      console.error(err);
    }
  };

  return (
    <div className="add-form">
      <form className="form"onSubmit={handleSubmit}>
       <div> <label style={{color:"white"}}>Upload Image File:</label>
        <input type="file" onChange={handleImageChange} accept="image/*" /></div>
        <input name="name" onChange={handleChange} placeholder="Product Name" />
        <input name="para" onChange={handleChange} placeholder="Description" />
        <input name="price" onChange={handleChange} placeholder="Price" />
        <input name="category" onChange={handleChange} placeholder="Category" />
        <input name="location" onChange={handleChange} placeholder="Location" />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
