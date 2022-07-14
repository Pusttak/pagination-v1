import { Pagination } from "./pagination-api";

const allPages = 12;
const step = 6;
const galleryEl = document.querySelector(".gallery");
const searchQuery = "batman";

// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = '33bcb89e36b34d36b896a35a11214f25';

// async function getPages() {
//     const url =`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=1`;

//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }

const api = new Pagination("api");

api.create({
  prelink: galleryEl,
  totalPages: allPages,
  step: step,
  arrows: true,
  dots: true,
  currentEvent: getMovies,
  arrows: true,
  dots: true,
  scrollPage: true,
});

function getMovies() {
  console.log("asdasd");
}
