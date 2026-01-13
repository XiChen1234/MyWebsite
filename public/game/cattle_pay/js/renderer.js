/**
 * 时薪计算器 - 渲染模块
 * 负责所有DOM操作和结果展示
 */

/**
 * 渲染成就卡片
 * @param {Object} result - 计算结果
 * @param {HTMLElement} container - 容器元素
 */
function renderAchievementCard(result, container) {
    const { theme, wage, formattedWage, specialCase, achievements } = result;
    const card = container.querySelector('#achievementCard');
    const emoji = container.querySelector('#achievementEmoji');
    const title = container.querySelector('#achievementTitle');
    const wageElement = container.querySelector('#hourlyWage');
    const badge = container.querySelector('#achievementBadge');

    // 清除旧主题
    card.className = 'achievement-card';

    if (specialCase && achievements && achievements.length > 0) {
        const achievement = achievements[0];
        card.classList.add('special-achievement');
        emoji.textContent = achievement.emoji;
        title.textContent = achievement.title;

        if (wageElement) {
            wageElement.textContent = '∞';
        }

        const badgeText = badge.querySelector('.badge-text');
        if (badgeText) {
            badgeText.textContent = '特殊成就';
        }

        // 添加成就描述
        let descElement = card.querySelector('.achievement-description');
        if (!descElement) {
            descElement = document.createElement('div');
            descElement.className = 'achievement-description';
            card.appendChild(descElement);
        }
        descElement.textContent = achievement.description;
    } else {
        // 添加主题类
        card.classList.add(`theme-${theme.theme}`);

        // 更新内容
        emoji.textContent = theme.emoji;
        title.textContent = theme.title;

        if (wageElement) {
            wageElement.textContent = formattedWage;
        }

        const badgeText = badge.querySelector('.badge-text');
        if (badgeText) {
            badgeText.textContent = theme.badge;
        }

        // 移除成就描述
        const descElement = card.querySelector('.achievement-description');
        if (descElement) {
            descElement.remove();
        }
    }

    container.style.display = 'block';
}

/**
 * 渲染趣味换算展示
 * @param {Array} comparisons - 趣味换算数组
 * @param {HTMLElement} container - 容器元素
 */
function renderFunComparisons(comparisons, container) {
    const comparisonSection = container.querySelector('#funComparison');
    const comparisonItems = container.querySelector('#comparisonItems');

    if (!comparisons || comparisons.length === 0) {
        comparisonSection.style.display = 'none';
        return;
    }

    comparisonItems.innerHTML = comparisons.map(item => `
        <div class="comparison-item">
            <span class="icon">${item.icon}</span>
            <span class="name">${item.name}</span>
            <span class="value">${item.value}</span>
        </div>
    `).join('');

    comparisonSection.style.display = 'block';
}

/**
 * 渲染已解锁成就
 * @param {Array} achievements - 成就数组
 * @param {HTMLElement} container - 容器元素
 */
function renderUnlockedAchievements(achievements, container) {
    const unlockedSection = container.querySelector('#achievementsUnlocked');
    const unlockedList = container.querySelector('#unlockedList');

    if (!achievements || achievements.length === 0) {
        unlockedSection.style.display = 'none';
        return;
    }

    unlockedList.innerHTML = achievements.map((achievement, index) => `
        <div class="unlocked-item" style="--item-index: ${index}">
            <span class="unlocked-icon">${achievement.emoji}</span>
            <div class="unlocked-content">
                <div class="unlocked-name">${achievement.title}</div>
                <div class="unlocked-desc">${achievement.description}</div>
            </div>
        </div>
    `).join('');

    unlockedSection.style.display = 'block';
}

/**
 * 渲染计算过程
 * @param {Array} steps - 计算步骤数组
 * @param {HTMLElement} container - 容器元素
 */
