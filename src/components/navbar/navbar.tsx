import path from "path";
import "./navbar.scss";
import { NextPage } from "next";
import Link from "next/link";
import BlockchainLogo from "@/assets/blockchain.svg";
import Image from "next/image";

interface Props {}

const navbarItems = [
  { name: "Market", path: "/market" },
  { name: "Exchange", path: "/exchange" },
  { name: "Tutorials", path: "/tutorials" },
  { name: "Wallets", path: "/wallets" },
];

const Navbar: NextPage<Props> = ({}) => {
  return (
    <div className="navbar-parent">
      <div className="navbar-head">
        <Image src={BlockchainLogo} alt="shacrypt" />
        <h1>SHACRYPT</h1>
      </div>
      <div className="navbar-components">
        {navbarItems.map((value) => (
          <div className="navbar-components-item" key={value.path}>
            <Link href={value.path}>{value.name}</Link>
          </div>
        ))}
      </div>
      <div className="navbar-tail">
        <h3>Login</h3>
      </div>
    </div>
  );
};

export default Navbar;
