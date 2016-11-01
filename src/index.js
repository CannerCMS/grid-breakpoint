import React, {Component, PropTypes, Children} from 'react';
import {Grid, Col} from '@canner/react-flexbox-grid/lib/index';

export default class GridBreakpoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: Children.toArray(props.children)
    };
  }

  static propTypes = {
    children: PropTypes.any,
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
    lgOffset: PropTypes.number,
    mdOffset: PropTypes.number,
    smOffset: PropTypes.number,
    xsOffset: PropTypes.number
  };

  render() {
    const {lg, md, sm, xs, lgOffset, mdOffset, smOffset, xsOffset} = this.props;
    const {children} = this.state;

    return (
      <div>
        <Grid>
          {
            children.map(child => {
              return (
                <Col {...this.props}>
                  {child}
                </Col>
              );
            })
          }
        </Grid>
      </div>
    );
  }
}
