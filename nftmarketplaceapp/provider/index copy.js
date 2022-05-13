const { useState,createContext,useContext,useEffect,useMemo } = require("react")

import Head from 'next/head'
import "bulma/css/bulma.css"
import Web3 from "web3"
import nftmarketplace from '../blockchain/nftmarketplace'
//https://github.com/enochndika/nextjs-authentication-with-react-context/blob/master/auth/context.js
const Web3Context = createContext(null)
// const setListeners = provider => {
//   provider.on("chainChanged", _ => window.location.reload())
// }
// const createWeb3State = ({web3, contract, address}) => {
//     return {
//       web3,
//       contract,
//       address
//     }
//   }
export default function Web3Provider({children}) {
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [loaded, setLoaded] = useState(false)
    
    // const [web3Api,setweb3api]=useState(
    //     createWeb3State( {
    //         web3:null,
    //         contract:null,
    //         address:null
    //     })
    // )
    useEffect(()=>{
      if(!web3)
        {
            //debugger
          //connect()
               
        }

    },[web3])

    const disconnect=async()=>{
      if(web3)
      {
        
        setWeb3(null)
          setAddress(null)
          setContract(null)
          setLoaded(false)
      }
      

    }
    const connect=async()=>{
      if(typeof window!=="undefined" && typeof window.ethereum!=="undefined")
      {
        try
        {
          
          await window.ethereum.request({method:"eth_requestAccounts"})
          const cweb3= new Web3(window.ethereum)
          
          const accounts=await cweb3.eth.getAccounts()
          const caddress=accounts[0]
          const ccontract=nftmarketplace(cweb3)
          setWeb3(cweb3)
          setAddress(caddress)
          setContract(ccontract)
          setLoaded(true)
          window.localStorage.setItem('web3', cweb3);
          window.localStorage.setItem('contract', ccontract);
          window.localStorage.setItem('Loaded', true);
          window.localStorage.setItem('address', caddress);
          
        //setListeners(provider)
          // setWeb3Api(
          //     createWeb3State({
          //       cweb3,
          //       ccontract,
          //       caddress
          //     })
          //   )
         
        }
        catch(err)
        {
          console.log(err.message)
        }

      }
      else
            {
                console.log("please install metamask")
            }
        
    }


    //const { web3, contract, address } = web3Api

      return (
        <Web3Context.Provider value={{ connect,disconnect,web3,contract,address,loaded }}>
          {children}
        </Web3Context.Provider>
      )

    
}
export  function useWeb3() {
    return useContext(Web3Context)
  }
  

  
