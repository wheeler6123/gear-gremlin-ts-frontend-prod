import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import readSingleTripRequest from '../api/readSingleTripRequest';
import html2pdf from 'html2pdf.js';
import '../assets/css/PdfExport.css'

interface SingleTripDisplayProps {
    tripId: string;
    setShowSingleTrip: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleTripDisplay: React.FC<SingleTripDisplayProps> = ({tripId, setShowSingleTrip}) => {
    const { isLoading, data: trip } = useQuery(['trip', tripId], () => readSingleTripRequest(tripId));
    const [elements, setElements] = useState<JSX.Element[] | null>(null);


    useEffect(() => {
        if (trip) {
            const itemsArray = trip.data.items;

            const newElements = itemsArray.map((item, index) => (
                <div className='planner-list-item' key={item._id || index}>
                    <span className='single-trip-item-name'>{item.name}</span>
                    <span className='single-trip-item-weight'>{`${item.weight} oz`}</span>
                </div>
            ));

            setElements(newElements);
        }
    }, [trip]);

    const packWeightConversion = (totalPackWeight: number) => {
        const pounds = (totalPackWeight / 16).toFixed(2);
        if (totalPackWeight < 16) {
            return `${totalPackWeight} ounces`;
        } else {
            return `${pounds} pounds`;
        }
    };

    const exportToPDF = () => {
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        const element = document.querySelector('#pdf')!;
        const opt = {
            margin: 1,
            filename: 'mytrip.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        element.classList.add('pdf-export');

        setTimeout(() => {
            html2pdf().set(opt).from(element).save().then(() => element.classList.remove('pdf-export'));
        }, 500);
    };

    return (
        <div>
            <div id='pdf' className="single-trip-display">
                {trip && <div className="card-header"><h5>View a single trip: {trip.data.name}</h5></div>}
                <div className="card-block">
                    {isLoading ? (
                        <p>Loading items...</p>
                    ) : elements ? (
                        elements
                    ) : (
                        <p>Add some gear to your pack by clicking the checkbox next to the item to mark it packed</p>
                    )}
                    {trip && <div className="total-weight">{`Your total pack weighs: ${packWeightConversion(trip.data.totalWeight)}`}</div>}
                    <br />
                    <button className='button card-button trip-table-button' onClick={exportToPDF}>Export to PDF</button>
                    <button className='button card-button trip-table-button' onClick={() => setShowSingleTrip(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default SingleTripDisplay;