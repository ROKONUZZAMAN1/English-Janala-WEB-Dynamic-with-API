// console.log('i am javascript')
const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')  // response promice
        .then(res => res.json()) // promice of json data
        // .then(json => console.log(json.data))  // console.log  এ না দেখে  displayLesson এ দেখবো
        .then(json => displayLesson(json.data))
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
        <button class="btn btn-outline btn-primary" href=""><i class="fa-brands fa-leanpub"></i> Lesson-${lesson.level_no}</button >

        `
        // 4. append child
        levelcontainer.append(btnDiv)
    }

}
loadLesson();   //dekhte hole function call korte hobe