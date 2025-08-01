import { ConvexPolyhedron, Vec3 } from '../../../modules/cannon-es.js';

 const createPhysicsShapeFromGeometry = (geometry) => {
	const vertices = []
	const faces = []
	const positions = geometry.attributes.position
	const indices = geometry.index
	
	
	for (let i = 0; i < positions.count; i++) {
		vertices.push(new Vec3(
			positions.getX(i),
			positions.getY(i),
			positions.getZ(i)
		))
	}
	
	for (let j = 0; j < indices.count; j += 3) {
		faces.push([
			indices.getX(j),
			indices.getX(j + 1),
			indices.getX(j + 2),
		])
	}
	
return new ConvexPolyhedron({ vertices })
}

export { createPhysicsShapeFromGeometry }