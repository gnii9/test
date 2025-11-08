import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Đảm bảo tệp App.jsx hoặc App.js ở cùng thư mục

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Đây là phần đã được chuyển đổi từ JSX:
// <React.StrictMode>
//   <App />
// </React.StrictMode>
//
// ...được chuyển thành:
root.render(
  React.createElement(
    React.StrictMode,
    null, // Tham số thứ hai là 'props', ở đây không có props nên là null
    React.createElement(App, null) // <App /> được chuyển thành React.createElement(App, null)
  )
);