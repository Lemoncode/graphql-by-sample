import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  namePictureContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  picture: {
    marginLeft: '25%',
    maxWidth: '300px',
  },
});
