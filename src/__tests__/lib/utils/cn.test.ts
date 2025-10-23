import { it, expect } from 'vitest'
import { cn } from '@/lib/utils/cn'

it('should combinar classes simples', () => {
  expect(cn('class1', 'class2')).toBe('class1 class2')
})

it('should mesclar classes conflitantes of the tailwind', () => {
  expect(cn('px-2', 'px-4')).toBe('px-4')
  expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
})

it('should accept valores condicionais', () => {
  expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
})

it('should accept objetos', () => {
  expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500')
})

it('should accept arrays', () => {
  expect(cn(['class1', 'class2'])).toBe('class1 class2')
})

it('should lidar with undefined e null', () => {
  expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2')
})

it('should return string empty to entrada empty', () => {
  expect(cn()).toBe('')
})

