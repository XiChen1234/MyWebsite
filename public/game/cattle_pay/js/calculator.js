/**
 * 时薪计算器 - 计算核心模块
 * 负责所有与时薪计算相关的逻辑
 */

// 工作制度对应的月工作天数配置
const WORK_DAYS_CONFIG = {
    fourThree: { days: 17.25, label: '上四休三' },
    doubleRest: { days: 21.75, label: '双休' },
    alternating: { days: 23.50, label: '大小周' },
    singleRest: { days: 26.00, label: '单休' },
    noRest: { days: 30.50, label: '无休' },
    custom: { days: null, label: '自定义' }
};

// KPI等级对应的时间密度系数配置
const KPI_CONFIG = {
    S: { factor: 1.05, label: 'S级' },
    A: { factor: 1.10, label: 'A级' },
    B: { factor: 1.15, label: 'B级' },
    C: { factor: 1.20, label: 'C级' },
    D: { factor: 1.30, label: 'D级' }
};

// 软性条件评分系数配置
const SOFT_FACTOR_CONFIG = {
    atmosphere: {
        1: { factor: 0.85, label: '非常压抑' },
        2: { factor: 0.92, label: '有些压抑' },
        3: { factor: 1.00, label: '一般般' },
        4: { factor: 1.08, label: '比较舒适' },
        5: { factor: 1.15, label: '非常舒适' }
    },
    colleague: {
        1: { factor: 0.85, label: '非常紧张' },
        2: { factor: 0.92, label: '有些紧张' },
        3: { factor: 1.00, label: '正常' },
        4: { factor: 1.08, label: '比较融洽' },
        5: { factor: 1.15, label: '非常融洽' }
    },
    workspace: {
        1: { factor: 0.85, label: '非常差' },
        2: { factor: 0.92, label: '比较差' },
        3: { factor: 1.00, label: '一般' },
        4: { factor: 1.08, label: '比较好' },
        5: { factor: 1.15, label: '非常好' }
    }
};

// 薪酬类型单位配置
const SALARY_UNIT_CONFIG = {
    hourly: { unit: '元/小时', step: 1, min: 0, max: 5000 },
    daily: { unit: '元/天', step: 10, min: 0, max: 50000 },
    monthly: { unit: '元/月', step: 100, min: 0, max: 500000 },
    yearly: { unit: '元/年', step: 1000, min: 0, max: 5000000 }
};

/**
 * 薪酬类型转换函数
 * 将任意薪酬类型转换为时薪基准值
 * @param {Object} input - 用户输入参数
 * @returns {number} 时薪基准值（元/小时）
 */
function convertSalaryToHourly(input) {
    const { salaryType, salaryAmount, workDaysType, customWorkDays } = input;

    const workDays = workDaysType === 'custom'
        ? (customWorkDays || 21.75)
        : WORK_DAYS_CONFIG[workDaysType].days;

    let hourlyBase;

    switch (salaryType) {
        case 'hourly':
            hourlyBase = salaryAmount;
            break;
        case 'daily':
            hourlyBase = salaryAmount / 8;
            break;
        case 'monthly':
            hourlyBase = salaryAmount / workDays / 8;
            break;
        case 'yearly':
            hourlyBase = salaryAmount / 12 / workDays / 8;
            break;
        default:
            hourlyBase = 0;
    }

    return {
        hourlyBase: parseFloat(hourlyBase.toFixed(2)),
        workDays: workDays,
        workDaysLabel: WORK_DAYS_CONFIG[workDaysType].label
    };
}

/**
 * 计算工作时长函数
 * 根据开始/结束时间、休息时间、摸鱼时间计算有效工作时长
 * @param {Object} input - 用户输入参数
 * @returns {Object} 工作时长相关信息
 */
function calculateWorkHours(input) {
    const { startTime, endTime, breakTime, slackOffTime } = input;

    const startParts = startTime.split(':').map(Number);
    const endParts = endTime.split(':').map(Number);

    const startMinutes = startParts[0] * 60 + startParts[1];
    const endMinutes = endParts[0] * 60 + endParts[1];

    let totalMinutes;
    if (endMinutes < startMinutes) {
        totalMinutes = (24 * 60 - startMinutes) + endMinutes;
    } else {
        totalMinutes = endMinutes - startMinutes;
    }

    const breakMinutes = breakTime || 0;
    const slackMinutes = slackOffTime || 0;
    const effectiveMinutes = totalMinutes - breakMinutes - slackMinutes;

    const totalHours = totalMinutes / 60;
    const breakHours = breakMinutes / 60;
    const slackHours = slackMinutes / 60;
    const effectiveHours = effectiveMinutes / 60;

    return {
        totalHours: parseFloat(totalHours.toFixed(2)),
        breakHours: parseFloat(breakHours.toFixed(2)),
        slackHours: parseFloat(slackHours.toFixed(2)),
        effectiveHours: parseFloat(Math.max(0, effectiveHours).toFixed(2)),
        effectiveMinutes: Math.max(0, effectiveMinutes),
        isZeroWorkHours: effectiveMinutes <= 0
    };
}

