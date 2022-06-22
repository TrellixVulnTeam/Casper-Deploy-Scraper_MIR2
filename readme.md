# Casper-Deploy-Scraper/Scraper
## Access the metadata of all NFTs owned by a specific Account using only the Contract Hash.

### Limitations
```
This tool is under development and not intended for public use.
The Casper NFT standard is under development and may be subject
to frequent changes, that will render this tool useless overnight.

For as long as I see a use in this tool,
I will continue to maintain it.

To be fully functional, this tool relies on a made up JSON
schema, that may not be the industry, nore community standard.

```
### Features

Relying on the cep47 NFT standard,this tool can be used to
scrape the Casper Explorer for NFTs owned by a specific account.
Examples can be found in the attached .png files.

Input: Account-hash from explorer, Contract-hash of NFT-Token.

Handled "natures": "mint", "mint_copies", "transfer_from", "burn"
