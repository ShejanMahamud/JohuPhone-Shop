const allPhones = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
  const data = await res.json();
  const iphones = data.data;
  onLoadDisplay(iphones)
}

const onLoadDisplay = card => {
  const phoneContainer = document.getElementById("phone-container");
  card.forEach(phone => {
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
      class="bg-primary px-4 py-2 rounded-lg text-white font-semibold"
    >
      Read More
    </button>
  </div>
          
          `
          phoneContainer.appendChild(phoneCard);
  })
}
document.addEventListener('DOMContentLoaded', allPhones);

const loadPhone = async (isShowing) => {
  loadingSpinner(true);
  const searchText = document.getElementById("search-box").value;
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  displayPhone(data.data,isShowing);
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
    loadMore.classList.remove("hidden");
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
            class="bg-primary px-4 py-2 rounded-lg text-white font-semibold" id="details" onclick="my_modal_5.showModal()"
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


const showAllBtn = () =>{
  loadPhone(true)
}