/**
 * 时薪计算器 - 主入口模块
 * 整合所有模块，处理用户交互
 */

import {
    calculateHourlyWage,
    SALARY_UNIT_CONFIG
} from './calculator.js';

import {
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
} from './renderer.js';

// 应用状态
const appState = {
    input: {
        salaryType: 'monthly',
        salaryAmount: null,
        workDaysType: 'doubleRest',
        customWorkDays: 21.75,
        startTime: '09:00',
        endTime: '18:00',
        breakTime: 60,
        slackOffTime: 30,
        commuteTime: 60,
        monthlyRent: 0,
        dailyMealCost: 50,
        kpiLevel: 'B',
        atmosphereRating: 3,
        colleagueRating: 3,
        workspaceRating: 3
    },
    result: null
};

/**
 * 获取表单输入数据
 * @returns {Object} 用户输入数据
 */
function getFormData() {
    const salaryAmount = parseFloat(document.getElementById('salaryAmount').value);
    const customWorkDays = parseFloat(document.getElementById('customWorkDays').value);

    return {
        salaryType: document.getElementById('salaryType').value,
        salaryAmount: isNaN(salaryAmount) ? 0 : salaryAmount,
        workDaysType: document.getElementById('workDaysType').value,
        customWorkDays: isNaN(customWorkDays) ? 21.75 : customWorkDays,
        startTime: document.getElementById('startTime').value,
        endTime: document.getElementById('endTime').value,
        breakTime: parseInt(document.getElementById('breakTime').value) || 0,
        slackOffTime: parseInt(document.getElementById('slackOffTime').value) || 0,
        commuteTime: parseInt(document.getElementById('commuteTime').value) || 0,
        monthlyRent: parseFloat(document.getElementById('monthlyRent').value) || 0,
        dailyMealCost: parseFloat(document.getElementById('dailyMealCost').value) || 0,
        kpiLevel: document.getElementById('kpiLevel').value,
        atmosphereRating: appState.input.atmosphereRating,
        colleagueRating: appState.input.colleagueRating,
        workspaceRating: appState.input.workspaceRating
    };
}

/**
 * 验证表单数据
 * @param {Object} data - 表单数据
 * @returns {Object} 验证结果
 */
function validateFormData(data) {
    const errors = [];

    if (!data.salaryAmount || data.salaryAmount <= 0) {
        errors.push('请输入有效的薪酬金额');
    }

    const salaryConfig = SALARY_UNIT_CONFIG[data.salaryType];
    if (data.salaryAmount > salaryConfig.max) {
        errors.push(`${salaryConfig.unit}不能超过${salaryConfig.max}元`);
    }

    if (data.workDaysType === 'custom') {
        if (isNaN(data.customWorkDays) || data.customWorkDays < 0 || data.customWorkDays > 31) {
            errors.push('请输入0-31之间的自定义天数');
        }
    }

    const startParts = data.startTime.split(':').map(Number);
    const endParts = data.endTime.split(':').map(Number);
    const startMinutes = startParts[0] * 60 + startParts[1];
    const endMinutes = endParts[0] * 60 + endParts[1];
    let totalMinutes;
    if (endMinutes < startMinutes) {
        totalMinutes = (24 * 60 - startMinutes) + endMinutes;
    } else {
        totalMinutes = endMinutes - startMinutes;
    }

    if (totalMinutes <= 0) {
        errors.push('结束时间必须晚于开始时间');
    }

    const breakTime = data.breakTime || 0;
    const slackTime = data.slackOffTime || 0;

    if (data.monthlyRent < 0 || data.monthlyRent > 50000) {
        errors.push('月均房租必须在0-50000元之间');
    }

    if (data.dailyMealCost < 0 || data.dailyMealCost > 500) {
        errors.push('日均餐费必须在0-500元之间');
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * 处理表单提交
 * @param {Event} event - 提交事件
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('#calculateBtn');
    const resultContainer = document.getElementById('resultContainer');

    clearResult(resultContainer);

    const data = getFormData();
    const validation = validateFormData(data);

    if (!validation.valid) {
        alert(validation.errors.join('\n'));
        return;
    }

    const stopLoading = showLoading(submitButton);

    try {
        const result = calculateHourlyWage(data);

        appState.result = result;
        appState.input = { ...data };

        renderAchievementCard(result, resultContainer);

        if (!result.specialCase) {
            renderFunComparisons(result.funComparisons, resultContainer);
        }

        renderUnlockedAchievements(result.achievements, resultContainer);

        const processContainer = document.getElementById('calculationProcess');
        renderCalculationProcess(result.calculationSteps, processContainer);

        setTimeout(() => {
            scrollToResult(resultContainer);
        }, 100);

    } catch (error) {
        console.error('计算错误:', error);
        alert('计算过程出现错误，请检查输入数据');
    } finally {
        stopLoading();
    }
}

/**
 * 计算总工作时长（分钟）
 * @returns {number} 总工作时长
 */
function calculateTotalWorkMinutes() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (!startTime || !endTime) return 540; // 默认 9 小时

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    let totalMinutes = endMinutes - startMinutes;
    if (totalMinutes < 0) {
        totalMinutes += 24 * 60; // 跨天情况
    }

    return Math.max(0, totalMinutes);
}

