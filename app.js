catView = async (id) => {
  try {
    displayLoader(true);
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${id}`
    );
    const filterdData = await res.json();
    const catArray = filterdData.data;
    const elementNumber = catArray.length;
    // console.log(elementNumber);
    const errorDiv = document.getElementById("searchField");
    if (elementNumber === 0) {
      errorDiv.value = `No News Found`;
    } else {
      errorDiv.value = `${elementNumber} News Found`;
    }

    displayNews(catArray);
  } catch (error) {}
};

document.getElementById("searchMe").addEventListener("click", (e) => {
  e.preventDefault();
  // const api = d907697d98a74d5db4a05c86529c205d;
  const field = document.getElementById("searchField");
  const searchText = field.value;
  // console.log(api);

  fetch(
    `https://newsapi.org/v2/everything?qInTitle=${searchText}&from=2022-11-25&sortBy=publishedAt&apiKey=api&language=en`
  )
    .then((res) => res.json())
    .then((data) => {
      displayNews(data.articles);
      console.log(data);
    })
    .catch((error) => console.log(error));
});

displayLoader = (isLoading) => {
  const loader = document.getElementById("loader");
  isLoading
    ? loader.classList.remove("hidden")
    : loader.classList.add("hidden");
};

displayNews = async (ref) => {
  const parentDiv = document.getElementById("newsDiv");
  parentDiv.textContent = "";
  ref.forEach((news) => {
    const {
      author,
      details,
      image_url,
      content,
      description,
      publishedAt,
      urlToImage,
      _id,
      others_info,
      thumbnail_url,
      title,
      total_view,
    } = news;
    // console.log(news);
    const stringobj = JSON.stringify(news);
    const singleNews = document.createElement("div");
    singleNews.innerHTML = `
       <div
       class="container w-full my-5 lg:mx-auto border rounded-xl border-slate-300 border-opacity-20 lg:flex p-2 shadow-red-100
        lg:w-4/5  shadow-lg"
     >
       <div class="lg:h-60 w-60">
         <img
           src="${thumbnail_url || urlToImage}"
           class="object-scale-down lg:object-cover w-full h-full mx-auto rounded-t-lg md:rounded-l-lg"
           alt=""
         />
       </div>
       <div class="card-body bg-sky-50 lg:w-full">
         <h2 class="p-4 text-lg  lg:text-xl tracking-tight  text-rose-600">
           ${title?.length > 35 ? title.split(" ", 7).join(" ") : title}
         </h2>
         <p class="mr-16 ml-3 my-3 font-normal text-sm text-gray-500">
           ${
             details?.length || description.length > 300
               ? details.slice(0, 150) || description.slice(0, 150) + " ..."
               : details || description
           }
         </p>
         <div
           class="card-footer mx-1 lg:my-5 flex justify-between items-center bg-teal-100 bg-opacity-30"
         >
           <div class="viewDiv flex">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="currentColor"
               class="w-4 h-4 hidden lg:block"
             >
               <path
                 stroke-linecap="round"
                 stroke-linejoin="round"
                 d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
               />
               <path
                 stroke-linecap="round"
                 stroke-linejoin="round"
                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
               />
             </svg>
             <p class="text-xs pl-1 hidden lg:block">${
               total_view ? total_view + " views" : "N/A"
             }</p>
           </div>
           <button class="relative inline-flex items-center justify-center text-sm font-medium text-emerald-600 hover:text-red-500" 
           onclick='viewDetails("${_id}")'> Read More <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
                
            </button>
           <div class="userDiv flex">
             <img
               src="${author?.img ? author.img : "N/A"}"
               class=" h-10 rounded-full"
               alt=""
             />
             <div class="user ml-2">
               <p class="text-xs font-medium">${
                 author?.name || author ? author.name || author : "anonymous"
               }</p>
               <p class="text-xs font-light">${
                 author?.published_date || publishedAt
                   ? author?.published_date || publishedAt
                   : "N/A"
               }</p>
             </div>
           </div>
         </div>
       </div>
     </div>`;
    parentDiv.appendChild(singleNews);
  });
  displayLoader(false);
};

displayLoader(false);
viewDetails = async (id) => {
  try {
    const modalId = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`
    );
    const filteredModal = await modalId.json();
    const singleId = filteredModal.data;
    singleId.forEach((modal) => {
      const { author, details, title } = modal;
      console.log(modal);
    });
  } catch (error) {}
};
