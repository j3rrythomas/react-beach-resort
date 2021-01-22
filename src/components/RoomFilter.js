import React from 'react'
import {useContext} from 'react';
import {RoomContext} from '../context';
import Title from './Title';

//get all unique values
const getUnique=(items,value)=>{
    return[...new Set(items.map(item=>item[value]))].sort();
}

export default function RoomFilter({rooms}) {
    const context=useContext(RoomContext);
    const {handleChange,type,capacity,price,maxPrice,minPrice,minSize,maxSize,breakfast,pets}=context;

    //get unique types
    let types=getUnique(rooms,'type');
    types=['all',...types]; //add all type
    // console.log(types);
    types=types.map((item,index)=>{
        return <option value={item} key={index}>{item}</option>
    })

    let people=getUnique(rooms,'capacity');
    people=people.map((item,index)=>{
        return <option value={item} key={index}>{item}</option>
    })

    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
            {/* select type */}
            <div className="form-group">
                <label htmlFor="type">room type</label>
                <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>                    
                    {types}
                </select>
            </div>
            {/* end select type */}
            {/* guest */}
            <div className="form-group">
                <label htmlFor="capacity">guests</label>
                <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>                    
                    {people}
                </select>
            </div>
            {/* end guest*/}
            {/* room price*/}
            <div className="form-group">
                <label htmlFor="price">room price ${price}</label>
                <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control" />
            </div>
            {/* end room price*/}
            {/* size price*/}
            <div className="form-group">
                <label htmlFor="size">room size</label>
                <div className="size-inputs">
                    <input type="number" name="minSize" id="size" value={minSize} className="size-input" onChange={handleChange}/>
                    <input type="number" name="maxSize" id="size" value={maxSize} className="size-input" onChange={handleChange}/>
                </div>
                
            </div>
            {/* end size price*/}
            {/* extras*/}
            <div className="form-group">
                <div className="single-extra">
                    <label htmlFor="breakfast">breakfast</label>
                    <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                </div>
                <div className="single-extra">
                <label htmlFor="pets">pets</label>
                    <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                </div>
                
            </div>
            {/* end extras*/}
            </form>
        </section>
    )
}
