#!/usr/bin/env coffee -p

arrange = (xp, yp, wp, hp) ->
  ->
    window = Window.focused()

    if window
      frame = window.screen().flippedVisibleFrame()
      window.setTopLeft x: frame.x + frame.width * xp, y: frame.y + frame.height * yp
      window.setSize width: frame.width * wp, height: frame.height * hp


send = (idx) ->
  ->
    window = Window.focused()
    if window
      screens = Screen.all()
      if screens.length >= idx+1
        screen = screens[idx]
        window.setFrame screen.flippedVisibleFrame()
        window.maximize()

Key.on 'left',  [ 'ctrl', 'cmd' ], arrange 0, 0, .5, 1
Key.on 'right', [ 'ctrl', 'cmd' ], arrange .5, 0, .5, 1
Key.on 'up',    [ 'ctrl', 'cmd' ], arrange 0, 0, 1, 1
Key.on 'down',  [ 'ctrl', 'cmd' ], arrange 1/8, 1/8, 6/8, 6/8

Key.on 'left',  [ 'ctrl', 'cmd', 'shift' ], arrange 0, 0, 0.25, 1
Key.on 'right',  [ 'ctrl', 'cmd', 'shift' ], arrange .75, 0, 0.25, 1

Key.on '1', [ 'ctrl', 'cmd' ], send 0
Key.on '2', [ 'ctrl', 'cmd' ], send 1
