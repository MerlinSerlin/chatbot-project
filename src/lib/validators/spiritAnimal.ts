import { z } from 'zod'

export const SpiritAnimalSchema = z.object({
  text: z.string(),
  symbolism: z.string(),
  when_in_balance: z.string(),
  when_out_of_balance: z.string(),
  to_bring_into_balance: z.string(),
  sounds: z.string(),
})

// array validator
export const MessageArraySchema = z.array(SpiritAnimalSchema)

export type Message = z.infer<typeof SpiritAnimalSchema>