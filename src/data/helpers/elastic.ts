//
// VARIABLES
//

let spring = .4,
    friction = .8,
    easing = .1,
    vy = 0,
    sy = 100,
dy = 200;


export const elastic = (released) => {

    if (released) {

        vy = vy + (dy - sy) * spring;
        sy = sy +  (vy *= friction)

    } else {

        sy = sy + (dy - sy) * easing

    }

    return sy;

};
