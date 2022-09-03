catView = async(id)=> {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    const filterdData = await res.json()
    const catArray = filterdData.data;
    displayNews(catArray);
}

catView('02')

displayNews = async (ref) => {
    const parentDiv = document.getElementById('newsDiv');
    parentDiv.textContent = '';
    ref.forEach(news => {
        const {author, details, image_url, others_info , thumbnail_url, title, total_view} = news;
       const singleNews = document.createElement('div');
       singleNews.innerHTML = `
       <div
       class="container mx-auto my-8 border rounded-xl border-slate-300 border-opacity-25 flex shadow-lg shadow-red-100
        w-4/6 h-auto"
     >
       <div class="img w-1/3">
         <img
           src="${image_url ? thumbnail_url : N/A}"
           class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-full md:rounded-none md:rounded-l-lg"
           alt=""
         />
       </div>
       <div class="card-body w-2/3 bg-pink-50">
         <h2 class="pl-3 mt-5 text-2xl font-semibold tracking-wide  text-rose-600">
           ${title}
         </h2>
         <p class="mr-16 ml-3 my-3 font-normal text-sm text-gray-500">
           ${details.length > 300 ? details.slice(0, 305) + (" ...")  : details}
         </p>
         <div
           class="card-footer mt-8 px-5 py-1 flex justify-between items-center bg-teal-100 bg-opacity-30"
         >
           <div class="viewDiv flex">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6"
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
             <p class="pl-2">${total_view} views</p>
           </div>
           <button class="relative inline-flex items-center justify-center  text-sm font-medium text-emerald-600 hover:text-red-500">Read More<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
                
            </button>
           <div class="userDiv flex">
             <img
               src="${author.img? author.img : 'N/A'}"
               class="w-12 rounded-full"
               alt=""
             />
             <div class="user ml-2">
               <p class="text-sm font-medium">${author.name? author.name : 'unknown'}</p>
               <p class="text-sm font-light">${author.published_data? author.published_data : 'N/A' }</p>
             </div>
           </div>
         </div>
       </div>
     </div>`
    parentDiv.appendChild(singleNews)
    })
}