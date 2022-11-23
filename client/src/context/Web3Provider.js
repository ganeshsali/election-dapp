
import React, { useState } from 'react'
import Web3Context from './Web3Context'
import abi from '../abi/abi.json';
import Web3 from "web3";

const Web3Provider = (props) => {

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const setAccountListener = (web3) => {
        web3.givenProvider.on("accountsChanged", async (accounts) => {
            setAccount(accounts[0]);
            if (!accounts[0]) {
                setIsConnected(false);
            }
        })
    };

    // const getElectionData = async (web3,contract) => {
    //     const candidates = await contract.methods.candidatesCount().call();
    //     console.log(candidates);
    // };

    const detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log("Non-ethereum browser detected. You should install Metamask");
        }
        return provider;
    };

    const onConnect = async () => {

        try {
            const currentProvider = detectCurrentProvider();
            if (currentProvider) {
                await currentProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currentProvider);
                setWeb3(web3);
                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0];
                setAccount(account);
                setAccountListener(web3);
                setIsConnected(true);

                const contract = new web3.eth.Contract(
                    abi,
                    '0x3f9610a2C1578cd6216DEa216376959a0CfBcb80'
                );
                setContract(contract);
                // getElectionData(web3,contract);
            }

        } catch (error) {
            alert("Falied to load web3.");
            console.log(error);
        }
    };

    const onDisconnect = () => {
        setIsConnected(false);
        setAccount(null);
    }

    return (
        <Web3Context.Provider value={{ onConnect, onDisconnect, web3, contract, account, isConnected }}>
            {props.children}
        </Web3Context.Provider>
    )
}

export default Web3Provider;