let dark = document.getElementById("modeDark");
let Bodyi = document.getElementById("Boody");
let navbar = document.getElementById("NavBar");

let darkmode = localStorage.getItem("darkmode");

function lighting() {
  Bodyi.classList.add("bodyDark");
  dark.setAttribute("class", "fa-solid fa-sun mode text-light");
  navbar.setAttribute("class", "navbar bg-dark");
  localStorage.setItem("darkmode", "active");
}

function darking() {
  dark.setAttribute("class", "fa-solid fa-moon mode");
  navbar.setAttribute("class", "navbar bg-light");
  Bodyi.classList.remove("bodyDark");
  localStorage.setItem("darkmode", null);
}

if (darkmode === "active") lighting();

theme_switch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? lighting() : darking();
});

// ==============================fetch api====================================




const API_KEY = "FCdfm-8PIIaXwgjplouDlkLMLWJTEsxHtGsxyVORLL4";
const API_URL = "https://api.unsplash.com/search/photos?per_page=1&client_id=" + API_KEY;
let Gene = document.getElementById("btnGen");
let download = document.getElementById("download");

Gene.addEventListener("click", function () {
  const searchInput = document.getElementById("searchInput");
  const gallery = document.getElementById("gallery");

  let wi = document.getElementById("width");
  let hi = document.getElementById("height");


  const query = searchInput.value.trim();
  if (query === "") {
    alert("من فضلك أدخل كلمة بحث!");
    return;
  }

  const width = wi.value ? wi.value : "200";
  const height = hi.value ? hi.value : "200";

  fetchImages(query, width, height);

  function fetchImages(query, width, height) {
    const url = `${API_URL}&query=${encodeURIComponent(query)}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayImages(data.results, width, height);
      })
      .catch(error => console.error("Error fetching images:", error));
  }


  function displayImages(images, width, height) {
    gallery.innerHTML = "";

    if (images.length === 0) {
      gallery.innerHTML = "<p class='text-danger'>No Image Found</p>";
      return;
    }

    

    images.forEach(image => {
      const imgElement = document.createElement("img");
      imgElement.src = image.urls.small;
      imgElement.alt = image.alt_description;
      imgElement.id = "IMAge";

      imgElement.style.width = width + "px";
      imgElement.style.height = height + "px";
      imgElement.style.margin = "10px";

      gallery.appendChild(imgElement);
    });
  }
});


download.onclick = function() {
  let img = document.getElementById("IMAge");
  if (!img) {
      alert("لا توجد صورة للتحميل!");
      return;
  }
  const link = document.createElement("a");
  link.href = img.src;
  link.download = "downloaded-image.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

