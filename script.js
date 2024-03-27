const apiKey = "b9ef951176de4c5ea80c2d32925c805b";
const main_ele = document.getElementById('row_card');
const ser_inp = document.getElementById('ser-inp');
const ser_btn = document.getElementById('ser-btn');


(async()=>{
    try {
        const articles = await fetchNews();
        displayNews(articles);
    } catch (error) {
        console.log('There was some Error : ',error);
    }
})();

ser_btn.addEventListener('click', async () => {
    let ser_param = ser_inp.value.trim();
    if (ser_param !== "") {
        try {
            const ser_article = await searchNews(ser_param);
            displayNews(ser_article);
        } catch (err) {
            console.log("Error fetching News", err);
        }
    }
});

async function searchNews(ser_param) {
    try {
        const url = `https://newsapi.org/v2/everything?q=${ser_param}&from=2024-02-27&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.log(error);
    }
}

async function fetchNews() {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=US&category=business&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.log(error);
    }
}

function read(url) {
    window.open(url, "_blank");
}

function displayNews(articles) {
    let innercontent = '';
    articles.forEach((article) => {
        let title = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        let description = article.description != null ? (article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description) : 'NO DESCRIPTION';
        innercontent += `<div class="card" onclick="read('${article.url}')" style="width: 18rem;">
        <img class="card-img-top" src="${article.urlToImage}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
        </div>
    </div>`;
    });
    main_ele.innerHTML = innercontent;
}
