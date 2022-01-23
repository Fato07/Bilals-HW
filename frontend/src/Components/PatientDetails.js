import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {

    let params = useParams();

    const [currentPatient, setCurrentPatient] = useState({})

    useEffect(() => {
        //here make an API Request to fetch the patient details of patientID that === params.id
        //set the state to currentPatient state

    }, []);
    

    return (
        <div>
            <h1>This is Patient Details for patient with Id = { params.id } </h1>
            {/* Render The current Patient here */}
        </div>
    )

};

export default PatientDetails;
