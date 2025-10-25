require('dotenv').config({path: __dirname + '/.env'})
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { createClient } = require('@supabase/supabase-js')

// Use environment variables for Supabase credentials with fallback
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mbaaissbqqemmeibiodz.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iYWFpc3NicXFlbW1laWJpb2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzAwODAsImV4cCI6MjA3NTk0NjA4MH0.eHwaL0uyYiIM2HziN7S8-GBnjcpHRMBhUvofoWH6uZw'

console.log('Environment:', process.env.NODE_ENV);
console.log('Supabase URL configured:', SUPABASE_URL ? 'Yes' : 'No');

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const app = express();

// Session configuration for Vercel serverless
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'match-hub-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

// Middleware to pass user session to all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.isAdmin = req.session.isAdmin || false;
  next();
});



// 1. Rendering Files
app.get("/details", (req, res) => {
  res.render('details', { event: {}, currentUser: req.session.user || null })
});





app.get("/", async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('events').select('*')
    if (error) {
      console.log('Supabase error:', error);
      res.render("index", { event: [], currentUser: req.session.user || null });
    } else {
      res.render("index", { event: data, currentUser: req.session.user || null });
    }
  } catch (err) {
    console.error('Route error:', err);
    next(err);
  }
});
app.get("/loginUser", (req, res) => {
  res.render('login', { currentUser: req.session.user || null })
});
app.get("/registerUser", (req, res) => {
  res.render('signup', { currentUser: req.session.user || null })
});
app.get("/contactUs", (req, res) => {
  res.render('contact', { currentUser: req.session.user || null })
})
app.post("/submitContact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    // You can store contact messages in Supabase if you have a contacts table
    // For now, we'll just log it and redirect back
    console.log('Contact Form Submission:', { name, email, subject, message });
    
    // Redirect back to contact page with success
    res.redirect('/contactUs');
  } catch (error) {
    console.error('Contact form error:', error);
    res.redirect('/contactUs');
  }
})
app.get("/about", (req, res) => {
  res.render('about', { currentUser: req.session.user || null })
})
app.get("/checkevents", async (req, res) => {
  const { data, error } = await supabase.from('events').select('*')
  if (error) {
    console.log(error);
    res.render("events", { event: [], currentUser: req.session.user || null });
  } else {
    res.render("events", { event: data, currentUser: req.session.user || null });
  }
})
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
})




//admindashboard
app.get("/admindashboard", (req, res) => {
  res.sendFile(__dirname + "/adminDashboard.html");
})
//admin module files
app.get("/addEvent", async (req, res) => {
  res.sendFile(__dirname + "/newevent.html");
})
// admin updating part
app.post("/updateEvent/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', req.params.id)
      .single()
    
    if (error) {
      res.json({ message: error.message });
    } else {
      console.log(data);
      res.render('updateEvent', { data: data, currentUser: req.session.user || null })
    }
  } catch (err) {
    res.json({ message: err });
  }
})
app.get("/viewevents", async (req, res) => {
  const { data, error } = await supabase.from('events').select('*')
  if (error) {
    console.log(error);
    res.render("adminViewEvents", { event: [], currentUser: req.session.user || null });
  } else {
    res.render("adminViewEvents", { event: data, currentUser: req.session.user || null });
  }
})

//2. CRUD OPERATIONS

//create
app.post("/create", async (req, res) => {
  console.log(req.body);
  
  const eventData = {
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
    time: req.body.time,
    mode: req.body.mode,
    datestart: req.body.dateStart,
    dateend: req.body.dateEnd,
    venue: req.body.venue,
    eventcategory: req.body.category,
    registerationfee: req.body.registerationFee,
    cashprice: req.body.cashPrice,
    contact: req.body.contact
  };

  try {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      
    if (error) {
      res.json({ message: error.message });
    } else {
      res.redirect("/viewevents");
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//show all events for clients
app.get("/showAllEvents", async (req, res) => {
  try {
    const { data, error } = await supabase.from('events').select('*')
    
    if (error) {
      res.json({ message: error.message });
    } else {
      res.render("showevent", { event: data, currentUser: req.session.user || null });
    }
  } catch (err) {
    res.json({ message: err });
  }
});


app.get("/fetchdetails/:id", async function(req,res){
  try{
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', req.params.id)
      .single()
    
    if (error) {
      res.json({ message: error.message });
    } else {
      res.render("details",{event:data, currentUser: req.session.user || null})
    }
  }
  catch(err){
    res.json({ message: err });
  }
});

//read
app.get("/events/:eventId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', req.params.eventId)
      .single()
    
    if (error) {
      res.json({ message: error.message });
    } else {
      res.render("details", { event: data, currentUser: req.session.user || null })
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//update
app.post("/events/:eventId", async (req, res) => {
  const {
    name,
    description,
    photo,
    time,
    mode,
    dateStart,
    dateEnd,
    venue,
    category,
    registerationFee,
    cashPrice,
    contact
  } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('events')
      .update({
        name,
        description,
        photo,
        time,
        mode,
        datestart: dateStart,
        dateend: dateEnd,
        venue,
        eventcategory: category,
        registerationfee: registerationFee,
        cashprice: cashPrice,
        contact
      })
      .eq('id', req.params.eventId)
      .select()

    if (error) {
      res.json({ message: error.message });
    } else if (!data || data.length === 0) {
      res.json({ message: "Event not found" });
    } else {
      res.redirect("/viewevents");
    }
  } catch (err) {
    res.redirect("/viewevents");
  }
});

//delete
app.post("/deleteEvents/:eventId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', req.params.eventId)
    
    if (error) {
      res.json({ message: error.message });
    } else {
      res.redirect("/viewevents")
    }
  } catch (err) {
    res.json({ message: err });
  }
});

// User Registering for an event + Payments
app.post("/testing", async(req,res)=>{
  const registrationData = {
    name: req.body.name,
    email: req.body.email,
    phnumber: req.body.mobile,
    year: req.body.yos,
    event: req.body.events,
    amount: req.body.amount,
    transactionid: req.body.transactionid
  }

  try{
    const { data, error } = await supabase
      .from('event_registrations')
      .insert([registrationData])
    
    if (error) {
      console.log(error);
      res.json({ message: error.message });
    } else {
      res.redirect("/checkevents?success=true")
    }
  }
  catch(err){
    console.log(err);
    res.json({ message: err });
  }
})

// admin view for viewing student Registrations...
app.get("/viewRegistrations", async(req,res)=>{
  try{
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
    
    if (error) {
      console.log(error);
      res.render("adminViewRegistrations", {event: [], currentUser: req.session.user || null});
    } else {
      console.log(data);
      res.render("adminViewRegistrations", {event: data, currentUser: req.session.user || null});
    }
  }catch(err){
    console.log(err);
    res.json({ message: err });
  }
})


// 3.Logins and Register

//Login route started
app.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  
  if (email == process.env.ADMINUSER && password == process.env.ADMINPASSWORD) {
    req.session.isAdmin = true;
    req.session.user = { email: email, role: 'admin' };
    req.session.save((err) => {
      if (err) console.error('Session save error:', err);
      res.redirect("/admindashboard");
    });
  }
  else{
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()
      
      if (error || !data) {
        res.redirect("/registerUser")
      }
      else if (data.password != password) {
        res.write("<div style='margin:auto; align-items:center;margin-top:50px;width:24%;height:15%;padding:10px;'><h1 style='margin-top:4px'>Invalid credentials<br><a href='/loginUser'>Back to Login Page</a></h1></div>")
        res.end();
      }
      else {
        // Store user in session instead of localStorage
        req.session.user = data;
        req.session.save((err) => {
          if (err) {
            console.error('Session save error:', err);
          }
          res.redirect("/");
        });
      }
    } catch (err) {
      console.log(err);
      res.redirect("/registerUser")
    }
  }
});
//login route completed

//Register route 
app.post("/register", async function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  
  try {
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (existingUser) {
      res.redirect("/loginUser")
    } else {
      // Create new user
      const { data, error } = await supabase
        .from('users')
        .insert([{
          username: username,
          email: email,
          password: password
        }])
      
      if (error) {
        console.log(error)
        res.json({ message: error.message });
      } else {
        res.redirect("/loginUser")
      }
    }
  } catch (err) {
    console.log(err)
    res.json({ message: err });
  }
})
//register route completed  

//server starting
const PORT = process.env.PORT || 3000;

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
