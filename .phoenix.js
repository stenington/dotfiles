#!/usr/bin/env coffee -p

arrange = (xp, yp, wp, hp) ->
  ->
    screen = Screen.main().flippedVisibleFrame()
    window = Window.focused()

    if window
      window.setTopLeft x: screen.width * xp, y: screen.height * yp
      window.setSize width: screen.width * wp, height: screen.height * hp


Key.on 'left',  [ 'ctrl', 'cmd' ], arrange 0, 0, .5, 1
Key.on 'right', [ 'ctrl', 'cmd' ], arrange .5, 0, .5, 1
Key.on 'up',    [ 'ctrl', 'cmd' ], arrange 0, 0, 1, 1
Key.on 'down',  [ 'ctrl', 'cmd' ], arrange 1/8, 1/8, 6/8, 6/8

Key.on 'left',  [ 'ctrl', 'cmd', 'shift' ], arrange 0, 0, 0.25, 1
Key.on 'right',  [ 'ctrl', 'cmd', 'shift' ], arrange .75, 0, 0.25, 1
