interface ButtonProps {
  account: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ConnectWallet = ({ account, onConnect, onDisconnect }: ButtonProps) => {
  const AccountLabel = () => (
    <button onClick={onDisconnect}>{account}</button>
  )

  const ButtonConnect = () => (
    <button onClick={onConnect}>Connect</button>
  )

  return account ? <AccountLabel /> : <ButtonConnect />;
}

export default ConnectWallet;