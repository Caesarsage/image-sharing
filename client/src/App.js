import "./index.css";
import { BrowserRouter , Navigate, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/Home";
import {Error} from "./pages/Error";
import { Index } from "./pages/unlock";
import { View } from "./pages/View";

const MyRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/share/${id}/auth`} replace />;
};

function App() {
  const user = JSON.parse(localStorage.getItem('uploadProfile'))
  
  return (
    <div>
        <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/share/:id" element={ user ? <View/> : <MyRedirect />} /> 
            <Route path="/share/:id/auth" element={<Index />} />                    
            {/* <Route path="/view" element={ <View />} /> */}
            <Route path="*" element={<Error />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
