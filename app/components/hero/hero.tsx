import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import "./hero.css";

export function Hero() {
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const animatedTextRef = useRef(null);
  const webglRef = useRef(null);

  // Array of different text content for each scroll section
  const textSections = [
    {
      title: "全球顶级零售渠道",
      subtitle: "",
      description: "",
    },
    {
      title: "全球顶级零售渠道",
      subtitle: "一站式入驻",
      description: "",
    },
    {
      title: "与增长解决方案",
      subtitle: "",
      description: "",
    },
    {
      title: "为品牌提供",
      subtitle: "渠道诊断·入驻谈判",
      description: `运营优化·规模扩张
      的全链条渠道服务
      `,
    },
    {
      title: "我们只专注于一件事",
      subtitle: "",
      description: "",
    },
    {
      title: "",
      subtitle: "将您的产品高效送入目标渠道并实现持续动销",
      description: "",
    },
  ];

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Dynamically import ScrollTrigger on client side
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      // Canvas / Starfield logic (same as original)
      const canvas = canvasRef.current as any;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const numStars = 2000;
      const focalLength = canvas.width * 2;
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      const baseTrailLength = 2;
      const maxTrailLength = 30;
      let stars: any[] = [];
      let warpSpeed = 0;
      let animationActive = true;

      function initializeStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            o: 0.5 + Math.random() * 0.5,
            trail: [],
          });
        }
      }

      function moveStars() {
        for (let star of stars) {
          const speed = 1 + warpSpeed * 50;
          star.z -= speed;
          if (star.z < 1) {
            star.z = canvas.width;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.trail = [];
          }
        }
      }

      function drawStars() {
        if (
          canvas.width !== canvas.offsetWidth ||
          canvas.height !== canvas.offsetHeight
        ) {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          centerX = canvas.width / 2;
          centerY = canvas.height / 2;
        }
        const trailLength = Math.floor(
          baseTrailLength + warpSpeed * (maxTrailLength - baseTrailLength)
        );
        const clearAlpha = 1 - warpSpeed * 0.8;
        ctx.fillStyle = `rgba(17,17,17,${clearAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let star of stars) {
          const px = (star.x - centerX) * (focalLength / star.z) + centerX;
          const py = (star.y - centerY) * (focalLength / star.z) + centerY;

          star.trail.push({ x: px, y: py });
          if (star.trail.length > trailLength) star.trail.shift();

          if (star.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(star.trail[0].x, star.trail[0].y);
            for (let j = 1; j < star.trail.length; j++) {
              ctx.lineTo(star.trail[j].x, star.trail[j].y);
            }
            ctx.strokeStyle = `rgba(209,255,255,${star.o})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.fillStyle = `rgba(209,255,255,${star.o})`;
          ctx.fillRect(px, py, 1, 1);
        }
      }

      function animate() {
        if (animationActive) {
          requestAnimationFrame(animate);
          moveStars();
          drawStars();
        }
      }

      // Function to update text content
      function updateTextContent(index: number) {
        const textElement = animatedTextRef.current as any;
        if (!textElement) return;

        const currentSection = textSections[index];
        textElement.innerHTML = `
          ${currentSection.title}<br/>
          ${currentSection.subtitle}<br/>
          ${currentSection.description}
        `;
      }

      initializeStars();
      animate();

      // Main scroll animation with text changes
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Update warp speed
            if (progress <= 0.6) warpSpeed = progress / 0.6;
            else if (progress <= 0.8) warpSpeed = 1;
            else warpSpeed = 1 - (progress - 0.8) / 0.2;

            // Calculate which text section to show
            const sectionProgress = progress * (textSections.length - 1);
            const currentSectionIndex = Math.floor(sectionProgress);
            const nextSectionIndex = Math.min(
              currentSectionIndex + 1,
              textSections.length - 1
            );
            const sectionBlend = sectionProgress - currentSectionIndex;

            // Update text content when crossing section boundaries
            if (sectionBlend < 0.1) {
              updateTextContent(currentSectionIndex);
            }
          },
        },
      });

      // Text fade in animation at the beginning
      gsap.set(animatedTextRef.current, {
        opacity: 0,
        y: 50,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: stickyRef.current,
            start: "5% top",
            end: "15% top",
            scrub: 0.8,
          },
        })
        .to(animatedTextRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power3.out",
        });

      // Individual section animations for smooth text transitions
      textSections.forEach((_, index) => {
        const startPercent = (index / textSections.length) * 100;
        const endPercent = ((index + 1) / textSections.length) * 100;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: stickyRef.current,
              start: `${startPercent}% top`,
              end: `${endPercent}% top`,
              scrub: 0.5,
              onEnter: () => updateTextContent(index),
              onEnterBack: () => updateTextContent(index),
            },
          })
          .fromTo(
            animatedTextRef.current,
            {
              scale: 0.9,
              opacity: 0.7,
              filter: "blur(0px)",
            },
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.3,
              ease: "power2.out",
            }
          );
      });

      // Exit animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: stickyRef.current,
            start: "90% top",
            end: "100% top",
            scrub: true,
          },
        })
        .to(
          animatedTextRef.current,
          {
            opacity: 0,
            y: -30,
            filter: "blur(8px)",
            scale: 0.9,
            duration: 0.4,
            ease: "power2.in",
          },
          0
        )
        .to(
          webglRef.current,
          {
            opacity: 0,
            scale: 0.95,
            ease: "power2.inOut",
          },
          0
        );

      const handleResize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
      };

      window.addEventListener("resize", handleResize);

      // Initialize with first text
      updateTextContent(0);

      // Cleanup function
      return () => {
        animationActive = false;
        window.removeEventListener("resize", handleResize);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });
  }, []);

  return (
    <div className="footer relative min-h-screen flex flex-col bg-[#111] text-white">
      <div className="container"></div>
      <div
        ref={stickyRef}
        className="sticky-container relative h-[500vh] w-full"
      >
        <div
          ref={webglRef}
          className="webgl-section sticky top-0 w-full h-screen flex items-center justify-center"
        >
          <div className="canvas-container relative w-full h-full">
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            ></canvas>
            <div
              ref={animatedTextRef}
              className="animated-text absolute text-center uppercase opacity-0"
            >
              CLARITY
              <br />
              THROUGH
              <br />
              SIMPLICITY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
