import React, { useEffect, useState } from 'react'
import { Popover , Radio, Input, Modal , message, Button} from 'antd'
import { SettingOutlined, ArrowDownOutlined, DownOutlined } from '@ant-design/icons'
import tokenList from '../tokenList.json'
import { useSendTransaction , useWaitForTransaction } from 'wagmi'



export default function Swap(props) {
  const { isConnected, address } = props
  const [messageApi , contextHolder] = message.useMessage()
  const [slippage, setSlippage] = useState(2.5)
  const [tokenOneAmount, setTokenOneAmount] = useState(null) 
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null)
  const [tokenOne, setTokenOne] = useState(tokenList[0])
  const [tokenTwo, setTokenTwo] = useState(tokenList[1])
  const [isOpen, setIsOpen] = useState(false)
  const [changeToken, setChangeTone] = useState(1)
  const [prices, setPrices] = useState({}) 
  const [txDetail, setTxDetail] = useState({
    to: null,
    data: null,
    value: null
  })

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetail.to),
      data: String(txDetail.data),
      value: String(txDetail.value)
    }
  })

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })


  const switchHandler = () => {
    setPrices(null)
    setTokenOneAmount(null)
    setTokenTwoAmount(null)
    const one = tokenOne
    const two = tokenTwo
    setTokenOne(two)
    setTokenTwo(one)
    getPrices(two.address , one.address)
  }

  const openModal = (asset) => {
    setChangeTone(asset)
    setIsOpen(true)
  }

  const modifyToken = (i) => {
    setPrices(null)
    setTokenOneAmount(null)
    setTokenTwoAmount(null)
    if (changeToken === 1) {
      setTokenOne(tokenList[i])
      getPrices(tokenList[i].address , tokenTwo.address)
    } else {
      setTokenTwo(tokenList[i])
      getPrices( tokenOne.address, tokenList[i].address)
    }
    setIsOpen(false)
  }

  const changeAmountHandler = (e) => {
    setTokenOneAmount(e.target.value)
    if (prices && e.target.value) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
    } else {
      setTokenTwoAmount(null)
    }
  }

  const setting = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group
          value={slippage}
          onChange={(e)=> setSlippage(e.target.value)}
        >
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  )

  const getPrices = async (one, two) => {

    try {
      const res = await fetch(`/api/v1/tokenprice?addressOne=${one}&addressTwo=${two}`)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json()
      setPrices(data)
      console.log(data)
      
    } catch (error) {
      console.log(error)
    }
      
  }
  
  const getDexSwap = async () => {

    try {
      const allowance = await fetch(`/swap/v5.2/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`, {
        headers: {
           Accept: "application/json",
          Authorization: import.meta.env.VITE_ONE_INCH_API_KEY,
           
        },
      })
      const dataAllowance = await allowance.json()

    if (dataAllowance.allowance === "0") {
      const approve = await fetch(`/swap/v5.2/1/approve/transaction?tokenAddress=${tokenOne.address}`, {
        headers: {
           Accept: "application/json",
          Authorization: import.meta.env.VITE_ONE_INCH_API_KEY,
           
        },
      })
      const dataApprove = await approve.json()
      setTxDetail(dataApprove)
      console.log("not approved")
      return 
    }
      
      // Define your asynchronous function
    const performTokenSwap = async () => {
      try {
        const swapToken = await fetch(
          `swap/v5.2/1/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(tokenOne.decimals + tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: import.meta.env.VITE_ONE_INCH_API_KEY,
            },
          }
        );

        const dataSwapToken = await swapToken.json();
        setTxDetail(dataSwapToken.tx);
      } catch (error) {
        console.error('Error performing token swap:', error);
        // Handle errors if needed
      }
    };

    // Use setTimeout to introduce a 1-second delay before calling the function
    setTimeout(performTokenSwap, 1000);

      

    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    

    getPrices(tokenOne.address , tokenTwo.address)
  }, [])
  
  useEffect(() => {
    if (txDetail.to && isConnected) {
      sendTransaction()
    }
  }, [txDetail])

  useEffect(() => {
    messageApi.destroy()
    if (isLoading) {
      messageAp.open({
        type: 'loading',
        content: "Pending ... ⌛" ,
        duration: 0
      })
    }

  }, [isLoading])

  useEffect(() => {
    messageApi.destroy()
    if (isSuccess) {
      messageAp.open({
        type: 'success',
        content: `Transaction Successful 🎉 `,
        duration: 1.5
      })
    } else if (txDetail.to) {
      messageAp.open({
        type: 'error',
        content: `Transaction Failed 😢` ,
        duration: 1.5
      })
    }

  }, [isSuccess])
  

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title= "Select a token"
      >
        <div className="modelContent">
          {tokenList?.map((token, i) => {
            return (
              <div
                className='tokenChoice'
                key={i}
                onClick={()=> modifyToken(i)}

              >
                <img src={token.img} alt={token.ticker} className='tokenLogo' />
                <div className="tokenChoiceNames">
                  <div className='tokenName'>{token.name}</div>
                  <div className='tokenTicker'>{token.ticker}</div>
                </div>
                
              </div>
            )
          })}
        </div>
      </Modal>
    
      <div className='tradeBox'>
        <div className="tradeBoxHeader">
          <h4>Swap</h4>
          <Popover
            content= {setting}
            title="Settings"
            trigger="click"
            placement='bottomRight'
          >
            <SettingOutlined className='cog' />
          </Popover>
        </div>
        <div className="inputs">
          <Input placeholder='0' value={tokenOneAmount} onChange={changeAmountHandler} disabled={!prices } />
          <Input placeholder='0' value={tokenTwoAmount} disabled />

          <div className='switchButton' onClick={switchHandler}>
            <ArrowDownOutlined className='switchArrow'/>
          </div>

          <div className="assetOne" onClick={()=> openModal(1)}>
            <img src={tokenOne.img} alt="assetOneLogo" className='assetLogo' />
            {tokenOne.ticker}
            <DownOutlined />
          </div>

          <div className="assetTwo" onClick={()=> openModal(2)}>
            
            <img src={tokenTwo.img} alt="assetTwoLogo" className='assetLogo' />
            {tokenTwo.ticker}
            <DownOutlined />
          </div>
        </div>
        <Button className='swapButton' disabled={!tokenOneAmount || !isConnected} onClick={getDexSwap}>Swap</Button>
      </div>
    </>
  )
}
