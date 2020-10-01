import React, { useState, useEffect } from 'react'

const Places = (props) => {
    const [place, setPlace] = useState('')

    useEffect(() => {
        props.onChange(place)
    }, [place])

    return (
        <div>
            <div className="py-2">
                <h3>Places Covered</h3>
            </div>
            <input type="text" className={"form-control"} value={place} onChange={e => { setPlace(e.target.value); }} />
            <hr />
        </div>
    );
}
export default Places;