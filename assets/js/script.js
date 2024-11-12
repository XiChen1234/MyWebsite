/*
 * 侧边栏点击回到顶部功能
 */
const sidebar = document.getElementById('sidebar')

sidebar.addEventListener('click', function() {
    window.scrollTo({
        top:0
    })
})

/**
 * 明暗切换
 */

const body = document.body;

sidebar.addEventListener('click', function() {
    body.classList.toggle('dark-mode')
})