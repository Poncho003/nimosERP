# 📦 nimosERP
## SISTEMA ERP WEB – INVENTARIO Y TRASPASOS

---

## 📌 Información del Proyecto

Repositorio: nimosERP  
Estado: 🚧 En desarrollo activo  

---

## 📝 Descripción

nimosERP es un sistema ERP web ligero enfocado en el control de inventario y traspasos de productos.  
Está diseñado para ofrecer una experiencia clara, visual y guiada, incluso para usuarios sin conocimientos técnicos.

El sistema permite:
- Agregar productos al inventario
- Visualizar productos disponibles
- Eliminar productos con validación de administrador
- Realizar traspasos mediante interacción drag & drop
- Consultar estadísticas del inventario

Todo bajo una interfaz web con botones grandes, colores fáciles de distinguir y flujos guiados paso a paso.  
Forma parte del ecosistema nimOS, orientado a soluciones administrativas modernas y escalables.

---

## 🧠 Tecnologías Utilizadas

- React
- Vite
- JavaScript
- CSS
- React Router
- Arquitectura modular

---

## ⚙️ Instalación y Ejecución

Requisitos:
- Node.js (LTS recomendado)
- Navegador web moderno

Pasos:

1. Clonar el repositorio  
   git clone https://github.com/Poncho003/nimosERP.git

2. Entrar al proyecto  
   cd nimosERP

3. Instalar dependencias  
   npm install

4. Ejecutar el proyecto  
   npm run dev

5. Abrir en el navegador  
   http://localhost:5173

---

## 🔐 Seguridad y Control

- La eliminación de productos requiere contraseña de administrador
- Separación clara entre acciones de usuario y administrativas
- Validaciones antes de operaciones críticas

---

## 🗂️ Estructura del Proyecto

nimos/  
 ├── public/  
 │   └── productos/  
 │  
 ├── src/  
 │   ├── assets/  
 │   │   ├── css/  
 │   │   └── brands/  
 │   │  
 │   ├── components/  
 │   │   ├── ImagePicker  
 │   │   └── componentes reutilizables  
 │   │  
 │   ├── pages/  
 │   │   ├── login.jsx  
 │   │   └── almacen/  
 │   │       ├── Home.jsx  
 │   │       ├── bodega/  
 │   │       │   ├── AgregarProducto.jsx  
 │   │       │   ├── EliminarProducto.jsx  
 │   │       │   ├── EstadisticasProductos.jsx  
 │   │       │   └── VerProducto.jsx  
 │   │       └── productos/  
 │   │  
 │   ├── App.jsx  
 │   ├── main.jsx  
 │   └── index.css  
 │  
 ├── index.html  
 ├── package.json  
 └── vite.config.js  

---

## 🧩 Funcionalidades del Sistema

Inventario:
- Alta de productos
- Visualización general
- Eliminación protegida por contraseña

Traspasos:
- Interacción drag & drop
- Flujo visual e intuitivo
- Pensado para rapidez operativa

Estadísticas:
- Resumen visual del inventario
- Apoyo a la toma de decisiones

---

## 🎨 Diseño y UX

- Botones grandes y accesibles
- Colores contrastantes y legibles
- Navegación clara y directa
- Pasos guiados para acciones críticas
- Pensado para usuarios no técnicos

---

## ⚠️ Advertencias

- Proyecto en desarrollo
- Backend en evolución
- No usar en producción sin validaciones adicionales
- Las contraseñas deben manejarse de forma segura en futuras versiones

---

## 🛠️ Notas de Desarrollo

- Arquitectura modular
- Enfoque fuerte en usabilidad
- Base sólida para escalar a ERP completo
- Preparado para integración futura con backend y base de datos

---

## 👤 Autor

Alfonso Medina Alvarado  
Ingeniería en Tecnologías de la Información y Comunicación  
Proyecto: nimosERP  

---

## 📄 Licencia

Tipo: Académica / Experimental  
Uso: Educativo y demostrativo
