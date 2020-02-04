import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import propTypes from 'prop-types';

const styles:any = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props: any) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export class AppDialog extends React.Component<any, any> {
  public static propTypes = {
    onClose: propTypes.func,
  };

  public static defaultProps = {
    onClose: () => {}
  };
  
  public state =  {
    open: false,
  }

  handleClose = () => {
    this.setState({
      open: false,
    });

    this.props.onClose();
  }

  openDialog() {
    this.setState({
      open: true,
    })
  }

  render() {
    const { BodyContent } = this.props;

    return <div>
      <Dialog 
        onClose={this.handleClose} 
        aria-labelledby="customized-dialog-title"
        open={this.state.open}>
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          <div style={{minWidth: '500px'}}>
            {
              this.props.title
            }
          </div>
        </DialogTitle>
        <DialogContent dividers>
          { BodyContent }
        </DialogContent>
      </Dialog>
    </div>
  }
}