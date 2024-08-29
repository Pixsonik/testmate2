import React from "react";
import "./LoadingSpinner.css";

export default function LoginLoadingSpinner() {
  return (
    <div className="spinner-border texy-center loginloading" 
    // style={{color: "var(--blue)", textAlign:"center", display:"block",margin:"auto"}}
     role="status">
      <span className="visually-hidden" >Loading...</span>
    </div>
  );
}
