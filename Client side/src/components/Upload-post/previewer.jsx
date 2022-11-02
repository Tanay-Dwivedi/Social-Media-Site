import React, { useState } from "react";

import "./newPost.scss";



function PreviewImage(props){
    

    
    return (props.trigger)?(
        <div className="preview">
           <div className="preview-inner">
               {props.children}
           </div>
        </div>
    ):"";
}
export default PreviewImage;