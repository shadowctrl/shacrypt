"use client";

import { useEffect, useState, createContext, ReactNode } from "react";

import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/utils/constants";

export const TransactionContext = createContext(undefined);

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [connectedAccount, setConnectedAccount] = useState(" ");
  const [isLoading, setisLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    if (!ethereum) return alert("Please connect metamask");
    const transactionContract = getEthereumContract();
    const availableTransactions =
      await transactionContract.getAllTransactions();

    const structuredTransactions = availableTransactions.map((transaction) => ({
      addressTo: transaction.receiver,
      addressFrom: transaction.sender,
      timestamp: new Date(
        transaction.timestamp.toNumber() * 1000
      ).toLocaleString(),
      message: transaction.message,
      keyword: transaction.keyword,
      amount: parseInt(transaction.amount._hex) / 10 ** 18,
    }));
    console.log(structuredTransactions);

    setTransactions(structuredTransactions);
  };

  const checkIfTransactionsExist = async () => {
    const transactionContract = getEthereumContract();
    const transactionCount = await transactionContract.getTransactionCount();
    window.localStorage.setItem("transactionCount", transactionCount);
  };
  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please connect metamask");

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setConnectedAccount(accounts[0]);
      getAllTransactions();
    }
  };

  const connectWallet = async () => {
    if (!ethereum) return alert("Please connect metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    setConnectedAccount(accounts[0]);
  };

  const sendTransaction = async () => {
    if (!ethereum) return alert("Please connect metamask");

    const { addressTo, amount, keyword, message } = formData;

    const transactionContract = getEthereumContract();
    const parsedAmount = ethers.utils.parseEther(amount);

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: connectedAccount,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        },
      ],
    });
    const transactionHash = await transactionContract.addToBlockchain(
      addressTo,
      parsedAmount,
      message,
      keyword
    );

    setisLoading(true);
    console.log("status: Processing", transactionHash.hash);
    await transactionHash.wait();
    setisLoading(false);
    console.log("status: Completed", transactionHash.hash);

    const transactionCount = await transactionContract.getTransactionCount();
    setTransactionCount(transactionCount.toNumber());
  };
  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
