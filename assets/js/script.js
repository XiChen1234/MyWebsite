/*
 * 侧边栏点击回到顶部功能
 */
const sidebar = document.getElementById('sidebar')

sidebar.addEventListener('click', function() {
    window.scrollTo({
        top:0
    })
})