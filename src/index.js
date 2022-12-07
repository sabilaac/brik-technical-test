import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from "react-redux";
import "bootstrap/scss/bootstrap.scss";
import './index.css';
// import store from "./state/store";
// import './custom.scss';
import Home from './routes/Home';
import Detail from './routes/Detail';
import About from './routes/About';
import Edit from './routes/Edit';
import Create from './routes/Create';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import NavbarHeader from './components/NavbarHeader';
import Footer from './components/Footer';
import {store} from './state/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <NavbarHeader />
      <div className='flex-fill'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/product/edit/:id" element={<Edit />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
      </div>
      <Footer />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
