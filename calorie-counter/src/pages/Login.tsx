import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <h1>Log In</h1>
      <Link to="/register">Register here</Link>
      <br />
      <Link to="/home">Fake Log In</Link>
    </>
  );
}
export default Login;
