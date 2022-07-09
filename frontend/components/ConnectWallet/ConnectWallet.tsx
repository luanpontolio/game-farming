import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import { green } from '@mui/material/colors';

interface ButtonProps {
  account: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[50]),
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],
  },
}));

const ConnectWallet = ({ account, onConnect, onDisconnect }: ButtonProps) => {
  const AccountLabel = () => (
    <Button  onClick={onDisconnect}>
      {[account.slice(0, 5), account.slice(-5)].join("...")}
    </Button>
  )

  const ButtonConnect = () => (
    <ColorButton variant="contained" onClick={onConnect}>
      Connect
    </ColorButton>
  )

  return account ? <AccountLabel /> : <ButtonConnect />;
}

export default ConnectWallet;