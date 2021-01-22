import React, { Component } from 'react'
import items from './data';
import Client from './Contentful';



const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type:'all',
        capacity:1,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false,
        
    };
    getData=async ()=>{
        try{
            let response= await Client.getEntries({content_type:"beachResortRoom",order:"fields.capacity"});
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice=Math.max(...rooms.map(item=>item.price));
            let minPrice=Math.min(...rooms.map(item=>item.price))
            let maxSize=Math.max(...rooms.map(item=>item.size));
            let minSize=Math.min(...rooms.map(item=>item.size));

            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price:maxPrice,
                minPrice,
                maxPrice,
                maxSize,
                minSize
            });
            }
        catch(error)
        {
            console.log(error);
        }
    }
    componentDidMount() {
        
        this.getData();
    };

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields, images, id };
            return room;

        })
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room =>room.slug === slug);
        return room; 
    }

    handleChange=event=>{
        const target=event.target;
        const value=target.type==='checkbox' ? target.checked : target.value;
        const name=event.target.name;
        this.setState({
            [name]:value
        },this.filterRooms);

    }

    filterRooms=()=>{
        let{rooms,type,capacity,price,maxPrice,minSize,maxSize,breakfast,pets}=this.state;
        //all the rooms
        let tempRooms=[...rooms];
        //transform value
        capacity=parseInt(capacity);
        price=parseInt(price);

        //filter by type
        if(type!=='all'){
            tempRooms=tempRooms.filter(item => item.type === type);
        }

        //filter by capacity 
        if(capacity!==1){
            tempRooms=tempRooms.filter(item => item.capacity >= capacity);
        }

        //filter by price
        
            tempRooms=tempRooms.filter(item => item.price <= price);
        
            tempRooms=tempRooms.filter(item => item.size >= minSize && item.size<=maxSize);
            
        //filter by extras

            if(breakfast){
            tempRooms=tempRooms.filter(item => item.breakfast);

            }
            
            if(pets){
            tempRooms=tempRooms.filter(item => item.pets);

            }
        this.setState({
            sortedRooms:tempRooms
        })
    }
    render() {
        return ( < RoomContext.Provider value = {
                {...this.state ,getRoom:this.getRoom,handleChange:this.handleChange }} > 
                { this.props.children } 
                </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>{
        value=> <Component {...props} context={value} />
        }</RoomConsumer>
    }
}


export { RoomProvider, RoomConsumer, RoomContext };