/**
 * 应用KPI时间密度调整
 * @param {number} effectiveHours - 有效工作时长
 * @param {string} kpiLevel - KPI等级
 * @returns {Object} 调整后的工作时长和相关信息
 */
function applyKPITimeDensity(effectiveHours, kpiLevel) {
    const kpiFactor = KPI_CONFIG[kpiLevel].factor;
    const adjustedHours = effectiveHours * kpiFactor;

    return {
        kpiFactor: kpiFactor,
        kpiLabel: KPI_CONFIG[kpiLevel].label,
        adjustedHours: parseFloat(adjustedHours.toFixed(2)),
        dilutedWageRatio: parseFloat((effectiveHours / adjustedHours).toFixed(4))
    };
}

/**
 * 应用硬性指标扣除（房租、餐食）
 * @param {number} hourlyBase - 时薪基准值
 * @param {number} workDays - 月工作天数
 * @param {number} effectiveHours - 有效工作时长
 * @param {number} monthlyRent - 月均房租
 * @param {number} dailyMealCost - 日均餐费
 * @returns {Object} 扣除后的时薪和详细信息
 */
function applyHardFactors(hourlyBase, workDays, effectiveHours, monthlyRent, dailyMealCost) {
    const rentHourlyLoss = monthlyRent > 0
        ? monthlyRent / workDays / 8
        : 0;

    const mealHourlyCost = dailyMealCost > 0 && effectiveHours > 0
        ? dailyMealCost / effectiveHours
        : 0;

    const totalDeduction = rentHourlyLoss + mealHourlyCost;
    const afterDeductions = hourlyBase - totalDeduction;

    return {
        rentHourlyLoss: parseFloat(rentHourlyLoss.toFixed(2)),
        mealHourlyCost: parseFloat(mealHourlyCost.toFixed(2)),
        totalDeduction: parseFloat(totalDeduction.toFixed(2)),
        afterDeductions: parseFloat(afterDeductions.toFixed(2))
    };
}

/**
 * 应用软性条件倍率（工作氛围、同事关系、工位环境）
 * @param {number} wage - 调整后的时薪
 * @param {number} atmosphereRating - 工作氛围评分
 * @param {number} colleagueRating - 同事关系评分
 * @param {number} workspaceRating - 工位环境评分
 * @returns {Object} 软性倍率结果
 */
function applySoftFactors(wage, atmosphereRating, colleagueRating, workspaceRating) {
    const atmosphereFactor = SOFT_FACTOR_CONFIG.atmosphere[atmosphereRating]?.factor || 1.00;
    const colleagueFactor = SOFT_FACTOR_CONFIG.colleague[colleagueRating]?.factor || 1.00;
    const workspaceFactor = SOFT_FACTOR_CONFIG.workspace[workspaceRating]?.factor || 1.00;

    const totalFactor = atmosphereFactor * colleagueFactor * workspaceFactor;
    const finalWage = wage * totalFactor;

    return {
        atmosphereFactor: atmosphereFactor,
        atmosphereLabel: SOFT_FACTOR_CONFIG.atmosphere[atmosphereRating]?.label || '一般般',
        colleagueFactor: colleagueFactor,
        colleagueLabel: SOFT_FACTOR_CONFIG.colleague[colleagueRating]?.label || '正常',
        workspaceFactor: workspaceFactor,
        workspaceLabel: SOFT_FACTOR_CONFIG.workspace[workspaceRating]?.label || '一般',
        totalFactor: parseFloat(totalFactor.toFixed(4)),
        finalWage: parseFloat(finalWage.toFixed(2))
    };
}

/**
 * 处理特殊计算结果（分母为0等情况）
 * @param {Object} workHours - 工作时长信息
 * @param {number} monthlyRent - 月均房租
 * @param {number} commuteTime - 通勤时间
 * @param {string} kpiLevel - KPI等级
 * @returns {Object|null} 特殊成就信息或null
 */
