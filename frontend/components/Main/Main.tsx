import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
// import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
// import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import useWallet from '../../hooks/useWallet';
import { useAppContext } from '../../pages/context/AppContext'
import ConnectWallet from '../ConnectWallet/ConnectWallet'

const Main = () => {
  const { state, dispatch } = useAppContext();
  const { connect, disconnect } = useWallet(state, dispatch);
  const { account } = state;

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        p={8}
      >
        <Grid item p={4}>
          <ConnectWallet
            account={account}
            onConnect={connect}
            onDisconnect={disconnect}
          />
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CardContent sx={{ flex: '1 100' }}>
                <Toolbar>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Your nft address"
                        InputProps={{
                          disableUnderline: true,
                          sx: { fontSize: 'default' },
                        }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item>
                      <Button variant="contained" sx={{ mr: 1 }}>
                        Add
                      </Button>
                      {/* <Tooltip title="Reload"> */}
                        {/* <IconButton>
                          <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                        </IconButton> */}
                      {/* </Tooltip> */}
                    </Grid>
                  </Grid>
                </Toolbar>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                {/* <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="../images/cards/live-from-space.jpg"
                  alt="Live from space album cover"
                /> */}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Main;