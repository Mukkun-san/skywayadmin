import React, { useState, useEffect } from 'react'

const Places = (props) => {
    const [place, setPlace] = useState('')
    const [places, setPlaces] = useState([])

    useEffect(() => {
        props.onChange(places)
    }, [places])

    return (
        <div>
            <div className="py-2">
                <h4>Places Covered</h4>
                {places.length > 0 ?
                    places.map((place, i) =>
                        <p className='d-inline pr-2' key={i}> {place} </p>
                    ) : ""
                }
            </div>
            <input type="text" className={"form-control"} value={place} onChange={e => { setPlace(e.target.value); }} />
            <button className='mt-3 mb-5 btn btn-primary' type="button"
                onClick={e => {
                    setPlaces([...places, place]);
                }}>Add Place</button>
        </div>
    );
}
export default Places;