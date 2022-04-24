function onIntersect(entries) {
    entries.forEach((entry) => {
        if (entry.target.getAttribute("data-processed") || !entry.isIntersecting)
            return true;
        entry.target.setAttribute("src", entry.target.getAttribute("data-src"));
        entry.target.setAttribute("data-processed", true);
    });
}


function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    // const picture = `assets/photographers/${portrait}`;

    var observer = new IntersectionObserver(onIntersect);

    function formatName(str) {
        let formatedStr;
        formatedStr = str.replace('-', ' ');
        formatedStr = formatedStr.replace('_', ' ');
        str = formatedStr
        return str
    }

    function getMediaCardDOM(name) {

        name = formatName(name)

        const cardWrapper = document.createElement('div');
        const a = document.createElement('a');
        const vid = document.createElement('VIDEO');
        const img = document.createElement('img');
        const cardHeader = document.createElement('div');
        const headerText = document.createElement('p');
        const imageWallContainer = document.querySelector('.imageWallContainer')
        const i = document.createElement("i");
        const spanLike = document.createElement('span');

        spanLike.className = 'likes-count';
        spanLike.innerHTML = likes;

        cardHeader.className = 'flex row cardHeader'
        i.className = 'fa-solid fa-heart'

        cardWrapper.className = "flex row cardWrapper"
        a.className = "example-image-link"
        headerText.className = "noDeco headerText"

        a.href = `./assets/images/${formatName(name)}/${image}`
        a.dataset.lightbox = "example-set";
        a.title = title
        img.alt = title;
        img.setAttribute('src', './assets/images/placeholder.png');
        img.dataset.src = `./assets/images/${formatName(name)}/${image}`;
        img.dataset.lazy = true;



        if (image) {
            imageWallContainer.appendChild(cardWrapper)
            cardWrapper.appendChild(a)
            a.appendChild(img)
            cardWrapper.append(cardHeader)
            cardHeader.append(headerText)
            cardHeader.append(i)
            i.append(spanLike)
            headerText.innerText = title;
        } else {
            a.href = `./assets/images/${formatName(name)}/${video}`

            var source = document.createElement('source');

            source.src = `./assets/images/${formatName(name)}/${video}`;
            source.type = "video/mp4";



            a.dataset.lightbox = "video-set";
            vid.dataset.alt = title;

            imageWallContainer.appendChild(cardWrapper)
            cardWrapper.appendChild(a)
            a.appendChild(vid)
            vid.appendChild(source)
            cardWrapper.append(cardHeader)
            cardHeader.append(headerText)
            cardHeader.append(i)
            i.append(spanLike)
            headerText.innerText = title;
        }

        i.addEventListener('click', function() {
            if (i.className !== 'fa-solid fa-heart liked') {
                i.className = 'fa-solid fa-heart liked'
                spanLike.innerText = parseInt(i.innerText) + 1;
            } else {
                i.className = 'fa-solid fa-heart notliked'
                spanLike.innerText = parseInt(i.innerText) - 1;
            }
        })
        document.querySelectorAll("[data-lazy]").forEach((element) => {
            observer.observe(element);
        });

        return (cardWrapper);
    }
    return { id, photographerId, title, image, video, likes, date, price, getMediaCardDOM }
}