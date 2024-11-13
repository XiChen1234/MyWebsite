const sidebar = document.getElementById('sidebar')
const side_list = document.getElementById('side-list')

/**
 * 明暗切换（暂时绑定到sidebar中）
 */

const body = document.body;

sidebar.addEventListener('click', function() {
    body.classList.toggle('dark-mode')
})

/**
 * 展开侧边栏，打开全局遮罩
 */
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