function handleSpecialCases(workHours, monthlyRent, commuteTime, kpiLevel) {
    const achievements = [];

    if (workHours.isZeroWorkHours) {
        achievements.push({
            id: 'timeStopper',
            emoji: '⌛',
            title: '时间静止者',
            description: '工作时长为0，你的时薪突破天际！',
            condition: '日工作时长 = 0 分钟'
        });
    }

    if (workHours.breakHours * 60 >= workHours.totalHours * 60 && workHours.totalHours > 0) {
        achievements.push({
            id: 'fullRest',
            emoji: '🛋️',
            title: '全职休息家',
            description: '休息时间等于工作时长，你是在工作还是在度假？',
            condition: '休息时间 ≥ 工作时长'
        });
    }

    if (workHours.slackHours * 60 >= workHours.totalHours * 60 && workHours.totalHours > 0) {
        achievements.push({
            id: 'slackMaster',
            emoji: '🐟',
            title: '摸鱼仙人',
            description: '摸鱼时间等于工作时长，你的时薪不受时间约束！',
            condition: '摸鱼时间 ≥ 工作时长'
        });
    }

    if (commuteTime > 120) {
        achievements.push({
            id: 'commuteMarathon',
            emoji: '🚗',
            title: '通勤马拉松',
            description: '每天通勤超过2小时，你的时间都花在了路上！',
            condition: `通勤时间 = ${commuteTime}分钟`
        });
    }

    if (monthlyRent > 5000) {
        achievements.push({
            id: 'rentSlave',
            emoji: '🏠',
            title: '房奴日记',
            description: '房租这么高，你的时薪都被房东赚走了！',
            condition: `月均房租 = ${monthlyRent}元`
        });
    }

    if (kpiLevel === 'D') {
        achievements.push({
            id: 'kpiHell',
            emoji: '💼',
            title: 'KPI地狱',
            description: 'D级KPI，你的时薪正在被考核稀释！',
            condition: 'KPI等级 = D'
        });
    }

    return achievements.length > 0 ? achievements : null;
}

/**
 * 获取时薪区间主题配置
 * @param {number} wage - 最终时薪
 * @returns {Object} 主题配置
 */
function getWageTheme(wage) {
    if (wage < 0) {
        return {
            theme: 'negative',
            emoji: '💸',
            title: '付费上班',
            badge: '付费上班'
        };
    } else if (wage < 20) {
        return {
            theme: 'dark',
            emoji: '🌑',
            title: '时薪难民',
            badge: '时薪难民'
        };
    } else if (wage < 40) {
        return {
            theme: 'difficult',
            emoji: '🔴',
            title: '温饱线挣扎',
            badge: '温饱线挣扎'
        };
    } else if (wage < 60) {
        return {
            theme: 'normal',
            emoji: '🟡',
            title: '普通打工人',
            badge: '普通打工人'
        };
    } else if (wage < 80) {
        return {
            theme: 'good',
            emoji: '🟢',
            title: '中产预备役',
            badge: '中产预备役'
        };
    } else if (wage < 120) {
        return {
            theme: 'excellent',
            emoji: '🔵',
            title: '时薪精英',
            badge: '时薪精英'
        };
    } else if (wage < 200) {
        return {
            theme: 'outstanding',
            emoji: '🟣',
            title: '时薪贵族',
            badge: '时薪贵族'
        };
    } else {
        return {
            theme: 'legendary',
            emoji: '🟠',
            title: '时薪之神',
            badge: '时薪之神'
        };
    }
}

/**
 * 生成趣味换算展示
 * @param {number} wage - 最终时薪
 * @returns {Array} 趣味换算数组
 */
function generateFunComparisons(wage) {
    const comparisons = [
        { icon: '🧋', name: '奶茶', price: 15, unit: '杯' },
        { icon: '🍔', name: '麦当劳巨无霸', price: 30, unit: '个' },
        { icon: '🎬', name: '电影票', price: 60, unit: '张' },
        { icon: '📱', name: '奶茶(大杯)', price: 20, unit: '杯' },
        { icon: '☕', name: '星巴克中杯', price: 35, unit: '杯' },
        { icon: '🍕', name: '必胜客披萨', price: 80, unit: '份' }
    ];

    return comparisons.map(item => {
        const count = (wage / item.price).toFixed(1);
        return {
            icon: item.icon,
            name: item.name,
            value: `${count} ${item.unit}`
        };
    });
}

/**
 * 主计算函数 - 整合所有计算步骤
 * @param {Object} input - 用户输入参数
 * @returns {Object} 完整计算结果
 */
