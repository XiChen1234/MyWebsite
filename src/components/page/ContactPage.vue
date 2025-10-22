<!-- 联系页面组件 -->
<script setup lang="ts">
import { ref } from 'vue';

// 联系方式接口定义
interface ContactItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  url?: string;
}

// 联系方式数据
const contactItems = ref<ContactItem[]>([
  {
    id: 'email',
    icon: 'icon-gmail',
    label: '电子邮箱',
    value: 'xichen888.private@gmail.com',
    url: 'mailto:xichen888.private@gmail.com'
  },
  {
    id: 'github',
    icon: 'icon-github',
    label: 'GitHub',
    value: 'XiChen1234的GitHub',
    url: 'https://github.com/XiChen1234'
  },
  {
    id: 'juejin',
    icon: 'icon-juejin',
    label: '稀土掘金',
    value: '稀土掘金 - 希晨er的个人主页',
    url: 'https://juejin.cn/user/2878958587880362'
  },
  {
    id: 'local',
    icon: 'icon-local',
    label: '位置',
    value: '中国 西安'
  },
  {
    id: 'qq',
    icon: 'icon-qq',
    label: '腾讯QQ',
    value: '66752878'
  },
  {
    id: 'phone',
    icon: 'icon-phone',
    label: '电话',
    value: '+86 177 9272 8712'
  },
]);

// 表单数据
interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// 表单数据响应式引用
const formData = ref<ContactForm>({
  name: '',
  email: '',
  message: ''
});

// 留言功能开关 - 设置为 true 可开通留言功能
const messageFeatureEnabled = ref(false);

// 提交状态和消息
const isSubmitting = ref(false);
const submitMessage = ref('');
const submitMessageType = ref<'success' | 'error'>('success');

/**
 * 邮箱格式验证
 * @param email 邮箱地址
 * @returns 是否是有效邮箱
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 处理表单提交
 */
const handleSubmit = () => {
  // 表单验证
  if (!formData.value.name.trim()) {
    submitMessage.value = '请输入您的姓名';
    submitMessageType.value = 'error';
    return;
  }

  if (!formData.value.email.trim()) {
    submitMessage.value = '请输入您的邮箱';
    submitMessageType.value = 'error';
    return;
  }

  if (!isValidEmail(formData.value.email)) {
    submitMessage.value = '请输入有效的邮箱地址';
    submitMessageType.value = 'error';
    return;
  }

  if (!formData.value.message.trim()) {
    submitMessage.value = '请输入留言内容';
    submitMessageType.value = 'error';
    return;
  }

  // 模拟提交过程
  isSubmitting.value = true;
  submitMessage.value = '';

  // 模拟API调用延迟
  setTimeout(() => {
    // 以console.log输出代替实际提交
    console.log('表单数据:', formData.value);

    // 显示成功消息
    submitMessage.value = '感谢您的留言！我会尽快回复您。';
    submitMessageType.value = 'success';
    isSubmitting.value = false;

    // 3秒后重置表单
    setTimeout(() => {
      formData.value = {
        name: '',
        email: '',
        message: ''
      };
      submitMessage.value = '';
    }, 3000);
  }, 1000);
};
</script>

