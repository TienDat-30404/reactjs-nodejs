import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from './counterSlice'

export function Counter() {
  const count = useSelector(state456 => state456.counter123.value1)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState(0)

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div>
        <input 
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
        />
        <button
          onClick={() => dispatch(incrementByAmount(incrementAmount))}
        >
          Increment by Amount
        </button>
      </div>
    </div>
  )
}