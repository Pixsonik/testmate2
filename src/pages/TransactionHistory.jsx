import axios from "axios";
import React, { useEffect, useState } from "react";
import { transactionHistoryApi, urlToken, userDetailApi } from "../api/api";
import moment from "moment";
import { saveAs} from '@progress/kendo-file-saver';
import "../assets/css/Responsive.css"
import CircularProgress from '@mui/material/CircularProgress';

const userId = localStorage.getItem("UserId");

const TransactionHistory = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState("");
  const [paymentId, setPaymentId] = useState([]);
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    transactionHistoryList();
    userDetail();
  }, []);

  const userDetail = () => {
    const url = userDetailApi();
    var body = {
      token: urlToken,
      id: userId,
    };
    // console.log("All ---------------", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Detail ", resp.data.data[0].class_id);
        setUserInfo(resp.data.data[0]);
        // console.log("userName----------", userInfo.first_name);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const transactionHistoryList = () => {
    setIsLoading(true)
    const url = transactionHistoryApi();
    const body = {
      token: urlToken,
      user_id: userId,
    };
    // console.log("------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setIsLoading(false)
        // console.log("Transaction ---", resp.data);
        if (resp.data.status === "true") {
          setTransactionData(resp.data.data);
          setPaymentId(resp.data.data[0].payment_id);
        } else {
          alert(resp.data.message);
        }
      })
      .catch((error) => {
        // console.log("error in fetching Transaction History: ", error);
      });
  };

  // const onButtonClick = () => {
  //   // using Java Script method to get PDF file
  //   fetch(
  //     'GET',
  //     'https://testmate.in/api/download_invoice.php?token=' +
  //       urlToken +
  //       '&payment_id=' +
  //       paymentId,
  //     {}
  //   ).then((resp) => {
  //     resp.blob().then((blob) => {
  //       // Creating new object of PDF file
  //       const fileURL = window.URL.createObjectURL(blob);
  //       // Setting various property values
  //       let alink = document.createElement('a');
  //       alink.href = fileURL;
  //       alink.download =('GET', 'https://testmate.in/api/download_invoice.php?token='+urlToken+'&payment_id='+this.state.paymentId, {});
  //       alink.click();
  //     });
  //   });
  // };

  // const onButtonClick = () => {
  //   // using Java Script method to get PDF file
  //   const url =
  //     "https://testmate.in/api/download_invoice.php?token=" +
  //     urlToken +
  //     "&payment_id=" +
  //     paymentId;
  //   var body = {
  //     token: urlToken,
  //     id: "11",
  //   };
  //   console.log("------", body);
  //   axios
  //     .post(url, body, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     //   .then((resp) => {
  //     // console.log("Transaction ---", resp.data);
  //     // const url = window.URL.createObjectURL(new Blob([resp]));
  //     // const link = document.createElement("a");
  //     // link.href = url;
  //     // link.setAttribute("download", `${userInfo.first_name}.pdf`); //or any other extension
  //     // document.body.appendChild(link);
  //     // link.click();

  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       // Create blob link to download
  //       const url = window.URL.createObjectURL(new Blob([blob]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", `FileName.pdf`);

  //       // Append to html link element page
  //       document.body.appendChild(link);

  //       // Start download
  //       link.click();

  //       // Clean up and remove the link
  //       link.parentNode.removeChild(link);
  //     });
  // };

  async function printTickets() {
    const { data } = await getTicketsPdf()
    const blob = new Blob([data], { type: 'application/pdf' })
    saveAs(blob, "tickets.pdf")
  }
  
  async function getTicketsPdf() {
    return axios.get('https://testmate.in/api/download_invoice.php?token='+urlToken+'&payment_id='+paymentId, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'arraybuffer'
    })
  }

  return (
    <>
    {/* {
      isLoading ? <CircularProgress
    } */}
      <div className="container-fluid">
        { isLoading ?
        <CircularProgress style={{display:"block",margin:"auto", color:"white"}} /> :
        transactionData == "" ? (
          <h4 className="text-white text-center">No Transaction History</h4>
        ) : (
          <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 m-auto">
            {transactionData?.map((data, index) => (
              <>
                <div className="card sub-header justify-content-between d-flex" style={{height:"auto"}}>
                  <div className="w-100 mt-2">
                    <div className="col-12 d-flex">
                      <div className="w-100">
                        <div className="d-flex justify-content-between ">
                          <div className="w-100">
                            <h6 className="pt-1 com-font">
                              &nbsp;&nbsp;
                              {moment(data.datetime).format("DD MMM YYYY")}
                            </h6>
                          </div>
                          <div className="">
                            <h6 className="com-font">&#x20B9;{data.price}&nbsp;</h6>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="p-2 w-100">
                            <h5 className="com-font"
                              style={{
                                cursor: "pointer",
                                color: "var(--blue)",
                              }}
                            >
                              {data.pkg_name}
                            </h5>
                          </div>
                          <div className="px-2 text-left">
                            <h6 className="com-font">
                              Status:&nbsp;
                              <span
                                style={{
                                  color:
                                    data.tran_status == "success"
                                      ? "#50BFA5"
                                      : "#E84857",
                                  textTransform: "uppercase",
                                }}
                              >
                                {data.tran_status}
                                &nbsp;
                              </span>{" "}
                              &nbsp;
                            </h6>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div className="">
                            <h6 className="com-font com-mar">&nbsp;&nbsp; Order Id : {data.order_id}</h6>
                          </div>
                          <div className="">
                            <h6 className="com-font com-mar" onClick={printTickets}>
                              <i className="bx bxs-download"></i>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionHistory;

// <center>
//      <h1>Welcome to Geeks for Geeks</h1>
//      <h3>Click on below button to download PDF file</h3>
//      <button onClick={onButtonClick} className="text-danger">
//          Download PDF
//      </button>
//  </center>

// const onButtonClick = () => {
//   // using Java Script method to get PDF file
//   fetch('SamplePDF.pdf').then(response => {
//       response.blob().then(blob => {
//           // Creating new object of PDF file
//           const fileURL = window.URL.createObjectURL(blob);
//           // Setting various property values
//           let alink = document.createElement('a');
//           alink.href = fileURL;
//           alink.download = 'SamplePDF.pdf';
//           alink.click();
//       })
//   })
// }
