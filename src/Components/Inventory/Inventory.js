import React from 'react';
import "./Inventory.css";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const usePrevious = (value) => {    
    const prev = useRef(value);
    useEffect( () => {
        prev.current = value;
        //console.log(value);
    },[value])

    return prev.current;
}
const Inventory = () => {
    const [count,setCount] = useState(0);
    const previous = usePrevious(count);
    return (
        <div>
            <h2>Developer is sleeping</h2> 
            
            <h2>Count: {count} Previous: {previous} </h2>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>
                       
        </div>
    );
};

export default Inventory;