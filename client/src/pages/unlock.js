import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ImageFinder from '../api/index'
import { Loading } from '../components/loader/Loading';
import Message from '../components/Message';

export const Index = () => {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false);

  const {id}= useParams()
  const navigate = useNavigate()
  
  const handleLogin = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", msg: "" });
    try {
      const res = await ImageFinder.post(`/auth/${id}`, {password})
      localStorage.setItem('uploadProfile', JSON.stringify({...res?.data}))
      setLoading(false)
      navigate(`/share/${id}`)
      window.location.reload()
    } catch (error) {
      setMessage({ type: "error", msg: error?.message });
      setLoading(false)
    }  
  }
  

  return (
    <>
    <h1 className="text-center">Open Image</h1>
    {message ? <Message msg={message.msg} type={message.type} /> : null}
    {loading && <Loading/> } 
    <div>
      <div className="container mt-4">
         <form onSubmit={(e) => handleLogin(e)}>
          <div className="form-group row">            
            <div className="mb-3 col-md-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="btn btn-lg btn-success mb-3" type="submit">Unlock</button>
      </form>
      </div>
    </div>
    </>
  )
}
