// ========== 音乐播放器 ==========

(function() {
    const audio = document.getElementById('myAudio');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const albumCover = document.getElementById('albumCover');
    const coverImg = document.getElementById('coverImg');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');
    const seekBar = document.getElementById('seekBar');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const songList = document.getElementById('songList');

    if (!audio || !songList) return;

    const songItems = songList.querySelectorAll('li');
    let isPlaying = false;
    let currentSongIndex = 0;
    let isSeeking = false;

    // 格式化时间
    function fmtTime(sec) {
        if (!isFinite(sec) || sec < 0) return '00:00';
        var m = Math.floor(sec / 60);
        var s = Math.floor(sec % 60);
        return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    // 初始化
    function initAudio() {
        var firstSong = songItems[0];
        if (firstSong) {
            audio.src = firstSong.dataset.src;
            audio.preload = 'auto';
        }
    }

    // 播放/暂停
    playBtn.addEventListener('click', function() {
        if (!audio.src || audio.src === window.location.href) {
            loadSong(currentSongIndex);
            return;
        }
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    });

    // 上一首
    prevBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songItems.length) % songItems.length;
        loadSong(currentSongIndex);
    });

    // 下一首
    nextBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songItems.length;
        loadSong(currentSongIndex);
    });

    // 歌曲列表点击
    songItems.forEach(function(li, index) {
        li.addEventListener('click', function() {
            if (currentSongIndex === index) return;
            currentSongIndex = index;
            loadSong(index);
        });
    });

    // 加载歌曲
    function loadSong(index) {
        var li = songItems[index];
        if (!li) return;

        var active = songList.querySelector('.active');
        if (active) active.classList.remove('active');
        li.classList.add('active');

        audio.src = li.dataset.src;
        coverImg.src = li.dataset.cover;
        songTitle.textContent = li.dataset.title;
        artistName.textContent = li.dataset.artist;
        seekBar.value = 0;
        currentTimeEl.textContent = '00:00';
        totalTimeEl.textContent = '00:00';

        audio.load();
        audio.play().then(function() {
            isPlaying = true;
            playBtn.textContent = '⏸';
            albumCover.classList.add('playing');
        }).catch(function(err) {
            console.error('播放失败:', err.message);
            isPlaying = false;
            playBtn.textContent = '▶';
            albumCover.classList.remove('playing');
        });
    }

    // 进度条 - 拖动时
    seekBar.addEventListener('input', function() {
        isSeeking = true;
        if (audio.duration && isFinite(audio.duration)) {
            var t = (seekBar.value / 100) * audio.duration;
            currentTimeEl.textContent = fmtTime(t);
        }
    });

    // 进度条 - 松手时
    seekBar.addEventListener('change', function() {
        if (audio.duration && isFinite(audio.duration)) {
            audio.currentTime = (seekBar.value / 100) * audio.duration;
        }
        isSeeking = false;
    });

    // 进度条 - mousedown/touchstart 标记
    seekBar.addEventListener('mousedown', function() { isSeeking = true; });
    seekBar.addEventListener('touchstart', function() { isSeeking = true; });

    // 时间更新
    audio.addEventListener('timeupdate', function() {
        if (!isSeeking && audio.duration && isFinite(audio.duration)) {
            seekBar.value = (audio.currentTime / audio.duration) * 100;
            currentTimeEl.textContent = fmtTime(audio.currentTime);
        }
    });

    // 元数据加载完
    audio.addEventListener('loadedmetadata', function() {
        totalTimeEl.textContent = fmtTime(audio.duration);
    });

    // 播放/暂停状态同步
    audio.addEventListener('play', function() {
        isPlaying = true;
        playBtn.textContent = '⏸';
        albumCover.classList.add('playing');
    });

    audio.addEventListener('pause', function() {
        isPlaying = false;
        playBtn.textContent = '▶';
        albumCover.classList.remove('playing');
    });

    // 播放结束
    audio.addEventListener('ended', function() {
        currentSongIndex = (currentSongIndex + 1) % songItems.length;
        loadSong(currentSongIndex);
    });

    // 错误处理
    audio.addEventListener('error', function() {
        var code = audio.error ? audio.error.code : 0;
        var msgs = ['', '加载中断', '网络错误', '解码失败', '文件未找到'];
        console.error('音频错误:', msgs[code] || code);
        artistName.textContent = msgs[code] || '加载失败';
        isPlaying = false;
        playBtn.textContent = '▶';
        albumCover.classList.remove('playing');
    });

    document.addEventListener('DOMContentLoaded', initAudio);
})();
