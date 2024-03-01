const loadPhone = async (isShowing) => {
  loadingSpinner(true);
  const searchText = document.getElementById("search-box").value;
  if(searchText !== ''){
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();

  if(data.status === true){
    displayPhone(data.data,isShowing);
    document.getElementById("not-found").classList.add("hidden");

  }
  else{
    document.getElementById("not-found").classList.remove("hidden");
  }
  }else{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
  const data = await res.json();
  displayPhone(data.data,isShowing);
  }
}

const displayPhone = (phone,isShowing) => {
  const phoneContainer = document.getElementById("phone-container");
  const loadMore = document.getElementById("load-more");
  phoneContainer.innerHTML = "";
  
  if(phone.length < 12){
    loadMore.classList.add("hidden");
  }else{
    loadMore.classList.remove("hidden");
  }
  if(!isShowing){
    phone = phone.slice(0,12);
  }else{
    loadMore.classList.add("hidden");
  }
  phone.forEach(phone => {
   const phoneCard = document.createElement("div");
   phoneCard.innerHTML = `
   <div
          class="p-5 border-2 border-[#cfcfcf] rounded-2xl flex flex-col items-center gap-5"
        >
          <div
            class="bg-[#0d6efd0d] rounded-xl flex items-center justify-center py-10 w-full"
          >
            <img src="${phone.image}" alt="Iphone" />
          </div>
          <h1 class="text-2xl font-semibold">${phone.phone_name}</h1>
          <p class="text-secondary text-sm text-center">
            There are many variations of passages of available, but the majority
            have suffered
          </p>
          <span class="text-lg font-semibold">Price: $900</span>
          <button
            class="bg-primary px-4 py-2 rounded-lg text-white font-semibold" id="details" onclick="readMoreBtn('${phone.slug}')"
          >
            Read More
          </button>
        </div>
        
   `
   
   phoneContainer.appendChild(phoneCard);

  });
  loadingSpinner(false);
}


const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById("loading");
 
  if(isLoading){
    spinner.classList.remove("hidden");
  }else{
    spinner.classList.add("hidden");
  }
}

const readMoreBtn = async (id) => {

  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phoneData = data.data;
  document.getElementById("modal-box").innerHTML = `
  <div
            class="bg-[#0d6efd0d] rounded-xl flex items-center justify-center py-10 w-full"
          >
            <img src="${phoneData.image}" alt="Iphone" />
          </div>
   <h3 class="font-bold text-lg">${phoneData.name}</h3>
   <p class="py-4">${phoneData?.description || "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}</p>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Brand: </span>
   <span >${phoneData?.brand || "Brand not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Storage: </span>
   <span >${phoneData?.mainFeatures?.storage || "Storage not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Display Size: </span>
   <span >${phoneData?.mainFeatures?.displaySize || "Display size not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Chipset: </span>
   <span >${phoneData?.mainFeatures?.chipSet || "Chipset not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Memory: </span>
   <span >${phoneData?.mainFeatures?.memory || "Memory not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Sensors: </span>
   <span >${phoneData?.mainFeatures?.sensors || "Sensors not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Wifi: </span>
   <span >${phoneData?.others?.WLAN || "Wifi not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Bluetooth: </span>
   <span >${phoneData?.others?.Bluetooth || "Bluetooth not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">GPS: </span>
   <span >${phoneData?.others?.GPS || "GPS not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">NFC: </span>
   <span >${phoneData?.others?.NFC || "NFC not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Radio: </span>
   <span >${phoneData?.others?.Radio || "Radio not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">USB: </span>
   <span >${phoneData?.others?.USB || "USB not specified"}</span>
   </div>

   <div class="flex items-center justify-between">
   <span class="font-semibold">Release Date: </span>
   <span >${phoneData?.releaseDate || "Release Date not specified"}</span>
   </div>

   

   <div class="modal-action">
               <form method="dialog">
                 <!-- if there is a button in form, it will close the modal -->
                 <button class="btn">Close</button>
               </form>
             </div>
   `
   showModal.showModal()
}

const showAllBtn = () =>{
  loadPhone(true)
}
loadPhone()