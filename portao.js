/* Montreal 2026 — Portão de Brandemburgo, maquete educativa original.
 * Representação arquitetônica estilizada, construída por geometria Three.js.
 * O monumento real é mais detalhado: não é uma reconstrução fotogramétrica.
 * Requer A-Frame carregado antes deste arquivo. Licença MIT para este protótipo.
 */
(function () {
  'use strict';
  if (!window.AFRAME) { console.error("Montreal: A-Frame indisponível"); return; }
  const THREE3D = window.AFRAME.THREE || window.THREE;
  if (!THREE3D) { console.error("Montreal: Three.js não disponível"); return; }
  AFRAME.registerComponent('portao-montreal', {
    init: function () {
      const THREE = THREE3D;
      const root = new THREE.Group();
      const limestone = new THREE.MeshStandardMaterial({ color: 0xdcc8a0, roughness: 0.86, metalness: 0.0 });
      const warmStone = new THREE.MeshStandardMaterial({ color: 0xbda47a, roughness: 0.87 });
      const edges = new THREE.MeshStandardMaterial({ color: 0xf3dfb9, roughness: 0.87 });
      const bronze = new THREE.MeshStandardMaterial({ color: 0x527e6b, roughness: 0.5, metalness: 0.36 });
      const patinaLight = new THREE.MeshStandardMaterial({ color: 0x74a28a, roughness: 0.6, metalness: 0.22 });
      function box(x,y,z,w,h,d,mat,parent=root){
        const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);
        mesh.position.set(x,y,z); mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
      }
      function cyl(x,y,z,top,bottom,height,mat,parent=root,segments=12){
        const mesh=new THREE.Mesh(new THREE.CylinderGeometry(top,bottom,height,segments),mat);
        mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
      }
      function ball(x,y,z,r,mat,parent=root){
        const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,10,8),mat);
        mesh.position.set(x,y,z);mesh.castShadow=true;parent.add(mesh);return mesh;
      }
      function wheel(x,y,z){
        const mesh=new THREE.Mesh(new THREE.TorusGeometry(.115,.022,7,18),bronze);
        mesh.position.set(x,y,z);mesh.rotation.y=Math.PI/2;root.add(mesh);
        for(let a=0;a<6;a++){
          const spoke=box(x,y,z,.012,.19,.012,patinaLight);
          spoke.rotation.x=a*Math.PI/6;
        }
      }
      // Oito fiadas de degraus / patamar de pedra.
      box(0,.045,0,5.08,.09,1.68,warmStone);
      box(0,.11,0,4.91,.075,1.52,limestone);
      box(0,.155,0,4.78,.045,1.43,edges);
      // Duas fileiras de seis colunas dóricas — cinco passagens.
      for(let row of [-.48,.48]){
        for(let i=0;i<6;i++){
          const x=-2.15+i*.86;
          box(x,.23,row,.39,.14,.37,warmStone);
          box(x,.34,row,.32,.08,.3,edges);
          cyl(x,1.29,row,.135,.185,1.79,limestone);
          for(let fl=0;fl<10;fl++){
            const a=fl*2*Math.PI/10;
            const rr=.145;
            cyl(x+rr*Math.cos(a),1.29,row+rr*Math.sin(a),.012,.018,1.72,edges,root,5);
          }
          box(x,2.23,row,.36,.09,.32,limestone);
          box(x,2.33,row,.43,.12,.37,warmStone);
        }
      }
      // Longarina e friso com marcas da decoração clássica.
      box(0,2.45,0,4.95,.18,1.48,edges);
      box(0,2.60,0,5.03,.12,1.55,warmStone);
      box(0,2.71,0,5.11,.11,1.60,limestone);
      box(0,2.90,0,4.93,.27,1.45,warmStone);
      for(let z of [-.755,.755]){
        for(let i=0;i<23;i++) box(-2.34+i*.213,2.90,z,.053,.17,.026,edges);
      }
      box(0,3.065,0,5.13,.12,1.65,edges);
      box(0,3.145,0,5.23,.08,1.73,warmStone);
      // A quadriga: escultura simplificada e identificável (quatro cavalos, carro e Vitória).
      box(0,3.23,0,1.45,.08,.70,bronze);
      for(let i=0;i<4;i++){
        const x=-.51+i*.34;
        ball(x,3.57,.13,.16,bronze);
        // pescoço levantado e cabeça voltada para a frente
        const neck=cyl(x,3.75,.29,.072,.11,.38,bronze);neck.rotation.x=.42;
        ball(x,3.95,.37,.11,patinaLight);
        const muzzle=box(x,3.92,.48,.14,.08,.18,bronze);
        for(let zz of [0,.24]){
          cyl(x-.08,3.37,zz,.03,.04,.24,bronze);
          cyl(x+.08,3.37,zz,.03,.04,.24,bronze);
        }
      }
      // Carro com rodas, torso e braços da Vitória.
      box(0,3.42,-.25,.55,.30,.35,bronze);
      wheel(-.38,3.30,-.21);wheel(.38,3.30,-.21);
      cyl(0,3.83,-.27,.10,.15,.48,patinaLight);
      ball(0,4.15,-.27,.105,patinaLight);
      box(0,4.00,-.24,.35,.06,.10,bronze);
      cyl(.19,4.20,-.27,.017,.018,.38,bronze);
      ball(.19,4.41,-.27,.09,bronze);
      // Correção: modelo é agrupado e reduzido no elemento A-Frame.
      root.traverse(obj=>{ if(obj.isMesh){ obj.frustumCulled=false; }});
      this.el.setObject3D('mesh',root);
    },
    remove: function () { this.el.removeObject3D('mesh'); }
  });
})();
