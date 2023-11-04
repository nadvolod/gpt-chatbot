import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchData() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []); // The empty array makes sure useEffect runs only once.

    return (
        <div>
            <h1>Data from Backend</h1>
            <p>{data}</p>
        </div>
    );
}

export default FetchData;
