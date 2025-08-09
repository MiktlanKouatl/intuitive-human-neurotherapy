import EventEmitter from "./EventEmitter.js";
import gsap from "gsap";
import * as THREE from "three";

export default class Theme extends EventEmitter {
    constructor() {
        super();

        this.themes = {
            light: {
                background: new THREE.Color(0xffffff),
                frontal: { colorA: new THREE.Color(0x4a90e2), colorB: new THREE.Color(0x86b9f3) },
                parietal: { colorA: new THREE.Color(0xf5a623), colorB: new THREE.Color(0xf8c77a) },
                occipital: { colorA: new THREE.Color(0xd0021b), colorB: new THREE.Color(0xe56676) },
                temporal: { colorA: new THREE.Color(0xf8e71c), colorB: new THREE.Color(0xfbeb6e) },
                cerebellum: { colorA: new THREE.Color(0x9013fe), colorB: new THREE.Color(0xc479fe) },
                line: new THREE.Color(0x000000), // Using frontal colorA for light theme lines
                logoTextColor: new THREE.Color(0x000000) // Logo text color for light theme
            },
            dark: {
                background: new THREE.Color(0x121212),
                frontal: { colorA: new THREE.Color(0x50e3c2), colorB: new THREE.Color(0x8afbe1) },
                parietal: { colorA: new THREE.Color(0xb8e986), colorB: new THREE.Color(0xddf4bb) },
                occipital: { colorA: new THREE.Color(0xbd10e0), colorB: new THREE.Color(0xdda2f0) },
                temporal: { colorA: new THREE.Color(0x4a90e2), colorB: new THREE.Color(0x86b9f3) },
                cerebellum: { colorA: new THREE.Color(0xe74c3c), colorB: new THREE.Color(0xf1948a) },
                line: new THREE.Color(0xffffff), // Using frontal colorA for dark theme lines
                logoTextColor: new THREE.Color(0xffffff) // Logo text color for dark theme
            },
        };

        this.currentTheme = "dark";
        this.liveColors = this.cloneThemeColors(this.themes[this.currentTheme]);

        window.addEventListener("keydown", (e) => {
            if (e.key === "t") {
                this.setTheme(this.currentTheme === "light" ? "dark" : "light", false);
            }
            if (e.key === "y") {
                this.setTheme(this.currentTheme === "light" ? "dark" : "light", true);
            }
        });
    }

    cloneThemeColors(theme) {
        const cloned = { 
            background: theme.background.clone(),
            line: theme.line.clone(),
            logoTextColor: theme.logoTextColor.clone()
        };
        for (const part in theme) {
            if (part !== 'background' && part !== 'line' && part !== 'logoTextColor') {
                cloned[part] = {
                    colorA: theme[part].colorA.clone(),
                    colorB: theme[part].colorB.clone(),
                };
            }
        }
        return cloned;
    }

    setTheme(themeName, animated = false) {
        if (this.currentTheme === themeName) return;

        this.currentTheme = themeName;
        const targetColors = this.themes[themeName];

        if (animated) {
            if (this.gsapAnimation) {
                this.gsapAnimation.kill();
            }

            const tl = gsap.timeline({ onUpdate: () => this.trigger("update") });

            tl.to(this.liveColors.background, { ...targetColors.background, duration: 1.5, ease: "power2.inOut" }, 0);
            tl.to(this.liveColors.line, { ...targetColors.line, duration: 1.5, ease: "power2.inOut" }, 0);
            tl.to(this.liveColors.logoTextColor, { ...targetColors.logoTextColor, duration: 1.5, ease: "power2.inOut" }, 0);

            for (const part in targetColors) {
                if (part !== 'background' && part !== 'line' && part !== 'logoTextColor') {
                    tl.to(this.liveColors[part].colorA, { ...targetColors[part].colorA, duration: 1.5, ease: "power2.inOut" }, 0);
                    tl.to(this.liveColors[part].colorB, { ...targetColors[part].colorB, duration: 1.5, ease: "power2.inOut" }, 0);
                }
            }
            this.gsapAnimation = tl;

        } else {
            this.liveColors = this.cloneThemeColors(targetColors);
            this.trigger("update");
        }
    }

    destroy() {
        if (this.gsapAnimation) {
            this.gsapAnimation.kill();
        }
    }
}
