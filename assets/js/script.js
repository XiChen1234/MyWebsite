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