import { ConvexPolyhedron, Vec3 } from 'cannon-es';

 const createPhysicsShapeFromGeometry = (geometry) => {
	const vertices = []
	const faces = []
	const clonedGeometry = geometry.clone()
	const positions = clonedGeometry.attributes.position
	const indices = clonedGeometry.index
	
	
	for (let i = 0; i < positions.count; i++) {
		vertices.push(new Vec3(
			positions.getX(i),
			positions.getY(i),
			positions.getZ(i)
		))
	}
	
	for (let j = 0; j < indices.count; j += 3) {
		faces.push([
			indices.array[j],
			indices.array[j + 1],
			indices.array[j + 2]
		])
	}
	
return new ConvexPolyhedron({ vertices, faces })
}

export { createPhysicsShapeFromGeometry }