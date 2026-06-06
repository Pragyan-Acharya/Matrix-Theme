// matrix.js - Classic Matrix digital rain

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

// Initial setup
let fontSize = 16;
let columns;
let drops = [];

// Characters to use (mix of katakana, numbers, symbols for that Matrix feel)
const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789@#$%^&*()_+-=[]{}|;:,.<>?/";

// Resize canvas to full window and recalculate columns
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Number of columns = window width / character width
    columns = Math.floor(canvas.width / fontSize);

    // Initialize or reset drops array (one drop per column)
    drops = new Array(columns).fill(1); // start at row 1
}

// Draw one frame of the rain
function draw() {
    // Fade previous frame slightly (creates trail effect)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';
    ctx.fillStyle = '#0f3'; // classic bright green

    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Position
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw the character
        ctx.fillText(text, x, y);

        // When the drop reaches bottom → reset it randomly
        // (the 0.975 probability adds variation so not all reset at once)
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move drop down one row
        drops[i]++;
    }
}

// Initialize on load
resizeCanvas();
draw();

// Run animation ~60fps (but you can slow it down by increasing interval)
setInterval(draw, 33); // ~30 fps — feels smooth and not too CPU heavy

// Handle window resize
window.addEventListener('resize', resizeCanvas);