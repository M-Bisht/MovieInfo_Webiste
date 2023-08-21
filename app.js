const container = document.querySelector(".container");
const footer= document.createElement("footer");
footer.classList.add("footer");
footer.append('Made By Mayank')
container.insertAdjacentElement("afterEnd", footer)

const apiKey = "f5d22ab1";

async function apiSearch(searchVal) {
  const url = `http://www.omdbapi.com/?s=${searchVal}&type=movie&apikey=${apiKey}`;
  const fetch = await axios.get(url);
  const data = fetch.data.Search;
  return data;
}

async function imdbSearch(id) {
  const url = `http://www.omdbapi.com/?i=${id}&plot=short&apikey=${apiKey}`;
  const fetch = await axios.get(url);
  const data = fetch.data;
  return data;
}

async function apiData(search) {
  // let search = "pokemon";
  const data = await apiSearch(search);

  // Creating Section and its child

  const section = document.createElement("section");
  section.classList.add("section");
  section.classList.add("hide");

  const sectionDiv1 = document.createElement("div");
  sectionDiv1.append(search);
  sectionDiv1.classList.add("sectionDiv1");

  const sectionDiv2 = document.createElement("div");
  sectionDiv2.classList.add("sectionDiv2");

  const leftArrow = arrow("left");
  const rightArrow = arrow("right");

  // Adding in HTML
  section.appendChild(sectionDiv1);
  section.appendChild(sectionDiv2);
  section.appendChild(leftArrow);
  section.appendChild(rightArrow);

  data.forEach((elem) => {
    if (elem.Poster != "N/A") {
      // Creating ImgDiv
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("imgDiv");

      let scroll = 0;

      rightArrow.addEventListener("click", () => {
        const maxScrollX = sectionDiv2.scrollWidth - sectionDiv2.clientWidth;
        scroll = Math.min(scroll + 260, maxScrollX);
        sectionDiv2.scrollTo({
          left: scroll,
          behavior: "smooth",
        });
      });

      leftArrow.addEventListener("click", () => {
        scroll = Math.max(scroll - 260, 0);
        sectionDiv2.scrollTo({
          left: scroll,
          behavior: "smooth",
        });
      });

      // Creating Img
      const img = document.createElement("img");
      img.classList.add("img");
      img.setAttribute("src", elem.Poster);
      img.setAttribute("alt", elem.Title);

      // Adding in HTML

      imgDiv.appendChild(img);
      sectionDiv2.appendChild(imgDiv);
      container.appendChild(section);

      // imgDiv Style

      imgDiv.addEventListener("click", async () => {
        // const data = await imdbSearch(elem.imdbID);
        // console.log(data);

        // Creating Black Background
        const blackBg = document.createElement("div");
        blackBg.classList.add("blackBg");

        // Creating Large Img Div
        const imgDivClick = document.createElement("div");
        imgDivClick.classList.add("imgDivClick");

        // Creating Large Img Div Close button

        let closeBtn = clossButton("largeDivCloseBtn");

        // Calling Imdb Function
        const imdbData = await imdbSearch(elem.imdbID);

        // Large div HTML
        const largeDivHtml = `
        <img src=${imdbData.Poster} alt=${imdbData.Title}/>
        <h2>${imdbData.Title}</h2>
        <div class="rowDivs rowDiv1">
          <div>
            <h3>Country</h3>
            <span>${imdbData.Country}</span>
          </div>
          <div>
            <h3>Language</h3>
            <span>${imdbData.Language}</span>
          </div>
          <div>
            <h3>Rating</h3>
            <span>${imdbData.imdbRating}</span>
          </div>
        </div>
        <div class="singleDiv actors">
          <h3>Actors</h3>
          <span>${imdbData.Actors}</span>
        </div>
        <div class="plot">
          <h3>Plot</h3>
          <span> ${imdbData.Plot}</span>
        </div>
        <div class="singleDiv awards">
          <h3>Awards</h3>
          <span>${imdbData.Awards}</span>
        </div>
        <div class="singleDiv">
          <h3>Director</h3>
          <span>${imdbData.Director}</span>
        </div>
        <div class="singleDiv">
          <h3>Writer</h3>
          <span>${imdbData.Writer}</span>
        </div>
        <div class="singleDiv">
          <h3>Genre</h3>
          <span>${imdbData.Genre}</span>
        </div>
        <div class="singleDiv">
          <h3>Released Date</h3>
          <span>${imdbData.Released}</span>
        </div>
        <div class="singleDiv">
          <h3>Length</h3>
          <span>${imdbData.Runtime}</span>
        </div>`;

        // Add in HTMl
        imgDivClick.appendChild(closeBtn);
        imgDivClick.insertAdjacentHTML("afterbegin", largeDivHtml);
        container.appendChild(blackBg);
        container.appendChild(imgDivClick);
        document.body.style.overflow = "hidden";
        // Style
        closeBtn.addEventListener("click", () => {
          imgDivClick.style.display = "none";
          blackBg.style.display = "none";
          document.body.style.overflow = "";
        });

        blackBg.addEventListener("click", () => {
          imgDivClick.style.display = "none";
          blackBg.style.display = "none";
          document.body.style.overflow = "";
        });
      });
    }
  });
}

apiData("shinchan");
apiData("pokemon");
apiData("batman");
apiData("spiderman");
apiData("aaa");

function arrow(dir) {
  const arrow = document.createElement("i");
  arrow.classList.add("fa-solid");
  arrow.classList.add(`fa-circle-${dir}`);
  arrow.classList.add("arrows");
  return arrow;
}

