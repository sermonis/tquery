//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle scene
 *
 * @class include THREE.Material
 *
 * @param {THREE.Material} object an instance or an array of instance
*/
tQuery.Scene	= function()
{
	// update default scene.
	// - TODO no sanity check ?
	tQuery.scene	= this;
	
	// create a scene
	this._scene	= new THREE.Scene();

	// create a renderer
	if( Detector.webgl ){
		this._renderer = new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
		this._renderer.setClearColorHex( 0xBBBBBB, 1 );
	// uncomment if webgl is required
	//}else{
	//	Detector.addGetWebGLMessage();
	//	return true;
	}else{
		this._renderer	= new THREE.CanvasRenderer();
	}
	// FIXME this window dimension is crap
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	// create a camera in the scene
	// FIXME this window dimension is crap
	this._camera	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
	this._camera.position.set(0, 0, 5);
	this._scene.add(this._camera);
};

// make it pluginable
tQuery.pluginsMixin(tQuery.Scene);


tQuery.Scene.prototype.destroy	= function()
{
	
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Scene.prototype.add	= function(object3d)
{
	if( object3d instanceof tQuery.Object3D ){
		object3d.each(function(object3d){
			this._scene.add(object3d)			
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._scene.add(object3d)		
	}else	console.assert(false);
	// for chained API
	return this;
}
tQuery.Scene.prototype.remove	= function(object3d)
{
	console.assert(object3d instanceof THREE.Object3D)
	this._scene.remove(object3d)
	// for chained API
	return this;
}

tQuery.Scene.prototype.fullpage	= function()
{
	// Should that be in pluging
	var domElement	= document.body;
	domElement.style.margin		= "0";
	domElement.style.padding	= "0";
	domElement.style.overflow	= 'hidden';
	return this.appendTo(domElement);
}

tQuery.Scene.prototype.appendTo	= function(domElement)
{
	domElement.appendChild(this._renderer.domElement)
	this._renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );
	// for chained API
	return this;
}

tQuery.Scene.prototype.renderer	= function(){ return this._renderer;	}
tQuery.Scene.prototype.camera	= function(){ return this._camera;	}
tQuery.Scene.prototype.scene	= function(){ return this._scene;	}
tQuery.Scene.prototype.get	= function(){ return this._scene;	}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Scene.prototype.render	= function()
{
	// actually render the scene
	this._renderer.render( this._scene, this._camera );
}