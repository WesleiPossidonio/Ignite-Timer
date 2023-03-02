import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { CyclesContext } from '../../contexts/CyclesContexts'
import { Countdown, NewCycleForm } from './components'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './style'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minímo 5 minutos')
    .max(60, 'O siclo precisa ser no maximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // aqui esu estou pegando a mesma validação do zod assima assim não terei a necessidade de cliar uma nova interface para validar os inputs... pois seu eu adicionar mais um input ele adicionará altomaticamente, o typeof foi para colocar uma variavel javaScript em typeScript para o mesmo aceitar.

export const Home = () => {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      // aqui eu estou passando qual é o valor inicial de cada campo... assim o type escript tbm aceita a tipação de acordo com esse valor.... sempre usar isso sempre preencher para que der certo o reset tbm...
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset() // aqui eu estou chamando o reset assim ele volta ao valor declarado la do defaultValues...
  }

  const task = watch('task') // isso e como um use state, no caso ele vai ver todos o estados do input vai monitorar... e vai retornar pra mim se vai estar estar vasio ou não etc...
  const isSubmitDisable = !task // essa é uma variável axiliáres no caso variáveis assim ajuda para o entendimento do código no total... sempre fazer isso!

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm />
            Interronper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisable} type="submit">
            <Play />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
