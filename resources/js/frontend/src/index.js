import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import TaskApp from './maintasks/TaskApp';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <TaskApp />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
