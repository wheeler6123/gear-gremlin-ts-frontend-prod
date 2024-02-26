import React from "react";
import { Item } from "../../types/types";

interface SaveTripParams {
    userId: string;
    tripName: string;
    packedItems: Item[];
    totalWeight: number;
}

interface Props {
    packedItems: Item[];
    handleSaveTrip: (params: SaveTripParams) => void;
    handleCancelClick: () => void;
}

const CreateTripForm: React.FC<Props> = ({packedItems, handleSaveTrip, handleCancelClick }) => {
    const [tripFormData, setTripFormData] = React.useState({
        tripName: '',
        packedItems: [],
        totalWeight: 0,
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        userId: localStorage.getItem('userId')!
    });
    const [totalPackWeight, setTotalPackWeight] = React.useState(0);

    React.useEffect(() => {
        let totalWeight = 0;
        packedItems.forEach((item) => {
            totalWeight += item.weight || 0;
        });
        setTotalPackWeight(totalWeight);
    }, [packedItems]);

    const packWeightConversion = (totalPackWeight: number) => {
        const pounds = (totalPackWeight/16).toFixed(2);
        if(totalPackWeight < 16) {
            return `${totalPackWeight} ounces`;
        } else {
            return `${pounds} pounds`;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (tripFormData.tripName.trim()) {
            handleSaveTrip({userId: tripFormData.userId, tripName: tripFormData.tripName, totalWeight: totalPackWeight, packedItems});
        }
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleCancelClick();
    };


    return (
        <div className='create-trip-form-container card'>
            <div className='card-header'>
                <h5>Plan a New Trip</h5>
            </div>         
            <form className="create-trip-form card-block" onSubmit={handleSubmit}>
                <label htmlFor="name">Trip Name</label>
                <input
                    type="text"
                    name="tripName"
                    id="name"
                    placeholder='Enter a name for the trip'
                    value={tripFormData.tripName}
                    onChange={(e) => setTripFormData({...tripFormData, tripName: e.target.value})}
                />
                <br />
                <p>Packed Items:</p>
                <ul className="packed-items">
                    {packedItems.map((item, i) => (
                        <li key={i} className="packed-item">
                            <span>{item.name}</span>
                            <span>{item.weight} ounces</span>
                        </li>
                    ))}
                </ul>
                <p>Item Count: {packedItems.length} Total Pack Weight: {packWeightConversion(totalPackWeight)}</p>
                <button className='button card-button' type='submit'>Save Trip</button>
                <button className='button card-button' onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateTripForm;