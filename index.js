const express = require('express');
var jwt = require('jsonwebtoken');
let privateKey='privateKey';
const app = express();
const port =  5000;
const cors = require('cors');
app.use(cors());

app.use(cors());
app.use(express.json());

const { MongoClient } = require('mongodb');
const objectId = require('mongodb').ObjectId;


//8LIUZAQKvmtjOFWR   //  zembargo

const uri = 'mongodb+srv://zembargo:8LIUZAQKvmtjOFWR@cluster0.smwb1.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);
async function run() {
    try {
        await client.connect();
        console.log('mongoDB Connected');
        const databaseuser = client.db("myFirstDatabase");
        const usersdata = databaseuser.collection("newUsers");

        const database = client.db("zembargo");
        const HomeHeader = database.collection("HomeHeader");
        const Homeabout = database.collection("HomeAbout");
        const Homeservice = database.collection("Homeservice");
        const HomeReliability = database.collection("HomeReliability");
        const HomeAreacoverag = database.collection("AreaCoverag");
        const servicehead = database.collection("ServiceHead");
        const services = database.collection("Services");
        const serviceSingle = database.collection("ServicSingle");
        const aboutus = database.collection("About Us");
        const aboutHeader = database.collection("AboutHeader");
        const Faqpage = database.collection("Faq");
        const Contact = database.collection("Contact");
        const Booking = database.collection("Booking");
        //register api
        app.post('/register',async (req,res)=>{
            const data=req.body;
            let curser={
                name:data.name,
                email:data.email,
                userPic:data.userPic,
                password:data.password,
                
            }
            const result = await usersdata.insertOne(curser);
            res.send(result);
        })
        //login api
        app.post('/login',async (req,res)=>{
            const data=req.body;
            const curser={
                email:data.email,
                password:data.password
            }
            const unvallid={
                error:'! pleas give a vallid name or password.'
            }
            const loginUser = await usersdata.findOne(curser);
             let token =jwt.sign({ loginUser }, privateKey);
             loginUser.token=token;
            if(loginUser==null){
                res.send(unvallid);
            }
             else{
                res.send(loginUser);
             }
           
            
        })

        // app.post('/api/users', async (req, res) => {
        //     let { name, email, phone, pic, location, bio, gender, password } = req.body;
        //     // console.log(name)
        //     email = email?.toLowerCase();
        //     // console.log(req.body)
        //     const salt = await bcrypt.genSalt(10);
        //     // now we set user password to hashed password
        //     password = await bcrypt.hash(password, salt);
        //     const emailCheck = await usersdata.findOne({ email });
        //     if (emailCheck) {
        //         res.json({ "message": "user already exists!" })
        //     } else {
        //         if (password) {
        //             const user = {
        //                 name, email,
        //                 phone: phone || 'null',
        //                 pic,
        //                 location: location || 'null',
        //                 bio: bio || 'null',
        //                 gender: gender || 'null',
        //                 password,
        //                 isAdmin: false, createdAt: new Date()
        //             };
        //             const result = await usersdata.insertOne(user);
        //             let cuurentUser;
        //             if (result) {
        //                 const userCreated = await usersdata.findOne({ email });
        //                 cuurentUser = {
        //                     _id: userCreated._id,
        //                     name: userCreated.name,
        //                     email: userCreated.email,
        //                     phone: userCreated.phone,
        //                     pic: userCreated.pic,
        //                     location: userCreated.location,
        //                     bio: userCreated.bio,
        //                     gender: userCreated.gender,
        //                     password: userCreated.password,
        //                     isAdmin: userCreated.isAdmin,
        //                     createdAt: userCreated.createdAt,
        //                     user: userCreated._id,
        //                     token: generateToken(userCreated._id)
        //                 };
        //             }
        //             res.json(cuurentUser)
        //         }
        //     }
        // })
        // app.put('/api/user/change-password', async (req, res, next) => {
        //     let { oldPassword, password, password2, email } = req.body;
        //     email = email?.toLowerCase();
        //     if (password !== password2) {
        //         res.json({ "message": "do not match password" })
        //         return;
        //     }
        //     const salt = await bcrypt.genSalt(10);
        //     password = await bcrypt.hash(password, salt);
        //     const user = await usersdata.findOne({ email });
        //     if (!user) {
        //         res.json({ "message": "user do not exists!" })
        //         return;
        //     }
        //     oldPassword = await bcrypt.compare(oldPassword, user.password);
        //     if (!oldPassword) {
        //         res.json({ "message": "password do not match!" });
        //         return;
        //     } else {
        //         const options = { upsert: true };
        //         const filter = { email };
        //         // console.log(filter);
        //         const updateDoc = {
        //             $set: {
        //                 password: password,
        //             },
        //         };
        //         const result = await usersdata.updateOne(filter, updateDoc, options);
        //         res.json(result);
        //     }
        // })


        // app.post('/api/user/login', async (req, res) => {
        //     let { password, email } = req.body;
        //     // console.log(email)
        //     email = email?.toLowerCase();
        //     // console.log(password, email)
        //     const user = await usersdata.findOne({ email });
        //     if (!user) {
        //         const newLocal = 401;
        //         return res.status(newLocal).json({ error: "User does not exist" });
        //     }
        //     password = await bcrypt.compare(password, user.password);
        //     if (!password) {
        //         return res.status(400).json({ error: "Invalid Password or Email" });
        //     } else {
        //         cuurentUser = {
        //             _id: user._id,
        //             name: user.name,
        //             email: user.email,
        //             phone: user.phone,
        //             pic: user.pic,
        //             location: user.location,
        //             bio: user.bio,
        //             gender: user.gender,
        //             password: user.password,
        //             isAdmin: user.isAdmin,
        //             createdAt: user.createdAt,
        //             user: user._id,
        //             token: generateToken(user._id)
        //         }
        //         res.status(200).json(cuurentUser)
        //     }

        // })

        // app.post('/forget-password', async (req, res) => {
        //     let { email } = req.body;
        //     if (!email) {
        //         res.json({ "error": "please inser a email" })
        //     }
        //     email = email?.toLowerCase();
        //     // console.log(email)
        //     const userExists = await usersdata.findOne({ email });
        //     // console.log(userExists)
        //     if (!userExists) {
        //         res.status(400).json({ "message": "user does not exist" });
        //         return;
        //     } else {
        //         const token =genTokenDay(userExists._id);
        //         const link = `http://localhost:5000/reset-password/${userExists._id}/${token}`;
        //         //mail sending
        //         const mailOptions = {
        //             from: process.env.SERVICE_EMAIL,
        //             to: `${userExists.email}`,
        //             subject: `Dear, ${userExists.name} password reset link`,
        //             text: `
        //             <div>
        //             <h5>Password reset link: ${link}</h5>
        //             </div>
        //         `
        //         }
        //         await transporter.sendMail(mailOptions, async function (error, data) {
        //             if (error) {
        //             } else {

        //             }
        //         })
        //     }
        //     res.json({ "message": "email sending..." })
        // })

        // app.put('/reset-password/:id/:token', protectFind, async (req, res, next) => {
        //     const { user } = req;
        //     let { password, password2 } = req.body;
        //     if (!password) {
        //         res.json({ "message": "please insert a password and try again!" });
        //         return;
        //     }
        //     if (!(password === password2)) {
        //         return res.json({ "message": "password do not match" });;
        //     } else {
        //         const salt = await bcrypt.genSalt(10);
        //         // now we set user password to hashed password
        //         password = await bcrypt.hash(password, salt);
        //         try {
        //             if (user && password) {
        //                 const options = { upsert: true };
        //                 const filter = { _id: objectId(user._id) };
        //                 const updateDoc = {
        //                     $set: {
        //                         password: password,
        //                     },
        //                 };
        //                 const result = await usersdata.updateOne(filter, updateDoc, options);
        //                 return res.json({ "message": "password successfully updated", result });
        //             }
        //         } catch (error) {
        //             res.json(error.message)

        //         }

        //         res.json({ "message": "invalid token" })
        //     }
        // })





        //all user data getting==============
        app.get('/allusers', async (req, res) => {
            const curser = usersdata.find({})
            const result = await curser.toArray();
            res.send(result);
        })
        // Users information update
        app.put('/manegeuser/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const data = req.body;
            const curser = {
                name: data.name,
                phone: data.phone,
                email: data.email,
                location: data.location,
                gender: data.gender,
            }
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await usersdata.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        //header section
        app.get('/homehead', async (req, res) => {
            const curser = HomeHeader.find({})
            const result = await curser.toArray();
            res.send(result);
        })

        //home header section update
        app.put('/homeheadupdate/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const data = req.body;
            const curser = {
                title: data.title,
                des: data.des,
                subtitle: data.subtitle,
            }
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await HomeHeader.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //about section
        app.get('/homeabout', async (req, res) => {
            const curser = Homeabout.find({})
            const result = await curser.toArray();
            res.send(result);
        })

        //home about data update
        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const data = req.body;
            const curser = {
                title: data.title,
                des: data.des,
                img: data.img,
                subtitle: data.subtitle,
                phone: data.phone,
                li_0: data.li_0,
                li_1: data.li_1,
                li_2: data.li_2,
                li_3: data.li_3,
                li_4: data.li_4,
                li_5: data.li_5,

            }
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await Homeabout.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //service section
        app.get('/homeservice', async (req, res) => {
            const curser = Homeservice.find({})
            const result = await curser.toArray();
            res.send(result);
        })
        //Reliability section
        app.get('/homeHomeReliability', async (req, res) => {
            const curser = HomeReliability.find({})
            const result = await curser.toArray();
            res.send(result);
        })

        //home Raliability data update
        app.put('/homeReaoy/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const data = req.body;
            const curser = {
                title: data.title,
                des: data.des,
                img: data.img
            }
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await HomeReliability.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //area covarage sectin
        app.get('/homeArea', async (req, res) => {
            const curser = HomeAreacoverag.find({})
            const result = await curser.toArray();
            res.send(result);
        })

        //home area coverage data update
        app.put('/homeArea/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const data = req.body;
            const curser = {
                title: data.title,
                des: data.des,
                img: data.img,
                li_0: data.li_0,
                li_1: data.li_1,
                li_2: data.li_2,
                li_3: data.li_3,
                li_4: data.li_4,
                li_5: data.li_5,

            }
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await HomeAreacoverag.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        //service page data getting=======================

        //service header data
        app.get('/servicehead', async (req, res) => {
            const curser = servicehead.find({})
            const result = await curser.toArray();
            res.send(result);
        })
        //service header section update
        app.put('/serviceheaderUpdate/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const data = req.body;
            const curser = {
                title: data.title,
                des: data.des,
                subtitle: data.subtitle,
                img: data.img,
            }
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await servicehead.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //service all data
        app.get('/services', async (req, res) => {
            const curser = services.find({})
            const result = await curser.toArray();
            res.send(result);
        })

        //dashboard service id filltering getting
        app.get("/edite/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const result = await services.findOne(filter)
            res.send(result)
        })

        //service data update api
        app.put("/update/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const order = req.body;
            console.log(order);
            const curser = {
                title: order.title,
                des: order.des,
                icon: order.icon,
                img: order.img,
                title2: order.title2,
                des2: order.des2,
                icon2: order.icon2,
                img2: order.img2,
            };
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await services.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        ///service single page create api
        app.post('/servicsingleCreate', async (req, res) => {
            const curser = req.body;
            const result = await serviceSingle.insertOne(curser)
            res.send(result);
        })
        //service single page all data
        app.get('/servicsingle', async (req, res) => {
            const curser = serviceSingle.find({})
            const result = await curser.toArray();
            res.send(result);
        })

        ///servie single page fileter by id
        app.put("/singlepage/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const result = await serviceSingle.findOne(filter);
            res.send(result);
        })
        //About us page data get=======================


        //about header section
        app.get('/aboutheader', async (req, res) => {
            const curser = aboutHeader.find({})
            const result = await curser.toArray();
            res.send(result);
        })
        //about header section update
        app.put('/aboutheaderUpdate/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const data = req.body;
            const curser = {
                title: data.title,
                des: data.des,
                subtitle: data.subtitle,
                img: data.img,
            }
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await aboutHeader.updateOne(filter, updateDoc, options);
            res.send(result);
        })


        //about all data
        app.get('/about', async (req, res) => {
            const curser = aboutus.find({})
            const result = await curser.toArray();
            res.send(result);
        })
        //dashboard about  id filltering getting
        app.get("/aboutedite/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const result = await aboutus.findOne(filter)
            res.send(result)
        })

        //about us data update api
        app.put("/aboutUpdate/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const order = req.body;
            const curser = {
                title: order.title,
                des: order.des,
                img: order.img,
                title2: order.title2,
                des2: order.des2,
                img2: order.img2,
            };
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await aboutus.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        //contact pages========================
        app.get('/contact', async (req, res) => {
            const curser = Contact.find({})
            const result = await curser.toArray();
            res.send(result);
        })
        app.put("/contact/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const order = req.body;
            const curser = {
                title: order.title,
                des: order.des,
                number: order.number,
                email: order.email,
                address: order.address,
                location: order.location,
            };
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await Contact.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        //Faq question page data get===================
        app.get('/faq', async (req, res) => {
            const curser = Faqpage.find({})
            const result = await curser.toArray();
            res.send(result);
        })
        //Faq question added data post
        app.post('/data', async (req, res) => {
            const faq = req.body;
            const result = await Faqpage.insertOne(faq);
            res.send(result)
        })
        //booking data insert=======================

        app.post('/booking', async (req, res) => {
            const curser = req.body;
            const result = await Booking.insertOne(curser)
            console.log('bookin', result);
            res.send(result);
        })
        //booking data getting
        app.get('/booking', async (req, res) => {
            const curser = Booking.find({})
            const result = await curser.toArray();
            console.log('booking', result);
            res.send(result);
        })

        //booking update
        app.put('/manegebook/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const data = req.body;
            const curser = {
                name: data.name,
                number: data.number,
                email: data.email,
                quantity: data.quantity,
                collectionPascode: data.collectionPascode,
                deliveryPascode: data.deliveryPascode,
                vehicle: data.vehicle,
                status: data.status
            }
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await Booking.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        //Quate histry update
        app.put('/manegequate/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: objectId(id) }
            const data = req.body;
            const curser = {
                platform: data.platform,
                miles: data.miles,
                expactime_date: data.expactime_date,
                collectionPascode: data.collectionPascode,
                deliveryPascode: data.deliveryPascode,
                vehicle: data.vehicle,
                status: data.status
            }
            const options = { upsert: true };
            const updateDoc = { $set: curser };
            const result = await Booking.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        /// make Admin=============================5
        app.put("/admin", async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const updateDoc = { $set: { isAdmin: true } };
            const result = await usersdata.updateOne(filter, updateDoc);
            res.send(result);
        })


    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('i am from server')
})
// module.exports = router;
// app.use(errorHandler)
app.listen(port, () => {
    console.log('server ready to port', port);
})
