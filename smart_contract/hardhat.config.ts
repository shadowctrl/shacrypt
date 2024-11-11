require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.27",

  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/r74pimRsQYYtDcQ-MBSk7gWeiY3HECzd",
      accounts: [
        "7e531b43bde622fa65181e0fcc016a57daef1c9e32c695eac2c78e351c4a3cc9",
      ],
    },
  },
};
