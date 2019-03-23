import React, { useState, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'

function Timer(props) {
  const [count, setCount] = useState(props.time)
  useInterval(() => {
    if (count === 0) return props.done()
    setCount(count - 1)
  }, 1000)

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: count < 5 ? 'red' : 'blue' }}>
        الوقت {count}ثانية
      </Text>
    </View>
  )
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
