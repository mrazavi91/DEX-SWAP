import React, { useEffect, useState } from 'react'
import { Popover , Radio, Input, Modal , message, Button} from 'antd'
import { SettingOutlined, ArrowDownOutlined, DownOutlined } from '@ant-design/icons'
import tokenList from '../tokenList.json'

export default function Swap() {
  const [slippage, setSlippage] = useState(2.5)
  const [tokenOneAmount, setTokenOneAmount] = useState(null) 
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null)
  const [tokenOne, setTokenOne] = useState(tokenList[0])
  const [tokenTwo, setTokenTwo] = useState(tokenList[1])
  const [isOpen, setIsOpen] = useState(false)
  const [changeToken, setChangeTone] = useState(1)


  const switchHandler = () => {
    const one = tokenOne
    const two = tokenTwo
    setTokenOne(two)
    setTokenTwo(one)
  }

  const openModal = (asset) => {
    setChangeTone(asset)
    setIsOpen(true)
  }

  const modifyToken = (i) => {
    if (changeToken === 1) {
      setTokenOne(tokenList[i])
    } else {
      setTokenTwo(tokenList[i])
    }
    setIsOpen(false)
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

  useEffect(() => {
    const getPrices = async (one, two) => {
      const res = await fetch(`/api/v1/tokenprice?addressOne=${one}&addressTwo=${two}`)
      const data = await res.json()
      console.log(data)
    }

    getPrices(tokenOne.address , tokenTwo.address)
  },[])

  return (
    <>
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
          <Input placeholder='0' value={tokenOneAmount} onChange={(e) => setTokenOneAmount(e.target.value)} />
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
        <Button className='swapButton' disabled={!tokenOneAmount}>Swap</Button>
      </div>
    </>
  )
}
