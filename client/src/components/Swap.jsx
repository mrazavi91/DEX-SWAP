import React, { useState } from 'react'
import { Popover , Radio, Input, Modal , message} from 'antd'
import { SettingOutlined, ArrowDownOutlined, DownOutlined } from '@ant-design/icons'
import tokenList from '../tokenList.json'

export default function Swap() {
  const [slippage, setSlippage] = useState(2.5)
  const [tokenOneAmount, setTokenOneAmount] = useState(null) 
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null)
  const [tokenOne, setTokenOne] = useState(tokenList[0])
  const [tokenTwo, setTokenTwo] = useState(tokenList[1])

  const switchHandler = () => {
    const one = tokenOne
    const two = tokenTwo
    setTokenOne(two)
    setTokenTwo(one)
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
  return (
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

        <div className="assetOne">
          <img src={tokenOne.img} alt="assetOneLogo" className='assetLogo' />
          {tokenOne.ticker}
          <DownOutlined />
        </div>

        <div className="assetTwo">
          
          <img src={tokenTwo.img} alt="assetTwoLogo" className='assetLogo' />
          {tokenTwo.ticker}
          <DownOutlined />
        </div>
      </div>
    </div>
  )
}
