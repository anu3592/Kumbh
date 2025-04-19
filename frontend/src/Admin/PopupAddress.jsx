import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { showPopup, showPopup2 } from '../actions';
import Spinner from '../SupportScreens/Spinner';

const PopupAddress = () => {
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const getAddress = useSelector((state)=>state.passPopupAddressData);
    const getPopupAddress = useSelector((state)=>state.showAddressPopup);
    const dispatch = useDispatch();
    const [address, setAddress] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        setShowAlert(getPopupAddress);
        setAddress(getAddress.address);
        setLoading(false);
        console.log(getAddress.address);
    },[address])

    const handleCloseAlert = () => {
        setShowAlert(false);
        dispatch(showPopup2());
        navigate('/dash');
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
                <h3 style={{ marginBottom: '10px' }}>Address</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {address ? (<>
                        <p>{address}</p>
                       </>
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
    )
};

export default PopupAddress;
