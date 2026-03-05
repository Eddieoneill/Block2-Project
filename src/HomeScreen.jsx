import "./HomeScreen.css";

export default function HomeScreen({ account }) {
  if (!account) {
    return <div>Account was not created</div>;
  }

  console.log(account);
  return <h1>Welcome {account.userName} to Ed's Casino!</h1>;
}
