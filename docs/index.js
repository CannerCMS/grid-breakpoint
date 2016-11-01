import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {range} from 'lodash';
import GridBreakpoint from '../src';

class GridBreakpointExample extends Component {
  constructor(props) {
    super(props);
    this.changeData = this.changeData.bind(this);

    this.state = {
      toggle: false
    };
  }

  changeData() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  render() {
    const list = range(20).map((col, i) => {
      return <div key={i}>{col}</div>;
    });

    const list2 = range(10).map((col, i) => {
      return <div key={i}>{col}</div>;
    });

    return (
      <div>
        <button onClick={this.changeData}>re-render data</button>
        {
          this.state.toggle ? (
            <GridBreakpoint lg={4} md={3} xs={6}
              rowClassName="row-test" colClassName="col-test">
              {list}
            </GridBreakpoint>
          ) : (
            <GridBreakpoint md={3} xs={4} mdOffset={3}
              rowClassName="row-test" colClassName="col-test">
              {list2}
            </GridBreakpoint>
          )
        }
      </div>
    );
  }
}

ReactDOM.render(
  <GridBreakpointExample/>
, document.getElementById('root'));
