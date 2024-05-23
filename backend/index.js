const mysql = require('mysql');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const fs = require('fs');
const { promisify } = require('util');



const readFileAsync = promisify(fs.readFile);

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });


module.exports = upload; app.use(cors())
app.use(express.json());
//hotel booking data fetch 
app.get('/fetchBookingData/:email', async (req, res) => {
  const email = req.params.email
  const data = await prisma.bookings.findMany({
    where: {
      email: email
    }
  })
  return res.json(data);
})
//fetching hotel feed back in hotel view page
app.get('/fetchFeedBack/:hotelname', async (req, res) => {
  const hotelName = req.params.hotelname;
 
  const data = await prisma.feedBack.findMany(
    {
      where: {
        hotelName: hotelName
      }
    }
  )
 
  return res.json(data);
})
//room searching

app.put('/roomSearch', async (req, res) => {

  const hotelName = req.body.hotelName
  const roomType = req.body.roomType;
  const data = await prisma.room_list.findMany({
    where: {
      hotel_name: hotelName,
      room_type: roomType,
      status: "open"
    }
  })


  return res.json(data);
})
// hotel booking
app.put('/roomBooking', async (req, res) => {

  const roomId = req.body.roomId
  const hotelid = parseInt(req.body.hotelid)

  const data1 = await prisma.room_list.update({
    where: {
      room_id: roomId
    },
    data: {
      status: "booked"
    }
  })
  const data2 = await prisma.bookings.create({
    data: {
      hotelName: req.body.hotelName,
      checkOut: req.body.checkout,
      checkIn: req.body.checkin,
      email: req.body.email,
      cardName: req.body.cardName,
      cardNumber: req.body.cardNumber,
      expiryDate: req.body.expiryDate,
      cvv: parseInt(req.body.cvv),
      customerAddress: req.body.address,
      customerCity: req.body.city,
      customerPincode: req.body.pin,
      bookingStatus: "booked",
      feedBackStatus: "not given",
      booking_duration: req.body.duration,
      room_id: req.body.roomId,
      price: req.body.price

    }
  })
  const data3 = await prisma.hotel_list.findFirst({
    where:{
      hotelid:hotelid
    },
    select:{
      roomCount:true
    }
  })
  let roomCount = parseInt(data3.roomCount);
  roomCount = roomCount-1;
  if(roomCount === 0 ){
    const updateHotel = await prisma.hotel_list.update({
      where:{
        hotelid:hotelid
      },
      data:{
        status:"booked",
        roomCount:0
      }
    })
  }
  else{
    const updateHotel = await prisma.hotel_list.update({
      where:{
        hotelid:hotelid
      },
      data:{
        roomCount:roomCount
      }
    })
  }
  return res.status(200).json({ success: true });
})
// handleFilter
app.put('/handleFilter', async (req, res) => {

  
  const minPrice = parseInt(req.body.minPrice);
  const maxPrice = parseInt(req.body.maxPrice);
  try {
    const location = req.body.location;
    const guestCount = req.body.guestcount;


    const data = await prisma.hotel_list.findMany({
      where: {
        status: "open",
        location: location,
        guestcount: {
          gte: parseInt(guestCount) // Provide a value for gte argument
        },
        oneroomprice: {
          gte: parseInt(minPrice),
          lte: parseInt(maxPrice)
        }

      }
    });


  

    return res.json(data);
  } catch (error) {
    console.error("Error occurred during search:", error);
    return res.status(500).json({ error: "An error occurred during search" });
  }
});

// dropdown hotel Data fetching 
app.get('/fetchHotel', async (req, res) => {
  try {
    const data = await prisma.hotel_list.findMany({
      distinct: ['hotelname']
    });

    // Extracting unique hotel names from the fetched data
    const uniqueHotelNames = [...new Set(data.map(item => item.hotelname))];




  

    return res.json(uniqueHotelNames);
  } catch (error) {
    console.error("Error occurred during search:", error);
    return res.status(500).json({ error: "An error occurred during search" });
  }
});

// searching button
app.put('/handleSearch', async (req, res) => {
  try {
    const location = req.body.location;
    const roomCount = req.body.roomCount;


    const data = await prisma.hotel_list.findMany({
      where: {
        status: "open",
        location: location,
        roomCount: {
          gte: parseInt(roomCount) // Provide a value for gte argument
        }
      }
    });



    return res.json(data);
  } catch (error) {
    console.error("Error occurred during search:", error);
    return res.status(500).json({ error: "An error occurred during search" });
  }
});


