import React, { useState, useEffect } from 'react'

let Itinerary = (props) => {

    const [itineraryList, setItineraryList] = useState([])

    const [itineraryDetails, setItineraryDetails] = useState({})

    useEffect(() => {
        props.onChange(itineraryList)
    }, [itineraryList])

    return (
        <div className={'container'} style={{ marginTop: '50px' }}>
            <h2>Itinerary</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-label">
                            Day Number
                        </div>
                        <input type="number" min={1} onChange={event => {
                            setItineraryDetails({
                                ...itineraryDetails,
                                day: event.target.value
                            })
                        }} className="form-control" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-label">
                            Place
                        </div>
                        <input onChange={(event) => {
                            setItineraryDetails({
                                ...itineraryDetails,
                                place: event.target.value
                            })
                        }} type="text" className="form-control" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <div className="form-label">
                            Description
                            <textarea onChange={(e) => {
                                setItineraryDetails({
                                    ...itineraryDetails,
                                    description: e.target.value
                                })
                            }} class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" onClick={() => {
                setItineraryList([
                    ...itineraryList,
                    itineraryDetails
                ])
            }} className={'btn btn-primary mb-3'}>
                Add
            </button>

            {itineraryList.length !== 0 ? (
                <>
                    {itineraryList.map((itinerary, index) => {
                        return (
                            <div className={'card'} key={"itinerary" + index}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-10">
                                            <div className="">
                                                <p>Day: <b>{itinerary.day}</b></p>
                                            </div>
                                            <div className="">
                                                <p>Place: <b>{itinerary.place}</b></p>
                                            </div>
                                            <div>
                                                Description:
                                                {itinerary.description}
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <button type="button" onClick={() => {
                                                let res = []
                                                for (let i = 0; i < itineraryList.length; i++) {
                                                    if (i !== index) {
                                                        res.push(itineraryList[i])
                                                    }
                                                }
                                                setItineraryList(res)
                                            }} className={'btn btn-danger'}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </>
            ) : <div>No itinerary added</div>}

        </div>
    )
}

export default Itinerary;
