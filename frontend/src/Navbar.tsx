interface Props {
  loginRoute: string
}

const Navbar = ({loginRoute}: Props) => {

    return (
      <nav className="navbar">
        <div className="links">
          <a href="/homepage">Home</a>
          <a href="profile">My Profile</a>
          <a href="about">About</a>
        </div>
      </nav>
    );
  }
  export default Navbar;