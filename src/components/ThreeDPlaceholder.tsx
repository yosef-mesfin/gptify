import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { TweenMax, Power0 } from "gsap";
import { styled } from "@mui/material/styles";
import useResponsive from "@/hooks/useResponsive";

const PlaceholderContainer = styled("div")({
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	overflow: "hidden",
	position: "relative",
	paddingRight: "10%",
});

const ThreeDPlaceholder: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const isMobile = useResponsive("down", "sm");

	useEffect(() => {
		if (isMobile) return;

		let scene: any, camera: any, renderer: any;

		const init = () => {
			scene = new THREE.Scene();

			camera = new THREE.PerspectiveCamera(
				70,
				window.innerWidth / window.innerHeight,
				0.0001,
				10000
			);
			camera.position.set(0, 0, 5);
			scene.add(camera);

			renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);

			if (mountRef.current) {
				mountRef.current.appendChild(renderer.domElement);
			}

			createOrbiters();
			createSphere();

			window.addEventListener("resize", resizeHandler);
		};

		const createOrbiters = () => {
			const orbitGeometry = new THREE.IcosahedronGeometry(0.07, 1);
			// const colors = [0xff99cc, 0xd15bb7, 0x9b2d92];
			const colors = [0xff99cc, 0xff99cc, 0xff99cc];

			for (let i = 0; i < 3; i++) {
				const orbitMaterial = new THREE.MeshBasicMaterial({
					color: colors[i],
				});

				const color: THREE.Color[] = [
					new THREE.Color(0xff99cc),
					new THREE.Color(0xff99cc),
					new THREE.Color(0xff99cc),
				];

				const wrapper = new THREE.Object3D();
				wrapper.rotation.order = "ZXY";
				wrapper.rotation.set(0, 0, 0 - i);
				scene.add(wrapper);

				const light = new THREE.PointLight(color[i], 2, 1);
				light.position.set(0, 0.4, 0.4);
				wrapper.add(light);

				const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
				orbit.position.set(
					light.position.x,
					light.position.y,
					light.position.z
				);
				wrapper.add(orbit);

				TweenMax.to(wrapper.rotation, 2, {
					ease: Power0.easeNone,
					x: Math.PI * 2,
					repeat: -1,
					delay: i * -0.7,
				});
			}
		};

		const createSphere = () => {
			const sphereGeometry = new THREE.IcosahedronGeometry(0.3, 1);
			const sphereMaterial = new THREE.MeshPhongMaterial({
				// color: 0x000515,
				color: 0x323232,
				flatShading: true,
				shininess: 0,
			});

			const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
			scene.add(sphere);

			TweenMax.to(sphere.rotation, 60, {
				ease: Power0.easeNone,
				x: Math.PI * 2,
				y: Math.PI * 2,
				repeat: -1,
			});

			const sunLight = new THREE.PointLight(0xffffff, 0.7, 20);
			sunLight.position.set(10, 6, 7);
			scene.add(sunLight);
		};

		const resizeHandler = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};

		const render = () => {
			requestAnimationFrame(render);
			renderer.render(scene, camera);
		};

		init();
		render();

		return () => {
			window.removeEventListener("resize", resizeHandler);
			mountRef.current?.removeChild(renderer.domElement);
		};
	}, [isMobile]);

	return <PlaceholderContainer ref={mountRef} />;
};

export default ThreeDPlaceholder;
