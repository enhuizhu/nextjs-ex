import React from 'react';
import { 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select,
  Divider 
} from '@material-ui/core';

import { ADD, EDIT, VIEW } from '../../constants/propertyForm.constants';
import propTypes from 'prop-types';


export class PropertyFrom extends React.Component<any, any> {
  public static propTypes = {
    onCancel: propTypes.func,
    data: propTypes.object,
    mode: propTypes.string
  };

  public static defaultProps = {
    onCancel: () => {},
    data: {},
    mode: ADD,
  };
  
  constructor(props) {
    super(props);

    this.state = {
      formData: {...props.data} || {},
      errors: {},
    }
  }

  setDataBaseOnKeyAndValue = (key: any, value: any, stateName) => {
    const newData = Object.assign({}, this.state[stateName] , {[key]: value});
    
    this.setState({
      [stateName]: newData,
    });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.formData);
  } 

  render() {
    const { formData, errors } = this.state;
    const { mode } = this.props
    const disabled = mode === VIEW;

    return (<div>
      <div>
        <TextField
          className="margin-bottom-10"
          label="Number of Bedrooms"
          type="number"
          fullWidth
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={formData.numberOfBedrooms}
          error={errors.numberOfBedrooms}
          onFocus={() => {
            this.setDataBaseOnKeyAndValue('numberOfBedrooms', false, 'errors');
          }}
          onChange={(e) => {
            this.setDataBaseOnKeyAndValue('numberOfBedrooms', e.target.value, 'formData');
          }}
        />
        <TextField
          className="margin-bottom-10"
          label="Number of Bathrooms"
          type="number"
          fullWidth
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={formData.numberOfBathrooms}
          error={errors.numberOfBathrooms}
          onFocus={() => {
            this.setDataBaseOnKeyAndValue('numberOfBathrooms', false, 'errors');
          }}
          onChange={(e) => {
            this.setDataBaseOnKeyAndValue('numberOfBathrooms', e.target.value, 'formData');
          }}
        />
        <TextField
          className="margin-bottom-10"
          label="Number of ReceptionRooms"
          type="number"
          fullWidth
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={formData.numberOfReceptionRooms}
          error={errors.numberOfReceptionRooms}
          onFocus={() => {
            this.setDataBaseOnKeyAndValue('numberOfReceptionRooms', false, 'errors');
          }}
          onChange={(e) => {
            this.setDataBaseOnKeyAndValue('numberOfReceptionRooms', e.target.value, 'formData');
          }}
        />
         <TextField
          className="margin-bottom-10"
          label="Price £"
          type="number"
          fullWidth
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={formData.price}
          error={errors.price}
          onFocus={() => {
            this.setDataBaseOnKeyAndValue('price', false, 'errors');
          }}
          onChange={(e) => {
            this.setDataBaseOnKeyAndValue('price', e.target.value, 'formData');
          }}
        />
        <TextField
          className="margin-bottom-10"
          label="First Line of Address"
          type="string"
          fullWidth
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={formData.firstLineOfAddress}
          error={errors.firstLineOfAddress}
          onFocus={() => {
            this.setDataBaseOnKeyAndValue('firstLineOfAddress', false, 'errors');
          }}
          onChange={(e) => {
            this.setDataBaseOnKeyAndValue('firstLineOfAddress', e.target.value, 'formData');
          }}
        />
        <TextField
          className="margin-bottom-10"
          label="Post Code"
          type="string"
          fullWidth
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={formData.postCode}
          error={errors.postCode}
          onFocus={() => {
            this.setDataBaseOnKeyAndValue('postCode', false, 'errors');
          }}
          onChange={(e) => {
            this.setDataBaseOnKeyAndValue('postCode', e.target.value, 'formData');
          }}
        />
        <TextField
          className="margin-bottom-10"
          label="Length of Leasehold"
          type="number"
          fullWidth
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={formData.leaseholdLength}
          error={errors.leaseholdLength}
          onFocus={() => {
            this.setDataBaseOnKeyAndValue('leaseholdLength', false, 'errors');
          }}
          onChange={(e) => {
            this.setDataBaseOnKeyAndValue('leaseholdLength', e.target.value, 'formData');
          }}
        />
       
        <FormControl
          className="margin-bottom-10" 
          error={errors.isChainFree} 
          fullWidth
          disabled={disabled}   
        >
          <InputLabel shrink={true}>Is Chain Free?</InputLabel>
          <Select
            value={typeof formData.isChainFree === 'undefined' ? undefined : (formData.isChainFree ? 1 : 0 )}
            onChange={(e) => {
              this.setDataBaseOnKeyAndValue('isChainFree',e.target.value, 'formData');
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>YES</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className="margin-bottom-10"
          label="Description"
          type="number"
          multiline
          rows={10}
          fullWidth
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={formData.description}
          error={errors.description}
          onFocus={() => {
            this.setDataBaseOnKeyAndValue('description', false, 'errors');
          }}
          onChange={(e) => {
            this.setDataBaseOnKeyAndValue('description', e.target.value, 'formData');
          }}
        />
      </div>

      <div style={{marginTop: 30}}>
        <Divider className="margin-bottom-10" />
        {
         this.props.mode === VIEW ? 
          '' : 
          <Button 
            variant="contained" 
            color="primary"
            onClick={this.handleSubmit}
          >
            {this.props.mode === ADD ? 'Add Property' : 'Update Property'}
          </Button> 
        }
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={this.props.onCancel}>
          Cancel
        </Button>
      </div>
    </div>);
  }
}
