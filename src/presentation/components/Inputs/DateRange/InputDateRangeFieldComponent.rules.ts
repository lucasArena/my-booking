import { useCallback, useState } from 'react'

import type {
  IInputDateRangeFieldComponentProps,
  TInputDateRangeForm,
} from '@/presentation/components/Inputs/DateRange/InputDateRangeFieldComponent.types'

export const useInputDateRange = ({
  value,
  textFieldProps,
  onChange,
}: IInputDateRangeFieldComponentProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [draftRange, setDraftRange] = useState<TInputDateRangeForm>(value)

  const open = Boolean(anchorEl)

  const openPopover = useCallback(
    (target: HTMLElement) => {
      setAnchorEl(target)
      setDraftRange(value)
    },
    [value],
  )

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    event => {
      openPopover(event.currentTarget)
      textFieldProps?.onClick?.(event)
    },
    [openPopover, textFieldProps],
  )

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openPopover(event.currentTarget)
      }
      textFieldProps?.onKeyDown?.(event)
    },
    [openPopover, textFieldProps],
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleRangeChange = useCallback((range: TInputDateRangeForm) => {
    setDraftRange(range)
  }, [])

  const handleApply = useCallback(() => {
    onChange(draftRange)
    handleClose()
  }, [draftRange, handleClose, onChange])

  const handleClear = useCallback(() => {
    const cleared = { checkIn: null, checkOut: null }
    setDraftRange(cleared)
    onChange(cleared)
    handleClose()
  }, [handleClose, onChange])

  return {
    open,
    anchorEl,
    draftRange,
    handleClick,
    handleKeyDown,
    handleClose,
    handleRangeChange,
    handleApply,
    handleClear,
  }
}
