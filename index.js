const loadResources = (keyword) => {
    fetch(`http://www.splashbase.co/api/v1/images/search?query=${keyword}`)
        .then(resp => resp.json())
        .then(img => {
            loadCards(img)
        })
}

const loader = document.querySelector('.loader')
const secondloader = document.querySelector('.secondloader')
const rowCards = document.querySelector('.album .row')


loader.onclick = () => loadResources('tree')
secondloader.onclick = () => loadResources(document.querySelector(".search").value)

const showResult = () => {
    setTimeout(() => {
        console.log("ds");
        document.querySelector(".alert").classList.remove("d-none")
        document.querySelector(".alert-result").innerHTML = `${document.querySelectorAll(".card").length} images have been loaded`
    }, 5000)
}




const showImagePreview = (event) => {
    const img = event.currentTarget.parentElement.parentElement.parentElement.previousElementSibling
    const modalBody = document.querySelector('#exampleModal .modal-body')
    modalBody.innerHTML = ''
    modalBody.innerHTML = `<img src="${img.src}" class="img-fluid" alt="">`
}
const hideCard = (event) => {
    const card = event.currentTarget.parentElement.parentElement.parentElement.parentElement
    card.classList.add('d-none')
}


const loadCards = (imgjson) => {
    rowCards.innerHTML = ''
    let images = imgjson.images
        // console.log(imgjson.images[0].id)
    images.forEach(
        im => {
            rowCards.innerHTML += `
            <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top img-fluid" src="${im.url}"
                >
                <div class="card-body">
                <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
                <div
                    class="d-flex justify-content-between align-items-center"
                >
                    <div class="btn-group">
                    <button
                        type="button"
                        class="viewButton btn btn-sm btn-outline-secondary"
                        data-toggle="modal" data-target="#exampleModal"
                    >
                        View
                    </button>
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary hider"
                    >
                        Hide
                    </button>
                    </div>
                    <small class="text-muted">${im.id}</small>
                </div>
                </div>
            </div>
            </div>
            `
        }
    )
    let viewButton = document.querySelectorAll('.viewButton')
    for (const b of viewButton) {
        b.onclick = showImagePreview
    }
    let hideBtn = document.querySelectorAll('.hider')
    for (const b of hideBtn) {
        b.onclick = hideCard
    }
    showResult()
        //viewButton.onclick = (event) => showImagePreview(event)

}