class Juego {
    constructor(id, nombre, precio, stock, img, descripcion, alt) {
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.precio = precio
        this.stock = stock
        this.img = img
        this.descripcion = descripcion
        this.alt = alt
    }
}

class JuegoController {
    constructor() {
        this.listaJuegos = []
        this.contenedor_juegos = document.getElementById("contenedor_juegos")
    }

    levantarJuegos() {
        this.listaJuegos = [
            new Juego(1, "Batman Arkham Night", 11000, 10, "./assets/batman.jpeg", "Batman: Arkham Knight es la épica conclusión de la galardonada trilogía de Arkham, creada por Rocksteady Studios", "Batman Arkham Night"),
            new Juego(2, "Call Of Duty: Modern Warfare 2", 11000, 10, "./assets/Callofduty.jpeg", " Call of Duty: Modern Warfare 2 (2022) es una versión reimaginada del MW2 de 2009: el shooter bélico de Activision", "Call Of Duty: Modern Warfare 2"),
            new Juego(3, "Dying Light 2", 17000, 10, "./assets/dying light.jpeg", "Dying Light es un juego de acción en primera persona del género Horror de supervivencia, el cual se desarrolla durante un apocalipsis zombi. Fue desarrollado por Techland y publicado por Warner Bros", "Dying Light 2"),
            new Juego(4, "God of war: Ragnarok", 13000, 10, "./assets/God of war.jpeg", " God of War: Ragnarok es la secuela del aclamado God of War (2018) desarrollado por Santa Monica Studio y publicado por Sony Interactive Entertainment", "God Of War: Ragnarok"),
            new Juego(5, "The King Of Fighters XV", 12000, 10, "./assets/king of fighters.jpeg", "The King of Fighters XV es un videojuego de lucha de la serie The King of Fighters desarrollado y publicado por SNK", "Juego The King Of Fighters XV"),
            new Juego(6, "Resident Evil 4 Remake", 13000, 10, "./assets/Residentevil.jpeg", "Resident Evil 4 es un videojuego de acción-aventura de disparos en tercera persona perteneciente al subgénero de terror y supervivencia desarrollado por Capcom y estrenado el 24 de marzo del 2023. El videojuego es una nueva versión del videojuego de 2005 del mismo nombre", "Juego Resident Evil 4 Remake")
        ]
    }

    mostrarEnDOM() {
        this.listaJuegos.forEach(juego => {
            this.contenedor_juegos.innerHTML += `
        <div class="card border-success" style="width: 17rem;">
            <img src="${juego.img}" class="card-img-top" alt="${juego.alt}">
            <div class="card-body">
                <h5 class="card-titulo">${juego.nombre}</h5>
                <p class="card-text">${juego.descripcion}</p>
                <p class="card-text">Precio: $${juego.precio}</p>
                <a href="#" id="cpu-${juego.id}" class="btn btn-lg green btn-success">Comprar</a>
            </div>
        </div>`
        })
    }

    AñadirJuegosAcarrito(controladorCarrito) {
        this.listaJuegos.forEach(juego => {
            const btnAP = document.getElementById(`cpu-${juego.id}`)
            btnAP.addEventListener("click", () => {

                controladorCarrito.agregar(juego)
                controladorCarrito.guardarEnStorage()
                controladorCarrito.mostrarEnDOM(contenedor_carrito)

                Toastify({
                    text: `${juego.nombre} añadido!!`,
                    duration: 2000,

                    gravity: "bottom",
                    position: "right",

                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93b)",
                    }
                }).showToast();

            })
        })
    }
}

class CarritoController {
    constructor() {
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById("contenedor_carrito")
        this.total = document.getElementById("total")
    }

    verificarExistenciaDelJuego(juego) {
        return this.listaCarrito.find((jueguito) => jueguito.id === juego.id);
    }
    
    agregar(juego) {
        let objeto = this.verificarExistenciaDelJuego(juego);
        if (objeto) {
            objeto.cantidad += 1;
        } else {
            this.listaCarrito.push(juego);
        }
    }
    

    limpiarCarritoEnStorage() {
        localStorage.removeItem("listaCarrito")
    }

    guardarEnStorage() {
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    verificarExistenciaEnStorage() {
        this.listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || []
        if (this.listaCarrito.length > 0) {
            this.mostrarEnDOM()
        }
    }

    limpiarContenedor_Carrito() {
        this.contenedor_carrito.innerHTML = ""
    }

borrar(juego){
    let posicion = this.listaCarrito.findIndex(mijuego => juego.id == mijuego.id)
    if( !(posicion == -1))(
        this.listaCarrito.splice(posicion,1)
    )
}

    mostrarEnDOM() {
        this.limpiarContenedor_Carrito()
        this.listaCarrito.forEach(juego => {
            this.contenedor_carrito.innerHTML +=
                `<div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${juego.img}" class="img-fluid rounded-start" alt="${juego.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-titulo">${juego.nombre}</h5>
                        <p class="card-text">Descripcion: ${juego.descripcion}</p>
                        <p class="card-text">Precio: $${juego.precio}</p>
                        <p class="card-text">Cantidad: ${juego.cantidad}</p>
                        <button class="btn btn-m" id="borrar-${juego.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>`
        })

        this.listaCarrito.forEach(juego =>{
    const btnBorrar = document.getElementById(`borrar-${juego.id}`)
    btnBorrar.addEventListener("click",()=>{
        this.borrar(juego)
        this.guardarEnStorage()
        this.mostrarEnDOM()
    }
    
    )
        })
        this.mostrarTotalEnDOM()
    }
    calcularTotal(){
        let total = 0
        this.listaCarrito.forEach(juego => {
            total += juego.precio * juego.cantidad
        })
        return total;
    }

    mostrarTotalEnDOM(){
        this.total.innerHTML = this.calcularTotal()
    }

}


const controladorJuegos = new JuegoController()
controladorJuegos.levantarJuegos()

const controladorCarrito = new CarritoController()

controladorCarrito.verificarExistenciaEnStorage()

//DOM
controladorJuegos.mostrarEnDOM()

//EVENTOS
controladorJuegos.AñadirJuegosAcarrito(controladorCarrito)
const finalizarcompra = document.getElementById("finalizarcompra")
finalizarcompra.addEventListener("click", () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su compra a sido realizada con exito',
        showConfirmButton: false,
        timer: 1500
    })

    controladorCarrito.limpiarContenedor_Carrito()

    controladorCarrito.limpiarCarritoEnStorage()

    controladorCarrito.listaCarrito = []

    controladorCarrito.mostrarTotalEnDOM()
})

