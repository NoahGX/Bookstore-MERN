import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const API_URL = 'http://localhost:3000';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    const confirmation = window.confirm("Are you sure you want to delete this book?"); 
    if (!confirmation) return;
  
    setLoading(true);
    axios
      .delete(`${API_URL}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully.', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.response?.data?.message || 'An error occurred while deleting the book.';
        enqueueSnackbar(errorMessage, { variant: 'error' });
        console.log(error);
      });
  };  
  
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure?</h3>

        <button
        className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handleDeleteBook}>
          Yes, Delete</button>
      </div>
    </div>
  )
}

export default DeleteBook;