// data updating function

app.put('/handleUpdate/:email', async (req, res) => {
  const email = req.params.email;

  const phone = req.body.phonenumber
  const fname = req.body.fname
  const lname = req.body.lname
  const nationality = req.body.nationality
  const dob = req.body.dob

  try {
    const user = await prisma.customer_details.update({
      where: {
        email: email
      },
      data: {
        fname: fname,
        lname: lname,
        phonenumber: phone,
        nationality: nationality,
        dob: dob
      }
    });

    if (user != null) {
      return res.status(200).json({ success: true });

    }
    return res.status(500).json({ error: "Login failed" });

    // Do something with the user data

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// fetching particular booking data
app.get('/hotelBookingData/:bookingId', async (req, res) => {
  const id = req.params.bookingId
  const data = await prisma.bookings.findFirst(
    {
      where: {
        bookingId: parseInt(id)
      }
    }
  )
  return res.json(data);
})

//fetching profile data in the dashboard
app.get('/fetchProfileData/:email', async (req, res) => {
  const email = req.params.email;
  const data = await prisma.customer_details.findFirst(
    {
      where: {
        email: email
      }
    }
  )
  return res.json(data);
})
// profile data
app.get('/fetchHotelData/:name', async (req, res) => {
  const name = req.params.name;
  const data = await prisma.hotel_list.findFirst(
    {
      where: {
        hotelname: name
      }
    }
  )
  return res.json(data);
})
//feed back submititing
app.put('/feedBackSubmit', async (req, res) => {
  try {
    const data = await prisma.hotel_list.findFirst({
      where: {
        hotelname: req.body.hotel
      },
      select: {
        ratings: true
      }
    });

    let ratings = parseInt(data.ratings);
    console.log(typeof ratings);
    if (ratings === 0) {
     
      ratings = req.body.hotelRating;
    } else {
      ratings = (parseInt(ratings) + parseInt(req.body.hotelRating)) / 2;
    }

    // Update ratings in the hotel_list table
    const hotelRating = await prisma.hotel_list.update({
      where: {
        hotelid: 4
      },
      data: {
        ratings: parseInt(ratings)
      }
    });

    // Create feedback entry
    const user = await prisma.feedBack.create({
      data: {
        hotelName: req.body.hotel,
        hotelRating: parseInt(req.body.hotelRating),
        PlatformRating: parseInt(req.body.platformRating),
        hotelfeedback: req.body.hotelFeed,
        platformfeedback: req.body.platFormFeed,
        bookingId: req.body.bookingId.toString(),
        customerName: req.body.email
      }
    });

    // Update booking status
    const data2 = await prisma.bookings.update({
      where: {
        bookingId: req.body.bookingId
      },
      data: {
        feedBackStatus: "given"
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//particular room data
app.get('/particularRoom/:id', async (req, res) => {
  const id = req.params.id;
  const data = await prisma.room_list.findFirst(
    {
      where: {
        room_id: parseInt(id)
      }
    }
  )
  return res.json(data);
})
// room booking Data
app.get('/roomBookingData/:name', async (req, res) => {
  const name = req.params.name;
  const data = await prisma.bookings.findMany(
    {
      where: {
        hotelName: name
      }
    }
  )
 
  return res.json(data);
})
// room list data
app.get('/roomFetch/:name', async (req, res) => {
  const name = req.params.name;
  const data = await prisma.room_list.findMany(
    {
      where: {
        hotel_name: name
      }
    }
  )
 
  return res.json(data);
})
app.put('/login', async (req, res) => {
  
  const name = req.body.name;
  const pass = req.body.pass;

  // Use the actual username variable instead of hardcoded value
  const username = name

  try {
    const user = await prisma.customer_login.findFirst({
      where: {
        username: username, // Pass the username variable
        pass: pass
      },
    });

    if (user != null) {
      return res.status(200).json({ success: true });

    }
    return res.status(500).json({ error: "Login failed" });

    // Do something with the user data

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//change room booking status
app.put('/changeStatus', async (req, res) => {
 
  const id = req.body.id
  const status = req.body.change

  const data = await prisma.bookings.findFirst({
    where:{
      bookingId:id
    },
    select:{
      room_id:true
    }
  })
  let room_id = parseInt(data.room_id);

  try {
    const user = await prisma.bookings.update({
      where: {
        bookingId: id, // Pass the username variable
      },
      data: {
        bookingStatus: status
      }
    });
    const data1 = await prisma.bookings.findFirst({
      where:{
        bookingId:id
      },
      select:{
        hotelName:true
      }
    })
    let hotelName = data1.hotelName;

    const data2 = await prisma.hotel_list.findFirst({
      where:{
        hotelname:hotelName
      },
      select:{
        hotelid:true,
        roomCount:true,
        status:true
      }
    })
    let hotelid = parseInt(data2.hotelid)
    let roomCount = data2.roomCount
    let hotelStatus = data2.status
    if(status === "check-out"){

    const room = await prisma.room_list.update({
      where:{
        room_id:room_id
      },
      data:{
        status:"open"
      }
    })
      if(roomCount === 0){
        roomCount = roomCount+1;
        const data3 = await prisma.hotel_list.update({
          where:{
            hotelid:hotelid
          },
          data:{
            roomCount:roomCount,
            status:"open"
          }
        })
      }
      else if(roomCount>0){
        roomCount+=1;
        const data3 = await prisma.hotel_list.update({
          where:{
            hotelid:hotelid
          },
          data:{
            roomCount:roomCount
          }
        })
      }
    }

    if (user != null) {
      return res.status(200).json({ success: true });

    }
    return res.status(500).json({ error: "Login failed" });

    // Do something with the user data

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// hotel owner Login
app.put('/OwnerLogin', async (req, res) => {
  
  const name = req.body.name;
  const pass = req.body.pass;

  // Use the actual username variable instead of hardcoded value
  const username = name

  try {
    const user = await prisma.hotel_login.findFirst({
      where: {
        username: username, // Pass the username variable
        pass: pass
      },
    });

    if (user != null) {
      return res.status(200).json({ success: true });

    }
    return res.status(500).json({ error: "Login failed" });

    // Do something with the user data

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// create room
app.put('/createRoom', upload.single('file'), async (req, res) => {
 
  try {
    const data = await prisma.room_list.create({
      data: {
        room_size: req.body.room_size,
        bed_count: req.body.bed_count,
        maximum_duration: req.body.maximum_duration,
        minimum_duration: req.body.minimum_duration,
        price_per_day: req.body.price_per_day,
        amentities: req.body.amentities,
        room_type: req.body.room_type,
        room_images: req.file.originalname,
        status: "open",
        hotel_name: req.body.hotel_name
      }
    })
    return res.status(200).json({ success: true })
  }
  catch (error) {
    console.log(error)
    return res.status(200).json({ success: true })
  }
})

// room edit data

app.put('/roomEdit', upload.single('file'), async (req, res) => {
 
  const fileData = await readFileAsync(req.file.path); // Log the uploaded file to see its structure

  try {
    const roomId = req.body.room_id;
   
    const { originalname, mimetype, buffer } = req.file; // Correctly access file properties

    // Create the file rec
   
    // Update the room_list with the new data
    const updatedItem = await prisma.room_list.update({
      where: { room_id: parseInt(roomId) }, // Parse room ID to integer
      data: {
        room_images: req.file.originalname,
        room_size: req.body.room_size,
        bed_count: req.body.bed_count,
        maximum_duration: req.body.maximum_duration,
        minimum_duration: req.body.minimum_duration,
        price_per_day: req.body.price_per_day,
        amentities: req.body.amentities,
        room_type: req.body.room_type,
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get("/uploads/:room_images", (req, res) => {
 
  const filePath = path.join(__dirname, 'uploads', req.params.room_images);
  
  res.sendFile(filePath);
});
//delete room
app.get('/deleteRoom/:id', async (req, res) => {
  const id = req.params.id
  try {

    const data = await prisma.room_list.delete({
      where: {
        room_id: parseInt(id)
      }
    })
    return res.status(200).json({ success: true })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ success: false })
  }
})
app.get('/fetchFamousHotels', async (req, res) => {
  try {

    const data = await prisma.hotel_list.findMany({
      where: {
        ratings: {
          gte: 3
        }
      },
      take: 5
    })
    
    return res.json(data)
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ success: false })
  }
})
//count
app.listen(5001, () => {

  console.log("Server is running on http://localhost:5001");
});