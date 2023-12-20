# hedera-programmatically-create-account-transfer-hbar
Hehdera Hashgraph project with Node JS using the Javascript SDK for creating accounts and transfering Hbar tokens programmatically 

### What does this application do?
-It makes account in the Hedera Testnet network using an already made ECDSA account to fund the creation of the new account
-It lets you transfer Hbar from the newly created account into the ECDSA acocunt used to make the new account

### Technologies used
- Node JS
- JavaScript
  
### Challenges faced 
- computer clock was not in sync with Node clock (make sure yours is set to syncronize automatically)
- type errors when importing values from .env file ( use AccountId.fromString(..) & PrivateKey.fromString(..) )

### Features to implement in the future
- User authentication - login/register
- User Role-Based Access Control & Permissions
- Step form to make account
- Step form to transfer Hbar tokens

## Installation

Open your terminal and create a directory called "hedera". After you create the project directory navigate to the directory by running the following command:

```bash
mkdir hello-hedera && cd hedera
```


### STEP 01: Clone Repo into directory

```bash
git init .
git remote add origin https://github.com/Min11Benja/hedera-programmatically-create-account-transfer-hbar.git
git fetch origin
git checkout main
```

Initialize a node.js project in this new directory by running the following command:
```bash
npm init -y
```

This is what your console should look like after running the command:
```Javascript
{
  "name": "hello-hedera-js-sdk",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### STEP 02: Install Dependencies and SDKs

```bash

# Install Hedera's JS SDK with NPM
npm install --save @hashgraph/sdk

# Install with Yarn
yarn add @hashgraph/sdk
```
Install dotenv with your favorite package manager. This will allow our node environment to use your testnet account ID and the private key we will store in a .env file next.
```bash

# Install with NPM
npm install dotenv

# Install with Yarn
yarn add dotenv
```

### STEP 03 : Create your .env file & add your already made acocunt
You need to already have an ECDSA account in the Hedera Developer Portal website. For more info on how to make one please follow this video 
[How to make a developer portal account](https://youtu.be/60MZf4Qtzek?si=9lUZaYfBXh8122bw)

Create the .env file in your project's root directory. 
The .env file stores your environment variables, account ID, and private key (DER encoded).
```bash
touch .env
```

Grab the Hedera Testnet account ID and DER-encoded private key from your Hedera portal profile and assign them to the MY_ACCOUNT_ID and MY_PRIVATE_KEY environment variables in your .env file:
```bash
MY_ACCOUNT_ID=ENTER TESTNET ACCOUNT ID 
MY_PRIVATE_KEY=ENTER TESTNET PRIVATE KEY
```
Next, you will load your account ID and private key variables from the .env file created in the previous step.

## Usage

```Node JS

# run script
node index.js

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please be patient.

## License

[MIT](https://choosealicense.com/licenses/mit/)
