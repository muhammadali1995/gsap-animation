// import { useEffect } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// // Register ScrollTrigger plugin
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export function Hero() {
//   useEffect(() => {
//     console.log("Hero useEffect started");

//     // Setup canvas and context
//     const canvas = document.getElementById("space") as HTMLCanvasElement;
//     if (!canvas) {
//       console.error("Canvas element not found");
//       return;
//     }

//     const ctx = canvas.getContext("2d");
//     if (!ctx) {
//       console.error("Canvas context not available");
//       return;
//     }

//     // Set canvas size
//     const resizeCanvas = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//       console.log("Canvas resized:", canvas.width, "x", canvas.height);
//     };

//     resizeCanvas();

//     // Starfield settings
//     const numStars = 1900;
//     const focalLength = canvas.width * 2;
//     let centerX = canvas.width / 2;
//     let centerY = canvas.height / 2;
//     const baseTrailLength = 2;
//     const maxTrailLength = 30;

//     // Stars array
//     let stars: Array<{
//       x: number;
//       y: number;
//       z: number;
//       o: number;
//       trail: Array<{ x: number; y: number }>;
//     }> = [];

//     // Animation control
//     let warpSpeed = 0.02; // Start very slow
//     let animationActive = true;

//     // Initialize stars
//     function initializeStars() {
//       stars = [];
//       for (let i = 0; i < numStars; i++) {
//         stars.push({
//           x: Math.random() * canvas.width,
//           y: Math.random() * canvas.height,
//           z: Math.random() * canvas.width,
//           o: 0.5 + Math.random() * 0.5,
//           trail: [],
//         });
//       }
//       console.log("Stars initialized:", stars.length);
//     }

//     // Update star positions
//     function moveStars() {
//       for (let i = 0; i < stars.length; i++) {
//         const star = stars[i];
//         // Move star based on warp speed - always forward
//         const speed = 1 + warpSpeed * 50;
//         star.z -= speed;
//         // Reset star position when it passes the viewer
//         if (star.z < 1) {
//           star.z = canvas.width;
//           star.x = Math.random() * canvas.width;
//           star.y = Math.random() * canvas.height;
//           star.trail = [];
//         }
//       }
//     }

//     // Draw stars and their trails
//     function drawStars() {
//       if (!ctx) return;

//       // Resize canvas if needed
//       if (
//         canvas.width !== canvas.offsetWidth ||
//         canvas.height !== canvas.offsetHeight
//       ) {
//         resizeCanvas();
//         centerX = canvas.width / 2;
//         centerY = canvas.height / 2;
//       }

//       // Calculate trail length based on warp speed
//       const trailLength = Math.floor(
//         baseTrailLength + warpSpeed * (maxTrailLength - baseTrailLength)
//       );

//       // Clear canvas with fade effect based on warp speed
//       const clearAlpha = 1 - warpSpeed * 0.8;
//       ctx.fillStyle = `rgba(17,17,17,${clearAlpha})`;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Draw stars and trails
//       for (let i = 0; i < stars.length; i++) {
//         const star = stars[i];
//         // Calculate screen position with perspective
//         const px = (star.x - centerX) * (focalLength / star.z) + centerX;
//         const py = (star.y - centerY) * (focalLength / star.z) + centerY;

//         // Add position to trail
//         star.trail.push({
//           x: px,
//           y: py,
//         });
//         if (star.trail.length > trailLength) {
//           star.trail.shift();
//         }

//         // Draw trail
//         if (star.trail.length > 1) {
//           ctx.beginPath();
//           ctx.moveTo(star.trail[0].x, star.trail[0].y);
//           for (let j = 1; j < star.trail.length; j++) {
//             ctx.lineTo(star.trail[j].x, star.trail[j].y);
//           }
//           ctx.strokeStyle = `rgba(209,255,255,${star.o})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         }

//         // Draw star
//         ctx.fillStyle = `rgba(209,255,255,${star.o})`;
//         ctx.fillRect(px, py, 1, 1);
//       }
//     }

//     // Animation loop
//     function animate() {
//       if (animationActive) {
//         requestAnimationFrame(animate);
//         moveStars();
//         drawStars();
//       }
//     }

//     // GSAP ScrollTrigger animation setup
//     const scrollTrigger = ScrollTrigger.create({
//       trigger: "#stickyContainer",
//       start: "top bottom",
//       end: "bottom+=300vh top", // Extended scroll distance for longer effect
//       scrub: 1, // Smooth following of scroll
//       onUpdate: (self) => {
//         const progress = self.progress;

//         // Progressive speed increase with smooth curve
//         const speedCurve = Math.pow(progress, 1.5);
//         warpSpeed = 0.02 + speedCurve * 1.48; // 0.02 to 1.5 for dramatic warp effect

//         // Update text opacity and blur with improved progression
//         const animatedText = document.getElementById("animatedText");
//         if (animatedText) {
//           // Text starts appearing earlier and becomes clear more gradually
//           const textProgress = Math.max(0, Math.min(1, progress * 1.2));
//           const textElement = animatedText as HTMLElement;

//           // Smooth opacity transition
//           textElement.style.opacity = Math.pow(textProgress, 0.7).toString();

//           // Blur decreases as stars speed up
//           const blurAmount = 12 * (1 - Math.pow(textProgress, 0.8));
//           textElement.style.filter = `blur(${blurAmount}px)`;

//           // Text moves up as it becomes clearer
//           const yOffset = 60 * (1 - Math.pow(textProgress, 0.6));
//           textElement.style.transform = `translate(-50%, calc(-50% + ${yOffset}px))`;
//         }
//       },
//     });

//     // Handle visibility - stop animation when out of view
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             if (!animationActive) {
//               animationActive = true;
//               animate();
//             }
//           } else {
//             animationActive = false;
//           }
//         });
//       },
//       { threshold: 0 }
//     );

//     const stickyContainer = document.getElementById("stickyContainer");
//     if (stickyContainer) {
//       observer.observe(stickyContainer);
//     }

//     // Handle window resize
//     const handleResize = () => {
//       resizeCanvas();
//       centerX = canvas.width / 2;
//       centerY = canvas.height / 2;
//     };

//     window.addEventListener("resize", handleResize);

//     // Initialize and start animation
//     initializeStars();
//     animate();

//     console.log("Animation started");

//     // Cleanup function
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       scrollTrigger.kill(); // Clean up ScrollTrigger
//       if (stickyContainer) {
//         observer.unobserve(stickyContainer);
//       }
//       animationActive = false;
//       console.log("Hero cleanup");
//     };
//   }, []);

//   return (
//     <>
//       <section className="h-screen bg-black relative overflow-hidden">
//         <div className="sticky-container" id="stickyContainer">
//           <div className="webgl-section" id="webglSection">
//             <div className="canvas-container" id="canvasContainer">
//               <canvas
//                 id="space"
//                 className="absolute top-0 left-0 w-full h-full"
//                 style={{ display: "block" }}
//               ></canvas>
//               <div className="animated-text" id="animatedText">
//                 CLARITY
//                 <br />
//                 THROUGH
//                 <br />
//                 SIMPLICITY
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Extended scroll area for longer ScrollTrigger effect */}
//       <div className="h-[300vh] bg-transparent"></div>
//     </>
//   );
// }
