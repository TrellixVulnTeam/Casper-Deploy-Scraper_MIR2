# This Scraper makes use of the Casper Explorer to query Deploys associated with an Account and filter the results to identify NFT-Metadata

## Features

```
1. Deploys can be queried. As Deploys are parsed in json they are not quite in order. This needs to be fixed to check ownership changes of NFTs.

2. Deploys that are of nature "mint" can be identified and the deploy hash is
recorded, so that one can access the Metadata of NFTs using the Casper-Client (sdk)

3. Metadata can be extracted from explicit "mint" deploys. Metadata is a list so further pasing is required.
```

## Challenges
```
1. Account for changes in ownership / "filter" NFTs that are no longer owned by the public key, by either:
  - recording their timestamp
  - chronological ordering of Deploys

2. Add other "natures" e.g. nft-transfers, copies and more.
```
