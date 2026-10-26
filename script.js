(function () {
    var figs = [].slice.call(document.querySelectorAll('.print'));
    var lb = document.getElementById('lb');
    var im = document.getElementById('lbi');
    var cp = document.getElementById('lbc');
    var cur = 0;
    
    function show(i) {
        cur = (i + figs.length) % figs.length;
        var f = figs[cur];
        im.src = f.dataset.full;
        im.alt = f.querySelector('img').alt;
        cp.textContent = f.querySelector('figcaption').textContent;
        lb.hidden = false;
    }
    
    function hide() {
        lb.hidden = true;
        figs[cur].focus();
    }
    
    // Abrir lightbox al hacer clic o tecla Enter/Espacio sobre cada foto
    figs.forEach(function (f, i) {
        f.addEventListener('click', function () {
            show(i);
        });
        
        f.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                show(i);
            }
        });
    });
    
    document.getElementById('lbx').onclick = hide;
    document.getElementById('lbp').onclick = function () { show(cur - 1); };
    document.getElementById('lbn').onclick = function () { show(cur + 1); };
    
    // Cerrar al hacer clic fuera de la imagen
    lb.addEventListener('click', function (e) {
        if (e.target === lb) hide();
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function (e) {
        if (lb.hidden) return;
        if (e.key === 'Escape') hide();
        if (e.key === 'ArrowLeft') show(cur - 1);
        if (e.key === 'ArrowRight') show(cur + 1);
    });
    
    // Gestos táctiles (swipe)
    var sx = 0;
    lb.addEventListener('touchstart', function (e) {
        sx = e.touches[0].clientX;
    }, { passive: true });
    
    lb.addEventListener('touchend', function (e) {
        var d = e.changedTouches[0].clientX - sx;
        if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1));
    });
})();