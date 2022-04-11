import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ImageFinder from '../api/index'
import { Loading } from '../components/loader/Loading';
import Message from '../components/Message';

export const View = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false);

  const {id} = useParams()

  

  useEffect(()=>{
    const fetchSingleImage = async ()=>{
      try {
        const res = await ImageFinder.get(`/${id}`,{
          headers :{
            'authorization': `Bearer ${
              JSON.parse(localStorage.getItem("uploadProfile")).token
            }`
          }
        })
  
        setLoading(true)
        if (res){
          setLoading(false)
          setMessage({ type: "success", msg: "Image found " });
          setImageUrl(res.data.data)
        }else{
          setLoading(false)
          setMessage({ type: "error", msg: "An error occur" });
        }
      } catch (error) {
        setMessage({ type: "error", msg: error });
        console.log(error);
      }
    }
    fetchSingleImage()
    
  },[id])
  

  return (
    <>
      {message ? <Message msg={message.msg} type={message.type} /> : null}
      {loading && <Loading /> } 
      <div className='container-fluid row bg-dark mt-5'>
        <div className='col-md-6 m-auto'>
          {/* <h3 className='text-center'>{uploadFile.fileName}</h3> */}
          <img src={imageUrl} className="img-fluid" alt="img"/>
        </div>
      </div>
   </> 
  )
}
