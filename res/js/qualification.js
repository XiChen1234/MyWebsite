var edu_tab = document.querySelector("#edu-tab")
var work_tab = document.querySelector("#work-tab")
var edu_timeline = document.querySelector("#edu-timeline")
var work_timeline = document.querySelector("#work-timeline")

edu_tab.addEventListener('click', ()=>{
    edu_timeline.classList.remove('hidden')
    work_timeline.classList.add('hidden')

    edu_tab.classList.add('active')
    work_tab.classList.remove('active')
})
work_tab.addEventListener('click', ()=>{
    edu_timeline.classList.add('hidden')
    work_timeline.classList.remove('hidden')

    edu_tab.classList.remove('active')
    work_tab.classList.add('active')
})