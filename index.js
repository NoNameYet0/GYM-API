const express = require('express');
const dbConnection = require("./config/database");
const dotenv = require("dotenv");

const errorHandler = require("./middlewares/error.middleware.js");
const routes = require('./utils/routes');
const { authenticate } = require('./middlewares/authenticate.js');
const authorizeRole = require('./middlewares/authorize.middleware.js');


dotenv.config();

//connect to databse
dbConnection();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res)=> {
    res.send("Welcome to GYM API!")
})

app.use('/api/auth', routes.authRoutes);

app.use(authenticate);

app.use('/api/equipment', routes.equipmentRoutes);
app.use('/api/store', routes.storeRoutes);
app.use('/api/salesHistory', routes.salesHistoryRoutes);
app.use('/api/programs', routes.programsRoutes);
app.use('/api/trainee', routes.traineeRoutes);
app.use('/api/staff', routes.staffRoutes)
app.use("/api/payments", routes.paymentRoutes);
app.use('/api/report', routes.reportRoutes);
app.use('/api/notification', routes.notificationRoutes);
app.use('/api/admin', authorizeRole(["SuperAdmin"]), routes.adminRoutes);


app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
