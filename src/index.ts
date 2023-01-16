import express from 'express';
import { countTokens } from './modules/token-counter';

const app = express();
const port = 3000;

app.get('/tokencount/:policyId', async (req, res) => {
    try {
        const policyId = req.params.policyId;
        const contractAddresses = ["addr1zxgx3far7qygq0k6epa0zcvcvrevmn0ypsnfsue94nsn3tvpw288a4x0xf8pxgcntelxmyclq83s0ykeehchz2wtspks905plm", "addr1wxppkjlh4t6g60nyrntsx40cdh5l76l3a7te2z5trjth98qc6mflw", "addr1w89s3lfv7gkugker5llecq6x3k2vjvfnvp4692laeqe6w6s93vj3j"];
        const tokenCount = await countTokens(contractAddresses, policyId);
        res.json({ tokenCount });
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); 
