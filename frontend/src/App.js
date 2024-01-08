import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import Form from "./components/Form"




function App() {
return( <div className="App">

<Routes>

<Route path='/' element={<Home/>} ></Route>
 <Route path='/form' element={<Form/>} ></Route>
 

</Routes>

 
</div>)
 
}

export default App;