function renderCalculationProcess(steps, container) {
    const processSteps = container.querySelector('#processSteps');

    if (!steps || steps.length === 0) {
        processSteps.innerHTML = '<p>暂无计算过程</p>';
        return;
    }

    processSteps.innerHTML = steps.map(step => `
        <div class="process-step">
            <div class="process-category" style="font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">
                ${step.category}
            </div>
            ${step.items.map(item => {
                let valueClass = '';
                if (item.highlight) valueClass = 'highlight';
                else if (item.negative) valueClass = 'negative';
                else if (item.positive) valueClass = 'positive';

                return `
                    <div class="process-item">
                        <span class="label">${item.label}</span>
                        <span class="value ${valueClass}">${item.value}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `).join('');
}

/**
 * 渲染滑块值显示
 * @param {string} sliderId - 滑块元素ID
 * @param {string} valueId - 值显示元素ID
 * @param {string} unit - 单位
 */
function renderSliderValue(sliderId, valueId, unit = '分钟') {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);

    if (slider && valueDisplay) {
        const updateValue = () => {
            const value = parseInt(slider.value);
            if (unit === '分钟') {
                const hours = Math.floor(value / 60);
                const mins = value % 60;
                if (hours > 0) {
                    valueDisplay.textContent = `${hours}小时${mins > 0 ? mins + '分钟' : ''}`;
                } else {
                    valueDisplay.textContent = `${value} 分钟`;
                }
            } else {
                valueDisplay.textContent = `${value} ${unit}`;
            }
        };

        slider.addEventListener('input', updateValue);
        updateValue();
    }
}

/**
 * 渲染星级评分
 * @param {string} ratingGroupId - 评分组ID
 * @param {number} defaultRating - 默认评分
 * @param {Function} onChange - 评分变化回调
 */
function initStarRating(ratingGroupId, defaultRating, onChange) {
    const ratingGroup = document.querySelector(`[data-field="${ratingGroupId}"]`);

    if (!ratingGroup) return;

    const stars = ratingGroup.querySelectorAll('.star');
    let currentRating = defaultRating || 3;

    const updateStars = (rating) => {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    };

    const handleRating = (rating) => {
        currentRating = rating;
        updateStars(rating);
        if (onChange) {
            onChange(rating);
        }
    };

    stars.forEach((star, index) => {
        star.addEventListener('click', () => handleRating(index + 1));
        star.addEventListener('mouseenter', () => updateStars(index + 1));
    });

    ratingGroup.addEventListener('mouseleave', () => updateStars(currentRating));

    // 设置默认评分
    updateStars(currentRating);
}

/**
 * 渲染薪酬类型单位
 * @param {string} salaryType - 薪酬类型
 */
function renderSalaryUnit(salaryType) {
    const unitElement = document.getElementById('salaryUnit');
    const inputElement = document.getElementById('salaryAmount');

    if (unitElement && salaryType) {
        const unitConfig = {
            hourly: '元/小时',
            daily: '元/天',
            monthly: '元/月',
            yearly: '元/年'
        };

        unitElement.textContent = unitConfig[salaryType] || '元/月';
    }
}

/**
 * 渲染工作制度自定义输入框显示
 * @param {string} workDaysType - 工作制度类型
 */
function renderCustomDaysInput(workDaysType) {
    const customGroup = document.getElementById('customDaysGroup');
    const customInput = document.getElementById('customWorkDays');

    if (customGroup) {
        if (workDaysType === 'custom') {
            customGroup.classList.remove('hidden');
            if (customInput) {
                customInput.required = true;
            }
        } else {
            customGroup.classList.add('hidden');
            if (customInput) {
                customInput.required = false;
            }
        }
    }
}

/**
 * 渲染评分标签
 * @param {string} field - 评分字段
 * @param {number} rating - 评分值
 */
function renderRatingLabel(field, rating) {
    const labelElement = document.getElementById(`${field}Label`);
    const labels = {
        atmosphere: ['非常压抑', '有些压抑', '一般般', '比较舒适', '非常舒适'],
        colleague: ['非常紧张', '有些紧张', '正常', '比较融洽', '非常融洽'],
        workspace: ['非常差', '比较差', '一般', '比较好', '非常好']
    };

    if (labelElement && labels[field]) {
        labelElement.textContent = labels[field][rating - 1] || '一般';
    }
}

/**
 * 清空结果展示
 * @param {HTMLElement} container - 容器元素
 */
function clearResult(container) {
    container.style.display = 'none';
    container.querySelector('#funComparison').style.display = 'none';
    container.querySelector('#achievementsUnlocked').style.display = 'none';
}

/**
 * 显示加载状态
 * @param {HTMLElement} button - 按钮元素
 */
function showLoading(button) {
    const originalText = button.textContent;
    button.textContent = '计算中...';
    button.disabled = true;

    return () => {
        button.textContent = originalText;
        button.disabled = false;
    };
}

/**
 * 滚动到结果区域
 * @param {HTMLElement} resultContainer - 结果容器
 */
function scrollToResult(resultContainer) {
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export {
    renderAchievementCard,
    renderFunComparisons,
    renderUnlockedAchievements,
    renderCalculationProcess,
    renderSliderValue,
    initStarRating,
    renderSalaryUnit,
    renderCustomDaysInput,
    renderRatingLabel,
    clearResult,
    showLoading,
    scrollToResult
};
