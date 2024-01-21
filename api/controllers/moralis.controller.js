import Moralis from "moralis"
Moralis.default 

// export const getTokenPrice = async (req, res, next) => {
//     const { addressOne, addressTwo } = req.query
//     try {
//         const response1 = await Moralis.EvmApi.token.getTokenPrice({
//             address : addressOne
//         })
//         const response2 = await Moralis.EvmApi.token.getTokenPrice({
//             address : addressTwo
//         })

//         res.status(200).json({
//             tokenOne: response1.raw.usdPrice,
//             tokenTwo: response2.raw.usdPrice,
//             ratio: response1.raw.usdPrice/response2.raw.usdPrice
//         })

//     } catch (error) {
//         res.status(401).json({message: error})
//     }
// }
export const getTokenPrice = async (req, res, next) => {
    const { addressOne, addressTwo } = req.query
    try {
        const response1 = await Moralis.EvmApi.token.getTokenPrice({
            address: addressOne
        })
        const response2 = await Moralis.EvmApi.token.getTokenPrice({
            address: addressTwo
        })

        const tokenOnePrice = response1.raw.usdPrice;
        const tokenTwoPrice = response2.raw.usdPrice;

        res.status(200).json({
            tokenOne: tokenOnePrice,
            tokenTwo: tokenTwoPrice,
            ratio: tokenOnePrice / tokenTwoPrice
        })

    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}
