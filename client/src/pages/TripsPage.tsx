import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import { ClipLoader } from "react-spinners";
import readTripsRequest from "../api/readTripsRequest";
import readItemsRequest from "../api/readItemsRequest";
import createTripRequest from "../api/createTripRequest";
import deleteTripRequest from "../api/deleteTripRequest";
import { useMutation, useQuery, useQueryClient } from "react-query";
import TripTable from "../components/Tables/TripTable";
import InventoryTable from "../components/Tables/InventoryTable";
import CreateTripForm from "../components/Forms/CreateTripForm";
import SingleTripDisplay from "../components/SingleTripDisplay";
import { Item } from "../types/types";
import React, { useEffect } from "react";
import { useMatomo } from "@jonkoops/matomo-tracker-react";

interface SaveTripParams {
    userId: string;
    tripName: string;
    packedItems: Item[];
    totalWeight: number;
}

const TripsPage: React.FC = () => {
    const { trackPageView } = useMatomo();

    // Track page view
    useEffect(() => {
        trackPageView()
    }, []);
    
    const queryClient = useQueryClient();

    const { isLoading: isLoadingTrips, data: trips } = useQuery("trips", () =>
        readTripsRequest()
    );
    const [planTrip, setPlanTrip] = React.useState(false);
    const { isLoading: isLoadingItems, data: items } = useQuery("items", () =>
        readItemsRequest()
    );
    const [packedItems, setPackedItems] = React.useState<Item[]>([]); 
    const [selectedTripId, setSelectedTripId] = React.useState<string | null>(null);
    const [showSingleTrip, setShowSingleTrip] = React.useState(false);

    const handlePackedItemChange = (item: Item) => {
        setPackedItems((prevItems) => {
            const isItemInList = prevItems.some((prevItem) => prevItem._id === item._id);

            if (isItemInList) {
                // Remove the item from the list
                return prevItems.filter((prevItem) => prevItem._id !== item._id);
            } else {
                // Add the item to the list
                return [...prevItems, item];
            }
        });
    };

    const deleteTripMutation = useMutation(deleteTripRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries('trips');
        }
    });

    const handleDeleteTrip = async (tripId: string) => {
        if (tripId == "6601c10216ee4af0e40dafde"){
            alert('This trip is part of the demo and cannot be deleted.');
            return;
        }
        if (window.confirm('Are you sure you want to delete this trip?')) {
            await deleteTripMutation.mutateAsync(tripId);
        }
        if(showSingleTrip) {
            setShowSingleTrip(false);
        }
    }

    const handleTripClick = (tripId: string) => {
        setSelectedTripId(tripId);
        setShowSingleTrip(true);
    };

    const handleCancelClick = () => {
        setPlanTrip(false);
        setPackedItems([]);
    };

    const handleSaveTrip = async ({ userId, tripName, packedItems, totalWeight }: SaveTripParams) => {

        await createTripRequest( userId, tripName, packedItems, totalWeight );

        queryClient.invalidateQueries('trips');

        setPlanTrip(false);
        setPackedItems([]);
    };

    return (
        <div>
            <Navbar />
            <MobileNavbar className='mobile-navbar-component' />
            <div className="trips-page-container">
                {isLoadingTrips ? (
                    <ClipLoader color="#4A90E2" loading size={150} />
                ) : (
                    <section className="main-container">
                        <div className="trips-table-container">
                            <TripTable 
                                trips={trips} 
                                perPage={5} 
                                setPlanTrip={setPlanTrip} 
                                onTripClick={handleTripClick} 
                                handleDeleteTrip={handleDeleteTrip}/>
                        </div>
                        {selectedTripId && showSingleTrip && <div className="card single-trip-card"><SingleTripDisplay tripId={selectedTripId} setShowSingleTrip={setShowSingleTrip}/></div>}
                        {planTrip && (
                            <div className="inventory-container">
                                {isLoadingItems ? (
                                    <ClipLoader color="#4A90E2" loading size={150} />
                                ) : (
                                    <InventoryTable
                                        items={items}
                                        perPage={5}
                                        isDeleteColumnVisible={false}
                                        addPackedItem={handlePackedItemChange}
                                        packedItems={packedItems}
                                    />
                                )}
                            </div>
                        )}
                        {planTrip && <CreateTripForm packedItems={packedItems} handleSaveTrip={handleSaveTrip} handleCancelClick={handleCancelClick}/>}
                    </section>
                )}
            </div>
        </div>
    )
}

export default TripsPage;