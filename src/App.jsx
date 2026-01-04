import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Home from "./pages/almacen/Home.jsx";
import IndexProd from "./pages/almacen/productos/indexProd.jsx";
import ProductosAlmacen from "./pages/almacen/bodega/ProductosAlmacen.jsx";
import AgregarProducto from "./pages/almacen/bodega/AgregarProducto.jsx";
import VerProductos from "./pages/almacen/bodega/VerProducto.jsx";
import EliminarProductos from "./pages/almacen/bodega/EliminarProducto.jsx";
import EstadisticasProductos from "./pages/almacen/bodega/EstadisticasProductos.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/almacen/movimientos" element={<IndexProd />} />
        <Route path="/almacen/productos" element={<ProductosAlmacen />} />
        <Route path="/almacen/productos/nuevo" element={<AgregarProducto />} />
        <Route path="/almacen/bodega/ver-productos" element={<VerProductos />} />
        <Route path="/almacen/productos/eliminar" element={<EliminarProductos />} />
        <Route path="/almacen/productos/estadisticas" element={<EstadisticasProductos />} />
      </Routes>
    </BrowserRouter>
  );
}
