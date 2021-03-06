import { useWeb3 } from "../provider";
import Web3 from "web3"
import {ethers} from 'ethers';
const { useContext, useState, useEffect } = require("react");

export default function create() {
  
  const { connect, web3Api, address, sweb3,contract } = useWeb3();

  const[uri,setUri]=useState("")
  const[nftCount,setnftCount]=useState(0)
  const [nftitem,setnftitem]=useState([])

  //const data = window.localStorage.getItem('address')
  useEffect(() => {
    const data = window.localStorage.getItem("address");
    const ne = window.localStorage.getItem("web3");
    console.log(JSON.stringify(ne));
    if(contract)
    {
        async function loadnft()
        {

          const objects = {}
         // await contract.methods.myListingNftCount().call().then(console.log)
          await contract.methods.myListingNftCount().call()
          .then(function(result){
              console.log(result.toString(10))
          })
          //setnftCount(count)
            //const data = await contract.methods.fetchMyNFTs().call()
            // const data = await contract.methods.fetchMyNFTs().call({from: address})
            // const items = await Promise.all(data.map(async i => {
                
            //     let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            //     let item = {
            //       tokenid: i.tokenid.toNumber(),
            //       seller: i.seller,
            //       owner: i.owner,
            //       price:price,
            //       status: i.status
            //     }
            //     return item;
            //  }));
            //  setnftitem(items)
        }
        loadnft()
        
    }
  }, []);

  const nftChange=event=>{
      
    setUri(event.target.value)
  }

  const buyNFT=async()=>{
      debugger
      if(contract)
      {
        await contract.methods.createnfttoken(uri).send({
            from:address
        })

      }
    
  }
  const getCount=async()=>{
    debugger
    if(contract)
    {
      await contract.methods.myListingNftCount().call({
        from:address
    }).then(function(result){
              console.log(result.toString(10))
              setnftCount(result.toString(10))
          })

          await contract.methods.nftOwner(1).call()
          .then(function(result){
              console.log(result.toString(10))
              //setnftCount(result.toString(10))
          })
          await contract.methods.nftlistingPrice().call()
          .then(function(result){
              console.log(result.toString(10))
              //setnftCount(result.toString(10))
          })
          await contract.methods.gettokenprice(1).call()
          .then(function(result){
              console.log(result.toString(10))
              //setnftCount(result.toString(10))
          })

          await contract.methods.mytoken().call({from:address})
          .then(function(result){
              console.log(result)
              //setnftCount(result.toString(10))
          })
          //test
          await contract.methods.fetchMyNFTs().call({from:address})
          .then(function(result){
              console.log(result.toString(10))
              //setnftCount(result.toString(10))
          })
          await contract.methods.fetchItemsCreated().call({from:address})
          .then(function(result){
              console.log(result.toString(10))
              //setnftCount(result.toString(10))
          })

          //test
          await contract.methods.myListingNft(1).call({from:address})
          .then(function(result){
              console.log(result.tokenid)
              //setnftCount(result.toString(10))
          })
      

    }
  
}

  return (
    <>
    <div className="container is-widescreen">
    <div className="field">
        <label className="label">Name {nftCount}</label>
        <label className="label">Name {nftCount}</label>
        <label className="label">Name {nftCount}</label>
        <div className="control">
          <input   onChange={nftChange} className="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button onClick={buyNFT} type="type" className="button is-link">Buy NFT</button>
          <button onClick={getCount} type="type" className="button is-link">Count</button>
        </div>
      </div>
    </div>
    <div >
        {
          nftitem.map((nft, i) =>(
            <div key={i} className="border shadow rounded-xl overflow-hidden">
             
              
                        <div className="p-4">
                <p style={{ height: '64px'}} className="text-2xl font-semibold">
                  {nft.tokenid}
                </p>
                <div style={{ height: '70px', overflow: 'hidden'}}>
                  <p className="text-gray-400">{nft.seller}</p>
                </div>
                <div style={{ height: '70px', overflow: 'hidden'}}>
                  <p className="text-gray-400">{nft.owner}</p>
                </div>
              </div>
              <div className="p-4 bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                >Buy NFT</button>
            </div>
            </div>
          ))
        }
      </div>
      
    </>
  );
}
