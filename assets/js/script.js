const sidebar = document.getElementById('sidebar')

/**
 * 明暗切换（暂时绑定到sidebar中）
 */

const body = document.body;

sidebar.addEventListener('click', function() {
    body.classList.toggle('dark-mode')
})