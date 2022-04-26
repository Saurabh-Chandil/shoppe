import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../components/Home';
const ShoopingHistory = React.lazy(() => import('../components/ShoppingHistory'));
const AddnewItem = React.lazy(() => import('../components/AddNewItem'))

const routes = (
  <Routes>
          <Route path="shoppingHistory" element={
            <Suspense fallback={<Home />}>
              <ShoopingHistory />
            </Suspense>
          } />
          <Route path="addNewItem" element={
            <Suspense fallback={<Home />}>
              <AddnewItem />
            </Suspense>
          } />
          <Route path="*" element={<Home />} /> 
  </Routes>
) 

export default routes;
