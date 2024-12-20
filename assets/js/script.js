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
const sideList = document.getElementById('side-list');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay')
let isMenuOpen = false;

sideList.addEventListener('click', changeSideList)
menu.addEventListener('click', changeSideList)

/**
 * 切换侧栏状态
 */
function changeSideList() {
    overlay.classList.toggle('active') // 全局遮罩
    if (isMenuOpen) {
        menu.style.maxHeight = null;
    } else {
        menu.style.maxHeight = menu.scrollHeight + 'px';
    }
    isMenuOpen = !isMenuOpen;
}