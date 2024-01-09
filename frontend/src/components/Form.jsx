import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [data, setData] = useState({ name: '', age: '', address: '', photo: '' });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
  
    console.log('Name:', name);
    console.log('File:', file);
  
    const formData = new FormData();
    formData.append(name, file);
  
    console.log('FormData:', formData);
  
    setData((prevData) => ({ ...prevData, [name]: formData }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      // Append data fields
      formData.append('name', data.name);
      formData.append('age', data.age);
      formData.append('address', data.address);
      formData.append('photo', data.photo.get('photo'));
  
      const response = await axios.post('http://localhost:8500/pdf/submit', formData, {
        responseType: 'blob', // Set responseType to 'blob' to handle binary data
      });
  
      if (response.status === 200) {
        // Create a Blob URL for the blob
        const blobUrl = URL.createObjectURL(response.data);
  
        // Create an anchor element
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'generated_pdf.pdf';
  
        // Append the anchor element to the body and trigger a click event
        document.body.appendChild(a);
        a.click();
  
        // Remove the anchor element from the body
        document.body.removeChild(a);
  
        console.log('Form submitted successfully!');
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h1>Enter Your Details</h1>
      <input type="text" name="name" onChange={handleChange} value={data.name} placeholder="Name" />
      <input type="number" name="age" onChange={handleChange} value={data.age} placeholder="Age" />
      <input type="text" name="address" onChange={handleChange} value={data.address} placeholder="Address" />
      <input type="file" name="photo" onChange={handleFileChange} placeholder="Upload Photo" />
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
