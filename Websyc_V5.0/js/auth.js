// ========== 登录注册模块 ==========

(function() {
    'use strict';

    // ========== DOM 元素 ==========
    const authOverlay = document.getElementById('authOverlay');
    const authModal = document.getElementById('authModal');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const closeAuth = document.getElementById('closeAuth');
    const openAuthBtn = document.getElementById('openAuthBtn');
    const userInfo = document.getElementById('userInfo');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');

    // 注册表单字段
    const regUsername = document.getElementById('regUsername');
    const regPassword = document.getElementById('regPassword');
    const regPassword2 = document.getElementById('regPassword2');
    const regUsernameMsg = document.getElementById('regUsernameMsg');
    const regPasswordMsg = document.getElementById('regPasswordMsg');
    const regPassword2Msg = document.getElementById('regPassword2Msg');

    // 登录表单字段
    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');
    const loginMsg = document.getElementById('loginMsg');

    // ========== 校验规则 ==========
    // 用户名：长度6-20位，字母/数字/下划线，必须以字母开头
    const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;

    // 密码：长度8-20位，必须包含数字、大写字母、小写字母、特殊字符(#$@!*)，无空格
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$@!\*])[^\s]{8,20}$/;

    /**
     * 校验用户名
     * @param {string} username
     * @returns {{valid: boolean, msg: string}}
     */
    function validateUsername(username) {
        if (!username) {
            return { valid: false, msg: '⚠️ 用户名不能为空' };
        }
        if (username.length < 6 || username.length > 20) {
            return { valid: false, msg: '⚠️ 用户名长度需为6-20位' };
        }
        if (!/^[a-zA-Z]/.test(username)) {
            return { valid: false, msg: '⚠️ 用户名必须以字母开头' };
        }
        if (!USERNAME_REGEX.test(username)) {
            return { valid: false, msg: '⚠️ 用户名只能包含字母、数字或下划线' };
        }
        return { valid: true, msg: '✅ 用户名格式正确' };
    }

    /**
     * 校验密码
     * @param {string} password
     * @param {string} username - 用于检查是否包含用户名
     * @returns {{valid: boolean, msg: string}}
     */
    function validatePassword(password, username) {
        if (!password) {
            return { valid: false, msg: '⚠️ 密码不能为空' };
        }
        if (password.length < 8 || password.length > 20) {
            return { valid: false, msg: '⚠️ 密码长度需为8-20位' };
        }
        if (/\s/.test(password)) {
            return { valid: false, msg: '⚠️ 密码不允许包含空格' };
        }
        if (!/[a-z]/.test(password)) {
            return { valid: false, msg: '⚠️ 密码必须包含小写字母' };
        }
        if (!/[A-Z]/.test(password)) {
            return { valid: false, msg: '⚠️ 密码必须包含大写字母' };
        }
        if (!/\d/.test(password)) {
            return { valid: false, msg: '⚠️ 密码必须包含数字' };
        }
        if (!/[#\$@!\*]/.test(password)) {
            return { valid: false, msg: '⚠️ 密码必须包含特殊字符（#、$、@、!、*）' };
        }
        if (username && password.toLowerCase().includes(username.toLowerCase())) {
            return { valid: false, msg: '⚠️ 密码不能包含用户名' };
        }
        return { valid: true, msg: '✅ 密码格式正确' };
    }

    // ========== 模拟用户数据库 ==========
    // 使用 localStorage 持久化存储
    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem('web_users') || '{}');
        } catch (e) {
            return {};
        }
    }

    function saveUsers(users) {
        localStorage.setItem('web_users', JSON.stringify(users));
    }

    // ========== 弹窗控制 ==========
    function openModal() {
        authOverlay.style.display = 'block';
        authModal.style.display = 'block';
        // 默认显示登录
        switchTab('login');
    }

    function closeModal() {
        authOverlay.style.display = 'none';
        authModal.style.display = 'none';
        // 清空表单
        clearForms();
    }

    function switchTab(tab) {
        if (tab === 'login') {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
        clearForms();
    }

    function clearForms() {
        if (regUsername) regUsername.value = '';
        if (regPassword) regPassword.value = '';
        if (regPassword2) regPassword2.value = '';
        if (regUsernameMsg) regUsernameMsg.textContent = '';
        if (regPasswordMsg) regPasswordMsg.textContent = '';
        if (regPassword2Msg) regPassword2Msg.textContent = '';
        if (loginUsername) loginUsername.value = '';
        if (loginPassword) loginPassword.value = '';
        if (loginMsg) loginMsg.textContent = '';
    }

    // ========== 事件绑定 ==========
    if (openAuthBtn) {
        openAuthBtn.addEventListener('click', openModal);
    }

    if (closeAuth) {
        closeAuth.addEventListener('click', closeModal);
    }

    if (authOverlay) {
        authOverlay.addEventListener('click', function(e) {
            if (e.target === authOverlay) {
                closeModal();
            }
        });
    }

    if (loginTab) {
        loginTab.addEventListener('click', function() { switchTab('login'); });
    }

    if (registerTab) {
        registerTab.addEventListener('click', function() { switchTab('register'); });
    }

    // ========== 注册表单实时校验 ==========
    if (regUsername) {
        regUsername.addEventListener('input', function() {
            var result = validateUsername(this.value);
            regUsernameMsg.textContent = result.msg;
            regUsernameMsg.className = 'form-msg ' + (result.valid ? 'msg-ok' : 'msg-error');
        });
    }

    if (regPassword) {
        regPassword.addEventListener('input', function() {
            var username = regUsername ? regUsername.value : '';
            var result = validatePassword(this.value, username);
            regPasswordMsg.textContent = result.msg;
            regPasswordMsg.className = 'form-msg ' + (result.valid ? 'msg-ok' : 'msg-error');
        });
    }

    if (regPassword2) {
        regPassword2.addEventListener('input', function() {
            var pwd = regPassword ? regPassword.value : '';
            if (!this.value) {
                regPassword2Msg.textContent = '';
            } else if (this.value !== pwd) {
                regPassword2Msg.textContent = '⚠️ 两次输入的密码不一致';
                regPassword2Msg.className = 'form-msg msg-error';
            } else {
                regPassword2Msg.textContent = '✅ 密码一致';
                regPassword2Msg.className = 'form-msg msg-ok';
            }
        });
    }

    // ========== 注册提交 ==========
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            var username = regUsername.value.trim();
            var password = regPassword.value;
            var password2 = regPassword2.value;

            // 校验用户名
            var userCheck = validateUsername(username);
            if (!userCheck.valid) {
                showToast(userCheck.msg, 'error');
                return;
            }

            // 校验密码
            var passCheck = validatePassword(password, username);
            if (!passCheck.valid) {
                showToast(passCheck.msg, 'error');
                return;
            }

            // 校验两次密码一致
            if (password !== password2) {
                showToast('⚠️ 两次输入的密码不一致', 'error');
                return;
            }

            // 检查用户是否已存在
            var users = getUsers();
            if (users[username]) {
                showToast('⚠️ 该用户名已被注册', 'error');
                return;
            }

            // 保存用户
            users[username] = { password: password, createdAt: new Date().toISOString() };
            saveUsers(users);

            showToast('🎉 注册成功！请登录', 'success');
            switchTab('login');
            // 自动填充登录表单
            if (loginUsername) loginUsername.value = username;
        });
    }

    // ========== 登录提交 ==========
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            var username = loginUsername.value.trim();
            var password = loginPassword.value;

            if (!username || !password) {
                loginMsg.textContent = '⚠️ 请输入用户名和密码';
                loginMsg.className = 'form-msg msg-error';
                return;
            }

            var users = getUsers();
            if (!users[username]) {
                loginMsg.textContent = '⚠️ 用户不存在，请先注册';
                loginMsg.className = 'form-msg msg-error';
                return;
            }

            if (users[username].password !== password) {
                loginMsg.textContent = '⚠️ 密码错误';
                loginMsg.className = 'form-msg msg-error';
                return;
            }

            // 登录成功
            closeModal();
            showToast('🎉 登录成功！欢迎回来，' + username, 'success');

            // 更新导航栏
            setLoginState(username);
        });
    }

    // ========== 退出登录 ==========
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            setLogoutState();
            showToast('👋 已退出登录', 'success');
        });
    }

    // ========== 登录状态管理 ==========
    function setLoginState(username) {
        sessionStorage.setItem('currentUser', username);
        if (openAuthBtn) openAuthBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        if (userNameDisplay) userNameDisplay.textContent = username;
    }

    function setLogoutState() {
        sessionStorage.removeItem('currentUser');
        if (openAuthBtn) openAuthBtn.style.display = '';
        if (userInfo) userInfo.style.display = 'none';
        if (userNameDisplay) userNameDisplay.textContent = '';
    }

    // ========== 初始化：检查登录状态 ==========
    function initAuth() {
        var currentUser = sessionStorage.getItem('currentUser');
        if (currentUser) {
            setLoginState(currentUser);
        }
    }

    // ========== Toast 提示 ==========
    function showToast(message, type) {
        var toast = document.createElement('div');
        toast.className = 'toast toast-' + (type || 'success');
        toast.textContent = message;
        document.body.appendChild(toast);

        // 触发动画
        setTimeout(function() { toast.classList.add('show'); }, 10);

        // 自动移除
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() { document.body.removeChild(toast); }, 300);
        }, 2500);
    }

    // 页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuth);
    } else {
        initAuth();
    }
})();
