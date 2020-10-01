import React, { useState, useEffect } from "react";
import isEmpty from "is-empty";
import Table from "../../table/table";

const AddPricing = ({ oldVal, onChange }) => {
    let [pricing, setPricing] = useState([]);

    const [oldPrice, setOldPrice] = useState(oldVal)

    useEffect(() => {
        onChange(pricing)
    }, [pricing])

    useEffect(() => {
        if (oldVal && !pricing.length) {
            setPricing(oldVal)
        }
        return () => {

        }
    }, [oldVal])

    let [name, setNoGuest] = useState("");
    let [standard, setstandard] = useState("");
    let [deluxe, setdeluxe] = useState("");
    let [luxury, setluxury] = useState("");

    let [validationErrors, setShowValidationErrors] = useState({
        show: false,
        msg: "",
    });

    let validatePricing = () => {
        let errors = [];
        if (isEmpty(name)) {
            errors.push("No of guest cannot be empty.\n");
        }
        if (isEmpty(standard)) {
            errors.push("Standard cost not provided.");
        }

        if (errors.length === 0) {
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


    let hasCost = (cost) => {
        if (pricing && pricing.length && pricing.every(x => x.cost)) {
            if (cost === "deluxe") {
                let deluxe = []
                pricing.forEach((price) => {
                    deluxe.push(price.cost.deluxe);
                })
                if (deluxe.every(x => !x)) {
                    return false
                } else {
                    return true
                }
            } else if (cost === "luxury") {
                let luxury = []
                pricing.forEach((price) => {
                    luxury.push(price.cost.luxury);
                })
                if (luxury.every((x) => !x)) {
                    return false
                } else {
                    return true
                }
            }
        }
        else {
            return false
        }
    }

    let handleAddPricing = (event) => {
        event.preventDefault();

        let data = { name, cost: { standard, deluxe, luxury } }

        let validate = validatePricing(data)

        if (validate.result === true) {

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
                            <pre>{validationErrors.msg}</pre>
                            <button onClick={() => setShowValidationErrors({ show: false, msg: '' })} className="close"><span aria-hidden="true">&times;</span></button>
                        </div>
                    ) : null}
                    {
                        oldVal && oldVal.length ?
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <div className="form-label">No Of Guest</div>
                                            <select
                                                onChange={(event) =>
                                                    setNoGuest(event.target.value)
                                                }
                                                type="text"
                                                className="form-control"
                                            >
                                                <option value="" selected disabled ></option>
                                                <option value="2 Persons traveling together (Double Occupancy)">2 Persons traveling together (Double Occupancy)</option>
                                                <option value="3 Persons traveling together (Triple Occupancy)">3 Persons traveling together (Triple Occupancy)	</option>
                                                <option value="4 persons traveling together (2 Double Occupancy)">4 persons traveling together (2 Double Occupancy)	</option>
                                                <option value="1 Person traveling together with 2 persons (1 Double and 1 Single Occupancy)">1 Person traveling together with 2 persons (1 Double and 1 Single Occupancy)</option>
                                                <option value="Children between 6 and 12 years	">Children between 6 and 12 years</option>
                                                <option value="Children below 6 years">Children below 6 years</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <div className="form-label">Standard Cost</div>
                                            <input
                                                onChange={(event) =>
                                                    setstandard(event.target.value)
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
                                            <div className="form-label">Deluxe Cost</div>
                                            <input
                                                onChange={(event) =>
                                                    setdeluxe(event.target.value)
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
                                            <div className="form-label">Luxury Cost</div>
                                            <input
                                                onChange={(event) =>
                                                    setluxury(event.target.value)
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
                                        {pricing.length ? (
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Serial No
                                            </th>
                                                        <th>
                                                            No of guest
                                   </th>
                                                        <th>
                                                            Standard cost
                                   </th>
                                                        {hasCost("deluxe") ?
                                                            <th> Deluxe cost</th> : null}

                                                        {hasCost("luxury") ?
                                                            <th> Luxury cost</th> : null}
                                                        <th>
                                                            Actions
                                   </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pricing && pricing.length && pricing.every(x => x.cost) ? pricing.map((data, index) => {
                                                        return (
                                                            <tr key={'pricing' + index}>
                                                                <td>
                                                                    {index}
                                                                </td>
                                                                <td>
                                                                    {data.name}
                                                                </td>
                                                                <td>
                                                                    {data.cost.standard}
                                                                </td>
                                                                {hasCost("deluxe") ?
                                                                    <td>
                                                                        {data.cost.deluxe}
                                                                    </td> : null}

                                                                {hasCost("luxury") ?
                                                                    <td>
                                                                        {data.cost.luxury}
                                                                    </td> : null}
                                                                <td>
                                                                    <button type="button" onClick={() => {
                                                                        let res = []
                                                                        for (let i = 0; i < pricing.length; i++) {
                                                                            if (i !== index) {
                                                                                res.push(pricing[i])
                                                                            }
                                                                        }
                                                                        setPricing(res)
                                                                    }} className={'btn btn-danger'}>
                                                                        Remove
                                            </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) : null}
                                                </tbody>
                                            </Table>
                                        ) : (<div className={'mt-3'} style={{ width: '100%', padding: '10px', boxShadow: '1px 1px 15px #ddd' }}>No pricing has been added yet.</div>)}
                                    </div>
                                </div>

                            </div> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default AddPricing;
