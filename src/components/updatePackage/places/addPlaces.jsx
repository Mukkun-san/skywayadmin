import React, { useState, useEffect } from 'react'

const Places = ({ onChange, oldVal }) => {
    const [place, setPlace] = useState('')

    useEffect(() => {
        onChange(place)
    }, [place])

    useEffect(() => {
        if (oldVal && !place) {
            setPlace(oldVal)
        }
        return () => {

        }
    }, [oldVal])

    return (
        <div>
            <div className="py-2">
                <h4>Places Covered</h4>
            </div>
            <input type="text" className={"form-control"} value={place} onChange={e => { setPlace(e.target.value); }} />
            <hr />
        </div>
    );
}
export default Places;