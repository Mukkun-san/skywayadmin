import React, { useState, useEffect } from 'react';
import axios from "axios";
import Table from "../../components/table/table";
import RichEditor from "./RichEditor/richeditor";

const Emails = () => {

    const [emails, setEmails] = useState([])
    const [loading, setLoading] = useState(true)
    const [range, setRange] = useState({ from: 1, to: 10 })

    useEffect(() => {
        axios.get('https://skyway-server.herokuapp.com/api/v1/email/getAll').then((result) => {
            setEmails(result.data.emails)
            console.log(result);
            setLoading(false)
        }).catch((err) => {
            console.log(err);
            setLoading(false)
        });
    }, [])

    function mailsToClipboard() {
        if (range.from > range.to) {
            alert(`Invalid range: "from" value (${range.from}) can't be higher than "to" value (${range.to})`)
        } else if ((range.to - range.from) > 50) {
            alert("Invalid range: You can only select 100 emails at a time!")
        } else {
            let result = []
            let c = range.from - 1;
            while (c < range.to - 1 && range.to <= emails.length) {
                result.push(" " + emails[c].email);
                c++
            }
            console.log(result)
            console.log(document.getElementById("txtarea").textContent = result);
            document.getElementById("txtarea").select();
            document.execCommand("copy");
        }
    }

    return (
        <div className="container-fluid mt-3 m-2">
            <h1 className="mb-3" >Mailing List</h1>
            {loading ? <div style={{ height: "100vh", width: "100vw" }} className="px-auto py-auto">
                <div className="spinner-border text-info"></div>
            </div> : emails && emails.length ?
                    <div>
                        <div className="col text-center">
                            <b>From:</b><input min={1} max={emails.length} type="number" style={{ width: '5rem' }} className="d-inline form-control ml-2 mr-3" value={range.from} onChange={e => { setRange({ ...range, from: e.target.value }) }} />
                            <b>To:</b><input min={1} max={emails.length} type="number" style={{ width: '5rem' }} className="d-inline ml-2 form-control" value={range.to} onChange={e => { setRange({ ...range, to: e.target.value }) }} />
                            <button className="mx-3 btn btn-block btn-info d-inline mr-3" style={{ width: 'auto' }} onClick={() => { mailsToClipboard() }}>Copy to Clipboard</button>
                        </div>
                        <textarea id='txtarea' className="form-control" style={{ position: "fixed", top: "1000vh" }}></textarea>
                        <br />
                        <Table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Email</th>
                                    <th>Subscribed</th>
                                    <th>Bookings</th>
                                    <th>Added on</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emails.map((mail, i) => {
                                    return (
                                        <tr key={mail.email + i}>
                                            <td>{i + 1}</td>
                                            <td>{mail.email}</td>
                                            <td>{mail.subscribed ? "Yes" : "No"}</td>
                                            <td>{mail.nbookings}</td>
                                            <td>{mail.createdOn.substr(0, mail.createdOn.lastIndexOf(".") - 1).replace("T", "  ")}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                        {/* <RichEditor
                        onChange={(val) => { setMailContent(val) }}
                    /> */}

                    </div>
                    : <h3 className="danger"> No emails Subscribed yet!</h3>
            }
        </div>
    );
}

export default Emails;