<template>
  <div class="contact-page" id="contact">
    <h1 class="title">Contact Me</h1>
    <p class="sub-title">Feel free to reach out to me!</p>
    <div class="content">
      <!-- 联系方式部分 -->
      <div class="contact-section">
        <h2>联系方式</h2>
        <div class="contact-grid">
          <div v-for="item in contactItems" :key="item.id" class="contact-item">
            <div class="contact-icon">
              <i :class="['iconcolor', item.icon]"></i>
            </div>
            <div class="contact-info">
              <div class="contact-label">{{ item.label }}</div>
              <a v-if="item.url" class="contact-value" :href="item.url"
                :target="item.id === 'email' ? '_self' : '_blank'">
                {{ item.value }}
              </a>
              <div v-else class="contact-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 留言表单部分 -->
      <div class="form-section">
        <h2>给我留言</h2>
        <div class="form-container">
          <form @submit.prevent="handleSubmit" class="contact-form"
            :class="{ 'form-disabled': !messageFeatureEnabled }">
            <div class="form-group">
              <label for="name">姓名 <span class="required">*</span></label>
              <input id="name" class="form-input" type="text" placeholder="请输入您的姓名" v-model="formData.name" required />
            </div>
            <div class="form-group">
              <label for="email">邮箱 <span class="required">*</span></label>
              <input id="email" class="form-input" type="email" placeholder="请输入您的邮箱" v-model="formData.email"
                required />
            </div>
            <div class="form-group">
              <label for="message">留言内容 <span class="required">*</span></label>
              <textarea id="message" class="form-input" placeholder="请输入您想对我说的话" v-model="formData.message" rows="5"
                required></textarea>
            </div>

            <button class="submit-button button" type="submit" :disabled="isSubmitting || !messageFeatureEnabled">
              {{ isSubmitting ? '发送中...' : '发送留言' }}
            </button>

            <div v-show="submitMessage" class="submit-message" :class="submitMessageType">
              {{ submitMessage }}
            </div>
          </form>

          <!-- 毛玻璃遮罩层 - 当留言功能未开通时显示 -->
          <div v-if="!messageFeatureEnabled" class="form-overlay">
            <div class="overlay-content">
              <div class="overlay-text">尚未开通留言功能</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  width: 90%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
}

.content {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 40px;
  width: 100%;
}

/* 联系方式部分样式 */
.contact-section {
  flex: 3;
}

.contact-section h2,
.form-section h2 {
  font-size: 24px;
  color: var(--text-main);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border-color-focus);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  grid-auto-rows: minmax(0, auto);
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: var(--bg-card);
  border-radius: 12px;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px var(--transparent-black);
  transition: all 0.3s ease;
  min-height: 60px;
  overflow: hidden;
  gap: 15px;
}

.contact-item .contact-info {
  flex: 1;
  min-width: 0;
}

.contact-item .contact-label,
.contact-item .contact-value {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-item:hover {
  transform: translateY(-4px);
  border-color: var(--border-color-focus);
  box-shadow: 0 8px 16px;
  background-color: var(--bg-focus);
}

.contact-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 30px;
}

.contact-info {
  flex: 1;
}

.contact-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.contact-value {
  font-size: 16px;
  color: var(--text-main);
  font-weight: 500;
}

.contact-value a {
  color: var(--text-main-focus);
  text-decoration: none;
}

.contact-value a:hover {
  text-decoration: underline;
}

/* 表单部分样式 */
.form-section {
  flex: 2;
}

.form-container {
  position: relative;
  width: 100%;
}

.contact-form {
  background-color: var(--bg-card);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--transparent-black);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: filter 0.3s ease;
}

/* 表单禁用状态 */
.contact-form.form-disabled {
  filter: blur(3px);
  pointer-events: none;
}

/* 毛玻璃遮罩层样式 */
.form-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.overlay-content {
  text-align: center;
  padding: 20px;
}

.overlay-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-main);
  padding: 15px 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-main);
}

.required {
  color: var(--error-color);
  margin-left: 2px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border);
  border-radius: 8px;
  background-color: var(--page-bg);
  color: var(--text-main);
  transition: all 0.5s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--border-color-focus);
}

textarea.form-input {
  resize: vertical;
  min-height: 150px;
}

.submit-button {
  width: 100%;
  padding: 14px;
  background-color: var(--button-bg-orange);
  color: var(--button-text-white);
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.submit-message {
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
}

.submit-message.success {
  background-color: var(--success-bg);
  color: var(--success-color);
  border: 1px solid var(--success-color);
}

.submit-message.error {
  background-color: var(--error-bg);
  color: var(--error-color);
  border: 1px solid var(--error-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 30px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
