/**
 * 明暗切换
 */
const light = document.getElementById('light')
const body = document.body

light.addEventListener('click', function () {
    body.classList.toggle('dark-mode')
    light.classList.toggle('icon-moon')
    light.classList.toggle('icon-sun')
})

/**
 * 展开侧边栏，打开全局遮罩
 */

// /**
//  * 在侧边栏中点击按钮跳转，关闭
//  */
// menu.addEventListener('click', changeSideList)



const sideList = document.getElementById('side-list');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay')
let isOpen = false;

sideList.addEventListener('click', changeSideList)
menu.addEventListener('click', changeSideList)

/**
 * 切换侧栏状态
 */
function changeSideList() {
    overlay.classList.toggle('active') // 全局遮罩
    if (isOpen) {
        menu.style.maxHeight = null;
    } else {
        menu.style.maxHeight = menu.scrollHeight + 'px';
    }
    isOpen = !isOpen;
}

/**
 * 展开技能list，打开全局遮罩
 */
const openSkillList = document.querySelectorAll('article#skill .content .skill-content .skill-header .iconfont.icon-right')
const skillList = document.querySelectorAll('article#skill .content .skill-content .skill-desc')
const isSkillOpen = [false, false, false]

openSkillList.forEach(function(openSkill, index) {
    openSkill.addEventListener('click', function() {
        if (isSkillOpen[index]) {
            skillList[index].style.maxHeight = null;
        } else {
            skillList[index].style.maxHeight = skillList[index].scrollHeight + 'px';
        }
        isSkillOpen[index] = !isOpen[index]
    })
})