import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { useChannelOwner } from 'contexts/channel-owner';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: 64,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.isDark ? '#212121' : 'white',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      top: 56,
    },
  },
  containerInner: {
    width: 960,
    margin: '0 auto',
    paddingTop: 14,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  linkContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  link: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    padding: '20px 0',
    margin: '0 15px',
    border: '1px solid transparent',
    borderBottom: '5px solid #555',
    borderRadius: 8,
    minWidth: 100,
    [theme.breakpoints.down('sm')]: {
      margin: '0 5px',
    },
    ...(theme.palette.isDark
      ? {
          background: '#333',
          color: 'white',
        }
      : {
          borderColor: '#ddd',
          color: '#333',
        }),
  },
  active: {
    borderBottomColor: theme.palette.secondary.main,
  },
}));

function Component() {
  const classes = useStyles();
  const path = window.location.hash;
  const isFeedbox = '#/feedbox' === path;
  const isChannels = '#/' === path;
  const isCreateChannel = '#/create-channel' === path;
  const isManageChannel = '#/manage-channel' === path;
  const { ownsChannel } = useChannelOwner();

  return (
    <div className={clsx('flex flex-col flex-grow', classes.container)}>
      <div className={clsx('flex flex-grow', classes.containerInner)}>
        <Link to="/feedbox" className={classes.linkContainer}>
          <Paper
            className={clsx(classes.link, {
              [classes.active]: isFeedbox,
            })}
          >
            Feedbox
          </Paper>
        </Link>
        <Link to="/" className={classes.linkContainer}>
          <Paper
            className={clsx(classes.link, {
              [classes.active]: isChannels,
            })}
          >
            Channels
          </Paper>
        </Link>
        {ownsChannel ? (
          <Link to="/manage-channel" className={classes.linkContainer}>
            <Paper
              className={clsx(classes.link, {
                [classes.active]: isManageChannel,
              })}
            >
              Manage Channel
            </Paper>
          </Link>
        ) : (
          <Link to="/create-channel" className={classes.linkContainer}>
            <Paper
              className={clsx(classes.link, {
                [classes.active]: isCreateChannel,
              })}
            >
              Create Channel
            </Paper>
          </Link>
        )}
      </div>
    </div>
  );
}

export default withRouter(Component);
