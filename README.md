
Aleo HD Key
=====

Seed Derivation for `aleo`

The goal of this library is to safely generate deterministic seeds for use with the Aleo SDK.
Since BLS12_377 is not supported yet in BIP-32 or BIP-44, this attempts to ensure Aleo Keys are derived from a seed in a secure way.

------------

[SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) - Specification

Installation
------------

    yarn add @demox-labs/aleo-sdk @demox-labs/aleo-hd-key

    optionally, install Bip39: yarn add bip39


Usage
-----

**example:**

```js
import * as AleoSDK from '@demox-labs/aleo-sdk';
import { derivePath } from '@demox-labs/aleo-hd-key';
import * as Bip39 from 'bip39';

// Generate seed phrase using Bip39
const mnemonic = Bip39.generateMnemonic(128);
const hexSeed = Bip39.mnemonicToSeedSync(mnemonic).toString('hex');

// Generate new seed for account
const { childSeed, chainCode} = derivePath("m/0'/0'/0'", hexSeed);

// Convert to PrivateKey using Also SDK
const privateKey = AleoSDK.PrivateKey.from_seed_unchecked(childSeed);
```

Tests
-----
```
yarn test
```

References
----------
[SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md)

[BIP-0032](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

[BIP-0044](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
