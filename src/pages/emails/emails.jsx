import React, { useState, useEffect } from 'react';
import axios from "axios";
import Table from "../../components/table/table";
import RichEditor from "./RichEditor/richeditor";

const Emails = () => {

    const [emails, setEmails] = useState([])
    const [mailContent, setMailContent] = useState("")
    const [bulkmails, setBulkmails] = useState("")

    useEffect(() => {
        axios.get('https://skyway-server.herokuapp.com/api/v1/email/getAll').then((result) => {
            setEmails(result.data.emails)
            setBulkmails(result.data.emails.map((x, i) => { return x.email }))
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    function mailsToClipboard() {

    }

    return (
        <div className="container-fluid mt-3 m-2">
            <h1 className="mb-3" >Mailing List</h1>
            {emails && emails.length ?
                <div>
                    <button className="btn btn-block btn-lg btn-info mx-auto d-inline" style={{ width: 'auto' }} onClick={() => { mailsToClipboard() }}>Copy All Emails to Clipboard</button>

                    {/* From:<input type="number" style={{ width: '10rem' }} className="d-inline form-control" />
                    To:<input type="number" style={{ width: '10rem' }} className="d-inline form-control" />
                    <textarea className="form-control" value={bulkmails}></textarea> */}
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
                    <RichEditor
                        onChange={(val) => { setMailContent(val) }}
                    />
                    <div>
                        {
                            mailContent
                        }
                    </div>
                </div>
                : <h3 className="danger"> No emails Subscribed yet!</h3>
            }
        </div>
    );
}

export default Emails;