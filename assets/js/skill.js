

/**
 * 展开技能list
 */
const openSkillList = document.querySelectorAll('article#skill .content .skill-content .skill-header .iconfont.icon-right')
const skillList = document.querySelectorAll('article#skill .content .skill-content .skill-desc')
const isSkillOpen = [false, false, false]

openSkillList.forEach(function (openSkill, index) {
    openSkill.addEventListener('click', function () {
        if (isSkillOpen[index]) {
            skillList[index].style.maxHeight = null;
        } else {
            skillList[index].style.maxHeight = skillList[index].scrollHeight + 'px';
        }
        openSkill.classList.toggle('active')
        isSkillOpen[index] = !isSkillOpen[index]
    })
})