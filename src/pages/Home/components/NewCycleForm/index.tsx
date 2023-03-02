import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContexts'


import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="text">Vou trabalhar em</label>
      <TaskInput
        id="text"
        list="task-suggestions"
        placeholder="Dê um nome ao seu projeto"
        min={5}
        max={60}
        {...register('task')}
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
        <option value="Projeto 3"></option>
        <option value="Banana"></option>
      </datalist>

      <label htmlFor="minutesAmount"> Durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        placeholder="00"
        type="number"
        disabled={!!activeCycle}
        step={5}
        {...register('minutesAmount', { valueAsNumber: true })} // esse segundo parametro é um parametro de configurações... onde posso configirar se a saida será um string ou um numero... dessa ves coloquei que vai sair como numero
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
