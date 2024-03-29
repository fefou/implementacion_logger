import { Router } from "express";
export const router = Router();
import { VistasController } from "../controllers/vistas.controller.js";
import { CarritoController } from "../controllers/carrito.controller.js";
import { mockingController } from "../controllers/mocking.controller.js";
import { authRoles } from "../middlewares/rol.js"

router.get("/", (req, res) => {
  res.status(200).render("Home");
});


// ------------ AUTH ------------
const auth = (req, res, next) => {
  if (!req.session.usuario) {
    res.redirect("/login");
  }
  next();
};


// ------------ AUTH ------------

// ------------ PRODUCTOS ------------
router.get("/realtimeproducts", auth, VistasController.realTimeProducts);

router.get("/realtimeproducts/:pid", auth, VistasController.realTimeProductsById);
// ------------ PRODUCTOS ------------

//  ------------ CHAT ------------

router.get("/chat", authRoles(['user']), (req, res) => {
  res.status(200).render("chat");
});
//  ------------ CHAT ------------

// ------------ CARRITOS ------------
router.get("/carts", authRoles(['user']), VistasController.carts);

router.get("/carts/:cid", authRoles(['user']), VistasController.cartsbyId);

router.post("/:cid/purchase", authRoles(['user']), CarritoController.comprarCarrito);

// ------------ CARRITO ------------

//  ------------ AGREGAR AL CARRITO ------------
router.post("/carts/:cid/products/:pid", authRoles(['user']), VistasController.agregarAlCarrito
);

// ------------ AGREGAR AL CARRITO ------------

// ------------ LOGIN ------------
router.get("/login", (req, res) => {
  let { error, mensaje } = req.query;

  res.setHeader("Content-Type", "text/html");
  res.status(200).render("login", { error, mensaje });
});
// ------------ LOGIN ------------

// ------------ REGISTRO ------------
router.get("/register", (req, res) => {
  let { error } = req.query;

  res.setHeader("Content-Type", "text/html");
  res.status(200).render("register", { error });
});
// ------------ REGISTRO ------------

// ------------ PERFIL ------------
router.get("/perfil", auth, (req, res) => {
  let usuario = req.session.usuario;

  res.setHeader("Content-Type", "text/html");
  res.status(200).render("perfil", { usuario });
});
// ------------ PERFIL ------------


// ------------ CARGA PRODUCTOS ------------
router.get("/cargaProductos", authRoles(['admin']), VistasController.cargaProductos);


// ------------ CARGA PRODUCTOS ------------


// ------------ MOCKING------------
router.get("/mockingproducts", mockingController.createMockData);
// ------------ MOCKING------------

// ------------ WINSTON ------------
router.get("/loggertest", (req, res) => {
  req.logger.debug("no se completaron todas las propiedades necesarias.");
  req.logger.http("no se completaron todas las propiedades necesarias.");
  req.logger.info("no se completaron todas las propiedades necesarias.");
  req.logger.warning("no se completaron todas las propiedades necesarias.");
  req.logger.error("no se completaron todas las propiedades necesarias.");
  req.logger.fatal("no se completaron todas las propiedades necesarias.");
  
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ message: "Mensajes de registro enviados con éxito." });
});
// ------------ WINSTON ------------