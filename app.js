const form = document.querySelector('#searchForm');

form.addEventListener('submit', async function(e){
    //prevents default behavior
    e.preventDefault();

    //remove shows and error if exists
    try{
        const removeShows = document.querySelectorAll('#showContainer');
        for(let show of removeShows){
            show.remove();
        }
        const h3 = document.querySelector('#error');
        h3.remove();
    }
    catch(e){}

    try{
        console.dir(form);
        const searchShow = form.elements.query.value;
        const config = {params: {q: searchShow}};
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);

        if(res.data.length === 0){
            const err = document.createElement('h3');
            err.id = 'error';
            err.classList = 'py-3';
            err.innerText = 'No Shows Founds :(';
            document.body.append(err);
        }
        else{
            console.log(res.data);
            displayShowInfo(res.data); 
        }
     
        /* form.elements.query.value = "";  */

    }
    catch(e){
        console.log("Error!", e);
        const err = document.createElement('h3');
        err.id = 'error';
        err.classList = 'py-3';
        err.innerText = 'No Shows Founds :(';
        document.body.append(err);
    }
    
})

//h3 id="error" class="py-3">No Shows Found :(</h3>

/* const displayShowInfo = (shows) => {
    for(let i of shows){
        if(i.show.image){
            const img = document.createElement('img');
            img.src = i.show.image.medium;
            document.body.append(img);
        }
    }
} */

const displayShowInfo = (shows) => {
    let topFive = 0;
    for(let s of shows){
        //only shows top 5 results
        if(topFive <= 5){ 

            //container to hold all show info
            const showContainer = document.createElement('div');
            showContainer.id = 'showContainer';
            showContainer.classList = 'px-3';

            //get image of show
            const showImg = document.createElement('div');
            showImg.id = 'showImg';
            
            if(s.show.image){ //if there is an image
                const img = document.createElement('img');
                img.src = s.show.image.medium;
                showImg.append(img);
            }

            showContainer.append(showImg);

            //get show title and summary
            const showSummary = document.createElement('div');
            showSummary.id = 'showSummary';

            const showTitle = document.createElement('h3');
            showTitle.id = 'showTitle';
            showTitle.innerText = s.show.name;
            showSummary.append(showTitle);

            const sum = document.createElement('p');
            sum.innerHTML = s.show.summary;
            showSummary.append(sum);

            //add buttons
            const moreInfo = document.createElement('div');
            moreInfo.classList = 'moreInfo';

            const cast = document.createElement('button');
            cast.id = 'cast';
            cast.classList = 'btn btn-success mt-3 mx-1 px-3';
            cast.innerText = 'Cast Info';

            const eps = document.createElement('button');
            eps.id = 'eps';
            eps.classList = 'btn btn-success mt-3 mx-1 px-3';
            eps.innerText = 'Episode List';

            const seasons = document.createElement('button');
            seasons.id = 'seasons';
            seasons.classList = 'btn btn-success mt-3 mx-1 px-3';
            seasons.innerText = 'Seasons';

            moreInfo.append(cast);
            moreInfo.append(eps);
            moreInfo.append(seasons);

            showSummary.append(moreInfo);
            showContainer.append(showSummary);

            //get show information
            const showInfo = document.createElement('div');
            showInfo.id = 'showInfo';
            const prem = document.createElement('p');
            prem.innerText = `Premiered: ${s.show.premiered}`;

            const ended = document.createElement('p');
            if(s.show.ended){
                ended.innerText = `Status: Ended on ${s.show.ended}`;
            }
            else{
                ended.innerText = 'Status: Ongoing';
            }

            const genre = document.createElement('p');
            if(s.show.genres.length != 0){
                genre.innerText = `Genre(s): ${s.show.genres}`;
            }
            else{
                genre.innerText = 'Genre(s): N/A';
            }

            const rating = document.createElement('p');
            if(s.show.rating.average){
                rating.innerText = `Rating: ${s.show.rating.average}/10`;
            }
            else{
                rating.innerText = 'Rating: N/A';
            }
            
            showInfo.append(prem);
            showInfo.append(ended);
            showInfo.append(genre);
            showInfo.append(rating);

            showContainer.append(showInfo);

            document.body.append(showContainer);  
        }
        //increase count of shows
        topFive++;
    }
}



/* let castInfo = document.querySelectorAll('#cast');
castInfo.forEach(btn => {
    btn.addEventListener('click', async function (e){

        console.log('clicked');
    });
}); */


