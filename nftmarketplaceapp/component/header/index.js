import { Web3Context,Web3Provider,web3Api,checkpoint,useWeb3 } from "../../provider"
import Link from "next/link"

const { useContext,useState } = require("react")

export default function Header(){
    
    const { connect,disconnect,loaded} = useWeb3();

    const login=async()=>{
        await connect()
        const{loaded} =useWeb3()

    }
    const logout=async()=>{
        disconnect()
    }
    
    //const[myaddress,setmyaddress]=useState(null)
    //setmyaddress(address)
    
    
    return(

        <nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <Link className="navbar-item" href="/">
        Home
      </Link>

      <Link className="navbar-item" href="/profile">
        Profile
      </Link>

      <Link className="navbar-item" href="/create">
        NFT
      </Link>

      

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          More
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            About
          </a>
          <a className="navbar-item">
            Jobs
          </a>
          <a className="navbar-item">
            Contact
          </a>
          <hr className="navbar-divider"/>
          <a className="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div className="navbar-end">
                    {!loaded ?
                    <button onClick={connect}   className="button is-primary">Login</button>
                    : <button onClick={logout}   className="button is-primary">Logout</button>
                    }
                    
                    
                </div>
  </div>
 </nav>
      
    )
}
