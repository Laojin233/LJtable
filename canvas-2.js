 var WAVE_HEIGHT = 70 //波浪变化高度
    var SCALE = 0.5 // 绘制速率
    var CYCLE = 360 / SCALE
    var TIME = 0

    function initCanvas() {
        var c = document.getElementById("indexCanvas")
        var width = window.screen.width
        var height = window.screen.height

        var ctx = c.getContext("2d")
        c.width = width
        c.height = height

        // start
        window.requestAnimationFrame(function() {
            draw(ctx, width, height)
        })
    }

    function draw(ctx, width, height) {
        ctx.clearRect(0, 0, width, height)

        TIME = (TIME + 1) % CYCLE
        var angle = SCALE * TIME // 当前正弦角度
        var dAngle = 60 // 两个波峰相差的角度

        ctx.beginPath()
        ctx.moveTo(0, height * 0.5 + distance(WAVE_HEIGHT, angle, 0))
        ctx.bezierCurveTo(
            width * 0.4,
            height * 0.5 + distance(WAVE_HEIGHT, angle, dAngle),
            width * 0.6,
            height * 0.5 + distance(WAVE_HEIGHT, angle, 2 * dAngle),
            width,
            height * 0.5 + distance(WAVE_HEIGHT, angle, 3 * dAngle)
        )
        ctx.strokeStyle = "#ff0000"
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, height * 0.5 + distance(WAVE_HEIGHT, angle, -30))
        ctx.bezierCurveTo(
            width * 0.3,
            height * 0.5 + distance(WAVE_HEIGHT, angle, dAngle - 30),
            width * 0.7,
            height * 0.5 + distance(WAVE_HEIGHT, angle, 2 * dAngle - 30),
            width,
            height * 0.5 + distance(WAVE_HEIGHT, angle, 3 * dAngle - 30)
        )
        ctx.strokeStyle = "#0000ff"
        ctx.stroke()

        function distance(height, currAngle, diffAngle) {
            return height * Math.cos((((currAngle - diffAngle) % 360) * Math.PI) / 180)
        }

        // animate
//      window.requestAnimationFrame(function() {
//          draw(ctx, width, height)
//      })
    }

   // initCanvas()