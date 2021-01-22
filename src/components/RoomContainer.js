// import React from 'react'                //CONTEXT USING function
// import RoomFilter from './RoomFilter';
// import RoomList from './RoomList';
// import {RoomConsumer} from '../context';
// import Loading from '../components/Loading';

// export default function RoomContainer() {
//     return (
        
//         <RoomConsumer>
//             {
//                 (value)=>{
//                     const{loading,sortedRooms,rooms}=value;
//                     if(loading)
//                     {
//                         return <Loading />
//                     }
//                     return(<div>
//                         Hello from rooms container
//                         <RoomFilter rooms={rooms}/>
//                         <RoomList rooms={sortedRooms}/>
//                     </div>)
//                 }
//             }
//         </RoomConsumer>
        
        
//     )
// }

import React from 'react';
import RoomsFilter from './RoomFilter';
import RoomsList from './RoomList';
import {withRoomConsumer} from '../context';
import Loading from '../components/Loading';

function RoomContainer({context})
{
    const{loading,sortedRooms,rooms}=context;
                if(loading)
                {
                    return <Loading />
                }
                return(
                <>
                    <RoomsFilter rooms={rooms}/>
                    <RoomsList rooms={sortedRooms}/>
                </>

                    );

}

export default withRoomConsumer(RoomContainer);

