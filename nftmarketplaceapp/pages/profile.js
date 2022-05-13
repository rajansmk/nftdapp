import { useWeb3 } from "../provider"
const { useContext,useState,useEffect } = require("react")

export default function test()
{
    
    const { connect,web3Api,address,sweb3 } = useWeb3()

    //const data = window.localStorage.getItem('address')
    useEffect(()=>{
        const data = window.localStorage.getItem('address')
        const ne = window.localStorage.getItem('web3')
        console.log(JSON.stringify(ne))
    },[])
    
    
    return(
        <div>
            <h1>
                hello{address}
            </h1>
        </div>
    )
}