function clossButton(cls) {
  const largeDivCloseBtn = document.createElement("i");
  largeDivCloseBtn.classList.add("fa-solid");
  largeDivCloseBtn.classList.add("fa-circle-xmark");
  largeDivCloseBtn.classList.add(cls);
  return largeDivCloseBtn;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWQzMjUxY2Q2MjU3ZjUzMTg0ODAxNzY1NDBhZGZiMiIsInN1YiI6IjY0YmU1ZTk5ODVjMGEyMDBlNzg2NzA3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vR56VBz7skRcoPWsSfTv66NK0HlpNIIgh2acTt65hEU",
  },
};

async function heroImg() {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
  const fetch = await axios.get(url, options);
  const data = fetch.data.results;
  return data;
}

async function heroImgSet() {
  const heroSection = document.querySelector(".heroSection");
  const data = await heroImg();

  data.forEach((img, index) => {
    const heroImages = document.createElement("img");
    heroImages.classList.add("heroImg");
    heroImages.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original${img.backdrop_path}`
    );
    heroSection.appendChild(heroImages);

    let counter = 0;
    let cLength = data.length;

    const slider = () => {
      heroImages.style.transform = `translateX(${counter * 100}%)`;
    };

    setInterval(() => {
      counter--;
      counter < -`${cLength - 1}` ? (counter = 0) : counter;
      slider();
    }, 3000);
  });
}
heroImgSet();

const searchInput = document.querySelector(".searchInput");
const searchButton = document.querySelector(".fa-magnifying-glass");
const header = document.querySelector("header");

searchButton.addEventListener("click", () => {
  let searchVal = searchInput.value;
  if (searchVal.length != 0) {
    async function apiSearchData() {
      const data = await apiSearch(searchVal);

      const heroSection = document.querySelector(".heroSection");
      const sections = document.querySelectorAll(".hide");

      let searchSection = document.createElement("section");
      searchSection.classList.add("searchSection");
      header.insertAdjacentElement("afterend", searchSection);

      const searchSectionDiv1 = document.createElement("div");
      searchSectionDiv1.classList.add("searchSectionDiv1");
      const dltBtn = clossButton("searchCloseBtn");
      dltBtn.addEventListener("click", () => {
        searchSection.style.display = "none";
        for (const section of sections) {
          section.style.display = "";
        }
        heroSection.style.display = "";
      });
      searchSectionDiv1.appendChild(dltBtn);

      const searchSectionDiv2 = document.createElement("div");
      searchSectionDiv2.classList.add("searchSectionDiv2");

      searchSection.appendChild(searchSectionDiv1);
      searchSection.appendChild(searchSectionDiv2);

      for (const section of sections) {
        section.style.display = "none";
      }
      heroSection.style.display = "none";

      data.forEach((elem) => {
        if (elem.Poster != "N/A") {
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("imgDiv");

          // Creating Img
          const img = document.createElement("img");
          img.classList.add("img");
          img.setAttribute("src", elem.Poster);
          img.setAttribute("alt", elem.Title);

          // Adding in HTML
          imgDiv.appendChild(img);
          searchSectionDiv2.appendChild(imgDiv);

          // imgDiv Style
          imgDiv.addEventListener("click", async () => {
            // Creating Black Background
            const blackBg = document.createElement("div");
            blackBg.classList.add("blackBg");

            // Creating Large Img Div
            const imgDivClick = document.createElement("div");
            imgDivClick.classList.add("imgDivClick");

            // Creating Large Img Div Close button
            let closeBtn = clossButton("largeDivCloseBtn");

            // Calling Imdb Function
            const imdbData = await imdbSearch(elem.imdbID);

            // Large div HTML
            const largeDivHtml = `
        <img src=${imdbData.Poster} alt=${imdbData.Title}/>
        <h2>${imdbData.Title}</h2>
        <div class="rowDivs rowDiv1">
          <div>
            <h3>Country</h3>
            <span>${imdbData.Country}</span>
          </div>
          <div>
            <h3>Language</h3>
            <span>${imdbData.Language}</span>
          </div>
          <div>
            <h3>Rating</h3>
            <span>${imdbData.imdbRating}</span>
          </div>
        </div>
        <div class="singleDiv actors">
          <h3>Actors</h3>
          <span>${imdbData.Actors}</span>
        </div>
        <div class="plot">
          <h3>Plot</h3>
          <span> ${imdbData.Plot}</span>
        </div>
        <div class="singleDiv awards">
          <h3>Awards</h3>
          <span>${imdbData.Awards}</span>
        </div>
        <div class="singleDiv">
          <h3>Director</h3>
          <span>${imdbData.Director}</span>
        </div>
        <div class="singleDiv">
          <h3>Writer</h3>
          <span>${imdbData.Writer}</span>
        </div>
        <div class="singleDiv">
          <h3>Genre</h3>
          <span>${imdbData.Genre}</span>
        </div>
        <div class="singleDiv">
          <h3>Released Date</h3>
          <span>${imdbData.Released}</span>
        </div>
        <div class="singleDiv">
          <h3>Length</h3>
          <span>${imdbData.Runtime}</span>
        </div>`;

            // Add in HTMl
            imgDivClick.appendChild(closeBtn);
            imgDivClick.insertAdjacentHTML("afterbegin", largeDivHtml);
            searchSection.appendChild(blackBg);
            searchSection.appendChild(imgDivClick);
            document.body.style.overflow = "hidden";
            // Style
            closeBtn.addEventListener("click", () => {
              imgDivClick.style.display = "none";
              blackBg.style.display = "none";
              document.body.style.overflow = "";
            });

            blackBg.addEventListener("click", () => {
              imgDivClick.style.display = "none";
              blackBg.style.display = "none";
              document.body.style.overflow = "";
            });
          });
        }
      });
    }
    apiSearchData();
  }
});
