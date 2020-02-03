import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
  overlay: {
    position: 'fixed' as 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    zIndex: 2000
  }
}));

export const Loader = function(props: { showLoader: any; }) {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      {
        props.showLoader ? 
          <div className={classes.overlay}>
            <CircularProgress className={classes.progress} />
          </div> : ''
      }
    </React.Fragment>
  )
}

const mapStateToProps = (state: { showLoader: any; }) => {
  return {
    showLoader: state.showLoader
  }
};

export const LoaderContainer = connect(mapStateToProps)(Loader);