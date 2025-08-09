// Opcional: funciones para mostrar/ocultar el logo desde Three.js, ahora animadas con GSAP
window.IHNLogo = {
    show: function(text) {
        let logo = document.getElementById('ihn-logo');
        if (!logo) {
            logo = document.createElement('div');
            logo.id = 'ihn-logo';
            logo.className = 'ihn-logo';
            document.body.appendChild(logo);
        }
        text = text || 'Intuitive Human Network';
        let html = '';
        for (let i = 0; i < text.length; i++) {
            let c = text[i] === ' ' ? '&nbsp;' : text[i];
            html += `<span class='ihn-logo-letter' style='opacity:0;display:inline-block;'>${c}</span>`;
        }
        logo.innerHTML = html;
        let letters = logo.querySelectorAll('.ihn-logo-letter');
        logo.style.display = 'block';
        if (window.gsap) {
            gsap.set(letters, { opacity: 0, y: 20 });
            gsap.to(letters, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out'
            });
        } else {
            letters.forEach(l => l.style.opacity = 1);
        }
    },
    hide: function() {
        let logo = document.getElementById('ihn-logo');
        if (!logo) return;
        let letters = logo.querySelectorAll('.ihn-logo-letter');
        if (window.gsap && letters.length) {
            gsap.to(letters, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.03,
                ease: 'power2.in',
                onComplete: () => {
                    logo.remove();
                }
            });
        } else {
            logo.remove();
        }
    }
};
