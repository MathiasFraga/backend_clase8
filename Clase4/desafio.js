const fs = require('fs');
const archivoLocal = `./productos.txt`

const productos = [];

const producto1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

const producto2 = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
}

const producto3 = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
}

const producto4 = {
    title: 'Sacapuntas',
    price: 386,
    thumbnail: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.soyvisual.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Ffacebook_og%2Fpublic%2Fimages%2Fphotos%2Fcole_0031.jpg%3Fitok%3DWKZUEEng&imgrefurl=https%3A%2F%2Fwww.soyvisual.org%2Ffotos%2Fsacapuntas&tbnid=DHSfYGiEaMWSVM&vet=12ahUKEwiV6qmhvpn2AhVqrJUCHf_uC1EQMygCegUIARDyAQ..i&docid=mf0nH_yyhFLHAM&w=630&h=630&q=sacapuntas&ved=2ahUKEwiV6qmhvpn2AhVqrJUCHf_uC1EQMygCegUIARDyAQ'
}

const producto5 = {
    title: 'Goma de borrar',
    price: 390,
    thumbnail: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.librerialarubrica.com%2Fcategoria-producto%2Flibreria%2Fescritura%2Fgomas-de-borrar%2F&psig=AOvVaw0QY4nc5BHL9pftL-Hw08eb&ust=1645831562365000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOiDzb--mfYCFQAAAAAdAAAAABAD'
}

class Contenedor {

    constructor(archivoLocal) {
        this.path = archivoLocal
    }

    async save(producto) {
        try {
            producto['id'] = productos.length + 1;
            productos.push(producto);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
            console.log(`Se asignaron los siguientes ID: ${producto.id}`)
        }
        catch (error) {
            console.log(`El error es ${error}`);
        }
    }

    async getById(id) {
        try {
            let contenido = await fs.promises.readFile(this.path);
            let newArray = (JSON.parse(contenido));
            newArray.forEach(element => {
                if (id == element.id) {
                    console.log("El ID corresponde a ", element)
                }
            });
        } catch (error) {
            console.log(`El error es ${error}`);
        }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.path);
            return (JSON.parse(contenido));
        } catch (error) {
            console.log(`El error de getAll() es ${error}`);
        }
    }

    async deleteAll() {
        try {
            let contenido = await fs.promises.readFile(this.path);
            contenido = []
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
            return contenido;
        }
        catch (error) {
            console.log(error)
        }
    }
    
    async deleteById(id) {
        let contenido = await fs.promises.readFile(this.path);
        let newArray = (JSON.parse(contenido));
        let myArray = newArray.filter((item) => item.id !== id);
        fs.promises.writeFile(this.path, JSON.stringify(myArray, null, '\t'));
    }
    catch(error) {
        console.log(`El error es el siguiente ${error}`)
    }

    async deleteArchiveAll(){
        try {
            await fs.promises.unlink(this.path);
        } catch (error) {
            console.log(`El error es ${error}`);
        }
    }
}


async function funcionesSolicitadas() {

    /* Recibe un objeto, lo guarda en el archivo, devuelve el id asignado. */

    await miArchivo.save(producto1);
    await miArchivo.save(producto2);
    await miArchivo.save(producto3);
    await miArchivo.save(producto4);
    await miArchivo.save(producto5);


    /* Elimina el contenido del archivo. */
    // await miArchivo.deleteAll();

    /* Devuelve un array con los objetos presentes en el archivo */
    // console.log(contenido = await miArchivo.getAll());

    /* Recibe un id y devuelve el objeto con ese id. */
    // await miArchivo.getById(3);

    /* - Elimina del archivo el objeto con el id buscado*/
    // contenido = await miArchivo.deleteById(5);

    /* No esta solicitado en la filmina y por error de comprension, arme esta funcion la cual elimina el archivo por completo, pero igualmente lo dejo para comprobar su funcionamiento e interaccion */
    // await miArchivo.deleteArchiveAll()
}

const miArchivo = new Contenedor(archivoLocal);
funcionesSolicitadas();

module.exports = Contenedor



