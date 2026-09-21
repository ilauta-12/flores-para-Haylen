// ===== PETALS ANIMATION =====
const canvas = document.getElementById('petals-canvas');
const ctx = canvas.getContext('2d');

let petals = [];
const PETAL_COUNT = 35;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const petalEmojis = ['🌻', '🌼', '🌸', '🏵️', '💛', '✿'];

class Petal {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -30;
        this.size = Math.random() * 18 + 12;
        this.speedY = Math.random() * 1.2 + 0.4;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.wobbleAmplitude = Math.random() * 2 + 1;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleOffset = Math.random() * Math.PI * 2;
        this.emoji = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        this.age = 0;
    }

    update() {
        this.age += 0.016;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.age * this.wobbleSpeed * 60 + this.wobbleOffset) * this.wobbleAmplitude * 0.3;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 30) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, 0, 0);
        ctx.restore();
    }
}

function initPetals() {
    petals = [];
    for (let i = 0; i < PETAL_COUNT; i++) {
        petals.push(new Petal());
    }
}

function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animatePetals);
}

initPetals();
animatePetals();

// ===== SCROLL REVEAL =====
function revealOnScroll() {
    const elements = document.querySelectorAll('.reason-card, .letter-card, .placeholder-card');
    const windowHeight = window.innerHeight;

    elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight * 0.85) {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== SMOOTH PARALLAX ON HERO =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});
