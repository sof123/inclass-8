import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

  const canvas = { width: 10, height: 5 }

    it('should have default values', () => {
        const p = particle()
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok

        // check position, velocity, acceleration, mass
		expect(isNumber(p.position[0]) == true);
		expect(isNumber(p.position[1]) == true);
		expect(isNumber(p.velocity[0]) == true);
		expect(isNumber(p.velocity[1]) == true)
		expect(isNumber(p.acceleration[0]) == true);
		expect(isNumber(p.acceleration[1]) == true);
		expect(isNumber(p.mass) == true);
		expect(p.position.length == 2);
		expect(p.velocity.length == 2);
		expect(p.acceleration.length == 2);

    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const obj = update(p, 1.0);
        const position = obj.posNew;
        expect(position[0]).to.equal(1.5)
        expect(position[1]).to.equal(0.5)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const obj = update(p, 2.0) // dt is different here
        const position = obj.posNew;
        expect(position[0]).to.equal(2.0)
        expect(position[1]).to.equal(0.0)
    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
		const p = particle({ velocity: [1, 1], acceleration: [0.5, -0.5] })
        const obj = update(p, 2.0) // dt is different here
        const velocity = obj.velNew;
        expect(velocity[0]).to.equal(2.0)
        expect(velocity[1]).to.equal(0.0)
    })

    it('particles should wrap around the world', () => {
        const p = particle({ position: [5, 5], velocity: [1, 0.5] })

        const p_left = update(p, -6, canvas)
        expect(p_left.posNew[0] > 0)
        const p_right = update(p, 6, canvas)
        expect(p_right.posNew[0] > 0)
        const p_top = update(p, 12, canvas)
        expect(p_top.posNew[1] > 0)
        const p_bottom = update(p, -12, canvas)
        expect(p_bottom.posNew[1] > 0)
    })

})

function isNumber(obj) { return !isNaN(parseFloat(obj)) }
