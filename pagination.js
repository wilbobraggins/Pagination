
const arryList = new Array();
const list = new Array();
let pageList = new Array();
let currentPage = 1;
let numberPerPage = 2;
let numberOfPages = 0;

async function getData() {
    let response = await fetch('http://www.mocky.io/v2/5ed479f53300005100f7a1bb');
    let data = await response.json()
    return data;
}


function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

async function loadList() {
    getData()
        .then(function (data) {
            let books = data.books;
            for (i = 0; i < books.length; i++) {
                let author = books[i].author.toString()
                let title = books[i].title.toString()
                list.push(`${title} by ${author}`);
            }
            numberOfPages = getNumberOfPages();
            let begin = ((currentPage - 1) * numberPerPage);
            let end = begin + numberPerPage;
            pageList = list.slice(begin, end);
            drawList();
            check();
        });

}

function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function drawList() {
    document.getElementById("book").innerHTML = "";
    for (r = 0; r < pageList.length; r++) {
        document.getElementById("book").innerHTML += pageList[r] + "<br/>";
    }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
}

function load() {
    getData();
    loadList();
}

window.onload = load;