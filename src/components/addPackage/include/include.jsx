import React, {useState} from 'react';
import Table from "../../table/table";

let Include = () => {

    let [includes , setIncludes] = useState([])
    let [includeTxt , setIncludeTxt] = useState('')

    return (
        <div className={'container'} style={{marginTop : '30px' , marginBottom : '30px'}}>
            <h3>
                Includes
            </h3>
            <div className="form-group">
                <div className="form-label">
                    Include
                </div>
                <input onChange={(event) => {
                    setIncludeTxt(event.target.value)
                }} type="text" className="form-control"/>
            </div>
            <button onClick={() => {
                setIncludes([
                    ...includes,
                    includeTxt
                ])
            }} className={'btn btn-primary mb-3'}>
                Add
            </button>
            {includes.length !== 0 ? (
                <Table>
                    <thead>
                    <tr>

                        <th>
                            Includes
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {includes.map((include ) => {
                        return (
                            <tr>

                                <td>
                                    {include}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            ) : <div>No includes added</div>}
        </div>
    )
}

export default Include;