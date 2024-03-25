import React, { useState } from "react";
import useTable from "../../hooks/useTable";
import TableFooter from "./TableFooter";
import { Item } from "../../types/types";
import { Trip } from "../../types/types";

type ResponseData = Trip[];

interface Props {
    trips: ResponseData | undefined;
    perPage: number;
    setPlanTrip: React.Dispatch<React.SetStateAction<boolean>>;
    onTripClick: (tripId: string) => void;
    handleDeleteTrip?: (tripId: string) => void;
}

const TripTable: React.FC<Props> = ({ trips, perPage, setPlanTrip, onTripClick, handleDeleteTrip }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(trips || [], page, perPage);

    const packWeightConversion = (totalPackWeight: number) => {
        const pounds = (totalPackWeight / 16).toFixed(2);
        if (totalPackWeight < 16) {
            return `${totalPackWeight} ounces`;
        } else {
            return `${pounds} pounds`;
        }
    };        
    

    return (
        <div className="col-xl-12">
            <div className="card">
                <div className="card-header">
                    <h5>My Saved Trips</h5>
                </div>
                <div className="card-block table-border-style">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Trip Name</th>
                                    <th>Number of Items</th>
                                    <th>Total Pack Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slice.map((trip, i) => (
                                    <tr key={i}
                                        id='trip-table-row'
                                        onClick={() => onTripClick(trip._id)}
                                    >
                                        <th id="trip-table-trip-name">
                                            {trip.name}
                                        </th>
                                        <td id="trip-table-item-count">
                                            {trip.items.length}
                                        </td>
                                        <td id="trip-table-total-pack-weight">
                                            {packWeightConversion(trip.totalWeight)}
                                        </td>
                                         <td id="trip-table-delete-button">
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTrip && handleDeleteTrip(trip._id)}>Delete</button>
                                        </td>                                      
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <TableFooter
                            range={range}
                            slice={slice}
                            page={page}
                            setPage={setPage}
                        />
                        <button className='button card-button' onClick={() => setPlanTrip(true)}>Plan a new trip</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TripTable;