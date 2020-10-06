import React, { useState, useEffect } from 'react';
import axios from "axios";
import Table from "../../components/table/table";
import RichEditor from "./RichEditor/richeditor";

const Emails = () => {

    const [emails, setEmails] = useState([])
    const [range, setRange] = useState({ from: 1, to: 10 })

    useEffect(() => {
        axios.get('https://skyway-server.herokuapp.com/api/v1/email/getAll').then((result) => {
            setEmails(result.data.emails)
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    function mailsToClipboard() {
        if (range.from > range.to) {
            alert(`Invalid range: "from" value (${range.from}) can't be higher than "to" value (${range.to})`)
        } else if ((range.to - range.from) > 50) {
            alert("Invalid range: You can only select 100 emails at a time!")
        } else {
            let from = range.from
            let to = range.to
            let result = emails.map((x, i) => {
                if (i + 1 === from && from <= to) {
                    from++
                    return x.email
                } else {
                    return null
                }
            });
            console.log(document.getElementById("txtarea").textContent = result.filter(x => x).join(','))
            document.getElementById("txtarea").select();
            document.execCommand("copy");
        }
    }

    return (
        <div className="container-fluid mt-3 m-2">
            <h1 className="mb-3" >Mailing List</h1>
            {emails && emails.length ?
                <div>
                    <div className="col text-center">
                        <b>From:</b><input min={1} max={100000} type="number" style={{ width: '5rem' }} className="d-inline form-control mr-3" value={range.from} onChange={e => { setRange({ ...range, from: e.target.value }) }} />
                        <b>To:</b><input min={1} max={100000} type="number" style={{ width: '5rem' }} className="d-inline form-control" value={range.to} onChange={e => { setRange({ ...range, to: e.target.value }) }} />
                        <button className="mx-3 btn btn-block btn-info d-inline mr-3" style={{ width: 'auto' }} onClick={() => { mailsToClipboard() }}>Copy to Clipboard</button>
                    </div>
                    <textarea id='txtarea' className="form-control" style={{ position: "fixed", top: "1000vh" }}></textarea>
                    <br />
                    <Table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Subscribed</th>
                                <th>Bookings</th>
                                <th>Added on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emails.map((mail) => {
                                return (
                                    <tr key={mail.email}>
                                        <td>{mail.email}</td>
                                        <td>{mail.subscribed ? "Yes" : "No"}</td>
                                        <td>{mail.nbookings}</td>
                                        <td>{mail.createdOn}</td>
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