import React from 'react';
import ViewBtn from '@material-ui/icons/Visibility';
import { AgGridIconRender } from '../../core/AgGridIconRender';

export const AgGridViewBtnRender = (props) => {
  return <AgGridIconRender 
    iconCom={ViewBtn}
    {...props}
  >
  </AgGridIconRender>;
};
