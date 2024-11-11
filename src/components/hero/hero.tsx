"use client";
import { NextPage } from "next";
import "./hero.scss";
import Loader from "../loader/loader";
interface Props {}

type inputProps = {
  placeholder: string;
  name: string;
  type: string;
  value?: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
};

const Input = ({
  placeholder,
  name,
  type,
  value,
  handleChange,
}: inputProps) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    step="0.0001"
    onChange={(e) => handleChange(e, name)}
  />
);

const Hero: NextPage<Props> = ({}) => {
  const connectWallet = () => {};
  const handleSubmit = () => {};
  return (
    <div className="hero-parent">
      <div className="hero-left"></div>
      <div className="hero-right">
        <div className="hero-right-top">
          <div className="crypt-card">
            <div>Icon</div>
            <div>
              <h5>Address</h5>
              <h6>Ethereum</h6>
            </div>
          </div>
        </div>
        <div className="hero-right-bottom">
          <Input
            placeholder={"Address to"}
            name="adddressTo"
            type="text"
            handleChange={() => {}}
          />
          <Input
            placeholder={"Amount (ETH)"}
            name="amount"
            type="number"
            handleChange={() => {}}
          />
          <Input
            placeholder={"Keyword (GIF)"}
            name="keyword"
            type="text"
            handleChange={() => {}}
          />
          <Input
            placeholder={"Enter Message"}
            name="message"
            type="text"
            handleChange={() => {}}
          />
          <div className="border-line" />
          <div />
          <button type="button" onClick={connectWallet}>
            Connect Wallet
          </button>
          {false ? (
            <Loader />
          ) : (
            <button type="button" onClick={handleSubmit}>
              Send Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
