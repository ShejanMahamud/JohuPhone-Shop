const loadPhone = async () => {
    const searchBox = document.getElementById("search-box").value;
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox}`);
    const data = await res.json();
    displayPhones(data.data);
};

const displayPhones = phones => {
    const phoneContainer = document.getElementById("phone-container");
    phones.forEach(phone => {
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
    });
    
}