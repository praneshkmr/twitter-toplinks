import React from 'react';
import { node } from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  childrenWrapper: {
    margin: '24px',
  },
}));

const AppTemplate = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Twitter TopLinks
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.childrenWrapper}>
        {children}
      </div>
    </>
  );
};

AppTemplate.propTypes = {
  children: node.isRequired,
};

export default AppTemplate;
