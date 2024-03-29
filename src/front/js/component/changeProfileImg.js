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
    const {store, actions} = useContext(Context)
    const token = localStorage.getItem("jwt-token")
    const [showCheck, setShowCheck] = useState(false)
    
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
        } else {
            Swal.fire({
                icon: 'error',
                title: 'oppss...',
                text: 'Image not uploaded.'            
            });
        }
    };

    const deleteUser = () => {
        fetch(`${process.env.BACKEND_URL}api/delete-user/${user_id}`, {
            method: "DELETE",
            headers : {
                "Content-Type" : "Application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                text: data.msg         
            });
            actions.logOut()
        })
        .catch(err => console.log(err))
    }

    return(
        <section className={ token ? "changeProfileImgPencil " : "d-none"}>
            <label htmlFor="fileInput">
                <i className="fa-solid fa-pencil"
                    onClick={(e)=>{
                        e.preventDefault()
                        fileInputRef.current.click()
                        setShowCheck(true)
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
            /> {
                showCheck ?  <i className="fa-solid fa-check" onClick={(e) => { handleUpload(e); }} ></i> : ""
            }          
          <div>
              <i className="fa-solid fa-trash" onClick={()=>{}} data-bs-toggle="modal" data-bs-target="#deleteUserModal"></i> 
            <div className="modal fade" id="deleteUserModal" tabIndex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-center" id="deleteUserModalLabel">Are you sure you want to delete your account?</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>This action is not reversible, and you will not be able to recover the data once deleted.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={deleteUser}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}
