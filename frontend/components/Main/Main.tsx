import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  List,
  ListItemText,
  Grid,
  TextField,
  Toolbar,
  Typography,
  CardActions
} from '@mui/material';
import {
  useYieldFarmingContract,
  useStakeTokenContract
} from '../../hooks/useContract';
import { stakeTokenAddress, yieldFarmingAddress } from '../../utils/constants';
import { approve, earned, filterByEvent, rewards, stake, uri } from '../../utils/calls';
import useWallet from '../../hooks/useWallet';
import { useAppContext } from '../../pages/context/AppContext'
import ConnectWallet from '../ConnectWallet/ConnectWallet'

const Main = () => {
  const [nftId, setNftId] = useState<string>('');
  const [nftData, setNftData] = useState<any>({});
  const [readyToEarned, setReadyToEarned] = useState<boolean>(false);
  const [totalEarned, setTotalEarned] = useState<string>('')
  const { state, dispatch } = useAppContext();
  const { account } = state;
  const { connect, disconnect } = useWallet(state, dispatch);
  const yieldFarmingContract = useYieldFarmingContract();
  const stakeTokenContract = useStakeTokenContract();

  async function fetchNFTData() {
    if (!nftId)
      return;

    try {
      const tokenUri = await uri(stakeTokenContract, account, nftId);
      const data = await fetch(tokenUri.replace("{id}.json", nftId));
      const response = await data.json();

      setNftData(response);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function getTotalToEarn() {
    try {
      const totalEarned = await earned(yieldFarmingContract, account);

      setTotalEarned(totalEarned.toString())
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function getRewards() {
    try {
      await rewards(yieldFarmingContract, account);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function stakeNft() {
    try {
      await approve(stakeTokenContract, account, yieldFarmingAddress, true);
      await stake(yieldFarmingContract, account, nftId, "");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setReadyToEarned(!!account);

    if (!nftId || !account) {
      setNftId('');
      setNftData({});
    }

    if (account && yieldFarmingContract) {
      filterByEvent(yieldFarmingContract, 'Staked', account).then((data: any) => {
        setReadyToEarned(data.length > 0);
      });
    }
  }, [nftId, account, yieldFarmingContract, readyToEarned]);

  const GetRewards = () => (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', flex: '1 1' }}>
        <Typography variant="caption">
          Earned: {totalEarned}
        </Typography>
        <Button size="small" color="secondary" onClick={getTotalToEarn}>
          Total to earn
        </Button>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={getRewards}>
          Get Rewards
        </Button>
      </CardActions>
    </Card>
  );

  const NFTDetails = () => (
    <Card>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        with: '50%',
        paddingTop: 8,
        pl: 1,
        pb: 1
      }}>
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={nftData.image}
          alt={nftData.description}
        />
        <List>
          <ListItemText
            primary={nftData.name}
            secondary={nftData.description}
          />
        </List>
      </Box>
      <CardActions>
        <Button size="small" color="primary" onClick={stakeNft}>
          Stake
        </Button>
      </CardActions>
    </Card>
  )

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        p={12}
      >
        <Grid item p={2}>
          <ConnectWallet
            account={account}
            onConnect={connect}
            onDisconnect={disconnect}
          />
        </Grid>
        <Grid item p={4}>
          <Card>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                title={
                  <Typography variant="h4" gutterBottom component="div">
                    🎉 Play to earn! 🎉
                  </Typography>
                }
                subheader={
                  <p>Here you can earn rewards<br/> with your NFT item!</p>
                }
              />
              <CardContent sx={{ flex: '1 1' }}>
                <Grid container>
                  <span>Stake token address:</span>
                  <a href="#">{[stakeTokenAddress.slice(0,5), stakeTokenAddress.slice(-5)].join('...')}</a>
                </Grid>
                <Toolbar>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="NFT ID"
                        InputProps={{
                          disableUnderline: true,
                          sx: { fontSize: 'default' },
                        }}
                        variant="standard"
                        value={nftId}
                        onChange={(e: any) => {
                          e.preventDefault();
                          setNftId(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{ mr: 1 }}
                        disabled={!account}
                        onClick={fetchNFTData}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Toolbar>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid item p={4}>
          {
            nftData.image && <NFTDetails />
          }
        </Grid>
        <Grid>
          {
            readyToEarned && <GetRewards />
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default Main;
