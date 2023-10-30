// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const prompt =   () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      readline.question('Enter the user key?', async key => {
        console.log("Public Key of the generated keypair", key);
        await getWalletBalance(key);
        await airDropSol(key);
        await getWalletBalance(key);

        readline.close();
      });
}

// Create a new keypair
const newPair = new Keypair();

// Extract the public and private key from the keypair
const pk = new PublicKey(newPair._keypair.publicKey).toString();
console.log(pk);

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");



// Get the wallet balance from a given private key
const getWalletBalance = async key => {
    try {
        //console.log("Connection object is:", connection);

        // Make a wallet (keypair) from privateKey and get its balance
        //const myWallet = await Keypair.fromSecretKey(privateKey);
       
        const walletBalance = await connection.getBalance(
            new PublicKey(key)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async key => {
    try {
        //const myWallet = await Keypair.fromSecretKey(privateKey);

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(key),
            1 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    prompt();
}

mainFunction();
