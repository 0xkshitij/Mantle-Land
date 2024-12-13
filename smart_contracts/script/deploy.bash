# Usage: bash deploy.bash <chain_name>

source .env
legacy=false
if [ $1 == "sepolia" ] ; then
    chainId=11155111
    rpcURL=$SEPOLIA_RPC_URL
    etherscanKey="sepolia"
    
 elif [ $1 == "mantlesepoliatestnet" ] ; then
    chainId=5003
    rpcURL=$mantlesepoliatestnet_RPC_URL
    etherscanKey="mantlesepoliatestnet"

else
    echo "Invalid chain name. Please provide a valid chain name."
    exit 1
fi

if [ $legacy == true ] ; then
    forge script script/DeployAll.s.sol:DeployAll --slow --chain-id $chainId --rpc-url $rpcURL --broadcast --verify --verifier etherscan --etherscan-api-key $etherscanKey --private-key $PRIVATE_KEY --legacy -vvvv --resume
else
    forge script script/DeployAll.s.sol:DeployAll --slow --chain-id $chainId --rpc-url $rpcURL --broadcast --verify --verifier etherscan --etherscan-api-key $etherscanKey --private-key $PRIVATE_KEY -vvvv
fi