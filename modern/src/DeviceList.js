import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateDevices } from './actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

const mapStateToProps = state => ({
  devices: state.devices
});

class DeviceList extends Component {
  componentDidMount() {
    fetch('/api/devices').then(response => {
      if (response.ok) {
        response.json().then(devices => {
          this.props.dispatch(updateDevices(devices));
        });
      }
    });
  }

  render() {
    const devices = this.props.devices.map((device, index, list) =>
      <Fragment key={device.id.toString()}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <LocationOnIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={device.name} secondary={device.uniqueId} />
          <ListItemSecondaryAction>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {index < list.length - 1 ? <Divider /> : null}
      </Fragment>
    );

    return (
      <List>
        {devices}
      </List>
    );
  }
}

export default connect(mapStateToProps)(DeviceList);
