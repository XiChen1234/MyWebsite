var skills = [
    {
        arrow: document.querySelector('#icon-language'),
        list: document.getElementsByName('list')[0]
    }, 
    {
        arrow: document.querySelector('#icon-backend'),
        list: document.getElementsByName('list')[1]
    }, 
    {
        arrow: document.querySelector('#icon-frontend'),
        list: document.getElementsByName('list')[2]
    }, 
    {
        arrow: document.querySelector('#icon-server'),
        list: document.getElementsByName('list')[3]
    }, 
    {
        arrow: document.querySelector('#icon-desktop'),
        list: document.getElementsByName('list')[4]
    }
]
var list = document.getElementsByName('list')

var current_open = 0

skills.forEach(function(item, i) {
    // 为每个arrow添加点击事件
    item.arrow.addEventListener('click', ()=>{
        open(i)
    })

    // 绑定熟练度与进度条
    var children = item.list.querySelectorAll('.item')
    for(let i=0;i<children.length;i++) {
        var num = children[i].querySelector('.num').textContent
        var line = children[i].querySelector('.line')
        line.style.setProperty('--width', num);
    }
})

/**
 * 点击则展开
 * @param {Number} index 点击的索引
 */
function open(index) {
    var target = document.querySelectorAll('.skill .content > div')[index]
    
    // 没有任何一个打开
    if(current_open  === undefined) {
        target.classList.remove('close')
        target.classList.add('open')
        current_open = index
    } else if(current_open === index) {
        // 关闭当前点击的，current定义为undefined
        target.classList.remove('open')
        target.classList.add('close')
        current_open = undefined
    } else {
        // 打开另外一个，关闭当前这个
        target.classList.remove('close')
        target.classList.add('open')

        var current = document.querySelectorAll('.skill .content > div')[current_open]
        current.classList.remove('open')
        current.classList.add('close')
        current_open = index
    }
}