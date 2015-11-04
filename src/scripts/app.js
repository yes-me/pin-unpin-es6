(function() {
	
    import {PinUnpin, ConntentScroll} from './module/import';

    let pinUnpin = new PinUnpin ('side-nav',  'side-nav-wrapper', 90, true); 
   
	pinUnpin.logger();  
    console.log( pinUnpin instanceof ConntentScroll);  //true
    console.log( pinUnpin instanceof PinUnpin);        //true
	
	let cachedScrollYpos =  window.pageYOffset;
	let isScrolled = false;
	
	let onScroll = () => {
		let scrollYpos = window.pageYOffset;
		let scrollDirection = (scrollYpos > cachedScrollYpos) ? 'down' : 'up';
		
		pinUnpin.eventStart(scrollDirection);
		
		cachedScrollYpos = scrollYpos;

	}
	
	window.addEventListener("scroll", () => {
		
		isScrolled = true;

	});

	setInterval( () => {
               
		if ( isScrolled ) {
			isScrolled = false;

			onScroll();
		}
	}, 50);


} ());

