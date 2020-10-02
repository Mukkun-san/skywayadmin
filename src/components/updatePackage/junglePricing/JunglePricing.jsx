import React, { useState, useEffect } from "react";
import isEmpty from "is-empty";
import Table from "../../table/table";

const JunglePricing = ({ onChange, oldVal }) => {
    let [pricing, setPricing] = useState([]);

    useEffect(() => {
        onChange(pricing)
    }, [pricing])

    useEffect(() => {
        if (oldVal && !pricing.length) {
            setPricing(oldVal)
        }
    }, [oldVal])


    let [singleOcc, setSingleOcc] = useState({});
    let [doubleOcc, setDoubleOcc] = useState({});

    const [name, setname] = useState("")

    let [validationErrors, setShowValidationErrors] = useState({
        show: false,
        msg: "",
    });

    let validatePricing = (pricing) => {
        let errors = [];
        if (isEmpty(pricing.name)) {
            errors.push("Package name not set.\n");
        }
        if (isEmpty(pricing.cost.singleOcc.weekday)) {
            errors.push("Weekday not set for single occupancy.\n");
        }
        if (isEmpty(pricing.cost.singleOcc.weekend)) {
            errors.push("Weekend not set for single occupancy.\n");
        }
        if (isEmpty(pricing.cost.doubleOcc.weekday)) {
            errors.push("Weekday not set for double occupancy.\n");
        }
        if (isEmpty(pricing.cost.doubleOcc.weekend)) {
            errors.push("Weekend not set for double occupancy.\n");
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

    let handleAddPricing = (event) => {
        event.preventDefault();

        let data = { name, cost: { singleOcc, doubleOcc } }

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
                    <br />
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <p className="form-label">Package Name</p>
                                <input
                                    onChange={(event) =>
                                        setname(event.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                    value={name}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h6><u>Single Occupancy</u></h6>
                            <div className="row">
                                <div className="col">
                                    <p>Weekday</p>
                                    <input
                                        onChange={(event) =>
                                            setSingleOcc({ ...singleOcc, weekday: event.target.value })
                                        }
                                        type="number"
                                        min={0}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col">
                                    <p>Weekend</p>
                                    <input
                                        onChange={(event) =>
                                            setSingleOcc({ ...singleOcc, weekend: event.target.value })
                                        }
                                        type="number"
                                        min={0}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <small>
                                Price should be in INR
                            </small>
                        </div>
                        <div className="col">
                            <h6><u>Double Occupancy</u></h6>
                            <div className="row">
                                <div className="col">
                                    <p>Weekday</p>
                                    <input
                                        onChange={(event) =>
                                            setDoubleOcc({ ...doubleOcc, weekday: event.target.value })
                                        }
                                        type="number"
                                        min={0}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col">
                                    <p>Weekend</p>
                                    <input
                                        onChange={(event) =>
                                            setDoubleOcc({ ...doubleOcc, weekend: event.target.value })
                                        }
                                        type="number"
                                        min={0}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
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
                                            <th rowSpan="2">
                                                Serial No
                                            </th>
                                            <th rowSpan="2">
                                                Package Name
                                   </th>
                                            <th colSpan="2">
                                                Single Occupancy
                                   </th>
                                            <th colSpan="2">
                                                Double Occupancy
                                   </th>
                                            <th rowSpan="2">
                                                Actions
                                   </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                Weekday
                                            </th>
                                            <th>
                                                Weekend
                                            </th>
                                            <th>
                                                Weekday
                                            </th>
                                            <th>
                                                Weekend
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pricing.map((data, index) => {
                                            return (
                                                <tr key={'pricing' + index}>
                                                    <td>
                                                        {index}
                                                    </td>
                                                    <td>
                                                        {data.name}
                                                    </td>
                                                    <td>
                                                        {data.cost.singleOcc.weekday}
                                                    </td>
                                                    <td>
                                                        {data.cost.singleOcc.weekend}
                                                    </td>
                                                    <td>
                                                        {data.cost.doubleOcc.weekday}
                                                    </td>
                                                    <td>
                                                        {data.cost.doubleOcc.weekend}
                                                    </td>
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

export default JunglePricing;
