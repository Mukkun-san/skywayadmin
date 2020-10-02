import React, { useState, useEffect } from 'react';
import Table from "../../table/table";

let Exclude = ({ onChange, oldVal }) => {

    let [excludes, setExcludes] = useState([])
    let [excludeTxt, setExcludeTxt] = useState('')

    useEffect(() => {
        onChange(excludes);
    }, [excludes])

    useEffect(() => {
        if (oldVal && !excludes.length) {
            setExcludes(oldVal)
        }
    }, [oldVal])

    return (
        <div className={'container'} style={{ marginTop: '30px' }}>
            <h3>
                Excludes
            </h3>
            <div className="form-group">
                <div className="form-label">
                    Excludes
                </div>
                <input onChange={(event) => {
                    setExcludeTxt(event.target.value)
                }} type="text" className="form-control" />
            </div>
            <button type="button" onClick={() => {
                setExcludes([
                    ...excludes,
                    excludeTxt
                ])
            }} className={'btn btn-primary mb-3'}>
                Add
            </button>
            {excludes.length !== 0 ? (
                <Table>
                    <thead>
                        <tr>

                            <th>
                                Excludes
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {excludes.map((exclude, index) => {
                            return (
                                <tr key={"exclude" + index}>

                                    <td>
                                        {exclude}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            ) : <div>No excludes added</div>}
        </div>
    )
}

export default Exclude;