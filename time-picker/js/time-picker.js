class TimePicker extends HTMLElement {

  static get observedAttributes() { return ['hours', 'minutes'] };

	constructor() {
		super();
		this.initShadowDOM();
		this.setUIReferences();
		this.updateDisplay();
		this.addEventListeners();
	};

	initShadowDOM() {
		this.attachShadow( { mode: 'open' } );
		const clockDOM = document.getElementById( 'time-picker-dom' );
		const clockDOMClone = document.importNode( clockDOM.content, true );
		this.shadowRoot.appendChild( clockDOMClone );
	};

	setUIReferences() {
		const fields = this.shadowRoot.querySelectorAll( '.field' );
		this.hourDisplay = fields[0].querySelector( 'input' );
		this.hourIncrement = fields[0].querySelectorAll( 'svg' )[0];
		this.hourDecrement = fields[0].querySelectorAll( 'svg' )[1];

		this.minuteDisplay = fields[1].querySelector( 'input' );
		this.minuteIncrement = fields[1].querySelectorAll( 'svg' )[0];
		this.minuteDecrement = fields[1].querySelectorAll( 'svg' )[1];

	};
  
	set hours( value ) {
		const hours = parseInt( value );
		if (this.validateHours( hours ) ) {
			this.setAttribute( 'hours', hours );
		};
	};

	set minutes( value ) {
		const minutes = parseInt( value );
		if ( this.validateMinutes( minutes ) ) {
			this.setAttribute( 'minutes', minutes );
		};
	};
  
	get hours() {
		return parseInt( this.getAttribute( 'hours' ) );
	};
  
	get minutes() {
		return parseInt( this.getAttribute( 'minutes' ) );
	};
  
	addEventListeners() {
		this.incrementHour = this.incrementHour.bind( this );
		this.decrementHour = this.decrementHour.bind( this );
		this.incrementMinute = this.incrementMinute.bind( this );
		this.decrementMinute = this.decrementMinute.bind( this );

		function executeOnEnter(fn, event) {
			if ( event.key === 'Enter' ) {
				fn();
			};
		};
    
		this.hourIncrement.addEventListener( 'click', this.incrementHour );
		this.hourIncrement.addEventListener( 'keydown', executeOnEnter.bind( this, this.incrementHour ) );

		this.hourDecrement.addEventListener( 'click', this.decrementHour );
		this.hourDecrement.addEventListener( 'keydown', executeOnEnter.bind( this, this.decrementHour ) );

		this.minuteIncrement.addEventListener( 'click', this.incrementMinute );
		this.minuteIncrement.addEventListener( 'keydown', executeOnEnter.bind( this, this.incrementMinute ) );

		this.minuteDecrement.addEventListener( 'click', this.decrementMinute );
		this.minuteDecrement.addEventListener( 'keydown', executeOnEnter.bind( this, this.decrementMinute ) );
    
		this.hourDisplay.addEventListener( 'change', event => {
			const hours = parseInt( event.currentTarget.value );
			if ( this.validateHours( hours ) ) {
				this.setAttribute( 'hours', hours );
			} else {
				this.updateDisplay();
			}
		});

		this.minuteDisplay.addEventListener( 'change', event => {
			const minutes = parseInt( event.currentTarget.value );
			if ( this.validateMinutes( minutes ) ) {
				this.setAttribute( 'minutes', minutes );
			} else {
				this.updateDisplay();
			}
		});
	};

	attributeChangedCallback( name, oldValue, newValue ) {
		if ( ['hours', 'minutes'].includes( name ) ) {
			this.updateDisplay();
		};
	};

	incrementHour() {
		let hours = parseInt( this.getAttribute( 'hours' ) );
		hours = ( hours + 1 ) % 24;
		this.setAttribute( 'hours', hours );
	};

	decrementHour() {
		let hours = parseInt( this.getAttribute( 'hours' ) );
		--hours;
		if ( hours === -1 ) {
			hours = 23;
		};
		this.setAttribute( 'hours', hours );
	};

	incrementMinute() {
		let minutes = parseInt( this.getAttribute( 'minutes' ) );
		minutes = ( minutes + 30 ) % 60;
		if ( minutes === 0 ) {
			this.incrementHour();
		};

		this.setAttribute('minutes', minutes);
	};

	decrementMinute() {
		let minutes = parseInt( this.getAttribute( 'minutes' ) );
		minutes = ( minutes - 30 );
		if ( minutes < 0 ) {
			minutes = 30;
			this.decrementHour();
		};

		this.setAttribute( 'minutes', minutes );
	};

	updateDisplay() {
		if ( this.getAttribute( 'hours' ) && this.getAttribute( 'minutes' ) ){
			this.hourDisplay.value = this.formatClockValue( this.getAttribute( 'hours' ) );
			this.minuteDisplay.value = this.formatClockValue( this.getAttribute( 'minutes' ) );
		};
	};

	formatClockValue( value ) {
		return value.toString().padStart( 2, '0' );
	};

	validateHours( value ) {
		return Number.isInteger( value ) && value >= 0 && value < 24;
	};

	validateMinutes( value ) {
		return Number.isInteger( value ) && value >= 0 && value < 60;
	};

	get time() {
		const nowDate = new Date();
		return Date.UTC( nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), this.getAttribute('hours'), this.getAttribute('minutes') );
	};

	get timeString(){
		return `${ this.getAttribute('hours') } : ${ this.getAttribute('minutes') }`;
	};

	set timeString( data ){
		console.log( data );
	};
};


/*
const register = () => customElements.define( 'time-picker', TimePicker );
window.WebComponents ? window.WebComponents.waitFor( register ) : register();

timePickers = new Array();

timePickers.push( new TimePicker() );
timePickers[0].hours = "12";
timePickers[0].minutes = "00";
timePickers[0].updateDisplay();
document.body.appendChild( timePickers[0] );
*/


/*
timePickers.push( new TimePicker() );
timePickers[1].hours = "22";
timePickers[1].minutes = "00";
timePickers[1].updateDisplay();
document.body.appendChild( timePickers[1] );

timePickers.push( new TimePicker() );
timePickers[2].hours = "19";
timePickers[2].minutes = "45";
timePickers[2].updateDisplay();
document.body.appendChild( timePickers[2] );
*/
/*
let timePicker = document.querySelectorAll( 'time-picker' )[0];
timePicker.timeString = "pippo";
timePicker.updateDisplay();
*/

