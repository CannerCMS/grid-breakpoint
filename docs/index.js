import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {range} from 'lodash';
import GridBreakpoint from '../src';

class GridBreakpointExample extends Component {
  render() {
    const list = range(20).map(col => {
      return <div>{col}</div>;
    });

    return (
      <GridBreakpoint md={3} xs={6}>
        {list}
      </GridBreakpoint>
    );
  }
}

ReactDOM.render(
  <GridBreakpointExample/>
, document.getElementById('root'));
