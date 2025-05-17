"use client"
import { useEffect, useState } from 'react';
import axsios from 'axios';

const baseUrl = 'http://localhost:8080';

export default function Public(){

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("calling public api endpoint");
        axsios.get(baseUrl + '/public')
        .then((response) => {
            console.log(response);
            setData(response.data);
        })
    }, []);

  return (
    <div>
      <h1>Public</h1>
      <p>{data}</p>
    </div>
  )
}