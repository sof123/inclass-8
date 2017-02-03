const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default valuesj
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}


const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
  const theCanvas = { width: 10, height: 5 }
	var velNew = velocity;
	var posNew = position;
  if (velNew){
  	velNew[0] += acceleration[0]*delta;
  	velNew[1] += acceleration[1]*delta;
  }
  if (posNew)
  {
  	posNew[0] += velocity[0]*delta;
  	posNew[1] += velocity[1]*delta;
    if (posNew[0] < 0)
    {
      posNew[0] = posNew[0] + theCanvas.width;
    }
    if (posNew[1] < 0)
    {
      posNew[1] = posNew[1] + theCanvas.height;
    }
  }

	return {acceleration,velNew,posNew,mass};
}

export default particle

export { update }
