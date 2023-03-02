import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

import { CyclesContext } from '../../../../contexts/CyclesContexts'
import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
  const {
    activeCycle,
    activeCycledId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSecunds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSecunds / 60)
  const secondsAmount = currentSecunds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const secunds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${secunds}`
    }
  }, [minutes, secunds, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = window.setTimeout(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycledId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{secunds[0]}</span>
      <span>{secunds[1]}</span>
    </CountdownContainer>
  )
}
