export type Utxo = {
    tokens: [{
        quantity: string,
        asset: {
            policyId: string;
            assetName: string;
        }
    }]
}
