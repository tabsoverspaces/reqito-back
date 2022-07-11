"use strict";

import * as userHandler from "./src/handlers/users.handler";

// const ordersHandler = require("./src/handlers/orders.handler");
// const productsHandler = require("./src/handlers/products.handler");
// const usersHandler = require("./src/handlers/products.handler");
// const announcementsHandler = require("./src/handlers/announcements.handler");
// const paymentsHandler = require("./src/handlers/payments.handler");
// const storageHandler = require("./src/handlers/storage.handler");

module.exports = { ...userHandler };
