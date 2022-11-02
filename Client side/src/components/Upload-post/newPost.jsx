import React ,{useState} from 'react'
import "./newPost.scss";
import ReactCrop from "react-image-crop"
import 'react-image-crop/dist/ReactCrop.css';
import PreviewImage from './previewer';
import pic from "./pic.jpg";
import imageIcon from './addimage.png';
import cropImg from "../../assets/crop.png"

function NewPost()
{

  const [src,selectfile]=useState(null);  // for the initial state of image
  const [result,setResult] = useState(null);// For the result we get from the crop and for using
  const handleChange=(e)=>{
     selectfile(URL.createObjectURL(e.target.files[0]))
    }
   
   const [image,setImage]=useState(null);// used by ReactCrop
   const [crop,setCrop]=useState({aspect:1/1});// Used for ReactCrop
  
   const getCroppedImg = async () => {
    try {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const base64Image = canvas.toDataURL("image/jpeg", 1);
        setResult(base64Image);
        console.log(result);
    } catch (e) {
        console.log("crop the image");
    }
    };
    
    const [values,setValues]=useState({
         descr:"",tags:""
    });


    const handleCancel=()=>{
         setCrop({aspect:1/1});
         selectfile(null);
         setImage(null);
         setResult(null);
         setValues({descr:"",tags:""});
    }

    
    let ename,evalue;
    const handleInputs=(e)=>{
    ename=e.target.name;
    evalue=e.target.value;

    setValues({...values,[ename]:evalue});
   }
    // this function should be called when we click share without Crop
    const ShareAlert=()=>{
        window.alert("Please Crop the image First");
    }
    const PostData=async (e)=>{
          const time=new Date();
          const data={descr:values.descr,tags:values.tags,img:result,time:time};

          console.log('Everything Working Fine, Proceed with Backend',data);
    }

    //this function is used because we have to use if-else condition for cropped image because at first real
    // image will be previewed then if a user crops the image then the cropped image will be previewed
    function showPreviewImage()
    {
      return (result)?(
          <section className="previewer">
           <PreviewImage trigger={result} >
            <button className="trim" onClick={getCroppedImg}><img src={cropImg} className="cropImg" /></button>
            <div className="preview-image">
                <ReactCrop 
                    src={result}
                    onImageLoaded={setImage} 
                    crop={crop}
                    onChange={setCrop}
                /> 
            </div>
            <div className="other-data">
                <input type="text" onChange={handleInputs} name="tags" value={values.descr} className="writeSomething" placeholder="Write Something.."></input>
                <input type="text" onChange={handleInputs} name="descr" value={values.tags} className="inputTags" placeholder="Tags.."></input>
                <div class="preview-buttons">
                  <button className="save-btn" onClick={PostData} > Share</button>       
                  <button className="close-btn" onClick={handleCancel}> Cancel</button>
                </div>
            </div>
           </PreviewImage>
          </section>
      ):(
        <div className="previewer">
            <PreviewImage trigger={src}>
            <button className="trim" onClick={getCroppedImg}><img src={cropImg} className="cropImg" /></button>
                <div className="preview-image">
                    <ReactCrop 
                        src={src}
                        onImageLoaded={setImage} 
                        crop={crop}
                        onChange={setCrop}
                    /> 
                </div>
                <div className="other-data">
                    <input type="text" onChange={handleInputs} name="descr" value={values.descr} className="writeSomething" placeholder="Write Something.."></input>
                    <input type="text" onChange={handleInputs} name="tags" value={values.tags} className="inputTags" placeholder="Tags.."></input>
                    <div class="preview-buttons">
                        <button className="save-btn" onClick={ShareAlert}> Share</button>
                        <button className="close-btn" onClick={handleCancel}> Cancel</button>
                    </div>
                </div>
            </PreviewImage>
        </div>
      );
    }


    return(
    <div className="addImage">
     <div className="share">
      <form className="shareWrapper">
          <div className="shareTop">
            <img className="shareProfileImg" src={pic} alt="hi" />
            <input
              placeholder="What's in your mind ?"
              className="shareInput"
              name="descr" value={values.descr}
              onChange={handleInputs}
            />
          </div>
          <hr className="shareHr"/>
          <div className="shareBottom">
              <div className="shareOptions">
                  <div className="shareOption">
                      <input 
                        className="fileInput"
                        type="file" 
                        name="img"
                        onChange={handleChange}
                        id="img"
                        accept="image/*"
                      />
                      <label htmlFor="img" className="image-label">
                          <img className="addImage" src={imageIcon}  />
                      </label>
                      <span className="shareOptionText">Upload your Image </span>
                  </div>
                 
              </div>
               
              <button className="shareButton">Share</button>
          </div>
      </form>   
     </div>
    
      {showPreviewImage()}

    </div>)
}

export default NewPost;