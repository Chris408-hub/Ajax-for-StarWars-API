(() => {
    const characterBox = document.querySelector('#character-box');
    const movieCon = document.querySelector('#movie-con');
    const movieTemplate = document.querySelector('#movie-template');
    const baseUrl = `https://swapi.dev/api/`

    //make first ajax call

    function getCharacters() {
        fetch(`${baseUrl}/people`)
        .then(response => response.json())
            .then(function (response) {
            console.log(response.results);

            //store description array(list of characters)in characters
            const characters = response.results;
            const ul = document.createElement('ul');

            characters.forEach(character => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                // console.log(character.name);
                console.log(character['name']);
                a.textContent = character['name'];
                li.appendChild(a);
                ul.appendChild(li);
                
            });
            characterBox.appendChild(ul);
        })
            .then(function () {
                const links = document.querySelectorAll('#character-box li a')
                links.forEach(link => {
                    link.addEventListener('click', getInfo);
                })
            })
            
            .catch(err => {
                console.log(err);
                //send message to user in DOM, there was an issue
            }
        )
        
        function getInfo(e) {
            // console.log('getReview called');
            // console.log(e.currentTarget.dataset.review);
            // console.log(this.dataset.review);
            const InfoID = e.currentTarget.dataset.review;
            //https://search.imdbot.workers.dev/?tt=tt0111257


            fetch(`${baseUrl}/${InfoID}`)
            .then(response => response.json())
                .then(function (response) {
                    console.log(response);
                    // console.log(response.short.review.reviewBody);

                // clear out reviewCon
                movieCon.innerHTML = '';
                const template = document.importNode(movieTemplate.content, true);
                const movieBody = template.querySelector('.movie-opening');
                movieBody.innerHTML = response.short.movie.movieBody;
                movieCon.appendChild(template);
            })
            .catch(error => {
                console.log(error);
                // add message to user that is written in the DOM
            })
        }
    }

    // call the function to load list
    getCharacters();

})();

