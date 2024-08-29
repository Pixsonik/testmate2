import React from "react";
import "./LoadingSpinner.css";
import CircularProgress from '@mui/material/CircularProgress';


export default function LoadingSpinner() {
  return (
    // <div className="spinner-border texy-center" style={{color: "var(--blue)", textAlign:"center", display:"block",margin:"auto"}} role="status">
    //   <span className="visually-hidden" >Loading...</span>
    // </div>
    <CircularProgress style={{display:"block",margin:"auto",color:"#1979c1"}} />
  );
}
