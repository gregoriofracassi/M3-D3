const loadResources = () => {
    fetch('http://www.splashbase.co/api/v1/images/search?query=tree')
    .then(resp => resp.json())
    .then(img => {
    loadCards(img)
    })
}

const loader = document.querySelector('.loader')
const rowCards = document.querySelector('.album .row')

loader.onclick = loadResources

const loadCards = (imgjson) => {
    rowCards.innerHTML = ''
    let images = imgjson.images
    // console.log(imgjson.images[0].id)
    images.forEach (
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
                        class="btn btn-sm btn-outline-secondary"
                    >
                        View
                    </button>
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                    >
                        Edit
                    </button>
                    </div>
                    <small class="text-muted">9 mins</small>
                </div>
                </div>
            </div>
            </div>
            `
        }
    )
}
