const { AccountId, PrivateKey, Client, Hbar } = require("@hashgraph/sdk");

require("dotenv").config();

async function environmentSetup() {
// Part 1 - Envyronment variables

  //Grab your Hedera testnet account ID and private key from your .env file
  //Construct accountId & privateKey from String
  const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

  // If we weren't able to grab it, we should throw a new error
  if (!myAccountId || !myPrivateKey) {
    throw new Error(
      "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY are not present!"
    );
  } else {
    console.log(`myAccountId = ${myAccountId}`);
    console.log(`myPrivateKey = ${myPrivateKey}`);
  }
// Part 2 - Create connection to the Hedera network
  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);

  //Set your account as the client's operator
  client.setOperator(myAccountId, myPrivateKey);

  //Set the default maximum transaction fee (in Hbar)
  client.setDefaultMaxTransactionFee(new Hbar(100));

  //Set the maximum payment for queries (in Hbar)
  client.setMaxQueryPayment(new Hbar(50));
  console.log("Conection made succesfully!");     
  client.close();  
}
environmentSetup();
