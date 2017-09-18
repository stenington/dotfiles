#!/usr/bin/env coffee -p

###
  Phoenix docs: https://github.com/kasper/phoenix/blob/2.5/docs/API.md
  Debug with Phoenix.notify(msg) or Phoenix.log(args) + open Console
###

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

scooch = (opts={}) ->
  opts.dx ?= 0
  opts.dy ?= 0
  ->
    window = Window.focused()
    if window
      tl = window.topLeft()
      window.setTopLeft x: tl.x + opts.dx, y: tl.y + opts.dy


Key.on 'left',  [ 'ctrl', 'cmd' ], arrange 0, 0, .5, 1
Key.on 'right', [ 'ctrl', 'cmd' ], arrange .5, 0, .5, 1
Key.on 'up',    [ 'ctrl', 'cmd' ], arrange 0, 0, 1, 1
Key.on 'down',  [ 'ctrl', 'cmd' ], arrange 1/8, 1/8, 6/8, 6/8

Key.on 'left',  [ 'ctrl', 'cmd', 'alt' ], arrange 0, 0, 0.25, 1
Key.on 'right', [ 'ctrl', 'cmd', 'alt' ], arrange .75, 0, 0.25, 1
Key.on 'up',    [ 'ctrl', 'cmd', 'alt' ], arrange 1/16, 1/16, 7/8, 7/8
Key.on 'down',  [ 'ctrl', 'cmd', 'alt' ], arrange 1/4, 1/4, 1/2, 1/2

Key.on 'left',  [ 'ctrl', 'cmd', 'shift' ], arrange 0, 0, 0.75, 1
Key.on 'right', [ 'ctrl', 'cmd', 'shift' ], arrange .25, 0, 0.75, 1

Key.on '1', [ 'ctrl', 'cmd' ], send 0
Key.on '2', [ 'ctrl', 'cmd' ], send 1

Key.on 'up',    [ 'alt', 'shift' ], scooch dy: -50
Key.on 'down',  [ 'alt', 'shift' ], scooch dy: 50
Key.on 'left',  [ 'alt', 'shift' ], scooch dx: -50
Key.on 'right', [ 'alt', 'shift' ], scooch dx: 50
