import { useRef } from "react";
import heroImage from "/images/Hero3.png";

const Hero = () => {
    const heroRef = useRef<HTMLElement | null>(null);

    const handleMouseMove = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        const hero = heroRef.current;

        if (!hero) {
            return;
        }

        const rect = hero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const moveX =
            (x - 0.5) * 24;

        const moveY =
            (y - 0.5) * 14;

        hero.style.setProperty(
            "--hero-x",
            `${moveX}px`
        );

        hero.style.setProperty(
            "--hero-y",
            `${moveY}px`
        );
    };

    const handleMouseLeave = () => {
        const hero = heroRef.current;

        if (!hero) {
            return;
        }

        hero.style.setProperty(
            "--hero-x",
            "0px"
        );

        hero.style.setProperty(
            "--hero-y",
            "0px"
        );
    };

    return (
        <section
            ref={heroRef}
            className="hero"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="hero-image">
                <img
                    src={heroImage}
                    alt="Game Helper Hero"
                    draggable={false}
                />
            </div>

            <div className="hero-light" />
            <div className="hero-vignette" />
        </section>
    );
};

export default Hero;