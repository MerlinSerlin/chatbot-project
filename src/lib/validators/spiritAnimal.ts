import { z } from 'zod'

export const SpiritAnimalSchema = z.object({
  text: z.string(),
  symbolism: z.string(),
})

// array validator
export const MessageArraySchema = z.array(SpiritAnimalSchema)

export type Message = z.infer<typeof SpiritAnimalSchema>