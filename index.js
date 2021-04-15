const loadResources = (keyword) => {
    fetch(`http://www.splashbase.co/api/v1/images/search?query=${keyword}`)
        .then(resp => resp.json())
        .then(img => {
            loadCards(img)
        })
        .catch(err => showAlert("alert-danger", "Error", err.message))
}

const loader = document.querySelector('.loader')
const secondloader = document.querySelector('.secondloader')
const rowCards = document.querySelector('.album .row')


loader.onclick = () => loadResources("tree")
secondloader.onclick = () => loadResources(document.querySelector(".search").value)

const showAlert = (type, header, message) => {
    const alertContainer = document.querySelector('.alert-container')
    alertContainer.innerHTML =
        `<div class="alert ${type} position-absolute alert-dismissible" role="alert" style="z-index: 1;
    top: 50px;">
    <h4 class="alert-heading">${header}</h4>
    <hr>
    <p class="alert-result mb-0 mr-3">${message}</p>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
</div>`
}


const showImagePreview = (event) => {
    const img = event.currentTarget.closest('.card').querySelector('img')
    console.log('img:', img)
    const modalBody = document.querySelector('#exampleModal .modal-body')
    modalBody.innerHTML = ''
    modalBody.innerHTML = `<img src="${img.src}" class="img-fluid" alt="">`
}
const hideCard = (event) => {
    const card = event.currentTarget.closest('.card')
    card.classList.add('d-none')
}

const getId = (images) => {
    console.log('images:', images)
    const idArr = images.reduce((acc, image) => {
        return [...acc, image.id] //how does this works?
    }, [])
    console.log(idArr)
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
    getId(images)
    setTimeout(() => {
            showAlert("alert-success", "Info", `${document.querySelectorAll(".card").length} images have been loaded`)
        }, 5000)
        //viewButton.onclick = (event) => showImagePreview(event)

}


const getUrl = (images) => {
    console.log(images.map(image => {
        return [image.url]
    }), {})
}


const fillCarousel = () => {
    const carouselInner = document.querySelector('.image-carousel .carousel-inner')
    first = true
    fetch("http://www.splashbase.co/api/v1/images/search?query=forest")
        .then(response => response.json())
        .then(body => {
            getUrl(body.images)
            body.images.filter((el, i) => {

                if (el.site !== "unsplash") {
                    if (first) {
                        carouselInner.innerHTML += `<div class="carousel-item active">
                        <img src="${el.url}" class="d-block w-100" alt="...">
                    </div>`
                        first = false
                    } else {
                        carouselInner.innerHTML += `<div class="carousel-item">
                        <img src="${el.url}" class="d-block w-100" alt="...">
                    </div>`
                    }
                }
            })
        })

}

window.onload = () => {
    fillCarousel()
}