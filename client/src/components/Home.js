import React, { useEffect, useState } from 'react'

const Home = ({ state }) => {

    const [candidates, setCandidates] = useState([]);

    const getElectionData = async (contract) => {
        const candidates = await contract.methods.candidatesCount().call();
        let ar = [];
        for (let i = 1; i <= candidates; i++) {
            let d = await contract.methods.candidates(i).call();
            ar.push(d);
        }
        setCandidates(ar);
    };

    const voteFun = async () => {
        if (state.contract) {
            var e = document.getElementById("candidatesSelect");
            var value = parseInt(e.value);
            console.log(value);
            await state.contract.methods.vote(value).send({ from: state.account });
            getElectionData(state.contract);

        }
        else{
            console.log("Data not loaded yet!")
        }
    };

    useEffect(() => {
        if (state.contract) {
            getElectionData(state.contract);
        }
    }, [state.account, state.contract])

    console.log('candidates', candidates)

    return (
        <>
            <div className="container" style={{ "width": "650px" }}>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="text-center">Election Results</h1>
                        <hr />
                        {/* <div id="loader">
                            <p className="text-center">Loading...</p>
                        </div> */}
                        <div id="content">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Votes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.map(element =>{ 
                                        return(<tr key={element.id}>
                                            <td>{element.id}</td>
                                            <td>{element.name}</td>
                                            <td>{element.votes}</td>
                                        </tr>
                                        )})}
                                </tbody>
                            </table>
                            <hr />
                            <form >
                                <div className="form-group" >
                                    <label htmlFor="candidatesSelect">Select Candidate</label>
                                    <select className="form-control mt-2" id="candidatesSelect" >
                                    {candidates.map(element =>{ 
                                        return(<option key={element.id} value={element.id}> {element.id} {element.name}
                                        </option>
                                        )})}
                                    </select>
                                </div>
                                <button type="button" className="btn btn-primary mt-2" onClick={voteFun}>Vote</button>
                                <hr />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home