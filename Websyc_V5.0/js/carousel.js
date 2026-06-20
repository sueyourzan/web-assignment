// ========== 轮播图模块 ==========

(function() {
    'use strict';

    /**
     * 轮播图类
     * @param {string} containerId - 轮播容器ID
     * @param {object} options - 配置参数
     */
    function Carousel(containerId, options) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.options = Object.assign({
            autoPlay: true,         // 自动播放
            interval: 4000,         // 切换间隔(ms)
            duration: 500,          // 动画时长(ms)
            showIndicator: true,    // 显示指示器
            showArrow: true,        // 显示左右箭头
            pauseOnHover: true      // 悬停暂停
        }, options);

        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.slideCount = this.slides.length;
        this.currentIndex = -1;  // 设为-1使首次goTo(0)能正确执行
        this.timer = null;
        this.isTransitioning = false;

        if (this.slideCount <= 1) return;

        this.init();
    }

    Carousel.prototype.init = function() {
        var self = this;

        // 创建指示器
        if (this.options.showIndicator) {
            this.indicatorContainer = document.createElement('div');
            this.indicatorContainer.className = 'carousel-indicators';
            for (var i = 0; i < this.slideCount; i++) {
                var dot = document.createElement('span');
                dot.className = 'carousel-dot';
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', function() {
                    self.goTo(parseInt(this.getAttribute('data-index')));
                });
                this.indicatorContainer.appendChild(dot);
            }
            this.container.appendChild(this.indicatorContainer);
            this.dots = this.indicatorContainer.querySelectorAll('.carousel-dot');
        }

        // 创建箭头
        if (this.options.showArrow) {
            var prevArrow = document.createElement('button');
            prevArrow.className = 'carousel-arrow carousel-prev';
            prevArrow.innerHTML = '&#10094;';
            prevArrow.addEventListener('click', function() { self.prev(); });

            var nextArrow = document.createElement('button');
            nextArrow.className = 'carousel-arrow carousel-next';
            nextArrow.innerHTML = '&#10095;';
            nextArrow.addEventListener('click', function() { self.next(); });

            this.container.appendChild(prevArrow);
            this.container.appendChild(nextArrow);
        }

        // 悬停暂停
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', function() { self.pause(); });
            this.container.addEventListener('mouseleave', function() { self.play(); });
        }

        // 触摸滑动支持
        this.bindTouchEvents();

        // 初始显示第一张
        this.goTo(0, false);

        // 自动播放
        if (this.options.autoPlay) {
            this.play();
        }
    };

    /**
     * 跳转到指定索引
     * @param {number} index
     * @param {boolean} animate - 是否动画
     */
    Carousel.prototype.goTo = function(index, animate) {
        if (this.isTransitioning) return;
        if (index === this.currentIndex) return;

        if (animate === undefined) animate = true;

        var self = this;
        var currentSlide = this.slides[this.currentIndex];
        var nextSlide = this.slides[index];

        // 方向：1=向右(下一张), -1=向左(上一张)
        var direction = index > this.currentIndex ? 1 : -1;

        // 处理循环
        if (index >= this.slideCount) index = 0;
        if (index < 0) index = this.slideCount - 1;

        if (animate) {
            this.isTransitioning = true;

            // 设置初始位置
            nextSlide.style.transition = 'none';
            nextSlide.style.transform = 'translateX(' + (direction * 100) + '%)';
            nextSlide.classList.add('active');

            // 强制回流
            nextSlide.offsetHeight;

            // 执行动画
            nextSlide.style.transition = 'transform ' + (this.options.duration / 1000) + 's ease-in-out';
            currentSlide.style.transition = 'transform ' + (this.options.duration / 1000) + 's ease-in-out';

            nextSlide.style.transform = 'translateX(0)';
            currentSlide.style.transform = 'translateX(' + (-direction * 100) + '%)';

            setTimeout(function() {
                currentSlide.classList.remove('active');
                currentSlide.style.transition = 'none';
                currentSlide.style.transform = '';
                nextSlide.style.transition = 'none';
                nextSlide.style.transform = '';
                self.isTransitioning = false;
            }, this.options.duration);
        } else {
            // 无动画
            for (var i = 0; i < this.slides.length; i++) {
                this.slides[i].classList.remove('active');
                this.slides[i].style.transform = '';
                this.slides[i].style.transition = 'none';
            }
            nextSlide.classList.add('active');
        }

        this.currentIndex = index;

        // 更新指示器
        if (this.dots) {
            for (var j = 0; j < this.dots.length; j++) {
                this.dots[j].classList.remove('active');
            }
            this.dots[index].classList.add('active');
        }
    };

    Carousel.prototype.next = function() {
        var nextIndex = (this.currentIndex + 1) % this.slideCount;
        this.goTo(nextIndex);
    };

    Carousel.prototype.prev = function() {
        var prevIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.goTo(prevIndex);
    };

    Carousel.prototype.play = function() {
        var self = this;
        this.pause();
        this.timer = setInterval(function() {
            self.next();
        }, this.options.interval);
    };

    Carousel.prototype.pause = function() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };

    // 触摸事件
    Carousel.prototype.bindTouchEvents = function() {
        var self = this;
        var startX = 0;
        var startY = 0;
        var isSwiping = false;

        this.container.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = true;
            self.pause();
        }, { passive: true });

        this.container.addEventListener('touchmove', function(e) {
            if (!isSwiping) return;
            var dx = e.touches[0].clientX - startX;
            var dy = e.touches[0].clientY - startY;
            // 判断水平滑动
            if (Math.abs(dx) > Math.abs(dy)) {
                e.preventDefault();
            }
        }, { passive: false });

        this.container.addEventListener('touchend', function(e) {
            if (!isSwiping) return;
            isSwiping = false;
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) {
                if (dx > 0) {
                    self.prev();
                } else {
                    self.next();
                }
            }
            if (self.options.autoPlay) {
                self.play();
            }
        });
    };

    // 挂到全局
    window.Carousel = Carousel;

    // ========== 页面初始化 ==========
    function initCarousels() {
        // 查找页面中的轮播容器
        var containers = document.querySelectorAll('.carousel-container');
        containers.forEach(function(container, index) {
            new Carousel(container.id || 'carousel' + index, {
                autoPlay: true,
                interval: 4000,
                duration: 500,
                showIndicator: true,
                showArrow: true,
                pauseOnHover: true
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousels);
    } else {
        initCarousels();
    }
})();
