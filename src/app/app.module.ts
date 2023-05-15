import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the required modules
import { EthersModule } from 'ethers';
import { WagmiModule } from 'wagmi';
import { RainbowKitModule } from 'rainbowkit';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Add the imported modules to the imports array
    EthersModule,
    WagmiModule,
    RainbowKitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }