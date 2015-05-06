'use strict';

var polyval = require( './../lib' ),
	coef,
	sign;

coef = new Array( 25 );
for ( var i = 0; i < coef.length; i++ ) {
	sign = 1;
	if ( Math.random()-0.5 < 0 ) {
		sign = -1;
	}
	coef[ i ] = sign * Math.round( Math.random()*i );
}

// Evaluate the polynomial at a single value:
console.log( polyval( coef, 10 ) );

// Evaluate the polynomial at multiple values:
console.log( polyval( coef, [ 10, -10 ] ) );
