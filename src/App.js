import React,{useState} from 'react'
import { ethers } from "ethers";
function App() {
  const [isConnected,setIsConnected] = useState(false);
  const [balance,setBalance] = useState(null)
  const [address,setAddress] = useState(null)
  const checkEthNetwork = async ()=> {
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts",[])
      const singer = provider.getSigner()
      setIsConnected(true)
      return provider
    }
    else{
      console.log("ethereum Network not found.please install metamask to connect")
    }
  }
  const checkBalance = async()=>{
    const provider = await checkEthNetwork()
    const singer = provider.getSigner()
    const address = await singer.getAddress()
    setAddress(address)
    const bal = await provider.getBalance(address)
    setBalance(ethers.utils.formatEther(bal))
  }
  return (
    <div>
     { 
       (!(isConnected) && !(balance))&&(
        <div className="card h-100 d-flex align-items-center justify-content-center">
        <h1>Connect to web3</h1>
        </div>)
     }
      <div className="card h-100 d-flex align-items-center justify-content-center">
        {(isConnected || balance) && (
        <h1>Hello,Welcome to Web3</h1>
        )}
      </div>
      <div className="card gap-3">
          <span className='text-center' >
          {(!(isConnected))&&(
        <button type="button" className="btn btn-primary" onClick={checkEthNetwork}>Connect</button>)
        }
      {((isConnected))&&( <p>You are connected to the metamask</p>)}
      {(!(balance))&&
      (<button type="button" className="btn btn-primary" onClick={checkBalance}>checkBalance</button>)}
      <p className='set-balance'></p>
      {(balance)&&(<p>Your ETH wallet address = {address}</p>)}
      {(balance)&&(<p>Your ETH balance = {balance}</p>)}
          </span>
      </div>
    </div>
  );
}

export default App;
