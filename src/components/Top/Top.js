// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { blueGrey } from 'material-ui/colors';
import {WalletDialog} from './WalletDialog';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import HomeIcon from 'material-ui-icons/Home';
import {Menu} from './Menu';
import classNames from 'classnames';
import {Title} from './Title';
import {Wallet} from './Wallet';
import './Top.css';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
};

const menu = [
  {icon: 'home', name: 'ENS.BID'},
  {icon: 'view_list', name: 'My ENS List'},
  {icon: 'gavel', name: 'ENS Trade'},
  {icon: 'attach_money', name: 'ENS Loan'},
];

const info = [
  {icon: 'help_outline', name: 'FAQ'},
  {icon: 'assignment', name: 'Terms & Service'},
]

const MenuItem = (props) => (
  <ListItem button className="Top-Drawer-ListItem">
     <ListItemIcon>
        <i className="material-icons">{props.icon}</i>
     </ListItemIcon>
     <ListItemText primary={props.children} className="Top-Drawer-ListItemText"/>
  </ListItem>
); 

const menuItems = menu.map(({icon, name}, index) => 
  <MenuItem key={`menu-${index}`} icon={icon}>{name}</MenuItem>);

const infoItems = info.map(({icon, name}, index) => 
  <MenuItem key={`menu-${index}`} icon={icon}>{name}</MenuItem>);

const MenuDrawer = (props) => (
  <Drawer
    type="persistent"
    open={props.menu}>
  <div className="Top-Drawer">
    <div className="Top-Drawer-Chevron">
      <IconButton onClick={props.handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      {menuItems}
    </List>
    <Divider />
    <List>
      {infoItems}
    </List>
  </div>
</Drawer>
);

class Top extends Component {
  state = {
    open: false,
    menu: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleDrawerOpen = () => {
    this.setState({ menu: true });
  };

  handleDrawerClose = () => {
    this.setState({ menu: false });
  };

  render () {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: blueGrey[900] }}>
          <Toolbar>
            <Menu handleDrawerOpen={this.handleDrawerOpen}/>
            <Title className={classes.flex} />
            <Wallet 
              privateKey={this.props.privateKey}
              onClick={() => this.setState({ open: true })} />
            <WalletDialog 
              open={this.state.open} 
              {...this.props}
              handleRequestClose={this.handleRequestClose}
              />
          </Toolbar>
        </AppBar>
        <MenuDrawer menu={this.state.menu} handleDrawerClose={this.handleDrawerClose}/>
      </div>
    );
  }
}

Top.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Top);