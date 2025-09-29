import { useEffect } from "react";
import { gsap } from "gsap";
// Note: ScrollTrigger is part of GSAP but needs to be registered

export function Hero() {
  useEffect(() => {
    // Setup canvas and context
    const canvas = document.getElementById("space") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Starfield settings
    const numStars = 1900;
    const focalLength = canvas.width * 2;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    const baseTrailLength = 2;
    const maxTrailLength = 30;

    // Stars array
    let stars: Array<{
      x: number;
      y: number;
      z: number;
      o: number;
      trail: Array<{ x: number; y: number }>;
    }> = [];

    // Animation control
    let warpSpeed = 0;
    let animationActive = true;

    // Initialize stars
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

    // Update star positions
    function moveStars() {
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Move star based on warp speed - always forward
        const speed = 1 + warpSpeed * 50;
        star.z -= speed;
        // Reset star position when it passes the viewer
        if (star.z < 1) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.trail = [];
        }
      }
    }

    // Draw stars and their trails
    function drawStars() {
      if (!ctx) return;

      // Resize canvas if needed
      if (
        canvas.width !== canvas.offsetWidth ||
        canvas.height !== canvas.offsetHeight
      ) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
      }

      // Calculate trail length based on warp speed
      const trailLength = Math.floor(
        baseTrailLength + warpSpeed * (maxTrailLength - baseTrailLength)
      );

      // Clear canvas with fade effect based on warp speed
      const clearAlpha = 1 - warpSpeed * 0.8;
      ctx.fillStyle = `rgba(17,17,17,${clearAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars and trails
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Calculate screen position with perspective
        const px = (star.x - centerX) * (focalLength / star.z) + centerX;
        const py = (star.y - centerY) * (focalLength / star.z) + centerY;

        // Add position to trail
        star.trail.push({
          x: px,
          y: py,
        });
        if (star.trail.length > trailLength) {
          star.trail.shift();
        }

        // Draw trail
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

        // Draw star
        ctx.fillStyle = `rgba(209,255,255,${star.o})`;
        ctx.fillRect(px, py, 1, 1);
      }
    }

    // Animation loop
    function animate() {
      if (animationActive) {
        requestAnimationFrame(animate);
        moveStars();
        drawStars();
      }
    }

    // Basic scroll handling for warp effect
    const handleScroll = () => {
      const stickyContainer = document.getElementById("stickyContainer");
      if (!stickyContainer) return;

      const rect = stickyContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress based on element position
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      );

      // Update warp speed based on scroll progress
      if (progress <= 0.6) {
        warpSpeed = progress / 0.6;
      } else if (progress <= 0.8) {
        warpSpeed = 1;
      } else {
        warpSpeed = 1 - (progress - 0.8) / 0.2;
      }

      // Update text opacity and blur based on scroll
      const animatedText = document.getElementById("animatedText");
      if (animatedText) {
        const textProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.2));
        const textElement = animatedText as HTMLElement;
        textElement.style.opacity = textProgress.toString();
        textElement.style.filter = `blur(${8 * (1 - textProgress)}px)`;
        textElement.style.transform = `translate(-50%, calc(-50% + ${40 * (1 - textProgress)}px))`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Handle visibility - stop animation when out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!animationActive) {
              animationActive = true;
              animate();
            }
          } else {
            animationActive = false;
          }
        });
      },
      { threshold: 0 }
    );

    const stickyContainer = document.getElementById("stickyContainer");
    if (stickyContainer) {
      observer.observe(stickyContainer);
    }

    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
    };

    window.addEventListener("resize", handleResize);

    // Create grid of star symbols with improved reactivity
    const dotGrid = document.getElementById("dotGrid");
    if (dotGrid) {
      const gridWidth = dotGrid.offsetWidth;
      const gridHeight = dotGrid.offsetHeight;

      // Increase rows by 25%
      const originalHeight = 150;
      const increasedHeight = originalHeight * 1.25;
      dotGrid.style.height = `${increasedHeight}px`;

      // Calculate exact spacing to fit perfectly, accounting for container padding
      const containerPadding = 2 * 16; // 2rem padding converted to pixels
      const fullWidth = window.innerWidth; // Full window width

      // Calculate number of columns to span the entire width including padding
      const desiredCols = Math.ceil(fullWidth / 20); // Approximate number of columns
      const desiredRows = Math.ceil(increasedHeight / 20); // Approximate number of rows

      // Calculate exact spacing to fit perfectly
      const spacingX = fullWidth / (desiredCols - 1);
      const spacingY = increasedHeight / (desiredRows - 1);

      // Create dots with extended width to cover the entire viewport
      function createDotGrid() {
        if (!dotGrid) return;
        dotGrid.innerHTML = "";
        for (let y = 0; y < desiredRows; y++) {
          for (let x = 0; x < desiredCols; x++) {
            const dot = document.createElement("div");
            dot.className = "dot";
            dot.textContent = "✦"; // Star symbol
            // Position dots relative to the container but extend beyond its padding
            const xPos = x * spacingX - containerPadding;
            dot.style.left = `${xPos}px`;
            dot.style.top = `${y * spacingY}px`;
            dotGrid.appendChild(dot);
          }
        }
      }

      //   createDotGrid();

      // Improved mouse proximity effect with better reactivity for fast movements
      //   let lastMouseX = 0;
      //   let lastMouseY = 0;
      //   let isMouseMoving = false;
      //   let mouseTimeout: NodeJS.Timeout;

      //   // Track mouse movement
      //   const handleMouseMove = (e: MouseEvent) => {
      //     const rect = dotGrid.getBoundingClientRect();
      //     const mouseX = e.clientX - rect.left;
      //     const mouseY = e.clientY - rect.top;

      //     // Set flag for mouse movement
      //     isMouseMoving = true;
      //     clearTimeout(mouseTimeout);

      //     // Update dots based on current mouse position
      //     updateDots(mouseX, mouseY);

      //     // Store last position
      //     lastMouseX = mouseX;
      //     lastMouseY = mouseY;

      //     // Set timeout to detect when mouse stops
      //     mouseTimeout = setTimeout(() => {
      //       isMouseMoving = false;
      //     }, 100);
      //   };

      //   // Function to update dots with improved performance
      //   function updateDots(mouseX: number, mouseY: number) {
      //     const dots = document.querySelectorAll(".dot");
      //     // Calculate velocity for more responsive effect during fast movements
      //     const velocity = isMouseMoving ? 1.5 : 1;
      //     const maxDistance = isMouseMoving ? 150 : 100; // Larger radius when moving fast

      //     dots.forEach((dot) => {
      //       const dotElement = dot as HTMLElement;
      //       const dotX = parseInt(dotElement.style.left) + containerPadding; // Adjust for the offset
      //       const dotY = parseInt(dotElement.style.top);

      //       // Calculate distance from mouse to dot
      //       const distance = Math.sqrt(
      //         Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2)
      //       );

      //       // Improved reactivity with larger radius and more intense effect
      //       if (distance < maxDistance) {
      //         // Calculate intensity based on distance (closer = more intense)
      //         // More pronounced effect with velocity factor
      //         const intensity =
      //           Math.pow(1 - distance / maxDistance, 1.5) * velocity;

      //         // Apply color and scaling based on intensity
      //         dotElement.style.color = `rgba(255, 255, 255, ${Math.min(intensity, 1)})`;

      //         // Add subtle movement away from cursor
      //         const angle = Math.atan2(dotY - mouseY, dotX - mouseX);
      //         const pushDistance = intensity * 12; // Increased movement for better visibility
      //         const newX = Math.cos(angle) * pushDistance;
      //         const newY = Math.sin(angle) * pushDistance;

      //         // Apply transform with scale for better visibility
      //         dotElement.style.transform = `translate(${newX}px, ${newY}px) scale(${
      //           1 + intensity * 1.2
      //         })`;
      //       } else {
      //         dotElement.style.color = "#444";
      //         dotElement.style.transform = "none";
      //       }
      //     });
      //   }

      //   // Reset dots when mouse leaves grid
      //   const handleMouseLeave = () => {
      //     const dots = document.querySelectorAll(".dot");
      //     dots.forEach((dot) => {
      //       const dotElement = dot as HTMLElement;
      //       dotElement.style.color = "#444";
      //       dotElement.style.transform = "none";
      //     });
      //   };

      //   dotGrid.addEventListener("mousemove", handleMouseMove);
      //   dotGrid.addEventListener("mouseleave", handleMouseLeave);

      //   // Handle window resize for dot grid
      //   const handleDotGridResize = () => createDotGrid();
      //   window.addEventListener("resize", handleDotGridResize);

      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize);
        // window.removeEventListener("resize", handleDotGridResize);
        window.removeEventListener("scroll", handleScroll);
        // dotGrid.removeEventListener("mouseleave", handleMouseLeave);
        if (stickyContainer) {
          observer.unobserve(stickyContainer);
        }
        animationActive = false;
      };
    }

    // Initialize and start animation
    initializeStars();
    animate();
  }, []);

  return (
    <section className="py-20">
      <div className="sticky-container" id="stickyContainer">
        <div className="webgl-section" id="webglSection">
          <div className="canvas-container" id="canvasContainer">
            <canvas id="space"></canvas>
            <div className="animated-text" id="animatedText">
              CLARITY
              <br />
              THROUGH
              <br />
              SIMPLICITY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
