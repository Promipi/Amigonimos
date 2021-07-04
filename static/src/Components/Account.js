import React from "react";
import NavBar from "./Navbar";

const Account = ({user}) => {
  return (
    <div>
      <NavBar logged={user} />
      <h1>xd</h1>
    </div>
  );
};

export default Account;
