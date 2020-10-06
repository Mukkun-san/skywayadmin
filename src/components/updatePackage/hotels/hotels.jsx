import React, { useState, useEffect } from "react";
import Table from "../../table/table";

let Hotels = ({ onChange, oldVal }) => {

    let [hotelsList, setHotelsList] = useState([])

    useEffect(() => {
        onChange(hotelsList)
    }, [hotelsList])

    useEffect(() => {
        if (oldVal && !hotelsList.length) {
            setHotelsList(oldVal)
        }
    }, [])

    let [hotelsInfo, setHotelsInfo] = useState({
        place: '',
        standard: [],
        deluxe: [],
        luxury: []
    })

    if (!hotelsList.length) {
        hotelsList = oldVal
    }

    return (
        <div style={{ marginTop: '50px' }}>
            <h2>Hotels</h2>
            <div className="form-group">
                <div className="form-label">
                    Place
                </div>
                <input onChange={(event) => {
                    setHotelsInfo({
                        ...hotelsInfo,
                        place: event.target.value
                    })
                }} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <div className="form-label">
                    Standard
                </div>
                <input onChange={(event) => {
                    setHotelsInfo({
                        ...hotelsInfo,
                        standard: event.target.value.split(',')
                    })
                }} type="text" className="form-control" />
                {/* <small>Write hotels name separated by , </small> */}
            </div>
            <div className="form-group">
                <div className="form-label">
                    Deluxe
                </div>
                <input onChange={(event) => {
                    setHotelsInfo({
                        ...hotelsInfo,
                        deluxe: event.target.value.split(',')
                    })
                }} type="text" className="form-control" />
                {/* <small>Write hotels name separated by , </small> */}
            </div>
            <div className="form-group">
                <div className="form-label">
                    Luxury
                </div>
                <input onChange={(event) => {
                    setHotelsInfo({
                        ...hotelsInfo,
                        luxury: event.target.value.split(',')
                    })
                }} type="text" className="form-control" />
                {/* <small>Write hotels name separated by , </small> */}
            </div>
            <button type="button" onClick={() => {
                setHotelsList([
                    ...hotelsList,
                    hotelsInfo
                ])
            }} className={'btn btn-primary mb-3'}>
                Add
            </button>
            {hotelsList && hotelsList.length !== 0 ? (
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Serial No</th>
                                <th>Place</th>
                                <th>Standard</th>
                                <th>Deluxe</th>
                                <th>Luxury</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelsList.map((hotel, index) => {
                                return (
                                    <tr key={'hotel' + index}>
                                        <td>{index + 1}</td>
                                        <td>{hotel.place}</td>
                                        <td>
                                            {hotel.standard.map((standard, key) => (
                                                <React.Fragment key={"standard" + key}>
                                                    {standard} < br />
                                                </React.Fragment>
                                            ))}
                                        </td>
                                        <td>
                                            {hotel.deluxe.map((deluxe, key) => (
                                                <React.Fragment key={'deluxe' + key}>
                                                    {deluxe} < br />
                                                </React.Fragment>
                                            ))}
                                        </td>
                                        <td>
                                            {hotel.luxury.map((luxury, key) => (
                                                <React.Fragment key={'luxury' + key}>
                                                    {luxury} < br />
                                                </React.Fragment>
                                            ))}
                                        </td>
                                        <td>
                                            <button type="button"
                                                onClick={() => {
                                                    let temp = []
                                                    for (let k = 0; k < setHotelsList.length; k++) {
                                                        console.log(temp, hotelsList, k, index);
                                                        if (k !== index) {
                                                            temp.push(hotelsList[k])
                                                        }
                                                    }
                                                    setHotelsList(temp)
                                                }}
                                                className={'btn btn-danger'}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            ) : (<div>No hotels added</div>)}
        </div>
    )
}

export default Hotels;