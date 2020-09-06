import React, {useEffect, useState} from 'react'
import RichEditor from "../RichEditor/richeditor";
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();

let Itinerary = () => {

    let [itineraryList , setItineraryList] = useState([])

    let [itineraryDetails , setItineraryDetail ] = useState({
        day : '',
        place : '',
        description : ''
    })

    return (
        <div className={'container'} style={{ marginTop : '50px'}}>
            <h2>Itinerary</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-label">
                            Day Number
                        </div>
                        <input type="number" min={1} onChange={event => {
                            setItineraryDetail({
                                ...itineraryDetails,
                                day : "Day " + event.target.value
                            })
                        }} className="form-control"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-label">
                            Place
                        </div>
                        <input onChange={(event) => {
                            setItineraryDetail({
                                ...itineraryDetails,
                                place : event.target.value
                            })
                        }} type="text" className="form-control"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <div className="form-label">
                            Description
                        </div>
                       <RichEditor onChange={(html) => {
                            setItineraryDetail({
                                ...itineraryDetails,
                                description : html
                            })
                       }}/>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                setItineraryList([
                    ...itineraryList,
                    itineraryDetails
                ])
            }} className={'btn btn-primary mb-3'}>
                Add
            </button>

            {itineraryList.length !== 0 ? (
                <>
                    {itineraryList.map((itinerary , index) => {
                        return (
                            <div className={'card'}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-1">
                                            <b>{itinerary.day}</b>
                                        </div>
                                        <div className="col-9">
                                            <b>{itinerary.place}</b> <br/>
                                            <p>
                                                {htmlToReactParser.parse(itinerary.description)}
                                            </p>
                                        </div>
                                        <div className="col-2">
                                            <button onClick={() => {
                                                let res = []
                                                for(let i = 0 ; i < itineraryList.length ; i ++){
                                                    if(i !== index){
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

export default  Itinerary;