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
const side_list = document.getElementById('side-list')
const menu = document.getElementById('menu')
const overlay = document.getElementById('overlay')

side_list.addEventListener('click', changeSideList)

/**
 * 在侧边栏中点击按钮跳转，关闭
 */
menu.addEventListener('click', changeSideList)


/**
 * 切换侧栏状态
 */
function changeSideList() {
    menu.classList.toggle('active')
    overlay.classList.toggle('active')
}