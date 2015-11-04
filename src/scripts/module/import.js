class ConntentScroll { 

	constructor (targetElm, watchElm, offset) { 

		this.targetElm   = document.getElementById(targetElm);
		this.watchElm   = document.getElementById(watchElm);  
		this.offset  = offset;
	} 

	logger () {
		console.log ( `Target Element: ${this.targetElm}. The wathch Element: ${this.watchElm}` ) ;    
	}

	getViewPort() { 

		var winW = window.innerWidth;

		var chkViewPort = (winW < 768) ? 'mobile' : ((winW > 991) ? 'desktop' : 'tablet ');

		return chkViewPort; 
	} 

	getOnScrollEvent () {
		var scrollEvent = /Android|Nexus|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)? "touchmove" : "scroll";

		return scrollEvent;
	}
} 


class PinUnpin extends ConntentScroll { 

	constructor(targetElm, watchElm, offset, isPin ) {
		super(targetElm, watchElm, offset);
		this.isPinned = true;
	}

	set pinned(value) {
		this.isPinned = value; 
	}

	get pinned() {
		return this.isPinned;
	}

	logger () {
		console.log ( `isPinned = ${this.isPinned}` ) ;    
	}

	eventStart (scrollDirection) {


		var isPin = this.isPinned,
			targetElm = this.targetElm,
			offset = this.offset,
			targetElmHeight = this.targetElm.offsetHeight,
			bottom = this.watchElm.getBoundingClientRect().bottom;

		if ( bottom - offset <= targetElmHeight && isPin && scrollDirection === 'down' ) {

			targetElm.classList.remove('yesme-pinOnTop');
			targetElm.classList.add('yesme-pinOnBottom');

			this.isPinned = false;


		} else if ( bottom - offset > targetElmHeight && !isPin && scrollDirection === 'up') {

			targetElm.classList.add('yesme-pinOnTop');
			targetElm.classList.remove('yesme-pinOnBottom');
			this.isPinned = true;

		}    


	}

} 


export { PinUnpin, ConntentScroll };