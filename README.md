# Add Decentralised Chat & Trading To Any Webpage

This React App is part of my entry to the Ethereal Blocks hackathon. The complete entry provides a browser extension/add-on that allows any webpage to have decentralised chat and trade functions. See the Extension repo along with install instructions [here](https://github.com/johngrantuk/decglocha-extension).

![Demo Gif](Decglocha.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How It Works

The extension uses AirSwap Trader to allow you to buy or sell any token and 3Box for decentralised messaging.

The current version of the extension is very simple. When loaded it parses the browser URL for the domain, the domain name is the 'topic' for the chat. An iFrame is loaded with this React app as the source and the domain as the topic parameter. The React app provides the chat functions. It is hosted at: https://decglocha.herokuapp.com so an example iFrame src would be: [https://decglocha.herokuapp.com/?topic=johngrantuk.github.io](https://decglocha.herokuapp.com/?topic=johngrantuk.github.io). In an ideal world all the chat functions would be provided via the extension itself but I encountered an annoying MetaMask issue that meant this wasn't possible (see below).

The trading functionality is provided by the [AirSwap Trader Widget](https://developers.airswap.io/#/widget/trader) which is loaded directly in the extension. The user can create a trade directly in the extension and the Trader Widget creates a link to the trade that can then be copied and pasted into the chat.

### AirSwap

[AirSwap](www.airswap.io) is a decentralized, peer-to-peer token trading network powered by Ethereum. Buying and selling tokens on AirSwap is secure, simple, and without fees. The AirSwap Trader Widget is an embeddable, HTML+JavaScript element that can be dropped into any webpage to share and settle over-the-counter trades with no counterparty risk, no deposits, and no fees. It's super easy to add and the AirSwap functionality is really nice.

### 3Box And The React Chat App

[3Box](www.3box.io) is a secure and decentralized user data storage system. Simple APIs allow developers to easily use 3Box for identity, auth, profiles, storage, and messaging.

No data is stored in this React App, it's basically just an interface for [3Box messaging functions](https://docs.3box.io/api/messaging). 3Box messaging data is stored in decentralized OrbitDB feedstores that are shared between one or more participants. [OrbitDB](https://orbitdb.org/) is a serverless, distributed, peer-to-peer database that uses IPFS as its data storage - basically all the chat data is stored in a decentralised, peer-to-peer way.

### MetaMask Issue

I initially wanted to add all the chat functions directly in to the browser extension. This would require my extension to interact with the MetaMask extension. After quite a lot of (wasted) time it turns out there is a [MetaMask issue](https://github.com/MetaMask/metamask-extension-provider/issues/3#issuecomment-510840821) that means this isn't possible right now but should maybe be fixed in the future.
