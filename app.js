const form = document.querySelector('#searchForm');

form.addEventListener('submit', async function(e){
    //prevents default behavior
    e.preventDefault();
    clearWindow();

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
     
    }
    catch(e){
        console.log("Error!", e);
    }
    
})

const displayShowInfo = (shows) => {
    for(let s of shows){

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

        //add buttons and their events
        const moreInfo = document.createElement('div');
        moreInfo.classList = 'moreInfo';

        
        const id = s.show.id;
        const cast = document.createElement('button');
        cast.id = 'cast';
        cast.classList = 'btn btn-success mt-3 mx-1 px-3';
        cast.innerText = 'Cast';

        if(cast){
            cast.addEventListener('click', function(){
                console.log('clicked cast');

                clearWindow();

                const h1 = document.createElement('h1');
                h1.id = 'castTitle';
                h1.class = 'px-3';
                h1.innerText = `${s.show.name} Cast`;
                document.body.append(h1);

                getCastInfo(id);
            })
        } 

        const eps = document.createElement('button');
        eps.id = 'eps';
        eps.classList = 'btn btn-success mt-3 mx-1 px-3';
        eps.innerText = 'Episode List';
        if(eps){
            eps.addEventListener('click', function(){
                console.log('clicked eps');
                        
                clearWindow();
                getEpisodeInfo(id);
            })
        }

        const seasons = document.createElement('button');
        seasons.id = 'seasons';
        seasons.classList = 'btn btn-success mt-3 mx-1 px-3';
        seasons.innerText = 'Seasons';
        if(seasons){
            seasons.addEventListener('click', function(){
                console.log('clicked seasons');

                clearWindow();
                getSeasonInfo(id);
            })
        }

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
}

const getCastInfo = async (id) =>{
    try{
        const res = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`);

        if(res.data.length === 0){
            const err = document.createElement('h3');
            err.id = 'error';
            err.classList = 'py-3';
            err.innerText = 'No Cast Found :(';
            document.body.append(err);
        }
        else{
            console.log(res.data);

            const castContainer = document.createElement('div');
            castContainer.id = 'castContainer';

            for(let c of res.data){

                const castImg = document.createElement('div');
                castImg.id = 'castImg';

                if(c.character.image){ 
                    const img = document.createElement('img');
                    img.src = c.character.image.medium;
                    img.id = 'img';
                    castImg.append(img);
                }
                else if(c.person.image){
                    const img = document.createElement('img');
                    img.src = c.person.image.medium;
                    img.id = 'img';
                    castImg.append(img);
                }

                const actorName = document.createElement('h3');
                actorName.id = 'actorName';
                actorName.innerText = c.person.name;

                const charName = document.createElement('h3');
                charName.id = 'charName';
                charName.innerHTML = `<span id="as">as </span>${c.character.name}</h3>`;

                castImg.append(actorName);
                castImg.append(charName);
                castContainer.append(castImg);

                document.body.append(castContainer);
            } 
        }
     
    }
    catch(e){
        console.log("Error!", e);
    }
}

const getSeasonInfo = async (id) =>{
    try{
        const res = await axios.get(`https://api.tvmaze.com/shows/${id}/seasons`);

        if(res.data.length === 0){
            const err = document.createElement('h3');
            err.id = 'error';
            err.classList = 'py-3';
            err.innerText = 'No Seasons Found :(';
            document.body.append(err);
        }
        else{
            console.log(res.data);

            for(let s of res.data){
                const seasonContainer = document.createElement('div');
                seasonContainer.id = 'seasonContainer';
                seasonContainer.class = 'px-3';

                const showImg = document.createElement('div');
                if(s.image){ 
                    showImg.id = 'showImg';
                    const img = document.createElement('img');
                    img.id = 'img';
                    img.src = s.image.medium;
                    showImg.append(img);
                }
                
                seasonContainer.append(showImg);

                const seasonSummary = document.createElement('div');
                seasonSummary.id = 'seasonSummary';
                const seasonTitle = document.createElement('h3');
                seasonTitle.id = 'seasonTitle';
                seasonTitle.innerText = `Season ${s.number}`;
                seasonSummary.append(seasonTitle);

                const summary = document.createElement('p');
                if(s.summary){
                    summary.innerHTML = s.summary;
                }
                seasonSummary.append(summary);
                seasonContainer.append(seasonSummary);         
                
                document.body.append(seasonContainer);       
            }  
        }
     
    }
    catch(e){
        console.log("Error!", e);
    }
}

const getEpisodeInfo = async (id) =>{
    try{
        const res = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);

        if(res.data.length === 0){
            const err = document.createElement('h3');
            err.id = 'error';
            err.classList = 'py-3';
            err.innerText = 'No Episodes Found :(';
            document.body.append(err);
        }
        else{
            console.log(res.data);

            let seas = res.data[0].season;
            const tableContainer = document.createElement('tableContainer');
            tableContainer.id = 'tableContainer';
            let h2 = document.createElement('h2');
            h2.id = 'epSeason';
            h2.innerText = `Season ${seas}`;
            tableContainer.append(h2);

            let table = document.createElement('table');
            table.id = 'table';
            table.classList = 'table table-striped table-primary table-sm table-bordered';

            let thead = document.createElement('thead');
            let tr = document.createElement('tr');
            let th1 = document.createElement('th');
            th1.scope = 'col';
            th1.innerText = 'Episode';
            let th2 = document.createElement('th');
            th2.scope = 'col';
            th2.innerText = 'Airdate';
            let th3 = document.createElement('th');
            th3.scope = 'col';
            th3.innerText = 'Name';

            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            thead.append(tr);
            table.append(thead);

             for(let e of res.data){

                if(e.season != seas){
                    seas = e.season;
                    
                    h2 = document.createElement('h2');
                    h2.id = 'epSeason';
                    h2.innerText = `Season ${seas}`;
                    tableContainer.append(h2);

                    table = document.createElement('table');
                    table.id = 'table';
                    table.classList = 'table table-striped table-primary table-sm table-bordered';
        
                    thead = document.createElement('thead');
                    tr = document.createElement('tr');
                    th1 = document.createElement('th');
                    th1.scope = 'col';
                    th1.innerText = 'Episode';
                    th2 = document.createElement('th');
                    th2.scope = 'col';
                    th2.innerText = 'Airdate';
                    th3 = document.createElement('th');
                    th3.scope = 'col';
                    th3.innerText = 'Name';
        
                    tr.append(th1);
                    tr.append(th2);
                    tr.append(th3);
                    thead.append(tr);
                    table.append(thead);
                }

                const tbody = document.createElement('tbody');
                const trbody = document.createElement('tr');
                const thbody = document.createElement('th');
                thbody.scope = 'row';
                thbody.innerText = e.number;

                const td1 = document.createElement('td');
                td1.innerText = e.airdate;
                const td2 = document.createElement('td');
                td2.innerText = e.name;

                trbody.append(thbody);
                trbody.append(td1);
                trbody.append(td2);
                tbody.append(trbody);
                table.append(tbody);
                tableContainer.append(table);

                document.body.append(tableContainer);
            }    
        }     
    }
    catch(e){
        console.log("Error!", e);
    }
}

function clearWindow(){
    //remove shows/seasons/episodes and/or error if exists
    try{
        const removeShows = document.querySelectorAll('#showContainer');
        for(let show of removeShows){
            show.remove();
        }
        const removeCast = document.querySelectorAll('#castContainer');
        for(let char of removeCast){
            char.remove();
        }
        const removeEpisodes = document.querySelector('#tableContainer');
        removeEpisodes.remove();
    }
    catch(e){}
    try{
        const removeSeasons = document.querySelectorAll('#seasonContainer');
        for(let season of removeSeasons){
            season.remove();
        }
        const h1 = document.querySelector('#castTitle');
        h1.remove();
    }
    catch(e){}
    try{
        const h3 = document.querySelector('#error');
        h3.remove();
    }
    catch(e){}
}
