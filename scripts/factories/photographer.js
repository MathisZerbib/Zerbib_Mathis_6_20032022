function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a');
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.dataset.lazy = true;
        const h2 = document.createElement('h2');
        const subContainerCard = document.createElement('div');
        subContainerCard.className = 'sub-container-card'

        const subText = document.createElement('p');
        const bold = document.createElement('p');
        const tjm = document.createElement('p');
        tjm.textContent = (price.toString()) + '€/jours';
        bold.style.fontWeight = "bold";
        bold.textContent = tagline
        h2.textContent = name;
        subText.textContent = city;
        subText.style.margin = 0;
        subText.className = 'location'
        bold.style.margin = 0;

        a.setAttribute("href", `./photographer.html?id=${id}`);
        a.style.textDecoration = "none"
        a.style.color = 'black'
        article.appendChild(a)
        a.appendChild(img);
        a.appendChild(subContainerCard)
        subContainerCard.appendChild(h2);
        subContainerCard.appendChild(subText);
        subContainerCard.appendChild(bold)
        subContainerCard.appendChild(tjm)
        return (article);
    }

    function getHeaderCardDOM() {

        const imageHeaderContainer = document.querySelector('.photographer-image')
        const subContainerCard = document.querySelector('.photograph-text');

        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.alt = name
        const h2 = document.createElement('h2');

        const subText = document.createElement('p');
        const bold = document.createElement('p');
        bold.textContent = tagline
        h2.textContent = name;
        subText.textContent = city;
        subText.style.margin = 0;
        subText.className = 'location'
        subText.style.fontSize = '1.2rem'
        bold.style.margin = 0;


        imageHeaderContainer.appendChild(img);
        subContainerCard.appendChild(h2);
        subContainerCard.appendChild(subText);
        subContainerCard.appendChild(bold)
        return (imageHeaderContainer);
    }
    return { id, name, picture, city, country, tagline, price, getUserCardDOM, getHeaderCardDOM }
}