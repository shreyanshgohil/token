import "../styles/globals.css";
import { UserContextProduder } from "../context/UserContext";
function MyApp({ Component, pageProps }) {
  return (
    <UserContextProduder>
      <Component {...pageProps} />
    </UserContextProduder>
  );
}

export default MyApp;
