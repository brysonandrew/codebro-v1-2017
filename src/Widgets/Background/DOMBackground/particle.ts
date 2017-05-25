export function Particle(screenWidth, count, previousX) {
    this.life = 0;
    this.opacity = 0;
    this.size = 20;
    this.src = (Math.random() >= 0.5 ? "0" : "1");
    this.hueRotate = Math.floor(Math.random() * 360);
    if (count%200===0) {
        this.x = Math.random() * screenWidth;
    } else {
        this.x = previousX;
    }
    this.y = 0;
}
