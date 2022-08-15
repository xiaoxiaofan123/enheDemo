import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun';


const root = ReactDOM.createRoot(document.getElementById('root'));

registerMicroApps([
  {
    name: 'childOne',
    entry: '//localhost:3001',
    container: '#childOne',
    activeRule: '/childOne',
  },
  // {
  //   name: 'childOne2',
  //   entry: '//localhost:3002',
  //   container: '#childOne2',
  //   activeRule: '/childOne2',
  // },
], { beforeLoad: (app) => { console.log(app) }, beforeUnmount: () => { console.log('beUnmount') } });

start();
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
