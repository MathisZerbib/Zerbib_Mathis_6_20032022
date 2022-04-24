//Mettre le code JavaScript lié à la page photographer.html
var obj;
var medias = []
let photographerName;
let photographer = [];
var arrayMedias = []
let filters = document.querySelector('#filters')

// Get Medias from {$id}

async function getMediasFromId() {
    let pId = window.location.href.split('=')[1];

    await fetch('./data/photographers.json')
        .then(res => res.json())
        .then(data => {
            obj = data.media
            data.photographers.forEach(element => {
                element.id
                if (parseInt(pId) === element.id) {
                    photographerName = element.name.split(' ')[0]
                    photographer = element;

                }

            });

        })
        .then(() => {
            obj.forEach(element => {
                if (element.photographerId == pId)
                    medias.push(element)
            });
            console.log(medias, 'P name', photographerName);


        })
        .catch(error => console.log(error));

    // Penser à remplacer par les données récupérées dans le json
    // et bien retourner le tableau medias seulement une fois
    return ({
        medias: [...medias]
    })
}

async function filterByPopularity(arrayMedias) {
    let sortedArray = await arrayMedias.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
    // console.log('sorted Array', sortedArray)
    arrayMedias = sortedArray
    displayData(arrayMedias);

}

async function filterByDate(arrayMedias) {
    let sortedArray = await arrayMedias.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
    });
    // console.log('sorted Array', sortedArray)
    arrayMedias = sortedArray
    displayData(arrayMedias);
}
async function filterByTitle(arrayMedias) {
    let sortedArray = await arrayMedias.sort(function(a, b) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
        })
        // console.log('sorted Array', sortedArray)
    arrayMedias = sortedArray
    displayData(arrayMedias);
}



// Filters onChange getFilterValue

filters.addEventListener('change', () => {
    let optionSelectedIndex = document.querySelector('option:checked').index
    getFilterValue(optionSelectedIndex);
})


async function getFilterValue(index) {
    switch (index) {
        case 1:
            cleanData()
            filterByPopularity(medias)
            break;
        case 2:
            cleanData()
            filterByDate(medias)
                // expected output: "Mangoes and papayas are $2.79 a pound."
            break;
        case 3:
            cleanData()
            filterByTitle(medias)
        default:
            console.log(`Sorry, we are out of ${index}.`);
    }
    console.log('index option ', index)

}

// Clean DOM
async function cleanData() {
    const gallerySection = document.querySelector(".imageWallContainer");
    while (gallerySection.lastChild) {
        gallerySection.removeChild(gallerySection.lastChild);
    }
}


// Hydrate DOM + calc Likes
async function displayData(medias) {
    // filterByLikes(medias)
    const mediasSection = document.querySelector(".imageWallContainer");

    let photographerLikes = 0;
    medias.forEach((el) => {
        photographerLikes = photographerLikes + el.likes;


        const mediaModel = mediaFactory(el);
        const getMediaCardDOM = mediaModel.getMediaCardDOM(photographerName);

        mediasSection.appendChild(getMediaCardDOM);
    });


};

// First init
async function init() {
    // Récupère les datas des photographes
    const { medias } = await getMediasFromId();
    const headerSection = document.querySelector(".photograph-header")

    const photographerModel = photographerFactory(photographer);
    const getHeaderCardDOM = photographerModel.getHeaderCardDOM()
    headerSection.appendChild(getHeaderCardDOM)
    filterByPopularity(medias)
};

init();