import React from 'react';
import "./Inventory.css";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';

const usePrevious = (value) => {    
    const prev = useRef(value);
    useEffect( () => {
        prev.current = value;
    },[value])

    return prev.current;
}

const handleAddData = () =>{
//    const product = fakeData[0];
    fetch('http://localhost:4200/addAllProducts',{
        method: 'POST',
        body: JSON.stringify(fakeData),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log("Add Successful ",data))
}
const Inventory = () => {
    const [count,setCount] = useState(0);
    const previous = usePrevious(count);
    return (
        <div>
            <h2>Current Value: {count} ,Previous Value: {previous} </h2>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>
            <hr></hr>
            <button onClick={handleAddData} className="m-3">
                Add Inventory
            </button>
                       
        </div>
    );
};

export default Inventory;