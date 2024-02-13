function addWorkCard(params = {}) {
    const template = document.querySelector('#proyecto-template')
    const container = document.querySelector('.container-proyectos')
    template.content.querySelector(".proyecto-titulo").textContent = params.title

    template.content.querySelector(".proyecto-texto").textContent = params.description

    template.content.querySelector(".proyecto-img").src = params.image
    template.content.querySelector(".proyecto-ver-mas").href = params.url

    const clone = document.importNode(template.content, true)
    container.appendChild(clone)
}

function getWorks() {
    return fetch('https://cdn.contentful.com/spaces/adr0htd12axw/environments/master/entries?access_token=w3XdfDdwgk31UJNbLJ2yH8uLiH-JS3h9pyaKdocsPMg&content_type=work')
        .then((res) => { return res.json() })
        .then((data) => {
            const fieldCollections = data.items.map((item) => {
                const idImagenItem = item.fields.imagen.sys.id
                const imagenEncontrada = data.includes.Asset.find((e) => {
                    return e.sys.id === idImagenItem
                })

                return {
                    title: item.fields.titulo,
                    description: item.fields.descripcion,
                    image: imagenEncontrada.fields.file.url,
                    url: item.fields.url
                }
            })
            return fieldCollections
        })
}

function main() {
    getWorks().then((works) => {
        for (const w of works) {
            addWorkCard(w)
        }
    })
};
main();