/**
 * 更新滑块最大值
 * @param {string} sliderId - 滑块ID
 * @param {number} maxValue - 最大值
 */
function updateSliderMax(sliderId, maxValue) {
    const slider = document.getElementById(sliderId);
    if (slider) {
        slider.max = maxValue;
        if (parseInt(slider.value) > maxValue) {
            slider.value = maxValue;
            slider.dispatchEvent(new Event('input'));
        }
    }
}

/**
 * 更新所有时间相关滑块的最大值
 */
function updateAllSliderLimits() {
    const totalWorkMinutes = calculateTotalWorkMinutes();
    const maxRestMinutes = Math.floor(totalWorkMinutes * 0.8);

    const breakSlider = document.getElementById('breakTime');
    const slackSlider = document.getElementById('slackOffTime');

    if (!breakSlider || !slackSlider) return;

    const currentBreakTime = parseInt(breakSlider.value) || 0;
    const currentSlackTime = parseInt(slackSlider.value) || 0;

    const maxSlackMinutes = maxRestMinutes - currentBreakTime;
    const maxBreakMinutes = maxRestMinutes - currentSlackTime;

    breakSlider.max = Math.max(0, maxBreakMinutes);
    slackSlider.max = Math.max(0, maxSlackMinutes);

    if (parseInt(breakSlider.value) > breakSlider.max) {
        breakSlider.value = breakSlider.max;
        breakSlider.dispatchEvent(new Event('input'));
    }

    if (parseInt(slackSlider.value) > slackSlider.max) {
        slackSlider.value = slackSlider.max;
        slackSlider.dispatchEvent(new Event('input'));
    }
}

/**
 * 初始化事件监听器
 */
function initEventListeners() {
    const form = document.getElementById('calculatorForm');

    form.addEventListener('submit', handleFormSubmit);

    const salaryType = document.getElementById('salaryType');
    const workDaysType = document.getElementById('workDaysType');
    const startTime = document.getElementById('startTime');
    const endTime = document.getElementById('endTime');

    salaryType.addEventListener('change', () => {
        renderSalaryUnit(salaryType.value);
    });

    workDaysType.addEventListener('change', () => {
        renderCustomDaysInput(workDaysType.value);
    });

    startTime.addEventListener('change', () => {
        updateAllSliderLimits();
    });

    endTime.addEventListener('change', () => {
        updateAllSliderLimits();
    });

    const breakSlider = document.getElementById('breakTime');
    const slackSlider = document.getElementById('slackOffTime');

    if (breakSlider) {
        breakSlider.addEventListener('input', () => {
            updateAllSliderLimits();
        });
    }

    if (slackSlider) {
        slackSlider.addEventListener('input', () => {
            updateAllSliderLimits();
        });
    }

    renderSliderValue('breakTime', 'breakTimeValue');
    renderSliderValue('slackOffTime', 'slackOffTimeValue');
    renderSliderValue('commuteTime', 'commuteTimeValue');

    initStarRating('atmosphereRating', appState.input.atmosphereRating, (rating) => {
        appState.input.atmosphereRating = rating;
        renderRatingLabel('atmosphere', rating);
    });

    initStarRating('colleagueRating', appState.input.colleagueRating, (rating) => {
        appState.input.colleagueRating = rating;
        renderRatingLabel('colleague', rating);
    });

    initStarRating('workspaceRating', appState.input.workspaceRating, (rating) => {
        appState.input.workspaceRating = rating;
        renderRatingLabel('workspace', rating);
    });

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const form = document.getElementById('calculatorForm');
                if (form) {
                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
            }
        });
    });
}

/**
 * 初始化应用
 */
function initApp() {
    renderSalaryUnit('monthly');
    renderCustomDaysInput('doubleRest');
    updateAllSliderLimits();
    initEventListeners();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);

export { appState, getFormData, validateFormData };
