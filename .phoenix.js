#!/usr/bin/env coffee -p

Key.on 'left', [ 'ctrl', 'cmd' ], ->
  screen = Screen.main().flippedVisibleFrame()
  window = Window.focused()

  if window
    window.setTopLeft x: 0, y: 0
    window.setSize width: screen.width / 2, height: screen.height

Key.on 'right', [ 'ctrl', 'cmd' ], ->
  screen = Screen.main().flippedVisibleFrame()
  window = Window.focused()

  if window
    window.setTopLeft x: screen.width / 2, y: 0
    window.setSize width: screen.width / 2, height: screen.height

Key.on 'up', [ 'ctrl', 'cmd' ], ->
  screen = Screen.main().flippedVisibleFrame()
  window = Window.focused()

  if window
    window.setTopLeft x: 0, y: 0
    window.setSize width: screen.width, height: screen.height

Key.on 'down', [ 'ctrl', 'cmd' ], ->
  screen = Screen.main().flippedVisibleFrame()
  window = Window.focused()

  if window
    window.setTopLeft x: screen.width / 8, y: screen.height / 8 
    window.setSize width: screen.width * (6/8), height: screen.height * (6/8)
