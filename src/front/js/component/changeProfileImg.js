import React, { useContext, useState } from "react";
import { useRef } from "react";
import "../../styles/components/changeProfileImg.css";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2';

export const ChangeProfileImg = ({ onImageChange }) =>{
    const presetKey = "ptwmh2mt";
    const cloudName = "dhyrv5g3w"; 
    const fileInputRef = useRef(null)
    const [image, setImage] = useState("")
    const user_id = localStorage.getItem("user_id")
    const {store,actions} = useContext(Context)
    const token = localStorage.getItem("jwt-token")
    
    const handleFile = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type !== 'image/jpeg') {
          Swal.fire({
            icon: 'error',
            title: 'oppss...',
            text: 'Only .jpg format is allowed.'            
          })
          return;
        }
        setImage(file);
      };
    
    const handleUpload =  async (e)=>{
        e.preventDefault(); 
        if (!image) {
          Swal.fire({
            icon: 'error',
            title: 'oppss...',
            text: 'Please select an image before uploading.'            
          });
            return;
        }
        try {
            const imageUrl = await uploadImage(image); 
            sendDataToAPI(imageUrl);
          } catch (error) {
            console.error('Error uploading:', error);
            Swal.fire({
              icon: 'error',
              title: 'oppss...',
              text: 'Error uploading image. Please try again.'            
            });
        }
    } 

    const uploadImage = (imageFile) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("upload_preset", presetKey);
          fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.secure_url) {
              resolve(data.secure_url);
            } else {
              reject(new Error("Image upload failed."));
            }
          })
          .catch((error) => {
            reject(error);
          });
        });
    };

    const sendDataToAPI = (image) => {
        const token = localStorage.getItem('jwt-token');
            if(token) {
        fetch(process.env.BACKEND_URL + "api/user/" + user_id, { 
                method: "PUT", 
                headers: { 
                    "Content-Type": "application/json",
                    // "Authorization" : "Bearer " + token
                },
                body: JSON.stringify({profileImg:image}) 
            })
            .then((res) => res.json())
            .then((result) => {
              onImageChange(image);
              localStorage.setItem("userImage", image);
            }).catch((err) => {
                console.log(err);
            })
            }else  {
              Swal.fire({
                icon: 'error',
                title: 'oppss...',
                text: 'Image not uploaded.'            
              });
            }
        };
    
    const deleteUser = () =>{
      fetch(`${process.env.BACKEND_URL}api/delete-user/${user_id}`, {
        method: "DELETE",
        headers : {
          "Content-Type" : "Application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          icon: 'error',
          title: 'oppss...',
          text: data.msg         
        });
        actions.logOut()
      })
      .catch(err => console.log(err))
    }
    
    return(
        <section className={ token ? "changeProfileImgPencil" : "d-none"}>
            <label htmlFor="fileInput">
                <i className="fa-solid fa-pencil"
                    onClick={(e)=>{
                        e.preventDefault()
                        fileInputRef.current.click()
                    }}
                ></i>
            </label>
            <input
                id="fileInput"
                type="file"
                accept="image/jpeg"
                onChange={handleFile}
                ref={fileInputRef} 
                style={{ display: 'none' }} 
            />
            <i className="fa-solid fa-check"onClick={(e) => {
                handleUpload(e);
            }} ></i>

            <i className="fa-solid fa-trash" onClick={deleteUser}></i>
        </section>
    )
}