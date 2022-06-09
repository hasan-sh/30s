import React, { useState, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'

function Timer(props) {
  const count = useRef(props.time)
  useInterval(() => {
    count.current = count.current - 1
    if(count.current < 0) return
    props.setCount(count.current)
  }, 1000)

  return null
}

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default Timer
