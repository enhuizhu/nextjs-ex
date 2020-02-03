import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ApiService } from '../services/ApiService';
import store from '../store/store';
import { showLoader, hideLoader } from '../store/actions/loader.actions';

class HomePage extends React.Component <any, any>{
  public columnDefs = [
    {
      headerName: 'Edit',
      field: 'edit',
      pinned: 'left',
    },
    {
      headerName: 'Bed Rooms',
      field: 'numberOfBedrooms',
    },
    {
      headerName: 'Bath Rooms',
      field: 'numberOfBathrooms',
    },
    {
      headerName: 'Reciption Rooms',
      field: 'numberOfReceptionRooms',
    },
    {
      headerName: 'Post Code',
      field: 'postCode',
    },
    {
      headerName: 'First Line Of Address',
      field: 'firstLineOfAddress',
    },
    {
      headerName: 'Length of Leasehold',
      field: 'leaseholdLength',
    },
    {
      headerName: 'Chain Free',
      field: 'isChainFree',
    },
    {
      headerName: 'Description',
      field: 'description',
    },
    {
      headerName: 'Price',
      field: 'price',
    },
    {
      headerName: 'Picture',
      field: 'img',
    },
  ];

  public state = {
    rowData: [],
  }; 

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchAllPropertyData();
  }

  fetchAllPropertyData() {
    store.dispatch(showLoader());

    ApiService.getAllProperties().then(results => {
      this.setState({
        rowData: results
      });

    }).catch(e => {
      console.error(e);
    }).finally(() => {
      store.dispatch(hideLoader());
    });
  }

  render() {
    return (<div className="ag-theme-balham" style={ {height: '90vh', width: '90vw', margin: 'auto'} }>
      <AgGridReact
        columnDefs={this.columnDefs}
        rowData={this.state.rowData}
      >
      </AgGridReact>
    </div>);
  }  
}

export default HomePage;