const card = document.getElementById('insert-Card');
const modalCardOne = document.getElementById('firstmodal');
const modalCardTwo = document.getElementById('secondModal');
const showAllSection = document.getElementById('showall');
const spinner = document.getElementById('spinner');
const showAllBtn = document.getElementById('show-btn');
const sortBtn = document.getElementById('sort-button');

let allAi = [];

const loadAidata = async (data1) => {
  toggleLoader(true);
  const response = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  const apiData = await response.json();
  displayApi(apiData.data.tools, data1);
  allAi.push(...apiData.data.tools);
};

const toggleLoader = isloading => {
  return new Promise(resolve => {
    if (isloading) {
      spinner.classList.remove('hidden');
    } else {
      spinner.classList.add('hidden');
    }
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const sortAllData = (data) => {
  return new Promise(resolve => {
    data.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
    resolve(data);
  });
}

sortBtn.addEventListener('click', async () => {
  card.innerHTML = '';
  toggleLoader(true);
  const sortedData = await sortAllData(allAi);
  displayApi(sortedData);
  await toggleLoader(false);
});

showAllBtn.addEventListener("click", function () {

  loadAidata();

});
const displayApi = async (allAi, data1) => {
  card.innerText = '';
  if (data1 && allAi.length > 7) {
    allAi = allAi.slice(0, 6);
    showAllSection.classList.remove('hidden')
  } else {
    showAllSection.classList.add('hidden')
  }
  for (const aiData of allAi) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="rounded-t-lg" src="${aiData.image}" alt="" />
        </a>
        <div class="p-5">
            <a href="./index.html">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Features</h5>
            </a>
            <ul class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <li class="m-2">1 <span class="text-md mx-2">${aiData.features[0]}</span></li>
                <li class="m-2">2 <span class="text-md mx-2">${aiData.features[1]}</span></li>
                <li class="m-2">3 <span class="text-md mx-2}">${aiData.features[2] === undefined ? 'this features is missing' : aiData.features[2]}</span></li>              
            </ul>
            <hr class="h-1 my-6 bg-blue-300">
           <div class="flex justify-between items-center">
            <div>
                <h1 class="dark:text-white text-2xl font-semibold">${aiData.name}</h1>
                <p class="flex justify-evenly items-center dark:text-white"><img src="./New folder/Frame.png" alt=""> <span>${aiData.published_in}</span></p>
            </div>
            <button onclick="openModal(${aiData.id})" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            Details
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
           </div>
        </div>
    </div>
 `;
    card.appendChild(div);
  }
  toggleLoader(false);
};




// modal
const openModal = async (id) => {
  document.getElementById("myModal").classList.remove("hidden");

  const formattedId = id.toString().padStart(2, '0');
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${formattedId}`);
  const data = await res.json();


  modalFunction(data.data);
}



function modalFunction(data) {


  modalCardOne.innerHTML = `
    
    <a href="./index.html">
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
     ${data.description}
    </h5>
  </a>
  <div
    class="dark:text-white flex justify-between items-center font-semibold text-center px-10 my-5"
  >
  <div class="leading-10 text-blue-600">${data.pricing[0].price} <span class="">${data.pricing[0].plan}</span></div>
  <div class="leading-10 text-yellow-600">${data.pricing[1].price} <br> <span class="">${data.pricing[1].plan}</span></div>
  <div class="leading-10 text-green-600">${data.pricing[2].price}<span class="mx-4">${data.pricing[2].plan}</span></div>
  </div>
  <div class="flex justify-between">
    <div>
      <h2 class="text-2xl dark:text-white my-2">Features</h2>
      <ul class="text-gray-700 text-lg dark:text-white">
        <li class="text-gray-600 dark:text-white">1 <span>${data.features[1].feature_name}</span></li>
        <li class="text-gray-600 dark:text-white">2 <span>${data.features[2].feature_name}</span></li>
        <li class="text-gray-600 dark:text-white">3 <span>${data.features[3].feature_name}</span></li>
      </ul>
    </div>
    <div>
      <h2 class="text-2xl dark:text-white my-2">Integrations</h2>
      <ul class="text-xl">
        <li class="text-gray-600 dark:text-white">1. <span> ${data.integrations[0]}</span></li>
        <li class="text-gray-600 dark:text-white">2. <span> ${data.integrations[1]}</span></li>
        <li class="text-gray-600 dark:text-white">3. <span> ${data.integrations[2]}</span></li>
      </ul>
    </div>
  </div> `;
  modalCardTwo.innerHTML = `
  
  <div
  class="max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
  <div class="relative">
    <img
      src="${data.image_link[0]}"
      alt="AI Image"
      class="w-full"
    />
    <div
      class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
    >
    <span class="text-xs font-semibold">${data.accuracy.score > 0 ? data.accuracy.score * 100 : 'No found'}% Accuracy</span>
    </div>
  </div>
  <p class="text-center dark:text-white p-5 text-3xl">
   ${data.input_output_examples[0].input}
  </p>
  <p class="text-center dark:text-white p-5 text-xl">
  ${data.input_output_examples[0].output}
  </p>
</div>
  
  
  `;


}

function closeModal() {
  document.getElementById("myModal").classList.add("hidden");
}
// modal










// By default Data Is Loading 

const data1 = 'data';
loadAidata(data1);







