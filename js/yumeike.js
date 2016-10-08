(function( global ) {
    var init;
    function animate( config ) {
        return new animate.prototype.init( config );
    }
    animate.prototype = {
        constructor: animate,
        toRadian: function( angle ) {
            return Math.PI * angle / 180;
        },
        computedPos: function( angle, radius ) {
            return {
                x: this.canvasWidth / 2 + radius * Math.cos( this.toRadian( angle ) ),
                y: this.canvasHeight / 2 + radius * Math.sin( this.toRadian( angle ) )
            };
        },
        drawGlobe: function( option ) {
            this.context.beginPath();
            this.context.arc( option.position.x, option.position.y, option.radius, 0, 2 * Math.PI );
            this.context.strokeStyle = option.borderColor;
            this.context.lineWidth = option.border;
            this.context.stroke();
            this.context.fillStyle = option.fillColor;
            this.context.fill();
            this.context.font = option.font +　'px 宋体';
            this.context.fillStyle = '#fff';
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillText( option.title, option.position.x, option.position.y );
            this.context.closePath();
        },
        draw: function() {
            this.context.clearRect( 0, 0, this.canvasWidth, this.canvasHeight );
            this.drawGlobe( this.data );
            for( var i = 0,l1 = this.data.skills.length; i < l1; i++ ){
                for( var j = 0,l2 = this.data.skills[ i ].child.length; j < l2; j++ ){
                    this.drawGlobe( this.data.skills[ i ].child[ j ] );
                }
            }
        },
        update: function() {
            for( var i = 0,l1 = this.data.skills.length; i < l1; i++ ){
                var radius = this.data.skills[ i ].radius;
                for( var j = 0,l2 = this.data.skills[ i ].child.length; j < l2; j++ ){
                    var globe = this.data.skills[ i ].child[ j ];
                    globe.angle += i % 2 ? ( i / 3 + 1 ) * this.speed : -( i / 3 + 1 ) * this.speed;
                    globe.position = this.computedPos( globe.angle, radius );
                }
            }
        },
        bind: function() {
            var self = this;
            this.context.canvas.addEventListener( 'mouseenter', function() {
                self.speed = 0.2;
            } );
            this.context.canvas.addEventListener( 'mouseleave', function() {
                self.speed = self.initSpeed;
            } );
        },
        start:function() {
            var self = this;
            this.isStarting = true;
            global.requestAnimationFrame(function() {
                self.update();
                self.draw();
                global.requestAnimationFrame(arguments.callee);
            });
        },
        render: function() {
            global.document.querySelector( this.target ).appendChild( this.context.canvas );
            if( !this.isStarting ){
                this.bind();
                this.start();
            }
            return this;
        }
    };
    init = animate.prototype.init = function(config) {
        if( !config.target || !config.data ) throw new Error('参数错误。');
        this.target = config.target;
        this.data = config.data;
        this.canvasWidth = config.canvasWidth || 600;
        this.canvasHeight = config.canvasHeight || 600;
        this.initSpeed = config.speed || 1;
        this.speed = this.initSpeed;
        // this.fps = config.fps || 60;
        var canvas = global.document.createElement('canvas');
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        this.context = canvas.getContext('2d');
        this.isStarting = false;
    };
    init.prototype = animate.prototype;
    global.animate = animate;
}( window ));