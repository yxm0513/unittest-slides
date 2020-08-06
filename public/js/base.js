(function() {
    window.changeBackgroundColor = cls => {
        const classList = window.wsInstance.el.classList;
        classList.forEach(a => {
            if (/^bg-/.test(a)) {
                classList.remove(a);
            }
        });
        classList.add(cls);
    };
    window.myfunction = function(e){
        zoom.to({
              element: e
        });
    }
})();

document.addEventListener("load", function(event) {
    console.log(window.wsInstance.el)
    //console.log('event loaded')
	//changeBackgroundColor('bg-apple')
});

document.addEventListener( 'keydown', function( event ) {
if(event.keyCode === 40 ) {
   zoom.out();}
} );
