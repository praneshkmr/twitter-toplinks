import React, { useState } from 'react';
import { node, func } from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Twitter, BarChart, ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { userPropType } from '../../../proptypes/user';

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

const AppTemplate = ({ user, children, logoutUser }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const AuthUserMenuItems = [
    { text: 'Tweets', icon: <Twitter />, onClick: () => history.push('/dashboard') },
    { text: 'Stats', icon: <BarChart />, onClick: () => history.push('/stats') },
    { text: 'Logout', icon: <ExitToApp />, onClick: logoutUser },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {user && (
            <>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
                <div
                  role="presentation"
                  onClick={toggleDrawer}
                  onKeyDown={toggleDrawer}
                >
                  <List>
                    {AuthUserMenuItems.map(({ text, icon, onClick }) => (
                      <ListItem button key={text} onClick={onClick}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Drawer>
            </>
          )}
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
  user: userPropType,
  children: node.isRequired,
  logoutUser: func,
};

export default AppTemplate;
