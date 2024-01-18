(() => {
    const movieBox = document.querySelector('#movie-box');
    const reviewTemplate = document.querySelector('#review-template');
    const reviewCon = document.querySelector('#review-con');
    const baseUrl = `https://search.imdbot.workers.dev/`

    //make first ajax call

    function getMovies() {
        fetch(`${baseUrl}?q=speed`)
        .then(response => response.json())
        .then(function (response) {
            console.log(response.description);
            //store description array(list of moives)in movies
            const movies = response.description;
            const ul = document.createElement('ul');

            movies.forEach(movie => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                console.log(movie['#TITLE']);
                a.textContent = movie['#TITLE'];
                a.dataset.review = movie['#IMDB_ID'];
                li.appendChild(a);
                ul.appendChild(li);
                
            });
            movieBox.appendChild(ul);
        })
            .then(function () {
                const links = document.querySelectorAll('#movie-box li a')
                links.forEach(link => {
                    link.addEventListener('click', getReview);
                })
            })
            
            .catch(err => {
                console.log(err);
                //send message to user in DOM, there was an issue
            }
        )
        
        function getReview(e) {
            // console.log('getReview called');
            // console.log(e.currentTarget.dataset.review);
            // console.log(this.dataset.review);
            const reviewID = e.currentTarget.dataset.review;
            //https://search.imdbot.workers.dev/?tt=tt0111257


            fetch(`${baseUrl}?tt=${reviewID}`)
            .then(response => response.json())
                .then(function (response) {
                    console.log(response);
                    // console.log(response.short.review.reviewBody);

                // clear out reviewCon
                reviewCon.innerHTML = '';
                const template = document.importNode(reviewTemplate.content, true);
                const reviewBody = template.querySelector('.review-description');
                reviewBody.innerHTML = response.short.review.reviewBody;
                reviewCon.appendChild(template);
            })
            .catch(error => {
                console.log(error);
                // add message to user that is written in the DOM
            })
        }
    }

    // call the function to load list
    getMovies();

})();

