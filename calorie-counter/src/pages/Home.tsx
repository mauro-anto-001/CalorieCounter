import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link to="/logfood">Log Food</Link>
        </li>
        <li>
          <Link to="/login">Log Out</Link>
        </li>
      </ul>
    </>
  );
}
export default Home;
