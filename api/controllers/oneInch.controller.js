import axios from 'axios'

export const performAllowance = async (req, res, next) => {

    const { tokenPolyAddress, walletAddress } = req.body
    console.log(tokenPolyAddress)

    try {
        const url = "https://api.1inch.dev/swap/v5.2/137/approve/allowance";

        const config = {
            headers: {
                Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`
            },
            params: {
                tokenAddress: tokenPolyAddress, 
                walletAddress: walletAddress 

            }
        };
        
        const response = await axios.get(url, config);
        
        res.status(200).send(response.data)
    } catch (error) {
        res.status(401).send(error.message)
    }
}

export const performApprove = async (req, res, next) => {
    const {tokenPolyAddress } = req.body
    try {
        const url = "https://api.1inch.dev/swap/v5.2/137/approve/transaction";

        const config = {
            headers: {
                Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`
            },
            params: {
                tokenAddress: tokenPolyAddress
            }
        };

        const response = await axios.get(url, config);
        
        res.status(200).send(response.data)
        
    } catch (error) {
        console.log(error)
        res.status(401).send(error.message)
    }
} 



export const performSwap = async (req, res, next) => {
    const {
        fromTokenAddress,
        toTokenAddress,
        amount,
        fromAddress,
        slippage} = req.body 

    try {
         const url = "https://api.1inch.dev/swap/v5.2/137/swap";

        const config = {
            headers: {
                Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`
            },
            params: {
                src: fromTokenAddress,
                dst: toTokenAddress,
                amount: amount,
                from: fromAddress,
                slippage: slippage
            }
        };

        const response = await axios.get(url, config);
        
        res.status(200).send(response.data)

    } catch (error) {
        console.log(error)
        res.status(401).send(error.message)
    }
}