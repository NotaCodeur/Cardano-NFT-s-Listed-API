# Cardano-NFT-s-Listed-API

This is a Node JS server endpoint.

It takes a Cardano NFT policyId as input (query parameter)
It checks Cardano marketplace script addresses for that policyId
and returns the total amount of listings for that policyID

You can clone/download this repository to try it out.
When you open this repo in your code editor, open your terminal and run "npm start".
This will start a local server.

You can then go to your browser, enter the url:
http://localhost:3000/tokenCount/{policyId}
You can replace the {policyId} with the policyId of your NFT.

It will look like this:
http://localhost:3000/tokenCount/f4873b426a498350c579690bd1f4a369d5d7b521c778acf322f77334

When you press enter you'll get a response like this:
{"tokenCount":371}
