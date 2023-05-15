# iwashere

*iwashere* is a decentralized application (DApp) that allows users to sign their names on a virtual wall using their Ethereum wallets. Built with Angular, Ethers.js, Wagmi and RainbowKit.

  _                    _                   

 (_)__ __ __ __ _  ___| |_   ___  _ _  ___ 

 | |\ V  V // _` |(_-<| ' \ / -_)| '_|/ -_)

 |_| \_/\_/ \__,_|/__/|_||_|\___||_|  \___|
 
                                           

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Deploying the Smart Contract](#deploying-the-smart-contract)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Hosting on Google Cloud Platform](#hosting-on-google-cloud-platform)

## Requirements

Before you start, make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [Angular CLI](https://angular.io/cli) (v12 or later)
- [Truffle](https://www.trufflesuite.com/truffle) (v5 or later) (For smart contract deployment)

## Installation

Clone the *iwashere* repository and install the dependencies:

```bash
git clone https://github.com/your-username/iwashere.git
cd iwashere
npm install
```

## Deploying the Smart Contract

1. Compile the smart contract:

```bash
cd contracts
truffle compile
```

2. Obtain an Ethereum RPC endpoint from a service like [Infura](https://infura.io/).

3. Configure the `truffle-config.js` file with your Ethereum RPC endpoint and your deployment wallet's mnemonic:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');

const MNEMONIC = 'your-mnemonic-here';
const ETHEREUM_RPC_ENDPOINT = 'your-ethereum-rpc-endpoint-here';

module.exports = {
  networks: {
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, ETHEREUM_RPC_ENDPOINT),
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
};
```

4. Deploy the smart contract to the desired network (e.g., Rinkeby testnet):

```bash
truffle migrate --network rinkeby
```

5. After deployment, take note of the smart contract address and ABI output.

## Configuration

Update the `src/app/app.component.ts` file with your deployed smart contract's ABI and address:

```typescript
// Replace with your smart contract ABI and deployed address
contractAbi = [...];
contractAddress = '...';
```

## Running the Application

Start the Angular development server:

```bash
ng serve
```

Open your web browser and navigate to `http://localhost:4200/` to use the *iwashere* application.

## Hosting on Google Cloud Platform

To host the *iwashere* application on Google Cloud Platform (GCP), follow these steps:

1. Create a new [Google Cloud Storage](https://cloud.google.com/storage) bucket:

```bash
gsutil mb gs://your-bucket-name
```

2. Configure the bucket for [website hosting](https://cloud.google.com/storage/docs/hosting-static-website):

```bash
gsutil web set -m index.html -e 404.html gs://your-bucket-name
```

3. Build your Angular application for production:

```bash
ng build --prod
```

4. Upload the built application files to your GCP bucket:

```bash
gsutil -m cp -r dist/your-project-name/* gs://your-bucket-name
```

5. [Create an HTTP(S) Load Balancer](https://cloud.google.com/load-balancing/docs/https/setting-up-http-https) to redirect HTTP traffic to your bucket.

Now your *iwashere* DApp should be available at your Load Balancer's IP address or the custom domain you have configured.

**Note**: If using a custom domain, make sure to [add a CNAME record](https://cloud.google.com/storage/docs/custom-domains) to your GCP bucket on your domain registrar's site.

That's it! 🖋️✨