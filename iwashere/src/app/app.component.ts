import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { Wagmi } from 'wagmi';
import { RainbowKit } from 'rainbowkit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  walletConnected = false;
  walletAddress = '';
  inputName = '';
  nameSigned = false;
  signedNames: string[] = [];

  // Replace with your smart contract ABI and deployed address
  contractAbi = [...];
  contractAddress = '...';

  async connectWallet() {
    try {
      const accounts = await Wagmi.connect(); // Connect the wallet
      this.walletAddress = accounts[0]; // Get the first account and store it
      this.walletConnected = true;

      // Initialize the smart contract with the connected wallet
      const provider = new ethers.providers.Web3Provider(Wagmi.provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.contractAddress, this.contractAbi, signer);

      // Check if the user has already signed their name
      this.nameSigned = await contract.hasSigned(this.walletAddress);

      // Retrieve and display the list of signed names
      const signedNamesData = await contract.getSignedNames();
      this.signedNames = signedNamesData.map((nameData: any) => nameData.name);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  async signName() {
    if (this.walletConnected && this.inputName) {
      try {
        // Initialize the smart contract with the connected wallet
        const provider = new ethers.providers.Web3Provider(Wagmi.provider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(this.contractAddress, this.contractAbi, signer);

        // Call the signName function from the smart contract
        const tx = await contract.signName(this.inputName);
        await tx.wait(); // Wait for the transaction to be mined

        // Update the signed names list and set nameSigned to true
        this.signedNames.push(this.inputName);
        this.nameSigned = true;
      } catch (error) {
        console.error('Error signing name:', error);
      }
    }
  }
}