function calculateHourlyWage(input) {
    const {
        salaryType,
        salaryAmount,
        workDaysType,
        customWorkDays,
        startTime,
        endTime,
        breakTime,
        slackOffTime,
        commuteTime,
        monthlyRent,
        dailyMealCost,
        kpiLevel,
        atmosphereRating,
        colleagueRating,
        workspaceRating
    } = input;

    // 检查特殊成就
    const workHours = calculateWorkHours(input);
    const specialAchievements = handleSpecialCases(workHours, monthlyRent, commuteTime, kpiLevel);

    // 如果有特殊成就，直接返回
    if (specialAchievements) {
        return {
            specialCase: true,
            achievements: specialAchievements,
            wage: Infinity,
            formattedWage: '∞',
            theme: getWageTheme(Infinity),
            workHours: workHours
        };
    }

    // 第1步：薪酬类型转换
    const salaryConversion = convertSalaryToHourly(input);
    const { hourlyBase, workDays, workDaysLabel } = salaryConversion;

    // 第2步：工作时长计算
    const hoursCalc = calculateWorkHours(input);
    const { totalHours, breakHours, slackHours, effectiveHours } = hoursCalc;

    // 第3步：KPI时间密度调整
    const kpiAdjustment = applyKPITimeDensity(effectiveHours, kpiLevel);
    const { kpiFactor, kpiLabel, adjustedHours, dilutedWageRatio } = kpiAdjustment;

    // 调整后的时薪基准
    const adjustedHourlyBase = hourlyBase * dilutedWageRatio;

    // 第4步：硬性指标扣除
    const hardFactors = applyHardFactors(
        adjustedHourlyBase,
        workDays,
        effectiveHours,
        monthlyRent,
        dailyMealCost
    );
    const { rentHourlyLoss, mealHourlyCost, totalDeduction, afterDeductions } = hardFactors;

    // 第5步：软性条件倍率
    const softFactors = applySoftFactors(
        afterDeductions,
        atmosphereRating,
        colleagueRating,
        workspaceRating
    );
    const {
        atmosphereFactor, atmosphereLabel,
        colleagueFactor, colleagueLabel,
        workspaceFactor, workspaceLabel,
        totalFactor, finalWage
    } = softFactors;

    // 第6步：计算最终结果
    const finalWageRounded = Math.max(0, finalWage);
    const theme = getWageTheme(finalWageRounded);
    const funComparisons = generateFunComparisons(finalWageRounded);

    // 生成计算过程详情
    const calculationSteps = [
        {
            category: '薪酬转换',
            items: [
                { label: '输入薪酬类型', value: `${SALARY_UNIT_CONFIG[salaryType].unit} ${salaryAmount.toLocaleString()} 元` },
                { label: '月工作天数', value: `${workDaysLabel}（${workDays}天）` },
                { label: '转换为时薪基准', value: `${hourlyBase} 元/小时`, highlight: true }
            ]
        },
        {
            category: '工作时长调整',
            items: [
                { label: '基础工作时长', value: `${totalHours} 小时` },
                { label: '休息时间扣除', value: `-${breakHours} 小时` },
                { label: '摸鱼时间扣除', value: `-${slackHours} 小时` },
                { label: '有效工作时长', value: `${effectiveHours} 小时`, highlight: true }
            ]
        },
        {
            category: 'KPI时间密度调整',
            items: [
                { label: 'KPI等级', value: `${kpiLabel}（${kpiFactor}×）` },
                { label: '调整后工作时长', value: `${adjustedHours} 小时` },
                { label: '时薪稀释比例', value: `${(dilutedWageRatio * 100).toFixed(1)}%` }
            ]
        },
        {
            category: '硬性指标扣除',
            items: [
                { label: '房租时亏', value: monthlyRent > 0 ? `-${rentHourlyLoss} 元/小时` : '0 元/小时' },
                { label: '餐费时均成本', value: dailyMealCost > 0 ? `-${mealHourlyCost} 元/小时` : '0 元/小时' },
                { label: '小计', value: `-${totalDeduction} 元/小时`, negative: true }
            ]
        },
        {
            category: '软性条件倍率',
            items: [
                { label: `工作氛围(${atmosphereLabel})`, value: `${atmosphereFactor}×` },
                { label: `同事关系(${colleagueLabel})`, value: `${colleagueFactor}×` },
                { label: `工位环境(${workspaceLabel})`, value: `${workspaceFactor}×` },
                { label: '软性倍率', value: `${totalFactor.toFixed(4)}×`, positive: true }
            ]
        },
        {
            category: '最终结果',
            items: [
                { label: '最终时薪', value: `${finalWageRounded.toFixed(2)} 元/小时`, highlight: true }
            ]
        }
    ];

    return {
        specialCase: false,
        wage: finalWageRounded,
        formattedWage: finalWageRounded.toFixed(2),
        theme: theme,
        funComparisons: funComparisons,
        calculationSteps: calculationSteps,
        details: {
            salaryConversion,
            hoursCalc,
            kpiAdjustment,
            hardFactors,
            softFactors
        }
    };
}

export {
    calculateHourlyWage,
    convertSalaryToHourly,
    calculateWorkHours,
    applyKPITimeDensity,
    applyHardFactors,
    applySoftFactors,
    handleSpecialCases,
    getWageTheme,
    generateFunComparisons,
    WORK_DAYS_CONFIG,
    KPI_CONFIG,
    SOFT_FACTOR_CONFIG,
    SALARY_UNIT_CONFIG
};
