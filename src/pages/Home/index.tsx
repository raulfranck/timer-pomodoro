import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

const newFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Digite a sua tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const isDisabledSubmit = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggenstions"
            placeholder="Dê um nome para a sua tarefa"
            {...register('task')}
          />
          <datalist id="task-suggenstions">
            <option value="projeto 1"></option>
            <option value="projeto 2"></option>
            <option value="projeto 3"></option>
            <option value="projeto 4"></option>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isDisabledSubmit} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
