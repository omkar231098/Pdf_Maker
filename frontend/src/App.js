import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import Form from "./components/Form"
import Login from "./components/Login"
import Signup from "./components/Register"



function App() {
return( <div className="App">

<Routes>

<Route path='/' element={<Home/>} ></Route>
 <Route path='/form' element={<Form/>} ></Route>
 <Route path='/login' element={<Login/>} ></Route>
 <Route path='/register' element={<Signup/>} ></Route>

</Routes>

 
</div>)
 
}

export default App;
