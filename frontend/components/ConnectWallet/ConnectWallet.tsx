import Button from "@mui/material/Button";

interface ButtonProps {
  account: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ConnectWallet = ({ account, onConnect, onDisconnect }: ButtonProps) => {
  const AccountLabel = () => (
    <Button onClick={onDisconnect}>
      {[account.slice(0, 5), account.slice(-5)].join("...")}
    </Button>
  )

  const ButtonConnect = () => (
    <Button variant="contained" onClick={onConnect}>
      Connect
    </Button>
  )

  return account ? <AccountLabel /> : <ButtonConnect />;
}

export default ConnectWallet;