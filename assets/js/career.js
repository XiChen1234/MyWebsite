/*
    1. 切换edu和work
    2. 展开
*/

/**
 * 切换edu和work
 */
const eduButton = document.getElementById('edu-button')
const workButton = document.getElementById('work-button')
const timeline = document.getElementsByClassName('timeline')
const expandButtonList = document.querySelectorAll('article#career .content .expand')
var type = true; // true表示edu，false表示work

eduButton.addEventListener('click', () => toggleTimeline(true))
workButton.addEventListener('click', () => toggleTimeline(false))

function toggleTimeline(showEdu) {
    if (type != showEdu) {
        eduButton.classList.toggle('active')
        workButton.classList.toggle('active')
        timeline[0].classList.toggle('hidden');
        timeline[1].classList.toggle('hidden');
        expandButtonList[0].classList.toggle('hidden')
        expandButtonList[1].classList.toggle('hidden')
        type = !type
    }
}

/**
 * 展开所有career：遮罩、长度、滚动、文字修改、icon修改
 */
const careerPage = document.querySelectorAll('article#career')[0]
var isOpenList = [false, false]

// edu
expandButtonList[0].addEventListener('click', () => expand(0))
expandButtonList[1].addEventListener('click', () => expand(1))

/**
 * 展开流程
 * @param {number} type 按钮index，0edu、1work
 */
function expand(type) {
    timeline[type].classList.toggle('open') // 时间线下方阴影

    // 若当前是打开状态，则关闭
    if (isOpenList[type]) {
        timeline[type].style.maxHeight = 80 + 'vh' // 时间线高度调整
        // 回退到时间线顶部
        window.scrollTo({
            top: careerPage.offsetTop
        })
    }
    // 当前是关闭状态，则打开
    else {
        timeline[type].style.maxHeight = timeline[type].scrollHeight + 'px' // 时间线高度调到最大
    }
    isOpenList[type] = !isOpenList[type] // 更新状态
} 