let container = document.querySelector(".container");
let searchBtn = document.querySelector(".search-btn");
let showMorebtn = document.querySelector('.showMore')
let form = document.querySelector('form')
let images;
let input = document.querySelector("input");
let apiKey = "g17R1F97TwKbI2qCNJSVB2KWfXiyS0nzGese2CkcfWk";
let top_part = document.querySelector('.top-part')
let heading =document.querySelector('.heading')
let paragraph =document.querySelector('.paragraph')
let jbrTag = document.querySelector('.jbr')



let callApi = async (pageNum , inputValue) => {
  let url = `https://api.unsplash.com/search/photos?page=${pageNum}&query=${input.value}&client_id=${apiKey}`;

  console.log(url)
  
  if(pageNum==1){
    container.innerHTML ="";  
    showMorebtn.classList.add('active')
    paragraph.innerHTML = '';
  }
  

  try {
    let api = await fetch(`${url}`).then((rs) => rs.json());

    let i = 0;

    while (i < 10) {
      images = document.createElement("div");
      images.classList.add("image");
      container.appendChild(images);

      let paraParent = document.createElement('div')
      paraParent.classList.add('paraParent')
      images.appendChild(paraParent)
      
      let title = document.createElement('p')
      
      paraParent.appendChild(title)
      
      title.innerText = `${api.results[i].alt_description}`

      images.style.backgroundImage = `url(${api.results[i].urls.small})`;

      // images.style.width = `${api.results[i].width / 11}px`;

      images.style.height = `${api.results[i].height / (16*0.9)}px`;

      images.style.border = "solid 5px white";

      images.style.backgroundSize = "cover";
      images.style.backgroundPosition = "center top";
      i++;
    }
  } catch (err) {
    console.log("jbr" + err);
  }
};

let page = 1;
showMorebtn.addEventListener('click',()=>{
  page++;
  callApi(page)
})

form.addEventListener("submit", (e) => {
  // let inputValue = input.value;
  let page = 1; 
  e.preventDefault()
  callApi(page);
});

window.addEventListener('scroll',(e)=>{
   if(10<=scrollY){
    top_part.style.backgroundColor ="rgb(67, 65, 65)"
    top_part.style.border = "2px white solid"
    heading.style.display = 'none'
    
    if(100<=scrollY){
      searchBtn.style.backgroundColor = "pink"
       if(1400<=scrollY){
        searchBtn.style.background = "purple"
      }
    }
    else{
      searchBtn.style.backgroundColor = "rgb(190, 176, 176)"
    }
  
   }
   else if(10<=scrollY){
    searchBtn.style.backgroundColor = "red"
   }
   else{
    top_part.style.backgroundColor ="#121212"
    top_part.style.border = "2px white solid"
    heading.style.display = 'block' 
  }
})
