import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ApiService } from '../services/ApiService';
import store from '../store/store';
import { showLoader, hideLoader } from '../store/actions/loader.actions';
import { CardContent, Card, Tooltip, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';
import { AppDialog } from '../components/app-dialog/AppDialog';
import { PropertyFrom } from '../components/property-form/PropertyForm';
import { AgGridDeleteBtnRender } from '../components/ag-grid-delete-btn-render/AgGridDeleteBtnRender';
import { AgGridViewBtnRender } from '../components/ag-grid-view-btn-render/AgGridViewBtnRender';
import { AgGridEditBtnRender } from '../components/ag-grid-edit-btn-render/AgGridEditBtnRender';
import { ADD, EDIT, VIEW } from '../constants/propertyForm.constants';

class HomePage extends React.Component <any, any>{
  public colWidth = 70;
  
  public titleMap = {
    [ADD]: 'Add New Property',
    [EDIT]: 'Edit Property',
    [VIEW]: 'View the Property',
  }
  
  public columnDefs = [
    {
      headerName: 'View',
      field: 'view',
      pinned: 'left',
      width: this.colWidth,
      cellRenderer: 'ViewBtn',
      cellRendererParams: {
        title: 'view the property',
        clickCallback: (data) => {
          this.dialogRef.current.openDialog();
          this.setState({
            formMode: VIEW,
            formData: data,
          })
        }
      }
    },
    {
      headerName: 'Edit',
      field: 'edit',
      pinned: 'left',
      width: this.colWidth,
      cellRenderer: 'EditBtn',
      cellRendererParams: {
        title: 'Edit the property',
        clickCallback: (data) => {
          this.dialogRef.current.openDialog();
          
          this.setState({
            formMode: EDIT,
            formData: data,
          });
        }
      }
    },
    {
      headerName: 'Delete',
      field: 'delete',
      pinned: 'left',
      width: this.colWidth,
      cellRenderer: 'DeleteBtn',
      cellRendererParams: {
        title: 'Delete the property',
        clickCallback: (data) => {
          store.dispatch(showLoader());

          ApiService.deleteProperty(data.id).then((result) => {
            store.dispatch(hideLoader());
            setTimeout(this.fetchAllPropertyData, 0);
          }).catch((e) => {
            store.dispatch(hideLoader());
            console.error(e);
          })
        }
      }
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
    formMode: ADD,
    formData: {},
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

    ApiService.getAllProperties().then(result => {
      if (result.success) {
        this.setState({
          rowData: result.data,
        });
      } else {
        console.error('fail to featch the data');
      }
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
        
        ApiService[this.state.formMode === ADD ? 'addProperty' : 'updateProperty']
          (formData).then(result => {
            setTimeout(this.fetchAllPropertyData, 0);
          }).catch(console.error)
          .finally(() => {
            store.dispatch(hideLoader());
          });
      }}
      mode={this.state.formMode}
      data={this.state.formData}
    >
    </PropertyFrom>
  }

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Tooltip title="Add new item" placement="top">
              <AddIcon style={{width: 20, height: 20}}
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
                frameworkComponents={
                  {
                    'DeleteBtn': AgGridDeleteBtnRender,
                    'ViewBtn': AgGridViewBtnRender,
                    'EditBtn': AgGridEditBtnRender,   
                  }
                }
              >
              </AgGridReact>
            </div>
          </CardContent>
        </Card>
        <AppDialog
          title={this.titleMap[this.state.formMode]}
          BodyContent={this.dialogBodyContent()}
          ref={this.dialogRef}
          onClose={() => {
            this.setState({
              formData: {},
              formMode: ADD,
            });
          }}
        ></AppDialog>
      </div>
     
      );
  }  
}

export default HomePage;