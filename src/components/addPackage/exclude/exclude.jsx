import React, {useState} from 'react';
import Table from "../../table/table";

let Exclude = () => {

    let [excludes , setExcludes] = useState([])
    let [excludeTxt , setExcludeTxt] = useState('')

    return (
        <div className={'container'} style={{marginTop : '30px'}}>
            <h3>
                Excludes
            </h3>
            <div className="form-group">
                <div className="form-label">
                    Include
                </div>
                <input onChange={(event) => {
                    setExcludeTxt(event.target.value)
                }} type="text" className="form-control"/>
            </div>
            <button onClick={() => {
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
                            Includes
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {excludes.map((exclude ) => {
                        return (
                            <tr>

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