const loader = document.getElementById("loader");
const categoryID = document.getElementById("category-id")
setTimeout(() => {
    loader.classList.add("hidden")
    categoryID.classList.remove("hidden")
    categoryID.classList.add("grid")
}, 2100)

// fetch all data 
// fetch category data btn 
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}

// fetch all pets categories 

const loadAllPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPets(data.pets))
        .catch(err => console.log(err))
}



const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn")
    for (let btn of buttons) {
        btn.classList.add("btn-outline")
        btn.classList.remove("rounded-full")
    }
}
let categoryyy = null
// fetch each category
const loadCategoryItem = (categoryItem) => {
    categoryyy = categoryItem
    loader.classList.remove("hidden")
    categoryID.classList.remove("grid")
    categoryID.classList.add("hidden")
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryItem}`)
        .then(res => res.json())
        .then(data => {
            // remove the all style  in button 
            removeActiveClass()


            const activeBtn = document.getElementById(`btn-${categoryItem}`)
            activeBtn.classList.add("rounded-full")
            activeBtn.classList.remove("btn-outline")
            setTimeout(() => {
                loader.classList.add("hidden")
                displayAllPets(data.data);
                categoryID.classList.remove("hidden")
                categoryID.classList.add("grid")

            }, 2000)

        })
        .catch(err => console.log(err))
}

// fetch card details 
const loadDetails = (petid) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petid}`)
        .then(res => res.json())
        .then(data => displayDetails(data.petData))
        .catch(err => console.log(err))
}



// display categories btn 
const displayCategories = (categories) => {

    const categoryBtnContainer = document.getElementById('category-btn')
    categories.forEach(item => {
        // create btn 

        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
        <button id="btn-${item.category}" onclick="loadCategoryItem('${item.category}')" class="btn btn-outline btn-success flex justify-center items-center gap-6 w-full category-btn">
            <img src="${item.category_icon}" alt="" class = "w-8 h-8">
            <p class="font-semibold text-xl">${item.category}</p>
        </button>
        `

        categoryBtnContainer.append(buttonContainer)
    });
}

// display all card 
const displayAllPets = (pets) => {

    const allCardContainer = document.getElementById('card-container');
    allCardContainer.innerHTML = "";
    if (pets?.length == 0) {
        allCardContainer.innerHTML = `
            <div class="col-span-3 flex flex-col justify-center items-center gap-6 bg-gray-50 rounded-lg p-10 container mx-auto text-center py-[48px] md:py-[100px]">
                <img src="./assets/error.webp" alt="">
                <h4 class="text-3xl font-semibold">No Information Available</h4>
                <p class="text-lg text-gray-500 w-2/3 mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                    its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `
        // return
    }
    pets?.forEach(pet => {
        const { image, pet_name, breed, date_of_birth, gender, price } = pet
        const div = document.createElement("div")
        div.classList = "p-5 border rounded-lg text-start"
        div.innerHTML = `
        <div class="pb-6">
            <img src=${image} alt="Shoes"
                class="rounded-lg w-full h-[180px]" />
        </div>
        <div class="space-y-2">
            <h3 class="text-xl lg:text-2xl font-bold">${pet_name}</h3>
            <p class="text-gray-500 font-semibold lg:text-xl flex items-center gap-1"><i class="fa-solid fa-border-all"></i> Breed: ${breed || "N/A"}</p>
            <p class="text-gray-500 font-semibold lg:text-xl flex items-center gap-1"><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth || "N/A"}</p>
            <p class="text-gray-500 font-semibold lg:text-xl flex items-center gap-1"><i class="fa-solid fa-venus"></i> Gender: ${gender || "N/A"}</p>
            <p class="text-gray-500 font-semibold lg:text-xl flex items-center gap-1"><i class="fa-solid fa-dollar-sign"></i> Price: ${price || "N/A"}$</p>
        </div>
        <div class="divider"></div>
        <div class ="flex justify-between items-center">
            <button onclick = "displaySelectedImage('${image}')" class="btn btn-outline btn-success"><i class="fa-solid fa-thumbs-up"></i></button>
            <button class="btn btn-outline btn-success font-bold">Adopt</button>
            <button onclick="loadDetails(${pet.petId})" class="btn btn-outline btn-success font-bold">Details</button>
        </div>
        `
        allCardContainer.append(div)

    });
}

// display selected card image 
const displaySelectedImage = (image) => {
    const selectCardContainer = document.getElementById("selected-card")

    const div = document.createElement("div")
    div.innerHTML = `
    <img class="rounded-lg" src =${image} alt="" />
    `
    selectCardContainer.append(div)


}
// display details 
const displayDetails = (details) => {
    const detailContainer = document.getElementById("modal_content")

    const { image, pet_name, breed, gender, date_of_birth, vaccinated_status, price, pet_details } = details;
    detailContainer.innerHTML = `
        <div class="space-y-6 text-start">
            <div><img class="w-full rounded-xl" src=${image} alt=""></div>
            <div class="space-y-4">
                <h3 class="text-2xl font-bold">${pet_name}</h3>
                <div class="grid grid-cols-2 grid-rows-3 gap-2">
                    <p class="text-gray-500 font-semibold flex items-center gap-1""><img src="../assets/breed.png" alt="" class="w-6 h-6" > Breed: ${breed || "N/A"}</p>
                    <p class="text-gray-500 font-semibold flex items-center gap-1""><img src="./assets/gender-24.png" alt="" class="w-6 h-6"/> Gender: ${gender || "N/A"}</p>
                    <p class="text-gray-500 font-semibold flex items-center gap-1""><img src="../assets/gender-24.png" alt="" class="w-6 h-6"/>Vaccinated Status: ${vaccinated_status}</p>
                    <p class="text-gray-500 font-semibold flex items-center gap-1""><img src="../assets/date-24.png" alt="" class="w-6 h-6" > Birth: ${date_of_birth || "N/A"}</p>
                    <p class="text-gray-500 font-semibold flex items-center gap-1""><img src="../assets/price.png" alt="" class="w-6 h-6" > Price: ${price || "N/A"}$</p>
                </div>
            </div>
            <div>
                <div>
                    <h4 class="text-xl font-bold">Detais Information</h4>
                    <p class ="text-gray-500 font-semibold">${pet_details}</p>
                </div>
            </div>
        </div>
    `
    console.log(details)


    document.getElementById("my_modal_4").showModal()
}




const sortData = () => {
    fetch(categoryyy == null ? `https://openapi.programming-hero.com/api/peddy/pets` : `https://openapi.programming-hero.com/api/peddy/category/${categoryyy}`)
        .then(res => res.json())
        .then(data => {
            const sortingValue = categoryyy == null ? data?.pets.sort((a, b) => b.price - a.price) : data?.data.sort((a, b) => b.price - a.price)
            displayAllPets(sortingValue)
            console.log(data)
        })

}



loadCategories()
loadAllPets()