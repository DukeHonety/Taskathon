// import Physics2DPlugin from 'physics2d';
require('physics2d');
gsap.registerPlugin(Physics2DPlugin);

document.querySelectorAll('.button').forEach(function (button) {
    var bounding = button.getBoundingClientRect();
    button.addEventListener('mousemove', function (e) {
        var dy = (e.clientY - bounding.top - bounding.height / 2) / -1;
        var dx = (e.clientX - bounding.left - bounding.width / 2) / 10;
        dy = dy > 10 ? 10 : (dy < -10 ? -10 : dy);
        dx = dx > 4 ? 4 : (dx < -4 ? -4 : dx);
        button.style.setProperty('--rx', dy);
        button.style.setProperty('--ry', dx);
    });
    button.addEventListener('mouseleave', function (e) {
        button.style.setProperty('--rx', 0);
        button.style.setProperty('--ry', 0);
    });
    button.addEventListener('click', function (e) {
        button.classList.add('success');
        gsap.to(button, {
            '--icon-x': -3,
            '--icon-y': 3,
            '--z-before': 0,
            duration: .2,
            onComplete: function () {
                particles(button.querySelector('.emitter'), 100, -4, 6, -80, -50);
                gsap.to(button, {
                    '--icon-x': 0,
                    '--icon-y': 0,
                    '--z-before': -6,
                    duration: 1,
                    ease: 'elastic.out(1, .5)',
                    onComplete: function () {
                        button.classList.remove('success');
                    }
                });
            }
        });
    });
});
function particles(parent, quantity, x, y, minAngle, maxAngle) {
    var colors = [
        '#FFFF04',
        '#EA4C89',
        '#892AB8',
        '#4AF2FD',
    ];
    var _loop_1 = function (i) {
        var angle = gsap.utils.random(minAngle, maxAngle), velocity = gsap.utils.random(70, 140), dot = document.createElement('div');
        dot.style.setProperty('--b', colors[Math.floor(gsap.utils.random(0, 4))]);
        parent.appendChild(dot);
        gsap.set(dot, {
            opacity: 0,
            x: x,
            y: y,
            scale: gsap.utils.random(.4, .7)
        });
        gsap.timeline({
            onComplete: function () {
                dot.remove();
            }
        }).to(dot, {
            duration: .05,
            opacity: 1
        }, 0).to(dot, {
            duration: 1.8,
            rotationX: "-=".concat(gsap.utils.random(720, 1440)),
            rotationZ: "+=".concat(gsap.utils.random(720, 1440)),
            physics2D: {
                angle: angle,
                velocity: velocity,
                gravity: 120
            }
        }, 0).to(dot, {
            duration: 1,
            opacity: 0
        }, .8);
    };
    for (var i = quantity - 1; i >= 0; i--) {
        _loop_1(i);
    }
}
