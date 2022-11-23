import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Paths} from "../constant";
import {Source} from "../components/pages/source";
import {AddEditSource} from "../components/pages/source/addEdit";


export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.source.list} element={<Source />} />
        <Route path={Paths.source.addEdit} element={<AddEditSource />} />
        <Route path={'*'} element={<div className={'text-center'}>Page Not Fount</div>} />
      </Routes>
    </BrowserRouter>
  );
};
