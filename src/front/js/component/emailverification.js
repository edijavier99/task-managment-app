import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from "react"
import "../../styles/components/emailverification.css";

const EmailVerification = () => {
  const { token } = useParams();
  useEffect(() => { 
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}api/verify/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          window.location.href = '/success';
        } else {
          console.error('Verification failed');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    };    
    verifyEmail();
  }, [token]);
  
  return (
    <div className='container border-0 my-5'>
      <h2 className='text-center mt-5'>Your email is being checked...</h2>
      <p className='text-center mt-5'>Please be patient, this should not take long.</p>
      <img className='text-center mt-5' id="checking"src="https://cdn.pixabay.com/photo/2017/11/07/08/05/turn-on-2925962_1280.jpg"></img>
    </div>
  );
};

export default EmailVerification;