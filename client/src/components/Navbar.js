import React from 'react'

const Navbar = ({state}) => {

    const connetWallet = async () => {
        await state.onConnect();
    }

    const dicconnetWallet = async () => {
        await state.onDisconnect();
    }

    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <p className="navbar-brand">Election Dapp</p>
                <form className="d-flex">

                {state.isConnected ?
                <>
                    <div className="btn btn-secondary me-2">{state.isConnected ? state.account : 'Address'}</div>
                    <button className="btn btn-primary" type="button" onClick={dicconnetWallet}>Disconnect</button></> :
                    <button className="btn btn-primary" type="button" onClick={connetWallet}>Connect</button>
                }
                    
                </form>
            </div>
        </nav>
    )
}

export default Navbar