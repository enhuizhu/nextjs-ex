import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { AgGridIconRender } from '../../core/AgGridIconRender';

export const AgGridDeleteBtnRender = (props) => {
  return <AgGridIconRender 
    iconCom={DeleteIcon}
    color="secondary"
    {...props}
  >
  </AgGridIconRender>;
};