let apiRoot = "https://api.giphy.com/v1/gifs/";
let apiSearch = apiRoot + "search?";
let apiRandom = apiRoot + "random?";
let apiTrending = apiRoot + "trending?";
let apiAutoComplete = apiRoot + "search/tags?";
let apiKey = "&api_key=dyuNHmjsWFfX3L0yAEegS8XQJHFRDXuv";
let limitParam = "&limit=1";
let queryParam = "&q=";
let stringParam = "&s=";

function search() {
    let search = document.getElementById('search');
    let str = search.value.trim();
    if (str == null) { return }
    let url = apiSearch + apiKey + limitParam + queryParam + str;
    fetchData(url);
    search.value = null;
    $('#search').data().autocomplete.term = null;
}

function random() {
    let url = apiRandom + apiKey;
    fetchData(url);
}

function trending() {
    let url = apiTrending + apiKey;
    fetchData(url);
}

function autoComplete() {
    let str = document.getElementById('search').value.trim();
    if (str == null) { return }
    let url = apiAutoComplete + apiKey + queryParam + str;

    fetch(url)
    .then(response => response.json())
    .then(content => {
        
        let list = [];
        for (let img of content.data) {
            list.push(img.name);
        }

        $( "#search" ).autocomplete({
            source: list
        });
    });
    
}

function fetchData(url) {
    fetch(url)
    .then(response => response.json())
    .then(content => changeImage(content));
}

function changeImage(content) {

    if (content.data.images != null) {
        document.body.style.backgroundImage = "url(" + content.data.images.original.url + ")";
    } else if (content.data[0].images != null) {
        document.body.style.backgroundImage = "url(" + content.data[0].images.original.url + ")";
    }
    
}