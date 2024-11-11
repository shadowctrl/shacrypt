import "./loader.scss";
import { NextPage } from "next";

interface Props {}

const Loader: NextPage<Props> = ({}) => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
