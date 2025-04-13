import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { showPopup } from '../actions';
import Spinner from '../SupportScreens/Spinner';

const PopupExample = () => {
  const [showAlert, setShowAlert] = useState(false);
  const getPopupStatus = useSelector((state) => state.showItemPopup);
  const getPopupValues = useSelector((state) => state.passPopupItem);
  const getOrderId = useSelector((state)=> state.passPopupOrderId.orderId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);


  //   const handleShowAlert = () => {
  //     setShowAlert(true);
  //   };

  //   const handleCloseAlert = () => {
  //     setShowAlert(false);
  //   };

  useEffect(() => {
    setShowAlert(getPopupStatus);
    setOrders(getPopupValues[getPopupValues.length-1]);
    //getOrderAccId();
    setLoading(false);
    console.log(orders);
  }, [orders])

  const handleCloseAlert = () => {
    setShowAlert(false);
    dispatch(showPopup());
    navigate('/dash');
  }

  const getOrderAccId = async () => {
    let result = await fetch(`http://localhost:5000/getOrderById/${param.id}`, {
      method: "GET",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
        'Content-Type': 'application/json'
      }
    })
    result = await result.json();
    //console.log(result);
    if (result.length > 0) {
      let productDetails = [result.product, result.quantity];
      setOrders(productDetails);
      setLoading(false);
    }
    else{
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ?
        <div className="flex flex-col w-screen items-center justify-center">
          <Spinner />
        </div> :
        <div className='overflow-y-auto'>
          {/*<button
        onClick={handleShowAlert}
        style={{
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Show Custom Alert
      </button>*/}

          {showAlert && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '10px',
                  maxWidth: '400px',
                  width: '90%',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ marginBottom: '10px' }}>Order Details</h3>
                <h3>Order Id : {getOrderId}</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {orders ? (<>
                      {orders.map((item, index) => (
                        <tr>
                          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{index<1? "Products":"Quantity"}</td>
                          {item.map((value, i)=>(
                          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{value}</td>)
                          )}
                        </tr>)
                      )} </>
                    ) : (
                      <></>
                    )
                    }
                  </tbody>
                </table>

                

                <button
                  onClick={handleCloseAlert}
                  style={{
                    marginTop: '20px',
                    padding: '8px 16px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default PopupExample;
