import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authorize } from './authorize/Authorize';
import { Polls } from './polls/Polls';
import { ReplyByLink } from './reply/ReplyByLink';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authorize/>} />
        <Route path="/reply/:link" element={<ReplyByLink content='Reply'/>} />
        <Route path="/polls/" element={<Polls content='Greetings' link={null} />} />
      </Routes>
    </BrowserRouter>
);