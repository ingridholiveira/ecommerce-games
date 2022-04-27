import React from "react";
import { Route, Routes } from "react-router-dom";

import Orders from "./components/Orders";

const Rotas = () => {
    console.log('rotas routesjs')
   return(
       <Routes>
           <Route element = {<Orders />}  path="/" exact />
       </Routes>
   )
}

export default Rotas;