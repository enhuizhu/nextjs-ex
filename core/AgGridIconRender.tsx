import React from 'react';
import propTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

export class AgGridIconRender extends React.Component<any, any> {
  public static propTypes = {
    iconCom: propTypes.any,
    color: propTypes.string,
  };

  public static defaultProps = {
    color: 'primary'
  };

  render() {
    const Com = this.props.iconCom;
    
    return <Tooltip title={this.props.title || ''} placement="top">
      <Com onClick={() => {
        this.props.clickCallback(this.props.data);
      }} 
      style={{cursor: 'pointer'}} color={this.props.color}
      ></Com>
    </Tooltip>;
  }
}
