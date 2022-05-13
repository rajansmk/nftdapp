import Header from "../header";
import Web3Provider from "../../provider";
import { Children } from "react";

export default function Layout({children}){

    return(
        <Web3Provider>
            <Header/>
            {children}
        </Web3Provider>
    )
}