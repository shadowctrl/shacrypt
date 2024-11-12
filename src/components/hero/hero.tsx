"use client";
import { NextPage } from "next";
import "./hero.scss";
import Loader from "../loader/loader";
import { useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext";
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
  const {
    connectWallet,
    connectedAccount,
    formData,
    setFormData,
    handleChange,
    sendTransaction,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    console.log(formData);
    if (!addressTo || !amount || !keyword || !message)
      return alert("Fill all fields");
    sendTransaction();
  };
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
            name="addressTo"
            type="text"
            handleChange={handleChange}
          />
          <Input
            placeholder={"Amount (ETH)"}
            name="amount"
            type="number"
            handleChange={handleChange}
          />
          <Input
            placeholder={"Keyword (GIF)"}
            name="keyword"
            type="text"
            handleChange={handleChange}
          />
          <Input
            placeholder={"Enter Message"}
            name="message"
            type="text"
            handleChange={handleChange}
          />
          <div className="border-line" />
          <div />
          <button type="button" onClick={connectWallet}>
            Connect Wallet
          </button>
          {false ? (
            <Loader />
          ) : (
            <button type="button" onClick={(e) => handleSubmit(e)}>
              Send Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
