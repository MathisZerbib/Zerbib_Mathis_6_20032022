    async function getPhotographers() {
        var obj;
        var photographers = []
        await fetch('./data/photographers.json', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async response => {
                try {
                    const data = await response.json()
                        // console.log('response data?', data)
                    obj = data.photographers
                    obj.forEach(element => {
                        photographers.push(element)
                    });
                } catch (error) {
                    console.log('Error happened here!')
                    console.error(error)
                }
            })
            .catch(error => console.log(error));

        // Penser à remplacer par les données récupérées dans le json
        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers]
        })
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    init();