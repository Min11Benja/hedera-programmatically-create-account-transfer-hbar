const {AccountId,Client,PrivateKey,AccountCreateTransaction,AccountBalanceQuery,Hbar,TransferTransaction,} = require("@hashgraph/sdk");
require("dotenv").config();




  //STEP 1 import already made account
async function environmentSetup() {
  const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
  if (!myAccountId || !myPrivateKey){
    throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY are not present!");
  }else {
    console.log(`myAccountId = ${myAccountId}`);
    console.log(`myPrivateKey = ${myPrivateKey}`);
  }
  //STEP 2 Connect to Testnet
  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);
  client.setDefaultMaxTransactionFee(new Hbar(100));
  client.setMaxQueryPayment(new Hbar(50));
  console.log("Conection made succesfully!");
  //STEP 3 Make New Account  
  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;
  if (!newAccountPrivateKey || !newAccountPublicKey) {
    throw new Error("New keys are null");
  } else {
    console.log("New Keys made succesfully!");
    console.log(`newAccountPrivateKey = ${newAccountPrivateKey}`);
    console.log(`newAccountPublicKey = ${newAccountPublicKey}`);
  }
  // Create a new account with 1,000 tinybar starting balance
  const newAccount = await new AccountCreateTransaction().setKey(newAccountPublicKey).setInitialBalance(Hbar.fromTinybars(1000)).execute(client);

  if (!newAccount) {
    throw new Error("New account is null");
  } else {
    console.log("New account made succesfully!");     
    console.log(`newAccount = ${newAccount}`); 
  }
  // Get the new account ID
    const getReceipt = await newAccount.getReceipt(client);
    const newAccountId = getReceipt.accountId;
    console.log("\nNew account ID: " + newAccountId);
    
    // Verify the account balance
    const accountBalance = await new AccountBalanceQuery().setAccountId(newAccountId).execute(client);
    console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");
  
    //Create the transfer transaction
    const sendHbar = await new TransferTransaction().addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000)).addHbarTransfer(newAccountId, Hbar.fromTinybars(1000)).execute(client);

    //Verify the transaction reached consensus
    const transactionReceipt = await sendHbar.getReceipt(client);
    console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());

    console.log("End");
    client.close();  
    return newAccountId;
}
environmentSetup();
