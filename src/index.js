import './antd.less';
import './index.less';
import 'braft-editor/dist/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {HistoryInitial} from 'h-react-antd';

import preprocessing from "./preprocessing";

ReactDOM.render(
  <HistoryInitial
    preprocessing={preprocessing}
    forceLogin={false}
    catalog={false}
    guidance={false}
  />, document.getElementById('h-container'));
