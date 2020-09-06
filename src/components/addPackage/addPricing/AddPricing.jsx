import React, { useState } from "react";
import isEmpty from "is-empty";
import Table from "../../table/table";

const AddPricing = (props) => {
    let [pricing, setPricing] = useState([]);

    let [noOfGuest, setNoGuest] = useState("");
    let [stCost, setStCost] = useState("");
    let [deCost, setDeCost] = useState("");
    let [luCost, setLuCost] = useState("");

    let [validationErrors, setShowValidationErrors] = useState({
        show: false,
        msg: "",
    });

    let validatePricing = (pricing) => {
        let errors = [];
        if (isEmpty(pricing.noOfGuest)) {
            errors.push("No of guest cannot be empty.");
        }
        if (isEmpty(pricing.stCost)) {
            errors.push("Standard cost not provided.");
        }
        if (isEmpty(pricing.deCost)) {
            errors.push("Deluxe cost not provided.");
        }
        if (isEmpty(pricing.luCost)) {
            errors.push("Luxury cost not provided.");
        }

        if (errors.length == 0) {
            return {
                result: true,
                errors: null,
            };
        } else {
            return {
                result: false,
                errors: errors,
            };
        }
    };

    let handleAddPricing = (event) => {
        event.preventDefault();

        let data = { noOfGuest, stCost, deCost, luCost }

        let validate = validatePricing(data)

        if (validate.result == true) {

            setPricing([
                ...pricing,
                data
            ])

        } else {
            setShowValidationErrors({
                msg: validate.errors,
                show: true
            })
        }
    };

    return (
        <div>

            <div>
                <div className="container">
                    <h4>Add Pricing</h4>
                    {validationErrors.show ? (
                        <div className="alert alert-danger">
                            {validationErrors.msg}
                            <button onClick={() => setShowValidationErrors({ show: false, msg: '' })} className="close"><span aria-hidden="true">&times;</span></button>
                        </div>
                    ) : null}
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <div className="form-label">No Of Guest</div>
                                <input
                                    onChange={(event) =>
                                        setNoGuest(event.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                />

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <div className="form-label">Standard Cost</div>
                                <input
                                    onChange={(event) =>
                                        setStCost(event.target.value)
                                    }
                                    type="number"
                                    min={0}
                                    className="form-control"
                                />
                                <small>
                                    Price should be in INR
                                </small>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="form-label">Standard Cost</div>
                                <input
                                    onChange={(event) =>
                                        setDeCost(event.target.value)
                                    }
                                    type="number"
                                    min={0}
                                    className="form-control"
                                />
                                <small>
                                    Price should be in INR
                                </small>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <div className="form-label">Standard Cost</div>
                                <input
                                    onChange={(event) =>
                                        setLuCost(event.target.value)
                                    }
                                    type="number"
                                    min={0}
                                    className="form-control"
                                />
                                <small>
                                    Price should be in INR
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div
                                onClick={handleAddPricing}
                                className="btn btn-primary"
                            >
                                Add Pricing
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            {pricing.length !== 0 ? (
                                <Table>
                                    <thead>
                                        <th>
                                            Serial No
                                   </th>
                                        <th>
                                            No of guest
                                   </th>
                                        <th>
                                            Standard cost
                                   </th>
                                        <th>
                                            Deluxe cost
                                   </th>
                                        <th>
                                            Luxury cost
                                   </th>
                                        <th>
                                            Actions
                                   </th>
                                    </thead>
                                    <tbody>
                                        {pricing.map((data, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        {index}
                                                    </td>
                                                    <td>
                                                        {data.noOfGuest}
                                                    </td>
                                                    <td>
                                                        {data.stCost}
                                                    </td>
                                                    <td>
                                                        {data.deCost}
                                                    </td>
                                                    <td>
                                                        {data.luCost}
                                                    </td>
                                                    <td>
                                                        <button onClick={() => {
                                                            let temp = []

                                                            for (let i = 0; i < pricing.length; i++) {
                                                                if (i !== index) {
                                                                    return pricing[i];
                                                                }
                                                            }

                                                            setPricing(temp)

                                                        }} className="btn btn-sm btn-danger mb-3">
                                                            Remove
                                                   </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            ) : (<div className={'mt-3'} style={{ width: '100%', padding: '10px', boxShadow: '1px 1px 15px #ddd' }}>No pricing has been added yet.</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPricing;
