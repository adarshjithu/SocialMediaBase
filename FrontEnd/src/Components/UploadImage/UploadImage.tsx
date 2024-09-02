import React, { useState, useCallback } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Cropper, { Area } from "react-easy-crop";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import toast from "react-hot-toast";
import getCroppedImg from "./cropUtil"; // Assuming you have a utility function to crop the image
import axiosInstance from "../../Services/api";

interface CroppedImage {
     file: File;
     dataURL: string;
}

const App: React.FC = () => {
     const [images, setImages] = useState<Array<any>>([]);
     const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
     const [croppedImages, setCroppedImages] = useState<CroppedImage[]>([]);
     const [description,setDescription] = useState<string>('')
     const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
     const [zoom, setZoom] = useState<number>(1);
     const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
     const [cropDialogOpen, setCropDialogOpen] = useState<boolean>(false);
     console.log(croppedImages)

     // Used to upload image from react Image Uploading component
     const onChange = (imageList: ImageListType) => {
          if (imageList.length > 5) {
               toast.error("Maximum Image Limit Exceeded!");
          } else {
               setImages(imageList);
          }
     };
     //This function is used to open crop window and close after cropping
     const openCropDialog = (index: number) => {
          setCurrentImageIndex(index);
          setCropDialogOpen(true);
     };

     // This function is used to create a croped image
     const handleCropComplete = useCallback(
          async () => {
               if (currentImageIndex === null || croppedAreaPixels === null) return;

               const imageToCrop = images[currentImageIndex];

               if (!imageToCrop?.dataURL) return;

               const croppedImage = await getCroppedImg(imageToCrop.dataURL, croppedAreaPixels);

               const croppedFile = new File([croppedImage], imageToCrop.file?.name || "cropped.png", {
                    type: "image/png",
               });
               setImages(
                    images.filter((e, index) => {
                         if (index !== currentImageIndex) {
                              return e;
                         }
                    })
               );
               setCroppedImages((prevImages) => [...prevImages, { file: croppedFile, dataURL: URL.createObjectURL(croppedFile) }]);
               setImages((prevImages) => [...prevImages, { file: croppedFile, dataURL: URL.createObjectURL(croppedFile) }]);

               setCropDialogOpen(false);
          },
          [currentImageIndex, croppedAreaPixels, images]
     );
     //upload
     const handleUpload = async () => { 
         
          const formData = new FormData();
          images.forEach((image, index) => {
               formData.append(`image${index}`, image?.file);
          });
       
          try {
               await axiosInstance.post("post/image/upload", formData, {
                    headers: {
                         "Content-Type": "multipart/form-data",
                    },
               });
               alert("Images uploaded successfully!"); 
          } catch (error) {
               console.error("Error uploading images:", error);
               alert("Failed to upload images.");
          }
     };
     //--------------
     return (
          <div className="w-full h-[80vh]  flex flex-col items-center">
               <div className="w-[90%] h-[55%] rounded-xl">
                    <div className="crop w-[100%] h-[90%] bg-[#EEEEEE] rounded-md border border-gray " style={{ border: "1px solid #968d8d" }}>
                         {currentImageIndex !== null && images[currentImageIndex]?.dataURL && (
                              <Dialog open={cropDialogOpen} maxWidth="sm" fullWidth>
                                   <DialogContent>
                                        <div style={{ position: "relative", width: "50%", height: 300 }}>
                                             <Cropper
                                                  image={images[currentImageIndex].dataURL || ""}
                                                  crop={crop}
                                                  zoom={zoom}
                                                  aspect={4 / 6}
                                                  onCropChange={setCrop}
                                                  onZoomChange={setZoom}
                                                  onCropComplete={(_, croppedAreaPixels) => {
                                                       setCroppedAreaPixels(croppedAreaPixels);
                                                  }}
                                             />
                                        </div>
                                   </DialogContent>
                                   <DialogActions>
                                        <Button onClick={() => setCropDialogOpen(false)}>Cancel</Button>
                                        <Button onClick={() => handleCropComplete()} color="primary">
                                             Save
                                        </Button>
                                   </DialogActions>
                              </Dialog>
                         )}
                         <ImageUploading multiple value={images} onChange={onChange} maxNumber={10}>
                              {({ imageList, onImageUpload, dragProps, isDragging, onImageUpdate, onImageRemove }) => (
                                   <div className="flex flex-col justify-between h-full">
                                        <div className="image-list flex flex-row justify-around w-[100%] mt-2 h-[70%]">
                                             {imageList.map((image, index) => (
                                                  <div key={index} className="image-item relative flex flex-col h-[120px] w-[100px] mt-4">
                                                       <div className="flex flex-row justify-end">
                                                            {/* <i className="fa-solid fa-scissors"></i> */}
                                                            <i className="fa-solid fa-pen-to-square"
                                                            onClick={() => onImageUpdate(index)}></i>
                                                            <i
                                                                 className="fa-regular fa-circle-xmark "
                                                                 style={{ color: "red" }}
                                                                 onClick={() => onImageRemove(index)}
                                                            ></i>
                                                          
                                                       </div>
                                                       <img
                                                            onClick={() => openCropDialog(index)}
                                                            className="w-[100px] border border-[#a8a8a8]  h-[100px] rounded-lg"
                                                            src={image.dataURL}
                                                            alt=""
                                                            width="100"
                                                       />
                                                       {/* <div className="image-item__btn-wrapper">
                                                       
                                                       <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                                  </div> */}
                                                  </div>
                                             ))}
                                        </div>
                                        <div className="w-[100%] flex justify-center items-center h-[30%]">
                                             <button
                                                  style={isDragging ? { color: "red" } : undefined}
                                                  onClick={onImageUpload}
                                                  {...dragProps} // Props for drag-and-drop functionality
                                                  className="border border-dashed border-gray-400  p-4 rounded-lg"
                                             >
                                                  Click or Drag here to upload images
                                             </button>
                                        </div>
                                   </div>
                              )}
                         </ImageUploading>
                    </div>
                
               </div>

               <div className="w-[90%] h-[12%] bg-white border border-black rounded-lg" style={{ border: "1px solid #968d8d" }}>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Description" name="" className="w-[100%] h-[100%] rounded-lg p-2" id="" />
               </div>
               <div className="w-[90%] h-[12%] mt-4">
                    <Button variant="contained" size="large" onClick={handleUpload} className="w-[100%] mt-2">
                         Upload
                    </Button>
               </div>
          
          </div>
     );
};

export default App;
