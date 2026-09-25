/* Self-hosted 360 video player.

   YouTube does not give embeds the drag-to-look player — that only works on
   youtube.com itself — so 360 footage we want people to explore on our own
   pages is hosted here and drawn onto the inside of a sphere with three.js.

   Usage:  REEF_PANORAMA.mount(containerElement, 'media/clip-360.mp4');

   three.js is only fetched the first time a panorama is opened, so pages that
   never show one carry none of the weight. */
var REEF_PANORAMA = (function () {
  var THREE_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  var loading = null;

  function loadThree() {
    if (window.THREE) return Promise.resolve();
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = THREE_SRC;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('three.js failed to load')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  function mount(box, src) {
    box.classList.add('pano');
    box.innerHTML =
      '<video class="pano__video" playsinline preload="metadata" src="' + src + '"></video>' +
      '<canvas class="pano__canvas"></canvas>' +
      '<button type="button" class="pano__play" aria-label="Play the 360&deg; video">' +
        '<span class="pano__play-icon" aria-hidden="true"></span></button>' +
      '<p class="pano__hint">Drag to look around</p>';

    var video = box.querySelector('.pano__video');
    var canvas = box.querySelector('.pano__canvas');
    var playBtn = box.querySelector('.pano__play');
    var started = false;

    playBtn.addEventListener('click', function () {
      if (started) { return; }
      started = true;
      playBtn.disabled = true;
      loadThree().then(function () {
        start(box, video, canvas);
        playBtn.remove();
      }).catch(function () {
        // If three.js is unreachable, fall back to the flat video with controls.
        box.classList.add('pano--flat');
        video.controls = true;
        video.play();
        playBtn.remove();
      });
    });

    return box;
  }

  function start(box, video, canvas) {
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);

    // A sphere turned inside out, with the video painted on its inner surface.
    var geometry = new THREE.SphereBufferGeometry(50, 60, 40);
    geometry.scale(-1, 1, 1);
    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    scene.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture })));

    var lon = 0, lat = 0, dragging = false, lastX = 0, lastY = 0;

    function resize() {
      var w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }

    function down(e) {
      dragging = true;
      box.classList.add('pano--dragging');
      var p = e.touches ? e.touches[0] : e;
      lastX = p.clientX; lastY = p.clientY;
    }
    function move(e) {
      if (!dragging) return;
      var p = e.touches ? e.touches[0] : e;
      lon -= (p.clientX - lastX) * 0.13;
      lat += (p.clientY - lastY) * 0.13;
      lat = Math.max(-85, Math.min(85, lat));
      lastX = p.clientX; lastY = p.clientY;
      if (e.cancelable) e.preventDefault();
    }
    function up() { dragging = false; box.classList.remove('pano--dragging'); }

    box.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    box.addEventListener('touchstart', down, { passive: true });
    box.addEventListener('touchmove', move, { passive: false });
    box.addEventListener('touchend', up);

    // Arrow keys, for anyone not using a mouse.
    box.tabIndex = 0;
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { lon += 4; }
      else if (e.key === 'ArrowRight') { lon -= 4; }
      else if (e.key === 'ArrowUp') { lat = Math.min(85, lat + 4); }
      else if (e.key === 'ArrowDown') { lat = Math.max(-85, lat - 4); }
      else { return; }
      e.preventDefault();
    });

    box.addEventListener('wheel', function (e) {
      camera.fov = Math.max(35, Math.min(100, camera.fov + (e.deltaY > 0 ? 2 : -2)));
      camera.updateProjectionMatrix();
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('resize', resize);
    resize();

    video.loop = true;
    video.play();
    box.classList.add('pano--playing');

    (function render() {
      requestAnimationFrame(render);
      var phi = THREE.MathUtils.degToRad(90 - lat);
      var theta = THREE.MathUtils.degToRad(lon);
      camera.lookAt(
        50 * Math.sin(phi) * Math.cos(theta),
        50 * Math.cos(phi),
        50 * Math.sin(phi) * Math.sin(theta)
      );
      renderer.render(scene, camera);
    })();
  }

  return { mount: mount };
})();
