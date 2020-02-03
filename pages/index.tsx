import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ApiService } from '../services/ApiService';
import store from '../store/store';
import { showLoader, hideLoader } from '../store/actions/loader.actions';
import { CardContent, Card, Tooltip, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';
import { AppDialog } from '../components/app-dialog/AppDialog';
import { PropertyFrom } from '../components/property-form/PropertyForm';

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
  
  public dialogRef = React.createRef<AppDialog>();

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchAllPropertyData();
  }

  fetchAllPropertyData = () => {
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

  dialogBodyContent = () => {
    return <PropertyFrom onCancel={() => {
        this.dialogRef.current.handleClose();
      }}
      onSubmit={(formData) => {
        this.dialogRef.current.handleClose();
        store.dispatch(showLoader());
        ApiService.addProperty(formData).then(result => {
          setTimeout(this.fetchAllPropertyData, 0);
        }).catch(console.error)
        .finally(() => {
          store.dispatch(hideLoader());
        });
      }}
    >
    </PropertyFrom>
  }

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Tooltip title="Add new item" placement="top">
              <AddIcon 
                color="primary" 
                className="tool-icon"
                onClick={() => {
                  if (!this.dialogRef.current) {
                    return false;
                  }

                  this.dialogRef.current.openDialog();
                }}
              >
              </AddIcon>
            </Tooltip>
            <div className="ag-theme-balham" style={ {height: '500px', width: '100%', margin: 'auto'} }>
              <AgGridReact
                columnDefs={this.columnDefs}
                rowData={this.state.rowData}
              >
              </AgGridReact>
            </div>
          </CardContent>
        </Card>
        <AppDialog
          title="Add New Property"
          BodyContent={this.dialogBodyContent()}
          ref={this.dialogRef}
        ></AppDialog>
      </div>
     
      );
  }  
}

export default HomePage;