import React, { useState } from "react";
import { useRef } from "react";
import "../../styles/components/changeProfileImg.css";
 

export const ChangeProfileImg = ({ onImageChange }) =>{
    const presetKey = "ptwmh2mt";
    const cloudName = "dhyrv5g3w"; 
    const fileInputRef = useRef(null)
    const [image, setImage] = useState("")

    const handleFile = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type !== 'image/jpeg') {
          alert('Only .jpg format is allowed.');
          return;
        }
        setImage(file);
      };
    
    const handleUpload =  async (e)=>{
        e.preventDefault(); 
        if (!image) {
            alert('Please select an image before uploading.');
            return;
        }
        try {
            const imageUrl = await uploadImage(image); 
            sendDataToAPI(imageUrl);
          } catch (error) {
            console.error('Error uploading:', error);
            alert('Error uploading image. Please try again.');
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
            console.log(data);
            if (data.secure_url) {
              resolve(data.secure_url);
            } else {
              reject(new Error("Image upload failed."));
            }
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
        });
    };

    const sendDataToAPI = (image) => {
        const token = localStorage.getItem('jwt-token');
            if(token) {
        fetch(process.env.BACKEND_URL + "api/user/" + localStorage.getItem("user_id"), { 
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
              alert('Image not uploaded')
            }
        };
    
    return(
        <section className="changeProfileImgPencil">
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
        </section>
    )
}