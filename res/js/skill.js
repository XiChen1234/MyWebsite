var skills = [
    {
        arrow: document.querySelector('#icon-language'),
        list:[
            {
                name: 'Java',
                value: 85
            }, {
                name: 'Python',
                value: 85
            }, {
                name: 'C/C++',
                value: 60
            }, {
                name: 'Node.js',
                value: 40
            }
        ]
    }, 
    {
        arrow: document.querySelector('#icon-backend'),
        list:[
            {
                name: 'Spring Boot',
                value: 85
            }, {
                name: 'MyBatis & Plus',
                value: 85
            }, {
                name: 'MongoDB',
                value: 60
            }, {
                name: 'WebSocket',
                value: 60
            }, {
                name: 'Flask',
                value: 50
            }
        ]
    }, 
    {
        arrow: document.querySelector('#icon-frontend'),
        list:[
            {
                name: 'HTML / CSS / JavaScript',
                value: 85
            }, {
                name: 'jQuery',
                value: 75
            }, {
                name: 'Vue.js',
                value: 60
            }
        ]
    }, 
    {
        arrow: document.querySelector('#icon-server'),
        list:[
            {
                name: 'Linux & Shell',
                value: 70
            }, {
                name: 'Network',
                value: 85
            }, {
                name: 'Nginx & Tomcat',
                value: 60
            }, {
                name: 'Docker',
                value: 50
            }, {
                name: 'Git',
                value: 85
            }
        ]
    }, 
    {
        arrow: document.querySelector('#icon-desktop'),
        list:[
            {
                name: 'Qt',
                value: 80
            }, {
                name: 'JavaFX',
                value: 60
            }
        ]
    }
]

var current_open = 0

skills.forEach(function(item, i) {
    item.arrow.addEventListener('click', ()=>{
        open(i)
    })
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