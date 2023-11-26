console.log("Hall_Booking_Api");

import express from "express";

const app = express();
app.use(express.json());

//Local Variable store

const rooms=[
    {
        roomId: 0,
        roomName: "100",
        noOfSeatsAvailable: "3",
        amenities:["AC","Wifi","TV"],
        pricePerHr: 100,
        bookedStatus: false,
        customerDetails: {
            customerName: "",
            date: "",
            startTime: "",
            endTime: "",
        },
    },
    {
        roomId: 1,
        roomName: "101",
        noOfSeatsAvailable: "2",
        amenities:["swimming","Wifi","TV"],
        pricePerHr: 100,
        bookedStatus: true,
        customerDetails: {
            customerName: "Tharun",
            date: "20/11/2023",
            startTime: "11:00AM",
            endTime: "12:00PM",
        },

    },
    {
        roomId: 2,
        roomName: "102",
        noOfSeatsAvailable: "2",
        amenities:["Projector","AC","Wifi","TV"],
        pricePerHr: 100,
        bookedStatus: true,
        customerDetails: {
            customerName: "Balaji",
            date: "21/11/2023",
            startTime: "10:00AM",
            endTime: "12:00PM",
        },
    },
    {
        roomId: 3,
        roomName: "103",
        noOfSeatsAvailable: "2",
        amenities:["Wifi","TV"],
        pricePerHr: 100,
        bookedStatus: false,
        customerDetails: {
            customerName: "",
            date: "",
            startTime: "",
            endTime: "",
        },
    },
    {
        roomId: 4,
        roomName: "104",
        noOfSeatsAvailable: "2",
        amenities:["colorLight","Wifi","TV"],
        pricePerHr: 100,
        bookedStatus: true,
        customerDetails: {
            customerName: "Pradeep",
            date: "22/11/2023",
            startTime: "12:00PM",
            endTime: "2:00PM",
        },
    },
];

//HOME PAGE
app.get("/",(request,response)=>{
    response.send("Hall BOoking API")
});


//Create Room
app.post("/rooms/create",(request,response)=>{
    const newRoom = request.body
    rooms.push(newRoom)
    response.send(newRoom)
})

//Booking a Room
app.post("/rooms",(request,response)=>{
    const booking = request.body;

    rooms.map((room)=>{
        if(room.roomId == booking.roomId){
            console.log(room);
        if(room.customerDetails.date != booking.date){
            room.customerDetails.customerName = booking.customerName;
            room.customerDetails.date = booking.date;
            room.customerDetails.startTime = booking.startTime;
            room.customerDetails.endTime = booking.endTime;
            room.bookedStatus =! room.bookedStatus;
            response.send("Room Booked Successfully");
        }
        else{
            response.send("Room already Booked")
        }
    }
    return room;
    })
})

//List all Rooms with booked

app.get("/rooms",(request,response)=>{
    response.send(
        rooms.map((room)=>{
            if(room.bookedStatus == true){
                return{
                    "Room name":room.roomName,
                    "Booked Status":"Booked",
                    "Customer Name":room.customerDetails.customerName,
                    "Date":room.customerDetails.date,
                    "startTime":room.customerDetails.startTime,
                    "EndTime":room.customerDetails.endTime,
                }
               }  
                else{
                    return{
                        "Room Name":room.roomName,
                        "Booked Status":"Vacant"
                    }
                }
        })
    )
})

//List all customers with booked data
app.get("/customers", (request,response)=>{
    response.send(
        rooms.filter((room)=>{
            if(room.bookedStatus === true){
                return room;
            }
        })
        .map((room)=>{
            return{
                "customer name": room.customerDetails.customerName,
                "room name": room.roomName,
                "date": room.customerDetails.date,
                "startTime": room.customerDetails.startTime,
                "End Time": room.customerDetails.endTime,
            };
        })
    );
});

app.listen(9002,()=>console.log("Server ", 9002));