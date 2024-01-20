import Moralis from "moralis"
Moralis.default 

export const getTokenPrice = async (req, res, next) => {
    const { addressOne, addressTwo } = req.query
    console.log(addressOne)
    try {
        const res1 = await Moralis.EvmApi.token.getTokenPrice({
            address : addressOne
        })
        const res2 = await Moralis.EvmApi.token.getTokenPrice({
            address : addressTwo
        })

        res.status(200).json({
            tokenOne: res1.raw.usdPrice,
            tokenTwo: res2.raw.usdPrice,
            ratio: res1.raw.usdPrice/res2.raw.usdPrice
        })

    } catch (error) {
        res.status(401).json({message: error})
    }
}