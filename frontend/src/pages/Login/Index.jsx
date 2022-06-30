import Banner from "../../components/Banner";
import Connexion from "../../components/Connexion";

function Login() {
  localStorage.clear()
  return (
    <div>
      <Banner />
      <Connexion />
    </div>
  );
}

export default Login;
