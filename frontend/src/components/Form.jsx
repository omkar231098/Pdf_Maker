import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import Header from './Header'
const Form = () => {
  const [data, setData] = useState({ name: '', age: '', address: '', photo: '', pdfPreview: null });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setData({ ...data, [name]: file });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('age', data.age);
      formData.append('address', data.address);
      formData.append('photo', data.photo);

      const response = await axios.post('http://localhost:8500/pdf/submit', formData, {
        responseType: 'blob',
      });

      if (response.status === 200) {
        const blobUrl = URL.createObjectURL(response.data);
        setData({ ...data, pdfPreview: blobUrl });
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (<>
  <Header/>
    <div style={{ display: 'flex', height: '85vh',marginTop:'10px' }}>
    {/* Form Section */}
    <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
      <form method="post" onSubmit={handleSubmit}>
        <h1>Enter Your Details</h1>
        <input style={{ fontSize:"15px", fontFamily:'Kanit, sans-serif'}} type="text" name="name" onChange={handleChange} value={data.name} placeholder="Name" />
        <input style={{ fontSize:"15px", fontFamily:'Kanit, sans-serif'}} type="number" name="age" onChange={handleChange} value={data.age} placeholder="Age" />
        <input style={{ fontSize:"15px", fontFamily:'Kanit, sans-serif'}} type="text" name="address" onChange={handleChange} value={data.address} placeholder="Address" />
        <input style={{ fontSize:"15px", fontFamily:'Kanit, sans-serif'}} type="file" name="photo" onChange={handleFileChange} placeholder="Upload Photo" />
  
        <button style={{ fontSize:"15px", fontFamily:'Kanit, sans-serif'}} type="submit">Save</button>
        {/* Add more form elements as needed */}
      </form>
    </div>
  
    {/* Vertical Line */}
    <div style={{ width: '1px', background: '#ccc' }}></div>
  
    {/* PDF Preview Section */}
    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center',  overflowY: 'auto' }}>
      {data.pdfPreview ? (
        // Display PDF preview if available
        <div style={{ textAlign: 'center' }}>
          <embed src={data.pdfPreview} width="100%" height="600" type="application/pdf" />
          <a href={data.pdfPreview} download="preview.pdf">
            <button style={{ marginTop: '10px', backgroundColor: 'rgb(244,0,0)', color: '#ffffff', padding: '10px', borderRadius: '5px', border: 'none' }}>Download PDF</button>
          </a>
        </div>
      ) : (
        // Display a message if no file has been uploaded
        <div style={{ border: '2px dashed #007BFF', borderRadius: '5px', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ margin: 0 }}>No file uploaded yet. Upload a file to see the preview.</p>
        </div>
      )}
    </div>
  </div>
  </>
    
  );
};

export default Form;
