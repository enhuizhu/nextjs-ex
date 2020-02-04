import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { AgGridIconRender } from '../../core/AgGridIconRender';

export const AgGridEditBtnRender = (props) => {
  return <AgGridIconRender 
    iconCom={EditIcon}
    {...props}
  >
  </AgGridIconRender>;
};