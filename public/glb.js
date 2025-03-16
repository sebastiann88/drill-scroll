export function setupViewer() {
  var _a, _b, _c, _d, _e, _f;
  return __awaiter(this, void 0, void 0, function () {
    function setupScrollanimation() {
      var tl = gsap_1.default.timeline();
      // FIRST SECTION
      tl.to(position, {
        x: isMobile ? -6.0 : 1.56,
        y: isMobile ? 5.5 : -2.26,
        z: isMobile ? -3.3 : -3.85,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top top",
          scrub: true,
          immediateRender: false
        },
        onUpdate: onUpdate
      }).to(".section--one--container", {
        xPercent: '-150',
        opacity: 0,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top 80%",
          scrub: 1,
          immediateRender: false
        }
      }).to(target, {
        x: isMobile ? -1.1 : -1.37,
        y: isMobile ? 1.0 : 1.99,
        z: isMobile ? -0.1 : -0.37,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top top",
          scrub: true,
          immediateRender: false
        }
      })
      // LAST SECTION
      .to(position, {
        x: -3.4,
        y: 9.6,
        z: 1.71,
        scrollTrigger: {
          trigger: ".third",
          start: "top bottom",
          end: "top top",
          scrub: true,
          immediateRender: false
        },
        onUpdate: onUpdate
      }).to(target, {
        x: -1.5,
        y: 2.13,
        z: -0.4,
        scrollTrigger: {
          trigger: ".third",
          start: "top bottom",
          end: "top top",
          scrub: true,
          immediateRender: false
        }
      });
    }
    function onUpdate() {
      needsUpdate = true;
      // viewer.renderer.resetShadows()
      viewer.setDirty();
    }
    function enableControlers() {
      exitButton.style.display = "block";
      customizerInterface.style.display = "block";
      viewer.scene.activeCamera.setCameraOptions({
        controlsEnabled: true
      });
    }
    function changeColor(_colorToBeChanged) {
      drillMaterial.color = _colorToBeChanged;
      viewer.scene.setDirty();
    }
    var viewer, isMobile, manager, camera, position, target, exitButton, customizerInterface, importer, drillMaterial, needsUpdate, sections, mainContainer;
    return __generator(this, function (_g) {
      switch (_g.label) {
        case 0:
          viewer = new webgi_1.ViewerApp({
            canvas: document.getElementById('webgi-canvas')
            // isAntialiased: true,
          });

          isMobile = (0, webgi_1.mobileAndTabletCheck)();
          return [4 /*yield*/, viewer.addPlugin(webgi_1.AssetManagerPlugin)];
        case 1:
          manager = _g.sent();
          camera = viewer.scene.activeCamera;
          position = camera.position;
          target = camera.target;
          exitButton = document.querySelector('.button--exit');
          customizerInterface = document.querySelector('.customizer--container');
          // Add plugins individually.
          return [4 /*yield*/, viewer.addPlugin(webgi_1.GBufferPlugin)];
        case 2:
          // Add plugins individually.
          _g.sent();
          return [4 /*yield*/, viewer.addPlugin(new webgi_1.ProgressivePlugin(32))];
        case 3:
          _g.sent();
          return [4 /*yield*/, viewer.addPlugin(new webgi_1.TonemapPlugin(true))];
        case 4:
          _g.sent();
          return [4 /*yield*/, viewer.addPlugin(webgi_1.GammaCorrectionPlugin)];
        case 5:
          _g.sent();
          return [4 /*yield*/, viewer.addPlugin(webgi_1.SSRPlugin)];
        case 6:
          _g.sent();
          return [4 /*yield*/, viewer.addPlugin(webgi_1.SSAOPlugin)];
        case 7:
          _g.sent();
          return [4 /*yield*/, viewer.addPlugin(webgi_1.BloomPlugin)
          // Loader
          ];

        case 8:
          _g.sent();
          importer = manager.importer;
          importer.addEventListener("onProgress", function (ev) {
            var _a;
            var progressRatio = ev.loaded / ev.total;
            // console.log(progressRatio)
            (_a = document.querySelector('.progress')) === null || _a === void 0 ? void 0 : _a.setAttribute('style', "transform: scaleX(" + progressRatio + ")");
          });
          importer.addEventListener("onLoad", function (ev) {
            gsap_1.default.to('.loader', {
              x: '100%',
              duration: 0.8,
              ease: 'power4.inOut',
              delay: 1,
              onComplete: function onComplete() {
                document.body.style.overflowY = 'auto';
                lenis.start();
              }
            });
          });
          viewer.renderer.refreshPipeline();
          return [4 /*yield*/, manager.addFromPath("./assets/drill3.glb")];
        case 9:
          _g.sent();
          drillMaterial = manager.materials.findMaterialsByName('Drill_01')[0];
          viewer.getPlugin(webgi_1.TonemapPlugin).config.clipBackground = true; // in case its set to false in the glb
          viewer.scene.activeCamera.setCameraOptions({
            controlsEnabled: false
          });
          if (isMobile) {
            position.set(-3.5, -1.1, 5.5);
            target.set(-0.8, 1.55, -0.7);
            camera.setCameraOptions({
              fov: 40
            });
          }
          onUpdate();
          window.scrollTo(0, 0);
          setupScrollanimation();
          needsUpdate = true;
          viewer.addEventListener('preFrame', function () {
            if (needsUpdate) {
              camera.positionTargetUpdated(true);
              needsUpdate = false;
            }
          });
          // KNOW MORE EVENT
          (_a = document.querySelector('.button--hero')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            var element = document.querySelector('.second');
            window.scrollTo({
              top: element === null || element === void 0 ? void 0 : element.getBoundingClientRect().top,
              left: 0,
              behavior: 'smooth'
            });
          });
          // SCROLL TO TOP
          (_b = document.querySelectorAll('.button--footer')) === null || _b === void 0 ? void 0 : _b.forEach(function (item) {
            item.addEventListener('click', function () {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
              });
            });
          });
          sections = document.querySelector('.container');
          mainContainer = document.getElementById('webgi-canvas-container');
          (_c = document.querySelector('.button--customize')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
            sections.style.display = "none";
            mainContainer.style.pointerEvents = "all";
            document.body.style.cursor = "grab";
            lenis.stop();
            gsap_1.default.to(position, {
              x: -2.6,
              y: 0.2,
              z: -9.6,
              duration: 2,
              ease: "power3.inOut",
              onUpdate: onUpdate
            });
            gsap_1.default.to(target, {
              x: -0.15,
              y: 1.18,
              z: 0.12,
              duration: 2,
              ease: "power3.inOut",
              onUpdate: onUpdate,
              onComplete: enableControlers
            });
          });
          // EXIT CUSTOMIZER
          exitButton.addEventListener('click', function () {
            gsap_1.default.to(position, {
              x: -3.4,
              y: 9.6,
              z: 1.71,
              duration: 1,
              ease: "power3.inOut",
              onUpdate: onUpdate
            });
            gsap_1.default.to(target, {
              x: -1.5,
              y: 2.13,
              z: -0.4,
              duration: 1,
              ease: "power3.inOut",
              onUpdate: onUpdate
            });
            viewer.scene.activeCamera.setCameraOptions({
              controlsEnabled: false
            });
            sections.style.display = "contents";
            mainContainer.style.pointerEvents = "none";
            document.body.style.cursor = "default";
            exitButton.style.display = "none";
            customizerInterface.style.display = "none";
            lenis.start();
          });
          (_d = document.querySelector('.button--colors.black')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
            changeColor(new webgi_1.Color(0x383830).convertSRGBToLinear());
          });
          (_e = document.querySelector('.button--colors.red')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
            changeColor(new webgi_1.Color(0xfe2d2d).convertSRGBToLinear());
          });
          (_f = document.querySelector('.button--colors.yellow')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () {
            changeColor(new webgi_1.Color(0xffffff).convertSRGBToLinear());
          });
          return [2 /*return*/];
      }
    });
  });
}

setupViewer();
},{"webgi":"rbXN","./styles.css":"D9Nj","gsap":"f8Z0","gsap/ScrollTrigger":"rpvU","@studio-freight/lenis":"gbeq"}]},{},["B6dB"], null)
//# sourceMappingURL=src.9e7df4a6.js.map