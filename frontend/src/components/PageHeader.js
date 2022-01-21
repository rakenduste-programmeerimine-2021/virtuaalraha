import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { Context } from "../store";
import { logoutUser } from "../store/actions";

function PageHeader() {
  const [state, dispatch] = useContext(Context);
  // console.log(state.auth);
  // console.log(state.auth.user.role.includes('true'))
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key={"sitename"}>
        <Link style={{ fontWeight: "bold" }} to="/">
          Virtuaalraha
        </Link>
      </Menu.Item>
      <Menu.Item key={"mainpage"}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {state.auth.user && (
        <>
          <Menu.Item key={"portfolio"}>
            <Link to="/portfolio">Portfolio</Link>
          </Menu.Item>
          {state.auth.user.role === true && (
            <Menu.Item key={"admin"}>
              <Link to="/admin">Admin</Link>
            </Menu.Item>
          )}

          <Menu.Item key={"logout"} onClick={handleLogout}>
            <Link to="#">Logout</Link>
          </Menu.Item>
        </>
      )}

      {!state.auth.user && (
        <>
          <Menu.Item key={"login"}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key={"register"}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}

export default PageHeader;
