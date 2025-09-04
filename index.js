// const { createElement } = require("react");

// console.log('i am javascript')
const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')  // response promice
        .then(res => res.json()) // promice of json data
        // .then(json => console.log(json.data))  // console.log  এ না দেখে  displayLesson এ দেখবো
        .then(json => displayLesson(json.data))
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
        .then(data => (displaylevelWord(data.data)))
}

const displaylevelWord = (words) => {
    // console.log(word)
    //     // {
    //     "id": 81,
    //         "level": 1,
    //             "word": "Ball",
    //                 "meaning": "বল",
    //                     "pronunciation": "বল"
    // }

    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = "";   //  bar bar click korle ekoi jinish ar ashbe na
    words.forEach(word => {
        // console.log(word)
        const card = document.createElement('div')

        card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning / Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">${word.meaning}/${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>

        `
        wordContainer.append(card)
    });
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-brands fa-leanpub"></i> Lesson-${lesson.level_no}</button >

        `
        // 4. append child
        levelcontainer.append(btnDiv)
    }

}
loadLesson();   //dekhte hole function call korte hobe