import axios from 'axios';
import { Utxo } from './types';

export const countTokens = async (contractAddresses: string[], policyId: string): Promise<number> => {
    try {
        const query = `query ContractQuery($contractAddress: String!, $policyId: Hash28Hex!) {
            utxos(
                where: {
                  _and: {
                    address: { _eq: $contractAddress }
                    tokens: { asset: { policyId: { _eq: $policyId } } }
                  }
                }
              ) {
            tokens{
              quantity
              asset {
                policyId
                assetName
              }
            }
          }
        }`;

        const tokenCounts = await Promise.all(contractAddresses.map(async (contractAddress) => {
            const response = await axios.post(
                'https://graphql-api.mainnet.dandelion.link/',
                { query, variables: { contractAddress, policyId } }
            );
            const utxos = response.data.data.utxos;

            const filteredUtxos = utxos.filter((utxo: Utxo) => {
                return utxo.tokens.some((token) => token.asset && token.asset.policyId === policyId);
            });

            const tokenCount = filteredUtxos.reduce((count: number, utxo: Utxo) => {
                utxo.tokens.forEach((token) => {
                    if (token.asset && token.asset.policyId === policyId) {
                        count += +token.quantity
                    }
                });
                return count;
            }, 0);

            return tokenCount;
        }));

        return tokenCounts.reduce((total, amount) => total + amount);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
