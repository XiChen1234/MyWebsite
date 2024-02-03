var list = document.querySelector("#list")
var left = document.querySelector("#arrow-left")
var right = document.querySelector("#arrow-right")
var indicators

// 项目列表 json
var item_list = [
    {
        title: "贪吃蛇",
        subtitle: "C/C++: Qt",
        intro: "Gluttonous Snake mini-game based on C++ and Qt frameworks",
        img_url: "./res/img/project/1.png"
    },
    {
        title: "Music Player",
        subtitle: "HTML/CSS/JavaScript",
        intro: "Native HTML, CSS, JS implemented music player",
        img_url: "./res/img/project/2.png"
    },
    {
        title: "CompKey",
        subtitle: "Java: Springboot + Vue + CompKey",
        intro: "The CompKey algorithm search engine optimization system based on Springboot and Vue implementation",
        img_url: "./res/img/project/3.png"
    }
]

// 生成swiper和下方圆点
item_list.forEach(function(item, i) {
    init_div(item.title, item.subtitle, item.intro, item.img_url)
    init_span(i)
})

indicators = document.querySelectorAll("#indicator span")
// 为小圆点添加点击事件
indicators.forEach(function(item, i) {
    item.addEventListener('click', function() {
        moveTo(i)
    })
})


var current_index = 0

left.addEventListener('click', left_last)
right.addEventListener('click', right_next)

// ------------------------------------------------------------------

/**
 * 上一页
 */
function left_last() {
    let length = indicators.length;
    if(current_index === 0) {
        moveTo(length - 1)
    } else {
        moveTo(current_index - 1)
    }
}

/**
 * 下一页
 */
function right_next() {
    let length = indicators.length;
    if(current_index === length-1) {
        moveTo(0)
    } else {
        moveTo(current_index + 1)
    }
}

/**
 * 翻页到指定目标索引位置
 * @param {Number} index 目标索引
 */
function moveTo(index) {
    list.style.transform = 'translateX(-' + index + '00%)'
    list.style.transition = '0.5s'
    // 指示器
    var active = document.querySelector('#indicator span.active')
    active.classList.remove('active')
    indicators[index].classList.add('active')
    current_index = index
}

/**
 * 生成span小圆点
 * @param {Number} index 要绑定的索引号
 */
function init_span(index) {
    var span = document.createElement('span')
    if(index === 0) {
        span.classList.add('active')
    }
    document.querySelector("#indicator").appendChild(span)
}

/**
 * 初始化，根据列表生成item的各个元素
 * @param {String} title 标题
 * @param {String} subtitle 副标题
 * @param {String} intro 介绍
 * @param {URL} img_url 图片路径
 */
function init_div(title, subtitle, intro, img_url) {
    var div = document.createElement('div')
    var h3 = document.createElement('h3')
    var h4 = document.createElement('h4')
    var p = document.createElement('p')
    var img = document.createElement('img')

    div.className = 'item'
    h3.textContent = title
    h4.textContent = subtitle
    p.textContent = intro
    img.src = img_url
    
    div.appendChild(h3)
    div.appendChild(h4)
    div.appendChild(p)
    div.appendChild(img)

    list.appendChild(div)
}
