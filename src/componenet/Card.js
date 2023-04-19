import React from 'react'
import './card.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
]

const Card = () => {
  const [data, SetData] = useState()
  const [categoryIdx, setCategoryIdx] = useState(-1)
  const [modal, setModal] = useState(false);
  const fetchUserData = (categoryIdx) => {
    const url = categoryIdx >= 0 ? `https://fakestoreapi.com/products/category/${categories[categoryIdx]} ` : "https://fakestoreapi.com/products" 
    fetch(url , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      }
    }).then((result) => {
      return result.json()
    }).then((data) => {
      // console.log(data);
      SetData(data)
    })
      .catch((err) => {

        console.log(" code Error", err);
      })
  }
  const[ide,setIDE] = useState('')
  const getRideDetail = (id) =>{
    fetch("https://fakestoreapi.com/products/" + id,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      }
    }).then((result) => {
      return result.json()
    }).then((data) => {
      setIDE(data);
      // console.log(data);
    })
      .catch((err) => {

        console.log(" code Error", err);
      })
  }
  useEffect(() => {
    fetchUserData(categoryIdx)
  }, [categoryIdx])


  return (
    <div>
      <Modal size="s" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader style={{ position: "relative" }}>
          Ride Detail
          <button style={{ position: "absolute", right: "0", top: "0rem", }} className="close-btn border-0"
            onClick={() => setModal(false)}><i className="fa fa-close"></i>
          </button>
        </ModalHeader>

        <ModalBody>
          {ide ? (
              <div className="row" >
              <div className="col-6"><img src={ide.image} alt="Event-Profile-Image" style={{ width: '100%' }} /></div>
                <div className="col-6">
                  <p><span className="text-danger">ID :</span>{ide.id}</p>
                <p><span className="text-danger">title :</span>{ide.title}</p>
                <p><span className="text-danger">category :</span>{ide.category}</p>
                <p><span className="text-danger">Description :</span>{ide.description}</p>
                </div>
              </div>
          ):null}
        </ModalBody>
      </Modal>

      {/* <div className='container'> */}
      <div className='col-3' id='ram'>
        <div className='buttondiv row'>
          <div className='row'>
            <div className='Sizebox'>
              <h4 style={{ textAlign: "start" }}>Sizes:</h4>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }}>XS</button>
              </div>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }}>SM</button>
              </div>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }}>ME</button>
              </div>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }}>ML</button>
              </div>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }}>LA</button>
              </div>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }}>XL</button>
              </div>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }}>XXL</button>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='Sizebox'>
              <h4 style={{ textAlign: "start" }}>category:</h4>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }} onClick={() => setCategoryIdx(2)} >Men clothing</button>
              </div>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }} onClick={() => setCategoryIdx(3)}>women clothing</button>
              </div>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }} onClick={() => setCategoryIdx(1)}>jewelery</button>
              </div>
              <div className='buttonbox'>
                <button style={{ borderRadius: "100%", padding: "10px" }} onClick={() => setCategoryIdx(0)}>electronics</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-8 row'>
        <div className='col-4'><b style={{ fontSize: "20px", }}>16  Products found</b></div>
        <div className='row' id='imagegap'>
          {data ? data.map((item, index) =>
            <div className='col'  >
              <div style={{ position: 'absolute', zIndex: "1", }}>
                <button style={{ border: "none", backgroundColor: "black", color: "white", }}>{item.category}</button>
              </div>
              <div style={{ position: "relative" }} onClick={() => { 
                setModal(true);
                getRideDetail(item.id)
}}>
                <img src={item.image} height={200} alt='image' />
              </div>
              <p>{item.title}</p>
              <div>
                <p>
                  <small>$</small>
                  <b>{item.rating.rate}</b>
                  {/* <span>.90</span> */}
                </p>
                <p>
                  <b>$</b>
                  <span>
                    {item.rating.count}
                  </span>

                </p>
              </div>
              <button id='bom'>Add to cart</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Card
