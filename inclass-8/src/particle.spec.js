import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle()
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
		
        // check position, velocity, acceleration, mass
		expect(isNumber(p.position[0])).to.be(true);
		expect(isNumber(p.position[1])).to.be(true);
		expect(isNumber(p.velocity[0])).to.be(true);
		expect(isNumber(p.velocity[1])).to.be(true);
		expect(isNumber(p.acceleration[0])).to.be(true);
		expect(isNumber(p.acceleration[1])).to.be(true);
		expect(isNumber(p.mass)).to.be(true);
		expect(p.position.length).to.be(2);
		expect(p.velocity.length).to.be(2);
		expect(p.acceleration.length).to.be(2);

    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.equal([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.equal([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
		const p = particle({ velocity: [1, 1], acceleration: [0.5, -0.5] })
        const { velocity } = update(p, 2.0) // dt is different here
        expect(velocity).to.equal([2.0, 0.0])
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
		
		const p = particle({ position: [1000, 1000], velocity: [0.5, -0.5] })
		const { position } = update(p, 2.0)
		var cW = 800;
		var cH = 800;
		expect(position[0]).to.be.closeTo(cW/2,cW/2);
		expect(position[1]).to.be.closeTo(cH/2,cH/2);
		
		
    })

})

function isNumber(obj) { return !isNaN(parseFloat(obj)) }
