// const { createElement } = require("react");

// console.log('i am javascript')
const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')  // response promice
        .then(res => res.json()) // promice of json data
        // .then(json => console.log(json.data))  // console.log  এ না দেখে  displayLesson এ দেখবো
        .then(json => displayLesson(json.data))
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach((btn) => btn.classList.remove('active'))
}

const loadLevelWord = id => {
    // console.log(id)
    // const url =`https://openapi.programming-hero.com/api/level/5
    // 5 na hoye ${id} hobe karon eita shobar jonno call korbe
    // `
    const url = `https://openapi.programming-hero.com/api/level/${id}`; // jate click korbe shudhu tar id
    // console.log(url)
    fetch(url)
        .then(res => (res.json()))
        .then(data => {
            removeActive()
            const clickbtn = document.getElementById(`lesson-btn-${id}`)
            console.log(clickbtn);
            clickbtn.classList.add('active')  //btn dhorte
            displaylevelWord(data.data)
        })
}

const displaylevelWord = (words) => {
    // console.log(word)

    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = "";   //  bar bar click korle ekoi jinish ar ashbe na
    if (words.length === 0) {
        wordContainer.innerHTML = `
         <div class="text-center col-span-full space-y-10 m-20 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="font-bold text-4xl">
নেক্সট Lesson এ যান            </h1>
        </div>
        `
        // alert('no word')
        return;
    }


    words.forEach(word => {
        // console.log(word)
        const card = document.createElement('div')

        card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning / Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>

        `
        wordContainer.append(card)
    });
}

//load funtion
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    console.log(url)
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)
}
// display function
const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById('details-container')
    detailsBox.innerHTML = `
<div class=" space-y-5">
 <div>
                <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
            </div>
            <div>
                <h2 class=" font-bold">Meaning</h2>
                <p>${word.meaning}</p>
            </div>
            <div>
                <h2 class=" font-bold">Example</h2>
                <p>${word.sentence}</p>
            </div>
            <div>
                <h2 class=" font-bold">Synonym</h2>
                <span class="btn">555</span>
                <span class="btn">555</span>
                <span class="btn">555</span>
            </div>
</div>
    
    
    
    `
    // modal show korte 
    document.getElementById('my_modal_5').showModal();
}

const displayLesson = (lessons) => {
    console.log(lessons)
    // 1. get the container & empty
    const levelcontainer = document.getElementById('level-container')
    levelcontainer.innerHTML = '';
    // 2.get into every lesson 
    for (let lesson of lessons) {
        // 3. create Element
        // console.log(lesson)
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-brands fa-leanpub"></i> Lesson-${lesson.level_no}</button >

        `
        // 4. append child
        levelcontainer.append(btnDiv)
    }

}
loadLesson();   //dekhte hole function call korte hobe